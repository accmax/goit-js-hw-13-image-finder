import './sass/main.scss';
import cardTmpl from './templates/image-card.hbs';
import PicApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';

const searchForm = document.querySelector('.search-form');
const gallery =  document.querySelector('.gallery');

const picApiService = new PicApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.js-load-btn',
    hidden: true,
});



function onSearch(e) {
    e.preventDefault();
    
    picApiService.query = e.currentTarget.elements.query.value;
    if (picApiService.query === '') {
        return alert('Query can not be empty')
    };
    loadMoreBtn.show();
    picApiService.resetPage();
    picApiService.fetchPic().then(hits => {
        clearGallery();
        renderPicMarkup(hits);
    }).catch(error => console.log(error));
}

function onLoadMore() {
    picApiService.fetchPic().then(renderPicMarkup);
}

function renderPicMarkup(hits) {
    gallery.insertAdjacentHTML('beforeend', cardTmpl(hits));
        gallery.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

function clearGallery() {
    gallery.innerHTML = '';
}

function showLightbox(event) {
    if (event.target.nodeName !== 'IMG') return;
    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.original}" width="800" height="600">
`);

    instance.show();
}

searchForm.addEventListener('submit', onSearch)
loadMoreBtn.btn.addEventListener('click', onLoadMore)
gallery.addEventListener('click', showLightbox)