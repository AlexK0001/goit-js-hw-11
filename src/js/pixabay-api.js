import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = '44813412-f6fc02e89419494116d973502';
const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchQuery.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty'
    });
    return;
  }

  gallery.innerHTML = '';
  loader.style.display = 'block';

  fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!'
        });
      } else {
        const images = data.hits.map(hit => `
          <a href="${hit.largeImageURL}" class="gallery-item">
            <img src="${hit.webformatURL}" alt="${hit.tags}">
            <div>Likes: ${hit.likes}, Views: ${hit.views}, Comments: ${hit.comments}, Downloads: ${hit.downloads}</div>
          </a>
        `).join('');
        gallery.innerHTML = images;

        const lightbox = new SimpleLightbox('.gallery-item', {
          captionsData: 'alt',
          captionDelay: 250,
        });
        lightbox.refresh();
      }
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images'
      });
    });
});
