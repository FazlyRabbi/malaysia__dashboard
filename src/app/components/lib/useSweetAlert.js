import Swal from 'sweetalert2';

const useSweetAlert = () => {
  
  const showAlert = (options) => {
    return Swal.fire(options);
  };

  return {
    showAlert,
  };
};

export default useSweetAlert;