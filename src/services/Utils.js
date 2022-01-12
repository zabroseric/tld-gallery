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
 * @param gallerySingle
 * @param size
 * @param timeout
 * @returns {Promise<>}
 */
export const preloadImages = async (gallerySingle, size, timeout = 0) => {
  await sleep(timeout);
  console.log(`Attempting to load ${gallerySingle.length} images of size ${size}.`);

  if (isDev()) { return; }
  const preloadFetches = [];
  for (let i = 0; i < gallerySingle.length; i++) {
    preloadFetches.push(fetch(gallerySingle[i][size]));
  }
  return Promise.allSettled(preloadFetches);
}