import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Dropdown } from '../../components/dropdown';
import { Header } from '../../components/header';
import { Uploader } from '../../components/uploader';
import { config } from '../../utilities/config';
import { EntryImagesPreview } from './EntryImagesPreview';

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
  const [reload, setReload] = useState(true);
  const [imageOption, setImageOption] = useState(imageOptions.at(0));

  const onFinish = useCallback(() => {
    setReload(!reload);
  }, [reload]);

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

      <EntryImagesPreview entry={entry} reload={reload} />
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
