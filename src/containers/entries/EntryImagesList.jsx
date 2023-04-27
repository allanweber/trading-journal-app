import { ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetEntryImages } from '../../services/EntryQueries';

export const EntryImagesList = ({ entry }) => {
  const { data } = useGetEntryImages(entry.id);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setImages(data);
    }
  }, [data]);

  return (
    <ImageList cols={2}>
      {images.map((item) => (
        <ImageListItem key={item.imageName}>
          <img src={item.image} alt={item.imageName} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
