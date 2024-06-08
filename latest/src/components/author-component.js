class AuthorComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .author {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 16px 0;
          display: flex;
          align-items: center;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 16px;
        }
        .loading {
          display: none;
        }
      </style>
      <div class="author">
        <img src="" class="avatar" alt="Author Avatar" />
        <div class="info">
          <div class="name"></div>
          <div class="birthdate"></div>
          <div class="bio"></div>
        </div>
        <div class="loading">Loading...</div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['name', 'avatar', 'birthdate', 'bio', 'loading'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  set avatar(value) {
    this.setAttribute('avatar', value);
  }

  get birthdate() {
    return this.getAttribute('birthdate');
  }

  set birthdate(value) {
    this.setAttribute('birthdate', value);
  }

  get bio() {
    return this.getAttribute('bio');
  }

  set bio(value) {
    this.setAttribute('bio', value);
  }

  get loading() {
    return this.getAttribute('loading') === 'true';
  }

  set loading(value) {
    this.setAttribute('loading', value);
    this.render();
  }

  render() {
    this.shadowRoot.querySelector('.name').textContent = this.name;
    this.shadowRoot.querySelector('.avatar').src = this.avatar;
    this.shadowRoot.querySelector('.birthdate').textContent = `Birthdate: ${new Date(this.birthdate).toLocaleDateString()}`;
    this.shadowRoot.querySelector('.bio').textContent = this.bio;
    this.shadowRoot.querySelector('.loading').style.display = this.loading ? 'block' : 'none';
    this.shadowRoot.querySelector('.info').style.display = this.loading ? 'none' : 'block';
  }
}

customElements.define('author-component', AuthorComponent);
