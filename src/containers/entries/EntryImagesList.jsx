import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import { Zoom } from '../../components/zoom';
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
  const { data: images } = useGetEntryImages(entry.id);
  const mutation = useDeleteEntryImage(entry.id);
  const deleteConfirmation = useConfirmationModal();

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
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              mobile: 'repeat(1, 1fr)',
              bigMobile: 'repeat(1, 1fr)',
              tablet: 'repeat(2, 1fr)',
              desktop: 'repeat(3, 1fr)',
            },
            [`& .${imageListItemClasses.root}`]: {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {images &&
            images.map((item) => (
              <ImageListItem key={item.image}>
                <Zoom image={item.image} alt={item.imageName} />
                <ImageListItemBar
                  position="top"
                  actionIcon={
                    <Tooltip title="Delete image">
                      <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`delete ${item.imageName}`}
                        onClick={() => deleteImage(item.id)}
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
    </div>
  );
};
