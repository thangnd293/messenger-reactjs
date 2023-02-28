import { useCallback, useState } from 'react';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

type UploadState = {
   file: File;
   progress: 'pending' | 'uploading' | 'done' | 'error';
   data: CloudinaryUploadResponse | null;
};

const useCloudinaryUpload = () => {
   const [uploadStates, setUploadStates] = useState<UploadState[]>([]);

   const handleUploadToCloudinary = useCallback(async (files: File[]) => {
      setUploadStates(
         files.map((file) => ({ file, progress: 'pending', data: null })),
      );

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
         const file = files[i];
         formData.append('file', file);
         formData.append('upload_preset', UPLOAD_PRESET);

         setUploadStates((prev) => {
            return prev.map((state) => {
               if (state.file.name === file.name) {
                  return { ...state, progress: 'uploading' };
               }
               return state;
            });
         });

         try {
            const data = await fetch(CLOUDINARY_URL, {
               method: 'POST',
               body: formData,
            });

            const response = await data.json();

            setUploadStates((prev) => {
               return prev.map((state) => {
                  if (state.file.name === file.name) {
                     return { ...state, progress: 'done', data: response };
                  }
                  return state;
               });
            });
         } catch (error) {
            setUploadStates((prev) => {
               return prev.map((state) => {
                  if (state.file.name === file.name) {
                     return { ...state, progress: 'error' };
                  }
                  return state;
               });
            });
         }
      }
   }, []);

   return {
      handleUploadToCloudinary,
      uploadStates,
   } as const;
};

export default useCloudinaryUpload;
