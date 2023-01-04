import { Box, Grid, styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown } from '../../components/dropdown';
import { Header } from '../../components/header';
import { Uploader } from '../../components/uploader';
import { Zoom } from '../../components/zoom';
import { useAccessTokenState } from '../../context/UserContext';
import { getEntryImage } from '../../services/Entry';
import { config } from '../../utilities/config';

const PreviewContainer = styled('div')`
  img {
    max-width: 130px;
    max-height: 130px;
  }
  img:hover {
    opacity: 0.8;
  }
`;

const imageOptions = [
  {
    value: 'IMAGE_BEFORE',
    label: 'Image when trade started',
  },
  {
    value: 'IMAGE_AFTER',
    label: 'Image when trade ended',
  },
];

export const EntryImages = ({ entry, journal }) => {
  const [imageBefore, setImageBefore] = useState();
  const [imageAfter, setImageAfter] = useState();
  const [hasAnyImage, setHasAnyImage] = useState(false);
  const [reload, setReload] = useState(true);
  const [imageOption, setImageOption] = useState(imageOptions.at(0));

  const accessToken = useAccessTokenState();

  useEffect(() => {
    if (reload) {
      getEntryImage(accessToken, journal.id, entry.id, 'IMAGE_BEFORE').then(
        (resp) => setImageBefore({ image: resp.image, alt: 'Image at start' })
      );
      getEntryImage(accessToken, journal.id, entry.id, 'IMAGE_AFTER').then(
        (resp) => setImageAfter({ image: resp.image, alt: 'Image at the end' })
      );
      setReload(false);
    }
  }, [journal, entry, accessToken, reload]);

  useEffect(() => {
    if (imageBefore || imageAfter) {
      setHasAnyImage(true);
    }
  }, [imageBefore, imageAfter]);

  const onFinish = useCallback(() => {
    setReload(true);
  }, []);

  const imageBeforeRequest = {
    url: `${config.entries}/journals/${journal.id}/entries/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_BEFORE' },
    onFinish: onFinish,
  };

  const imageAfterRequest = {
    url: `${config.entries}/journals/${journal.id}/entries/${entry.id}/image`,
    paramName: 'file  ',
    params: { type: 'IMAGE_AFTER' },
    onFinish: onFinish,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header subtitle={`Images for ${entry.symbol}`} />

      {hasAnyImage && (
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            {imageBefore && (
              <PreviewContainer>
                <Zoom {...imageBefore} />
              </PreviewContainer>
            )}
          </Grid>
          <Grid item xs={6} sm={6}>
            {imageAfter && (
              <PreviewContainer>
                <Zoom {...imageAfter} />
              </PreviewContainer>
            )}
          </Grid>
        </Grid>
      )}
      <Uploader
        {...(imageOption.value === 'IMAGE_BEFORE'
          ? imageBeforeRequest
          : imageAfterRequest)}
      />
      <Dropdown
        small
        fullWidth
        label="Upload as"
        onChange={(value) =>
          setImageOption(imageOptions.find((option) => option.value === value))
        }
        items={imageOptions}
        value={imageOption.value}
      />
    </Box>
  );
};
