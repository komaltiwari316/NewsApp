const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=fac1aea9d7d146579baf6d7b5942984c`;
const API_KEY = "fac1aea9d7d146579baf6d7b5942984c";
const SEARCH_KEY = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`

const searchbtn = document.getElementById("search-btn");
const searchinput = document.getElementById("search-input");



async function fetchNews(category = '') {
    try {
        let url = BASE_URL;
        if (category) {
            url += `&category=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        const container = document.getElementById('news-container');
        container.innerHTML = '';

        data.articles.forEach(articles => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `<img src="${articles.urlToImage || ''}" alt="News Image" />
                <h3>${articles.title}</h3>
                <p>${articles.description || ''}</p>`
            container.appendChild(card);
        })
    } catch (error) {
        console.log("error fetching news : ", error);
        document.getElementById('news-container').innerHTML = "<p>Error</p>";
    }
}

window.onload = () => {
    fetchNews();

    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            fetchNews(category);
        });
    });
};

async function seacrhnews(query) {
    try {
        const url = `${SEARCH_KEY}&q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();

        const container = document.getElementById('news-container');
        container.innerHTML = '';

        if (data.articles.length === 0) {
            container.innerHTML = "<p>No results found</p>"
        }

        data.articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${article.urlToImage || ''}" alt="News Image" />
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.log("Error searching news: ", error);
        document.getElementById('news-container').innerHTML = "<p>Error loading search results.</p>";
    }
}

searchbtn.addEventListener('click', () => {
    const query = searchinput.value.trim();
    if (query !== '') {
        seacrhnews(query);
    }
})

searchinput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchinput.value.trim();
        if (query !== '') {
            seacrhnews(query);
        }
    }
})