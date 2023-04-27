import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ScreenshotMonitorOutlinedIcon from '@mui/icons-material/ScreenshotMonitorOutlined';
import {
  Box,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  imageListItemClasses,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import {
  useDeleteEntryImage,
  useGetEntryImages,
} from '../../services/EntryQueries';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 350,
      tablet: 650,
      desktop: 900,
    },
  },
});

export const EntryImagesList = ({ entry }) => {
  const { data } = useGetEntryImages(entry.id);
  const mutation = useDeleteEntryImage(entry.id);
  const deleteConfirmation = useConfirmationModal();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setImages(data);
    }
  }, [data]);

  const deleteImage = async (imageId) => {
    const result = await deleteConfirmation.showConfirmation(
      'Delete Image',
      <Typography fontSize={20}>
        Are you sure do you want to remove this image?
      </Typography>
    );
    if (result) {
      mutation.mutate(imageId);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: 450,
          display: 'grid',
          gridTemplateColumns: {
            mobile: 'repeat(1, 1fr)',
            bigMobile: 'repeat(2, 1fr)',
            tablet: 'repeat(3, 1fr)',
            desktop: 'repeat(4, 1fr)',
          },
          [`& .${imageListItemClasses.root}`]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {images.map((item) => (
          <ImageListItem key={item.img}>
            <img src={`${item.image}`} alt={item.imageName} loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              position="top"
              actionIcon={
                <Tooltip title="Open image in full size">
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`expand ${item.imageName}`}
                  >
                    <ScreenshotMonitorOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
            />

            <ImageListItemBar
              title={item.imageName}
              actionIcon={
                <Tooltip title="Delete image">
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`delete ${item.imageName}`}
                    onClick={(e) => deleteImage(item.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </ImageListItem>
        ))}
      </Box>
    </ThemeProvider>
  );
};
