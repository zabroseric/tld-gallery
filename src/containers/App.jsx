import {getGallery} from "../services/Request";
import {useEffect, useState} from "react";
import Image from "../components/Image";
import styled from "styled-components";
import { LightgalleryProvider } from "react-lightgallery";
import { LightgalleryItem } from "react-lightgallery";

const StyledApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyleImage = styled.div`
  width: 100%;
  
  @media (min-width: 576px) {
    width: 50%;
  }
`;

const StyledImageInner = styled.div`
  margin-top: 10px;
  
  @media (min-width: 576px) {
    margin-left: 10px;
  }
`;

function App() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('Landscape Designs');

  useEffect(() => {
    getGallery().then((data) => setGallery(data));

    // Listen to the tabs when clicked.
    const tabs = document.getElementsByClassName('fusion-tabs')[0].getElementsByClassName('tab-link');
    Array.from(tabs).forEach((element) => {
      element.addEventListener('click', (e) =>
        setFilter(JSON.stringify(e.target.textContent.replace(/\s+/, ' '))));
    });
  }, []);

  return (
    <StyledApp>
      <LightgalleryProvider
        lightgallerySettings={
          {
            mode: 'lg-fade',
            cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
            download: false,
            zoom: false,
            fullScreen: false,
            thumbWidth: 85,
            thumbContHeight: 80,
          }
        }>
        {gallery.map(gallery => {
          const srcPreview = gallery.link.replace(/\.([a-z]+)$/i, '-75x51.$1');
          const srcFullScreen = gallery.link.replace(/\.([a-z]+)$/i, '-1100x700.$1');

          return (
            <StyleImage key={gallery.id}>
              <StyledImageInner>
                <LightgalleryItem
                  src={srcFullScreen}
                  thumb={srcPreview}
                >
                  <Image
                    title={gallery.title}
                    caption={gallery.caption}
                    src={gallery.src}
                    srcPreview={srcPreview}
                  />
                </LightgalleryItem>
              </StyledImageInner>
            </StyleImage>
          )
        })}
      </LightgalleryProvider>
    </StyledApp>
  );
}

export default App;
