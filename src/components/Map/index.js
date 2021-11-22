import { DrawingManager, GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import PropTypes from 'prop-types';

import React from 'react';
import handleToast from './../../utils/handleToast';

const containerStyle = {
  width: '100vw',
  height: '90vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const libraries = ['drawing'];

const MapComponent = ({ onPolygonComplete, data }) => {
  return (
    <LoadScript libraries={libraries} googleMapsApiKey="AIzaSyA46WST9U4KyDJxftx7EyZusUKBq_YuvnA">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <>
          <DrawingManager
            drawingMode={'null'}
            options={{
              drawingControlOptions: { drawingModes: ['polygon'] },
              polygonOptions: {
                clickable: true,
                draggable: false,
                editable: false
              }
            }}
            onPolygonComplete={onPolygonComplete}
          />

          {data.map((polygonData) => (
            <Polygon
              key={polygonData._id}
              onClick={(e) => {
                handleToast(`${polygonData.label}`, {
                  toastId: polygonData.label,
                  progressStyle: {
                    background: polygonData.color,
                    color: polygonData.color
                  },
                  style: { border: `5px solid ${polygonData.color}` }
                });
              }}
              options={{
                fillColor: polygonData.color,
                fillOpacity: 1,
                strokeColor: polygonData.color,
                strokeOpacity: 1,
                strokeWeight: 2
              }}
              path={polygonData.points.map((point) => {
                return {
                  lat: +point.lat,
                  lng: +point.lng
                };
              })}
            />
          ))}
        </>
      </GoogleMap>
    </LoadScript>
  );
};
MapComponent.propTypes = {
  onPolygonComplete: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default MapComponent;
