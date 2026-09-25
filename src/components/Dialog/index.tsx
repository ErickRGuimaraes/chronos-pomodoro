import { DefaultButton } from '../DefaultButton';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import styles from './styles.module.css';

type DialogProps = {
  message: string;
  onClosing: (confirmation: boolean) => void;
  closeToast: () => void;
};

export function Dialog({ message, onClosing, closeToast }: DialogProps) {
  function handleConfirm() {
    closeToast();
    onClosing(true);
  }

  function handleCancel() {
    closeToast();
    onClosing(false);
  }

  return (
    <div className={styles.container}>
      <p>{message}</p>

      <div className={styles.buttonsContainer}>
        <DefaultButton
          onClick={handleConfirm}
          icon={<ThumbsUpIcon />}
          aria-label='Confirmar ação e fechar'
          title='Confirmar ação e fechar'
        />

        <DefaultButton
          onClick={handleCancel}
          icon={<ThumbsDownIcon />}
          color='red'
          aria-label='Cancelar ação e fechar'
          title='Cancelar ação e fechar'
        />
      </div>
    </div>
  );
}
