
const galleryUrl = 'https://www.totallookdesign.co.nz/wp-json/wp/v2/envira-gallery';

export const getGallery = async () => {
  const jsonData = await (await fetch(galleryUrl)).json();
  return jsonData[0].gallery_data.gallery;
}