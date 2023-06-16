import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {
  Box,
  Card,
  CardContent,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import Uploady, {
  useItemErrorListener,
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
} from '@rpldy/uploady';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useAccessTokenState } from '../../context/UserContext';
import { Alert } from '../alert';

const PasteUploadDropZone = withPasteUpload(UploadDropZone);
const SimpleContainer = styled('div')``;
const PasteArea = withPasteUpload(SimpleContainer);

const ButtonAsUploadButton = asUploadButton(
  forwardRef((props, ref) => {
    return (
      <Link ref={ref} {...props}>
        click here
      </Link>
    );
  })
);

export const Uploader = ({ url, paramName, params, onFinish }) => {
  const [status, setStatus] = useState({
    status: 'NONE',
    message: '',
  });
  const [openAlert, setOpenAlert] = useState(false);

  const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 2,
  };

  const accessToken = useAccessTokenState();
  const destination = {
    url,
    filesParamName: paramName,
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  };

  useEffect(() => {
    if (status.status === 'SUCCESS' && onFinish) {
      onFinish();
    }
    if (status.status !== 'NONE') {
      setOpenAlert(true);
    }
  }, [status, onFinish]);

  const UploadStatusView = () => {
    useItemStartListener(() =>
      setStatus({
        status: 'UPLOADING',
        message: 'Uploading',
      })
    );
    useItemFinishListener(() =>
      setStatus({
        status: 'SUCCESS',
        message: 'Successfully Uploaded',
      })
    );
    useItemProgressListener((item) =>
      setStatus({
        status: 'UPLOADING',
        message: `item is ${item.completed}% done and ${item.loaded} bytes uploaded`,
      })
    );

    useItemErrorListener((item) => {
      setStatus({
        status: 'ERROR',
        message: `Failed to upload\n${
          item.uploadResponse.data
            ? item.uploadResponse.data.error
            : item.uploadResponse
        }`,
      });
    });

    if (status.status === 'NONE') {
      return <label></label>;
    }

    const severity =
      status.status === 'SUCCESS'
        ? 'success'
        : status.status === 'UPLOADING'
        ? 'info'
        : 'error';

    return (
      <Alert
        show={openAlert}
        severity={severity}
        onClose={() => setOpenAlert(false)}
      >
        {status.message}
      </Alert>
    );
  };

  const fileFilter = useCallback((file) => {
    const validaSize = file.size < 8000000;
    if (!validaSize) {
      setStatus({
        status: 'ERROR',
        message: `File is too large, must be less than 8MB`,
      });
    }
    return validaSize;
  }, []);

  return (
    <Box sx={center}>
      <Uploady
        multiple={true}
        destination={destination}
        accept=".png,.jpg,.jpeg"
        fileFilter={fileFilter}
      >
        <Stack spacing={2}>
          <Typography fontSize={15}>Media</Typography>
          <Card
            sx={{
              border: 'dashed 1px',
              minWidth: 250,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <PasteUploadDropZone autoUpload={true} params={{ test: 'paste' }}>
                <PasteArea autoUpload={false}>
                  <Typography fontSize={15} sx={center}>
                    <CloudUploadOutlinedIcon />
                  </Typography>
                  <Typography fontSize={15} sx={center}>
                    Drop files, paste or &nbsp;
                    <ButtonAsUploadButton />
                  </Typography>
                </PasteArea>
              </PasteUploadDropZone>
            </CardContent>
          </Card>

          <UploadStatusView />
        </Stack>
      </Uploady>
    </Box>
  );
};
