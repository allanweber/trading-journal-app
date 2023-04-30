import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
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
import { Dialog } from '../../components/dialog/Dialog';
import { Zoom } from '../../components/zoom';
import {
  useDeleteEntryImage,
  useGetEntryImages,
} from '../../services/EntryQueries';
import { EntryImagesCarousel } from './EntryImagesCarousel';

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
  const [openImages, setOpenImages] = useState(false);
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

  const openImage = (index) => {
    setOpenImages(true);
  };

  const closeDialog = () => {
    setOpenImages(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: 300,
            display: 'grid',
            gridTemplateColumns: {
              mobile: 'repeat(1, 1fr)',
              bigMobile: 'repeat(1, 1fr)',
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
            <ImageListItem key={item.image}>
              <Zoom image={item.image} alt={item.imageName} />
              <ImageListItemBar
                position="top"
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
      <Dialog
        open={openImages}
        onClose={closeDialog}
        fullScreen
        icon={<ImageOutlinedIcon />}
      >
        <EntryImagesCarousel />
      </Dialog>
    </div>
  );
};
