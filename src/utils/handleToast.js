import { toast } from 'react-toastify';

const handleToast = (label, options = {}) => {
  return toast(label, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options
  });
};
export default handleToast;
