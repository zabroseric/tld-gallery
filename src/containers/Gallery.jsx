import React from 'react';
import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";
import Image from "../components/Image";
import styled from "styled-components";
import {preloadImages} from "../services/Utils";
import {lightboxPreloadChunkSize, lightboxPreloadTimeout} from "../constants";

const StyledGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: -5px;
  margin-left: -5px;
`

const StyleImage = styled.div`
  width: 100%;

  @media (min-width: 576px) {
    width: 50%;
  }
`;

const StyledImageInner = styled.div`
  margin-top: 10px;

  @media (min-width: 576px) {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const Gallery = ({images}) => (
  <StyledGallery>
    <LightgalleryProvider
      lightgallerySettings={{
        mode: 'lg-fade',
        cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        download: false,
        zoom: false,
        fullScreen: false,
        thumbWidth: 85,
        thumbContHeight: 80,
      }}
      onAfterOpen={() => preloadImages(images, 'src', lightboxPreloadTimeout, lightboxPreloadChunkSize)}
    >
      {images.map(image => (
        <StyleImage key={image.id}>
          <StyledImageInner>
            <LightgalleryItem
              src={image.src}
              thumb={image.srcThumb}
              group="any"
            >
              <Image
                title={image.title}
                caption={image.caption}
                src={image.srcLarge}
                srcPreview={image.srcThumb}
              />
            </LightgalleryItem>
          </StyledImageInner>
        </StyleImage>
      ))}
    </LightgalleryProvider>
  </StyledGallery>
);

export default Gallery;