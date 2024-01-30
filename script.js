const NASA_API = 'https://api.nasa.gov';
const apodContainer = document.querySelector('.apod--container');
const spinnerEl = document.querySelector('.spinner');
const imagesContainer = document.querySelector('.images--container');

let imagesLoaded = 10;

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
          </div>
          <button class="btn see-more-button">
            See More
          </button>
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
    const images = imagesData.photos.slice(0, imagesLoaded).map(item => {
      return `
      <div class="image" style="background-image: url('${item.img_src}')"></div>
    `});

    return images;
  }catch(error) {
    console.log(error)
    return `<p>Error loading the images </p>`
  }
}

const loadAPOD = async () => {
  apodContainer.innerHTML = await nasaAPOD();
}

const loadImages = async () => {
  imagesContainer.innerHTML = await nasaImages();
}

document.addEventListener('DOMContentLoaded', loadAPOD);
document.addEventListener('DOMContentLoaded', loadImages);