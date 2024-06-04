import { toast } from 'react-toastify';

type UseNotifications = () => {
  displayInfoToast: (message: string) => void;
  displayErrorToast: (message: string) => void;
};

export const useNotifications: UseNotifications = () => {
  const displayInfoToast = (message: string) => {
    toast.info(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const displayErrorToast = (message: string) => {
    toast.error(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
    displayInfoToast,
    displayErrorToast,
  };
};
