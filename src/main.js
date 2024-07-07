import { fetchImages } from './pixabay-api';
import { renderImages, showError } from './render-functions';

const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchQuery.value.trim();
  if (query === '') {
    showError('Search query cannot be empty');
    return;
  }

  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query);
    loader.style.display = 'none';
    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(data.hits);
    }
  } catch (error) {
    loader.style.display = 'none';
    console.error('Error fetching images:', error);
    showError('An error occurred while fetching images');
  }
});
