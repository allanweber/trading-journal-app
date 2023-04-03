import { Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Zoom } from '../../components/zoom';
import { useJournalContext } from '../../context/JournalContext';
import { useAccessTokenState } from '../../context/UserContext';
import { getEntryImage } from '../../services/Entry';

const PreviewContainer = styled('div')`
  img {
    max-width: 130px;
    max-height: 130px;
  }
  img:hover {
    opacity: 0.8;
  }
`;

export const EntryImagesPreview = ({ entry, reload }) => {
  const { journal } = useJournalContext();
  const accessToken = useAccessTokenState();

  const [imageBefore, setImageBefore] = useState();
  const [imageAfter, setImageAfter] = useState();
  const [hasAnyImage, setHasAnyImage] = useState(false);

  useEffect(() => {
    getEntryImage(accessToken, journal.id, entry.id, 'IMAGE_BEFORE').then(
      (resp) => setImageBefore({ image: resp.image, alt: 'Image at start' })
    );
    getEntryImage(accessToken, journal.id, entry.id, 'IMAGE_AFTER').then(
      (resp) => setImageAfter({ image: resp.image, alt: 'Image at the end' })
    );
  }, [journal, entry, accessToken, reload]);

  useEffect(() => {
    if (imageBefore || imageAfter) {
      setHasAnyImage(true);
    }
  }, [imageBefore, imageAfter]);

  if (hasAnyImage) {
    return (
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
    );
  }

  return <div>EntryImagesPreview</div>;
};
