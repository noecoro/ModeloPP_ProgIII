import { Serie } from "./serie.js";

let pagina = 0;
const seriesPorPagina = 6;
const divSeries = document.getElementById("series");
/**
 * Carga y muestra una pgina de 6 series desde la API de TVMaze
 * Reemplaza el contenido del contenedor `divSeries` con los resultados obtenidos.
 * 
 * @async
 * @param {number} pagina - Nro de pagina que se desea cargar (comienza desde 0).
 * @returns {Promise<void>}
 */
async function cargarSeries(pagina) {
  divSeries.replaceChildren("Cargando...");
  const inicio = pagina * seriesPorPagina + 1;
  const seriesElements = [];

  for (let i = inicio; i < inicio + seriesPorPagina; i++) {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${i}`);
      if (response.status === 404) {
        console.log("No se encuentra la serie con el ID " + i);
        continue;
      }
      const serieAPI = await response.json();
      const serie = new Serie(
        serieAPI.id,
        serieAPI.url,
        serieAPI.name,
        serieAPI.language,
        serieAPI.genres,
        serieAPI.image?.medium || ""
      );
      const htmlSerie = serie.createHtmlElement(true);
      seriesElements.push(htmlSerie);
    } catch (err) {
      //*********+++ */
      console.log("Error desconocido al traer el ID " + i, err);
    }
  }
  divSeries.replaceChildren(...seriesElements);
}
/**
 * Avanza a la siguiente pagina de resultados y actualiza las series mostradas.
 * Llama internamente a la función cargarSeries(pagina).
 */
function paginaSiguiente() {
  pagina++;
  cargarSeries(pagina);
}
/**
 * Retrocede a la pagina anterior (si la pagina actual es mayor a 0)
 * y actualiza las series mostradas.
 */
function paginaAnterior() {
  if (pagina > 0) {
    pagina--;
    cargarSeries(pagina);
  }
}
cargarSeries(pagina);
// c. Asignar los métodos creados a los botones con ids “anterior” y “siguiente”. ////Botones de navegación
/** C
 * Asigna las funciones `paginaSiguiente` y `paginaAnterior`
 * a los botones con IDs "siguiente" y "anterior" en el DOM.
 * 
 * Este metodo se debe ejecutar luego de que el DOM este cargado.
 */
function asignarMetodos() {
  const btnSiguiente = document.getElementById("siguiente");
  const btnAnterior = document.getElementById("anterior");
  btnSiguiente.onclick = paginaSiguiente;
  btnAnterior.onclick = paginaAnterior;
}
asignarMetodos();
