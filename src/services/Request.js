import {galleryApi} from "../constants";

/**
 * Make a request to the gallery and organises them by tag name.
 * I.e. tagname => images[]
 *
 * @returns {Promise<>}
 */
export const getGallery = async () => {
  const gallery = await (await fetch(galleryApi)).json();
  return Object.assign({}, ...getGalleryTags().map(tag => ({
    [tag]: gallery.filter(galleryItem => galleryItem.tags.includes(tag))
  })));
}

/**
 * Sleep for a set duration in milliseconds.
 *
 * @param ms
 * @returns {Promise<unknown>}
 */
export const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get a list of gallery tags.
 * This in the future can be connected via API.
 *
 * @returns {string[]}
 */
export const getGalleryTags = () => ['landscape-designs', 'landscaping', 'nightscape-designs'];