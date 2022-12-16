import { useMutation } from '@tanstack/react-query';
import {
  changePassword,
  requestChangePassword,
  sendVerification,
  signUp,
  verify,
} from './Authentication';

export const useRegister = () => {
  return useMutation((register) => signUp(register));
};

export const useVerify = () => {
  return useMutation((hash) => verify(hash));
};

export const useSendVerification = () => {
  return useMutation((email) => sendVerification(email));
};

export const useRequestChangePassword = () => {
  return useMutation((email) => requestChangePassword(email));
};

export const useChangePassword = () => {
  return useMutation((request) => changePassword(request));
};
