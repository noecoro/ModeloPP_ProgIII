import { Serie } from "./serie.js";

const divSeries = document.getElementById("series");
const btnOrdenarNombre = document.getElementById("ordenar-nombre");
const btnOrdenarId = document.getElementById("ordenar-id");
let seriesGuardadas = [];

/**
 * Carga las series guardadas desde el localStorage.
 * Si no hay ninguna serie guardada, muestra un mensaje indicando que no hay datos guardso.
 * Las series se convierten desde JSON a instancias de la clase `Serie` y se muestran en pantalla.
 */
function cargarGuardadas() {
  const json = localStorage.getItem("seriesGuardadas");
  //if (!json) return;
  if (!json || JSON.parse(json).length === 0) {
    divSeries.innerHTML = `<p class="text-center text-muted">No hay series guardadas.</p>`;
    return;
  }
  const lista = JSON.parse(json);
  seriesGuardadas = lista.map((s) =>
    Serie.createFromJsonString(JSON.stringify(s))
  );
  mostrarSeries(seriesGuardadas);
}

/**
 * Muestra en pantalla una lista de objetos `Serie`.
 * Renderiza cada serie como una tarjeta HTML y la agrega al contenedor principal.
 *
 * @param {Serie[]} lista - Lista de objetos Serie a mostrar en el DOM.
 */
function mostrarSeries(lista) {
  divSeries.innerHTML = "";
  lista.forEach((serie) => {
    const html = serie.createHtmlElement(false);
    divSeries.appendChild(html);
  });
}
/**
 * Ordena la lista de series guardadas por nombre a-z
 * y las muestra en pantalla.
 */
btnOrdenarNombre.onclick = () => {
  const ordenadas = [...seriesGuardadas].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  mostrarSeries(ordenadas);
};

/**
 * Ordena la lista de series guardadas por ID de forma ascendente
 * y las muestra en pantalla.
 */
btnOrdenarId.onclick = () => {
  const ordenadas = [...seriesGuardadas].sort((a, b) => a.id - b.id);
  mostrarSeries(ordenadas);
};

// Cargar al abrir
cargarGuardadas();
