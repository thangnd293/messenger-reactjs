/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_PUBLIC_API_BASE_URL: string;
   readonly VITE_CLOUD_NAME: string;
   readonly VITE_UPLOAD_PRESET: string;
   readonly VITE_CLOUDINARY_URL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
