import mediumZoom from 'medium-zoom';
import { useRef } from 'react';

function ImageZoom({ zoom, src, alt, background }) {
  const zoomRef = useRef(zoom.clone({ background }));

  function attachZoom(image) {
    zoomRef.current.attach(image);
  }

  return <img src={src} alt={alt} ref={attachZoom} />;
}

export const Zoom = ({ image, alt }) => {
  const zoom = useRef(mediumZoom({ background: '#000' }));

  if (!image) return null;

  return (
    <div>
      <ImageZoom
        src={`${image}?auto=format&fit=crop&w=40&h=25&q=60`}
        alt={alt}
        zoom={zoom.current}
        color="#BADA55"
      />
    </div>
  );
};
