/**
 * Clase que representa una serie
 */
export class Serie {
  id;
  url;
  name;
  language;
  genres;
  image;
/**
   * Constructor de la clase Serie.
   * 
   * @param {number} id - ID unico de la serie
   * @param {string} url - URL de la serie
   * @param {string} name - Nombre de la serie
   * @param {string} language - Idioma original de la serie
   * @param {string[]} genres - Lista de generos de la serie
   * @param {string} image - URL de la imagen representativa
   */
  constructor(id, url, name, language, genres, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.image = image;
  }
   /**
   * Convierte la instancia actual a un string JSON.
   * 
   * @returns {string} Representación JSON de la serie.
   */
  toJsonString() {
    return JSON.stringify(this);
  }
  /**
   * Crea una instancia de Serie a partir de un string JSON.
   * 
   * @param {string} json - String con formato JSON que representa una serie.
   * @returns {Serie} Instancia de la clase Serie.
   */
  static createFromJsonString(json) {
    const decoded = JSON.parse(json); 
    return new Serie(
      decoded.id,
      decoded.url,
      decoded.name,
      decoded.language,
      decoded.genres,
      decoded.image
    );
  }
 /**
   * Crea un elemento HTML para mostrar la serie como una tarjeta.
   * 
   * @param {boolean} [isGuardados=true] - Si es `true`, se muestra el boton de guardar
   * @returns {HTMLElement} Elemento HTML representando la serie
   */
createHtmlElement(isGuardados = true) {
    const container = document.createElement("div");
    container.classList.add("card", "h-100", "shadow-sm");
    //arma el template
    let card = `
      <a href="${this.url}" target="_blank">
        <img src="${this.image}" class="card-img-top" alt="${this.name}">
      </a>
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text"><strong>Language:</strong> ${this.language}</p>
        <p class="card-text"><strong>Genres:</strong> ${this.genres.join(
          ", "
        )}</p>
        ${
          isGuardados
            ? `<button class="btn btn-primary guardar-btn">Guardar</button>`
            : ""
        }
      </div>
    `;
    container.insertAdjacentHTML("afterbegin", card);

    if (isGuardados) {
      const btn = container.querySelector(".guardar-btn");
      btn.addEventListener("click", () => {
        const clave = "seriesGuardadas";
        let guardadas = JSON.parse(localStorage.getItem(clave)) || [];

        const yaExiste = guardadas.some((s) => s.id === this.id);

       /* if (yaExiste) {
          alert("Esta serie ya fue guardada");*/
          if (yaExiste) {
  alert(`La serie "${this.name}" ya fue guardada`);


        } else {
          Serie.guardarSerie(this);
        }
      });
    }
    return container;
  }
   /**
   * Guarda la serie en el localStorage, si no fue guardada previamente.
   * 
   * @param {Serie} serie - Instancia de Serie a guardar.
   */
  static guardarSerie(serie) {
    let seriesGuardadas = "seriesGuardadas";
    let guardadas = JSON.parse(localStorage.getItem(seriesGuardadas)) || [];
   
    const yaExiste = guardadas.some((s) => s.id === serie.id);

    if (yaExiste) return;

    guardadas.push(JSON.parse(serie.toJsonString()));
    localStorage.setItem(seriesGuardadas, JSON.stringify(guardadas));
  }
}
