import type { AlertButton, AlertOptions } from 'react-native';
import { Alert } from 'react-native';

export type AlertType = {
  title: string;
  description: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
};

export type DangerAlertType = {
  title: string;
  description: string;
  proceed?: string;
  cancel?: string;
  onProceed?: ((value?: string | undefined) => void) | undefined;
  onCancel?: ((value?: string | undefined) => void) | undefined;
};

export type ConfirmationAlertType = DangerAlertType;

export type ErrorAlertType = {
  description: string;
  title?: string;
};

export const useAlert = () => {
  const showAlert = ({ title, description, buttons, options }: AlertType) => {
    Alert.alert(title, description, buttons, options);
  };

  const showDangerAlert = ({ title, description, proceed, onProceed, cancel, onCancel }: DangerAlertType) => {
    showAlert({
      title,
      description,
      buttons: [
        {
          text: proceed ?? 'Yes, delete',
          onPress: onProceed,
          style: 'destructive',
        },
        {
          text: cancel ?? 'Cancel',
          onPress: onCancel,
          style: 'default',
        },
      ],
      options: {
        cancelable: false,
      },
    });
  };

  const showConfirmationAlert = ({
    title,
    description,
    onProceed,
    onCancel,
    proceed,
    cancel,
  }: ConfirmationAlertType) => {
    showAlert({
      title,
      description,
      buttons: [
        {
          text: proceed ?? 'Confirm selection',
          onPress: onProceed,
        },
        {
          text: cancel ?? 'Cancel',
          onPress: onCancel,
        },
      ],
    });
  };

  const showErrorAlert = ({ title, description }: ErrorAlertType) => {
    showAlert({
      title: title ?? 'Sorry',
      description,
      buttons: [
        {
          text: 'Dismiss',
          style: 'cancel',
        },
      ],
    });
  };

  return {
    showAlert,
    showErrorAlert,
    showDangerAlert,
    showConfirmationAlert,
  };
};
