import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import UploadPreview from '@rpldy/upload-preview';
import Uploady, {
  useItemErrorListener,
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
} from '@rpldy/uploady';
import React, { forwardRef, useEffect, useState } from 'react';
import { useAccessTokenState } from '../../context/UserContext';
import { Alert } from '../alert';
import { Card } from '../card';

const PreviewContainer = styled('div')`
  img {
    max-width: 260px;
    max-height: 260px;
  }
`;

const PasteUploadDropZone = withPasteUpload(UploadDropZone);
const SimpleContainer = styled('div')``;
const PasteArea = withPasteUpload(SimpleContainer);

const ButtonAsUploadButton = asUploadButton(
  forwardRef((props, ref) => {
    return (
      <Button fullWidth variant="contained" ref={ref} {...props}>
        Or click here to upload
      </Button>
    );
  })
);

export const Uploader = ({
  url,
  paramName,
  params,
  preview,
  withButton,
  onFinish,
}) => {
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

  return (
    <Box sx={center}>
      <Uploady
        multiple={false}
        destination={destination}
        accept=".png,.jpg,.jpeg"
      >
        <Stack spacing={2}>
          <PasteUploadDropZone autoUpload={true} params={{ test: 'paste' }}>
            <PasteArea autoUpload={true}>
              <Card title="Upload">
                <Typography fontSize={15} sx={center}>
                  You can drop a file here
                </Typography>
                <Typography fontSize={15} sx={center}>
                  Or click and paste a file to upload
                </Typography>
              </Card>
            </PasteArea>
          </PasteUploadDropZone>
          {withButton && <ButtonAsUploadButton />}
          <UploadStatusView />
          {preview && (
            <PreviewContainer>
              <UploadPreview />
            </PreviewContainer>
          )}
        </Stack>
      </Uploady>
    </Box>
  );
};
