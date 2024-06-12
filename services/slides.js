const {google} = require('googleapis');

async function getSlides(auth,id) {
  const slidesApi = google.slides({version: 'v1', auth});
  const res = await slidesApi.presentations.get({
    presentationId: id,
  });
  const slides = res.data.slides;
  if (!slides || slides.length === 0) {
    console.log('No slides found.');
    return;
  }
  return slides;
}

module.exports = {getSlides};