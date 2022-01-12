import {getGallery, getGalleryTags} from "../services/Request";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {preloadImages} from "../services/Utils";
import {Redirect, Route, useHistory} from "react-router-dom";
import {AnimatedSwitch, spring} from 'react-router-transition';
import Gallery from "./Gallery";
import {galleryPreloadTimeout} from "../constants";

const StyledApp = styled.div`
`;

function App() {
  const [gallery, setGallery] = useState([]);
  const history = useHistory();

  const getFilter = () => history.location.pathname.replace('/', '');
  const getGalleryCurrent = () => gallery[getFilter()];
  const getGalleryAll = () => [].concat.apply([], Object.values(gallery));


  useEffect(() => {
    getGallery()
      .then(data => setGallery(data))
      .catch(e => console.warn(e));

    // Listen to the tabs when clicked.
    const tabs = document.getElementsByClassName('fusion-tabs')[0].getElementsByClassName('tab-link');
    Array.from(tabs).forEach((element) => {
      element.addEventListener('click', (e) => {
        history.push('/' + e.target.textContent.replace(/\s+/, '-').toLowerCase());
        e.preventDefault();
      });

    });
  }, []);

  useEffect(() => {
    if ( gallery.length !== 0 ) {
      preloadImages(getGalleryAll(), 'srcLarge', galleryPreloadTimeout)
        .catch(e => console.warn(e));
    }
  }, [gallery, history]);

  return (
    <StyledApp>
      <AnimatedSwitch
        atEnter={{
          transitionIndex: 0,
          offset: 2,
          opacity: 0.7
        }}
        atLeave={{
          offset: spring(-10),
          opacity: spring(0),
          transitionIndex: 2
        }}
        atActive={{
          offset: spring(0),
          opacity: spring(1),
          transitionIndex: 1
        }}
        mapStyles={(styles) => ({
          position: styles.transitionIndex <= 1 ? 'relative' : 'absolute',
          display: styles.transitionIndex <= 1 ? 'block' : 'none',
          width: '100%',
          height: '100%',
          transform: `translateX(${styles.offset}%)`,
          opacity: styles.opacity,
        })}
      >
        <Route exact path="/">
          <Redirect to={'/' + getGalleryTags()[0]}/>
        </Route>
        {Object.keys(gallery).map((key) => (
          <Route key={key} path={'/' + key}>
            <Gallery images={gallery[key]}/>
          </Route>
        ))}
      </AnimatedSwitch>
    </StyledApp>
  );
}

export default App;