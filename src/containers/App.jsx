import {getGallery, sleep} from "../services/Request";
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

  const preloadImages = async () => {
    if ( window.location.hostname === 'localhost' ) {
      return;
    }

    for ( let i = 0; i < gallery.length; i++ ) {
      console.log(`Loading image ${i+1} of ${gallery.length}`);
      try {
        await fetch(gallery[i].srcFullScreen);
      } catch (e) {
        console.warn(e);
      } finally {
        await sleep(200);
      }
    }
  }

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
        lightgallerySettings={{
          mode: 'lg-fade',
          cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
          download: false,
          zoom: false,
          fullScreen: false,
          thumbWidth: 85,
          thumbContHeight: 80,
        }}
        onAfterOpen={preloadImages}
        >
        {gallery.map(gallery => (
            <StyleImage key={gallery.id}>
              <StyledImageInner>
                <LightgalleryItem
                  src={gallery.srcFullScreen}
                  thumb={gallery.srcPreview}
                >
                  <Image
                    title={gallery.title}
                    caption={gallery.caption}
                    src={gallery.src}
                    srcPreview={gallery.srcPreview}
                  />
                </LightgalleryItem>
              </StyledImageInner>
            </StyleImage>
        ))}
      </LightgalleryProvider>
    </StyledApp>
  );
}

export default App;
