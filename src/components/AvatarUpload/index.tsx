import React, { useEffect } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import useCloudinaryUpload from '@/hook/useCloudinaryUpload';
import { FieldProps, useField } from '@formiz/core';
import Avatar from '../Avatar';

type Props = FieldProps;

const AvatarUpload = (props: Props) => {
   const { setValue, value } = useField(props);
   const { handleUploadToCloudinary, uploadStates } = useCloudinaryUpload();

   const isUploading = uploadStates?.[0]?.progress === 'uploading';

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleUploadToCloudinary([file]);
   };

   useEffect(() => {
      const public_id = uploadStates[0]?.data?.public_id;
      if (!public_id) return;

      setValue(public_id);
   }, [uploadStates]);

   const handleDelete = () => {
      setValue('');
   };

   return (
      <Stack direction="row" alignItems="center">
         <Stack
            sx={{
               width: 100,
               height: 100,
               borderRadius: '50%',
               flexShrink: 0,
            }}
            alignItems="center"
            justifyContent="center"
         >
            {isUploading ? (
               <CircularProgress size="30px" />
            ) : (
               <Avatar width={100} height={100} avatar={value} />
            )}
         </Stack>

         <Stack pl="30px" spacing="12px">
            <Stack direction="row" gap="14px">
               <input
                  style={{
                     display: 'none',
                  }}
                  id="file-uploader"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
               />
               <Button
                  component="label"
                  variant="contained"
                  htmlFor="file-uploader"
               >
                  Upload Profile Photo
               </Button>
               <Button
                  variant="outlined"
                  disabled={!value}
                  onClick={handleDelete}
               >
                  Delete
               </Button>
            </Stack>

            <Typography variant="smallText" fontSize="12px">
               *Image size should be at least 320px big, and less then 500kb.
               Allow file .png, .jpg and .jpeg.
            </Typography>
         </Stack>
      </Stack>
   );
};

export default AvatarUpload;
