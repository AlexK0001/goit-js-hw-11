const apiKey = '44813412-f6fc02e89419494116d973502';

export async function fetchImages(query) {
  const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
