import { css } from '@emotion/react'
import Lightbox from 'lightbox-react';
import Image from 'next/image'
import { useCallback, useState } from 'react';

const containerStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
`

export default function TabViewPhoto({
  data
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, [setLightboxOpen]);
  const genOpenLightbox = (index) => () => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  }
  return (
    <div css={containerStyle}>
      { data?.map((e, idx) => (
        <div css={css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc( (100% - 1.5rem) / 3);
          margin: 0.25rem;
          aspect-ratio: 1;
        `} key={idx} onClick={genOpenLightbox(idx)}>
          <Image src={e} layout="fill" alt="image"/>
        </div>
      ))}
      { lightboxOpen &&
        <Lightbox
          mainSrc={data[photoIndex]}
          nextSrc={data[(photoIndex + 1) % data.length]}
          prevSrc={data[(photoIndex + data.length - 1) % data.length]}
          onCloseRequest={closeLightbox}
        />
      }

    </div>
  )
}