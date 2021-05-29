import './styles.css';
import fetchPictures from './js/apiService'
import galleryMarkup from './templates/gallery.hbs'

import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('[name="query"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  upBtn: document.querySelector('.up-btn'),
  body: document.body,
}

let page = 1;

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  fetchPictures(page, refs.input.value.trim()).then(renderGallery);
});

function renderGallery(data){
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(data.hits));
  refs.loadMoreBtn.classList.add('show');
  refs.upBtn.classList.add('show');

  refs.body.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  });
  
  if (data.hits.length === 0) {
    error({
        text: 'Please enter a valid request',
        delay: 2000,
      });
  }
}

refs.gallery.addEventListener('click', e => {
  const modal =basicLightbox.create(`<div class="modal"><img src=${e.target.dataset.source} width = "1280" height = "700" /></div>`)
  if (e.target.nodeName === 'IMG') {
    modal.show();
  }
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.close();
  };
});
})

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchPictures(page, refs.input.value).then(renderGallery);
})

refs.upBtn.addEventListener('click', () => {
  refs.body.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
  });
})
