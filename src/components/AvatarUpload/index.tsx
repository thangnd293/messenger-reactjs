import React, { useState } from 'react';
import { Avatar, Button, CircularProgress, Stack } from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const AvatarUpload = () => {
   const [avatar, setAvatar] = useState<string | undefined>();
   const [isUploading, setUploading] = useState(false);

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      formData.append('upload_preset', UPLOAD_PRESET);

      const body = await fetch(CLOUDINARY_URL, {
         method: 'POST',
         body: formData,
      });

      const { public_id } = await body.json();

      const cld = new Cloudinary({
         cloud: {
            cloudName: CLOUD_NAME,
         },
      });

      const myImage = cld.image(public_id);

      myImage.resize(
         thumbnail().width(80).height(80).gravity(focusOn(FocusOn.face())),
      );

      setAvatar(myImage.toURL());
      setUploading(false);
   };

   return (
      <Stack mx="auto" alignItems="center">
         <Stack
            sx={{
               width: 80,
               height: 80,
               borderRadius: '50%',
            }}
            alignItems="center"
            justifyContent="center"
         >
            {isUploading ? (
               <CircularProgress size="30px" />
            ) : (
               <Avatar
                  sx={{
                     width: '100%',
                     height: '100%',
                  }}
                  src={avatar}
               />
            )}
         </Stack>
         <Stack>
            <input
               style={{
                  display: 'none',
               }}
               id="file-uploader"
               type="file"
               accept="image/*"
               onChange={handleFileChange}
            />
            <Button
               sx={{
                  marginTop: '10px',
               }}
               variant="contained"
               size="small"
               component="label"
               htmlFor="file-uploader"
            >
               Choose avatar
            </Button>
         </Stack>
      </Stack>
   );
};

export default AvatarUpload;
