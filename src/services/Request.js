
const galleryUrl = 'https://www.totallookdesign.co.nz/wp-json/wp/v2/envira-gallery';

export const getGallery = async() => {
  const jsonData = await (await fetch(galleryUrl)).json();
  return jsonData[0].gallery_data.gallery.map((item) => ({
    ...item,
    srcPreview: item.link.replace(/\.([a-z]+)$/i, '-75x51.$1'),
    srcFullScreen: item.link.replace(/\.([a-z]+)$/i, '-1100x700.$1'),
  }));
}

export const sleep = async(ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}