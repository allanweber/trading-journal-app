import ImageZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const Zoom = ({ image, alt }) => {
  if (!image) return null;

  return (
    <ImageZoom zoomMargin={40}>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        style={{
          objectFit: 'contain',
          objectPosition: '50% 50%',
          width: '100%',
        }}
      />
    </ImageZoom>
  );
};
