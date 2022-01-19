import {sleep} from "./Request";

/**
 * Returns if the environment is a the dev environment.
 *
 * @returns {boolean}
 */
export const isDev = () => window.location.hostname === 'localhost';

/**
 * Makes a request to load all images.
 * The purpose of this is that the image will be cached in the browser for when the user
 * scrolls downs or changes filter.
 *
 * @param gallery
 * @param size
 * @param timeout
 * @param chunkSize
 * @returns {Promise<>}
 */
export const preloadImages = async (gallery, size, timeout = 0, chunkSize) => {
  await sleep(timeout);
  const preloadFetches = [];
  const galleryChunks = chunkArray(gallery, chunkSize);

  console.log(`A total of ${galleryChunks.length} chunks have been found.`);
  for (let i = 0; i < galleryChunks.length; i++) {
    console.log(`Attempting to load ${galleryChunks[i].length} images of size ${size}.`);

    for (let j = 0; j < galleryChunks[i].length; j++) {
      if (!isDev()) {
        preloadFetches.push(fetch(galleryChunks[i][j][size]));
      }
    }

    if (!isDev()) {
      await Promise.allSettled(preloadFetches);
    }
  }
  return new Promise(() => {});
}

export const chunkArray = (array, size) => array.reduce((resultArray, item, index) => {
  const chunkIndex = Math.floor(index / size);

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = []; // start a new chunk
  }
  resultArray[chunkIndex].push(item);
  return resultArray;
}, []);

/**
 * Insert a css link into the head of the body to be loaded.
 *
 * @param id
 * @param href
 */
export const insertCssLink = (id, href) => {
  if (!document.getElementById(id)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
  }
}