class ArticlesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
   <style>
  .articles-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Dos columnas con el mismo ancho */
    gap: 50px; /* Espacio entre las columnas */
  }
</style>
<div class="articles-list"></div>

    `;
  }

  get articles() {
    return this._articles || [];
  }

  set articles(value) {
    this._articles = value;
    this.render();
  }

  render() {
    const listElement = this.shadowRoot.querySelector('.articles-list');
    listElement.innerHTML = '';
    this.articles.forEach(article => {
      const articleElement = document.createElement('article-component');
      articleElement.title = article.title;
      articleElement.image = article.image;
      articleElement.company = article.company;
      articleElement.description = article.description;
      articleElement.content = article.content;
      articleElement.author = article.author;
      listElement.appendChild(articleElement);
    });
  }

  search(query) {
    this.articles = this.articles.filter(article =>
      article.title.includes(query) ||
      article.company.includes(query) ||
      article.description.includes(query)
    );
  }

  sort(by, order = 'asc') {
    this.articles = this.articles.sort((a, b) => {
      if (a[by] < b[by]) return order === 'asc' ? -1 : 1;
      if (a[by] > b[by]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

customElements.define('articles-list', ArticlesList);
