const API_KEY = '21977581-8951e1bba4a5f438b1ada470f';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const perPage = 12;

export default class PicApiService {
    constructor(searchQuery) {
        this.page = 1;
        this.searchQuery = searchQuery;
    }
    
    fetchPic() {
        return fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${API_KEY}`)
            .then(response => response.json())
            .then(({hits}) => {
                this.page += 1;
                return hits;
            })
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}