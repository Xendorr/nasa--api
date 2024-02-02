const NASA_API = 'https://api.nasa.gov';
const apodContainer = document.querySelector('.apod--container');
const spinnerEl = document.querySelector('.spin-load');
const imagesContainer = document.querySelector('.images--container');
const loadMoreEl = document.querySelector('.load-more-images');

let imagesLoaded = 9;
let isLoading = false;

const nasaAPOD = async () => {
  try {
    const res = await fetch(`${NASA_API}/planetary/apod?api_key=IRJ9BaKnu4GhJczlfOQlfQR3i25K6kCp7U8JG40n`);
    const data = await res.json();
    spinnerEl.style.display = 'none';
    
    return `
      <div class="img-description--container">
        <div class="apod-img--container">
          <div class="apod--img" style="background-image: url('${data.hdurl}')"></div>
        <h2 class="apod--name">${data.title}</h2>
        </div>
        <div class="description">
          <h3> Description </h3>
          <div class="apod-description--container">
            <p class="apod--description">${data.explanation}</p>
            <small class="policy"> Official source: NASA </small>
          </div>
          <a href='https://apod.nasa.gov/apod/astropix.html' class="btn see-more-button">
            See More
          </a>
        </di>
     </div>
    `;
  }
  catch(error) {
    console.error(error);
    return `<p>Error loading the APOD data.</p>`;
  }
}

const nasaImages = async () => {
  try {
    const response = await fetch(`${NASA_API}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=IRJ9BaKnu4GhJczlfOQlfQR3i25K6kCp7U8JG40n`);
    const imagesData = await response.json();

    const images = imagesData.photos.slice(imagesLoaded-9, imagesLoaded).map(item => {
      return `
      <div class="image" style="background-image: url('${item.img_src}')"></div>
    `});

    return images.join('');
  }catch(error) {
    console.log(error)
    return `<p>Error loading the images </p>`
  }
}

const loadMoreImages = async () => {
  if (!isLoading) {
    isLoading = true;
    loadMoreEl.innerHTML = `<div class="spinner"></div>`

    imagesLoaded += 9;
    const newImages = await nasaImages();
    imagesContainer.innerHTML += newImages;
    loadMoreEl.innerHTML = `<p> Scroll down to see more images </p>`

    isLoading = false;
  }
}

const isNearBottom = () => {
  return imagesContainer.scrollTop + imagesContainer.clientHeight >= imagesContainer.scrollHeight - 100; 
}

imagesContainer.addEventListener('scroll', () => {
  if (isNearBottom() && !isLoading) {
    loadMoreImages();
  }

});

const loadAPOD = async () => {
  apodContainer.innerHTML = await nasaAPOD();
}

const loadImages = async () => {
  imagesContainer.innerHTML = await nasaImages();
}

document.addEventListener('DOMContentLoaded', loadAPOD);
document.addEventListener('DOMContentLoaded', loadImages);