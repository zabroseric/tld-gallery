import {isWebpSupported} from "react-image-webp/dist/utils";

const galleryUrl = 'https://www.totallookdesign.co.nz/wp-json/wp/v2/envira-gallery';

export const getGallery = async() => {
  const jsonData = await (await fetch(galleryUrl)).json();
  return jsonData[0].gallery_data.gallery
    // Add images of different sizes
    .map((item) => ({
      ...item,
      src: item.src,
      srcPreview: item.link.replace(/\.([a-z]+)$/i, '-75x51.$1'),
      srcFullScreen: item.link.replace(/\.([a-z]+)$/i, '-1100x700.$1'),
    }))
    // // Provide support for webp
    // .map((item) => (!isWebpSupported() ? item : {
    //     ...item,
    //     src: item.src + '.webp',
    //     srcPreview: item.srcPreview + '.webp',
    //     srcFullScreen: item.srcFullScreen + '.webp',
    // }));
}

export const sleep = async(ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}