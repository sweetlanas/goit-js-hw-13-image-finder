const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '21791415-70447a487e3815c3062bfeb69'

function fetchPictures(page, searchQuery) {
  return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
};

export default fetchPictures ;
