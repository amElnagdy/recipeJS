import {state, setState} from "../../state";
import fetchRecipe from "../../recipeData";
import fetchVideo from "../../recipeVideos";
import singleRecipe, {removePreviousRecipe} from "../recipeDisplay";
import {videoList} from "../videoList";
import {init as initVideoList} from "../videoList";
import {removeVideos} from "../videoList";

export default function search() {

	return `<div class="ui segment">
	<h1>Search for a Recipe</h1>
    <form name="search" id="search" class="ui form">
      <p><label for="search-field">Enter Search Term Below:</label></p>
      <input id="search-field" name="search" type="search" />
      <input type="submit" id="submit" value="Search" />
    </form></div>`
}

export function init() {
	const search = document.querySelector(`#search`);
	search.addEventListener(`submit`, doSearch);
}

async function doSearch(e) {
	e.preventDefault();
	removePreviousRecipe();
	removeVideos();
	const term = document.querySelector(`#search-field`).value.toLowerCase();
	setState(`searchTerm`, term);

	let [recipe, videos] = await Promise.all([fetchRecipe(), fetchVideo()]);
	setState(`recipe`, recipe);
	setState(`videos`, videos);
	setState(`video`, videos[0]); // Assign the first video to state.video

	//Display Recipe
	const markup = singleRecipe();
	document.querySelector(`#app`).insertAdjacentHTML(`beforeend`, markup);

	// Videos:
	const videoMarkup = videoList();
	document.querySelector(`#videos`).insertAdjacentHTML(`beforeend`, videoMarkup);
	initVideoList();
}