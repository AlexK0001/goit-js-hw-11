import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function renderImages(hits) {
  const gallery = document.getElementById('gallery');
  const images = hits.map(hit => `
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

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}
