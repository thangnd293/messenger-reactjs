import { toast } from 'react-toastify';

export const useToastError = (message: string) => toast.error(message);

export const useToastWarning = (message: string) => toast.warning(message);

export const useToastSuccess = (message: string) => toast.success(message);

export const useToastInfo = (message: string) => toast.info(message);
