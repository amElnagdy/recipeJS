import search, {init as initSearch} from "./components/search";

function init() {
let markup = search();
document.querySelector(`#app`).insertAdjacentHTML(`beforeend`, markup);
initSearch()
}
init();
