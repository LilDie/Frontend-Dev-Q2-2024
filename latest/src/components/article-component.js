class ArticleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
        .article {

          background-color: #e8e3e3;
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
           width: 300px; /* Ancho fijo */
          height: 500px; /* Altura fija */
          overflow: hidden; /* Ocultar contenido que exceda los límites */
          max-width: 300px; /* Ajusta el ancho máximo para hacer el artículo más vertical */
          margin: 0 auto; /* Centra el artículo horizontalmente */
        }

        .title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          text-align: center;
        }

        .company {
          font-size: 14px;
          margin-bottom: 8px;
          text-align: center;
        }

        .author-button {
          padding: 8px 16px;
          font-size: 14px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }

        .author-button:hover {
          background-color: #0056b3;
        }

        .image {
          width: 100%;
          height: auto;
          max-width: 200px;
          max-height: 150px;
          object-fit: cover;
          margin-bottom: 10px;
        }

        .description {
          text-align: center;
          margin-bottom: 10px;
        }

        .content {
          display: none;
          text-align: center;
        }

        .more-info-button {
          cursor: pointer;
          color: #007bff;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .author-details {
          display: none;
          text-align: center;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 10px;
        }

        .author-bio, .author-birthdate {
          font-size: 14px;
        }
      </style>
      <div class="article">
        <img src="" class="image" alt="Article Image" />
        <div class="title"></div>
        <div class="company"></div>
        <div class="description"></div>
        <div class="more-info-button"><strong>Mostrar más</strong></div>
        <div class="content"></div>
        <button class="author-button">Autor</button>
        <div class="author-details">
          <img src="" class="author-avatar" alt="Author Avatar" />
          <div class="author-bio"></div>
          <div class="author-birthdate"></div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.more-info-button').addEventListener('click', () => {
      const content = this.shadowRoot.querySelector('.content');
      const button = this.shadowRoot.querySelector('.more-info-button');
      if (content.style.display === 'none') {
        content.style.display = 'block';
        button.innerHTML = '<strong>Mostrar menos</strong>'; // Cambia el texto del botón a "Mostrar menos"
      } else {
        content.style.display = 'none';
        button.innerHTML = '<strong>Mostrar más</strong>'; // Cambia el texto del botón a "Mostrar más"
      }
    });

    this.shadowRoot.querySelector('.author-button').addEventListener('click', async (event) => {
      event.stopPropagation();
      await this.toggleAuthorInfo();
    });
  }

  async toggleAuthorInfo() {
    const authorDetailsElement = this.shadowRoot.querySelector('.author-details');
    if (authorDetailsElement.style.display === 'flex') {
      authorDetailsElement.style.display = 'none';
      return;
    }
    const response = await fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/users/${this.author}`);
    const author = await response.json();
    this.shadowRoot.querySelector('.author-avatar').src = author.avatar;
    this.shadowRoot.querySelector('.author-bio').textContent = `Bio: ${author.bio}`;
    this.shadowRoot.querySelector('.author-birthdate').textContent = `Fecha de nacimiento: ${new Date(author.birthdate).toLocaleDateString()}`;
    authorDetailsElement.style.display = 'flex';
  }

  static get observedAttributes() {
    return ['title', 'image', 'company', 'description', 'content', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    this.shadowRoot.querySelector('.title').textContent = value;
    this.setAttribute('title', value);
  }

  get image() {
    return this.getAttribute('image');
  }

  set image(value) {
    this.shadowRoot.querySelector('.image').src = value;
    this.setAttribute('image', value);
  }

  get company() {
    return this.getAttribute('company');
  }

  set company(value) {
    this.shadowRoot.querySelector('.company').textContent = `Company: ${value}`;
    this.setAttribute('company', value);
  }

  get description() {
    return this.getAttribute('description');
  }

  set description(value) {
    this.shadowRoot.querySelector('.description').textContent = value;
    this.setAttribute('description', value);
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(value) {
    this.shadowRoot.querySelector('.content').textContent = value;
    this.setAttribute('content', value);
  }

  get author() {
    return this.getAttribute('author');
  }

  set author(value) {
    this.setAttribute('author', value);
  }

  render() {
    // No es necesario llamar a render de nuevo para cada cambio de atributo, ya que los setters actualizan el DOM.
  }
}

customElements.define('article-component', ArticleComponent);
