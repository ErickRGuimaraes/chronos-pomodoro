import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (msg: string) => toast.success(msg),

  error: (msg: string) => toast.error(msg),

  warn: (msg: string) => toast.warn(msg),

  warning: (msg: string) => toast.warning(msg),

  info: (msg: string) => toast.info(msg),

  dismiss: () => toast.dismiss(),

  confirm: (message: string, onClosing: (confirmation: boolean) => void) =>
    toast(
      ({ closeToast }) => (
        <Dialog
          message={message}
          onClosing={onClosing}
          closeToast={closeToast}
        />
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      },
    ),
};
