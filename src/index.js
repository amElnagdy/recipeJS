import search, {init as initSearch} from "./components/search";

function init() {
let markup = search();
document.querySelector(`#main`).insertAdjacentHTML(`afterbegin`, markup);
initSearch()
}
init();
