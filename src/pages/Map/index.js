import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useRef, useState } from 'react';

import Button from '../../components/Button';
import Field from '../../components/Field';
import Form from '../../components/Form';
import MapComponent from '../../components/Map';
import ReactModal from 'react-modal';
import { SketchPicker } from 'react-color';
import { ToastContainer } from 'react-toastify';
import checkIntersectionPromise from '../../utils/checkIntersection';
import client from '../../utils/axios';
import downloadAsJson from './../../utils/downloadAsJson';
import handleToast from '../../utils/handleToast';
import styles from './Map.module.css';
import useLocalStorage from '../../hooks/useLocalstorage';

let polygonCoords = [];
function Map() {
  const [allPolygonsPoints, setAllPolygonsPoints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [zoneBackground, setZoneBackground] = useState('');
  const labelRef = useRef('');
  const [token] = useLocalStorage('token');
  const [data, setData] = useState([]);

  useEffect(() => {
    client.interceptors.request.use((request) => {
      request.headers.common.Authorization = `Bearer ${token}`;

      return request;
    });
    client.get('/zones').then((res) => {
      setData(res.data.data);
    });
    ReactModal.setAppElement('body');
  }, []);

  useEffect(() => {
    if (data.length >= 1) {
      let points = [];
      data.forEach((polygon) => {
        points = [...points, polygon.points];
      });
      points.flat().forEach((pointObj) => {
        setAllPolygonsPoints((prevstate) => [...prevstate, [+pointObj.lat, +pointObj.lng]]);
      });
    }
  }, [data]);
  const handleZoneColor = (color, e) => {
    setZoneBackground(color.hex);
    setShowColorPicker(false);
  };
  const handleShowColorpicker = (e) => {
    e.preventDefault();
    setShowColorPicker(true);
  };

  const coordsToLatLng = (coords, type) => {
    if (type === 'lat') {
      const paths = [];
      coords.forEach((coord) => {
        return paths.push({ lat: coord[0], lng: coord[1] });
      });
      return paths;
    } else {
      return [coords.lat(), coords.lng()];
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
    polygonCoords = [];
  };
  const handleFormSubmit = (data) => {
    client
      .post('/zones', {
        label: labelRef.current.value,
        color: zoneBackground,
        points: coordsToLatLng(polygonCoords, 'lat')
      })
      .then(() => {
        polygonCoords = [];
        client.get('/zones').then((res) => {
          setData(res.data.data);
        });
      })
      .then(() => {
        setShowModal(false);
      })
      .catch((error) => {
        handleToast(error.response.data.message);
      });
  };

  const onPolygonComplete = (polygon) => {
    polygon.getPaths().td[0].td.forEach((coord) => {
      polygonCoords = [...polygonCoords, coordsToLatLng(coord)];
    });
    checkIntersectionPromise(polygonCoords, allPolygonsPoints)
      .then(() => {
        setShowModal(true);
      })
      .catch((error) => {
        polygonCoords = [];
        handleToast(error);
      });
    polygon.visible = false;
  };
  const exportJson = () => {
    client.get('zones').then((res) => {
      downloadAsJson(res.data.data, `Zones${new Date().getSeconds()}`);
    });
  };
  return (
    <>
      <MapComponent onPolygonComplete={onPolygonComplete} data={data} />
      {showModal && (
        <ReactModal isOpen={showModal}>
          <Button handleClick={handleHideModal} text={'close'} />
          <Form onSubmitFunc={handleFormSubmit} values={{ label: labelRef }}>
            <Field ref={labelRef} label="Label:" type="text" />
            <Button id={'color'} handleClick={handleShowColorpicker} text={'choose color'} />
            <div className={styles.zoneColor} style={{ backgroundColor: zoneBackground }}>
              {zoneBackground}
            </div>
            {showColorPicker && (
              <SketchPicker color={zoneBackground} onChangeComplete={handleZoneColor} />
            )}
          </Form>
        </ReactModal>
      )}

      <ToastContainer />
      <Button text={'Export as JSON'} handleClick={exportJson} />
    </>
  );
}

export default React.memo(Map);
