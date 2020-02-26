import {setState} from "../../state";
import fetchRecipe from "../../recipeData";
import fetchVideo from "../../recipeVideos";
import singleRecipe, {recipeDetails, removePreviousRecipe} from "../recipeDisplay";
import {videoList, removeVideos, init as initVideoList} from "../videoList";
import {loadVideosClick} from "../recipeDisplay";


export default function search() {

	return `<div class="ui segment">
	<h1>Search for a Recipe</h1>
    <form name="search" id="search" class="ui form">
    <div class="field">
      <label for="search-field">Enter Search Term Below:</label>
      <input id="search-field" name="search" type="search" />
      </div>
      <input class="ui button" type="submit" id="submit" value="Search" />
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

	//fix videos list keep showing while doing another search
	const videosDiv = document.querySelector(`#videos-container`)
	if (!videosDiv.classList.contains(`hidden`)) videosDiv.classList.add(`hidden`);

	const term = document.querySelector(`#search-field`).value.toLowerCase();
	setState(`searchTerm`, term);

	loadSpinner();

	let [recipe, videos] = await Promise.all([fetchRecipe(), fetchVideo()]);
	if (recipe)
	{setState(`recipe`, recipe);}
	setState(`videos`, videos);
	setState(`video`, videos[0]); // Assign the first video to state.video


	removeSpinner();

	//Display Recipe

	if (recipe != null) {
		const markup = singleRecipe();
		const recipeDetailsMarkup = recipeDetails();
		// document.querySelector(`#app`).insertAdjacentHTML(`beforeend`, markup);
		document.querySelector(`#app`).innerHTML = markup;
		document.querySelector(`#details`).innerHTML = recipeDetailsMarkup;


	//Display a button to load videos
	loadVideosClick();}

	// Videos:
	const videoMarkup = videoList();
	document.querySelector(`#videos`).insertAdjacentHTML(`beforeend`, videoMarkup);
	initVideoList();
}

function loadSpinner() {

	const markup = `<div id="spinner">
  <div class="ui inverted active dimmer">
    <div class="ui massive text loader">Fetching your recipe..</div>
  </div>
  <p></p>
  <p></p>
  <p></p>
</div>`
	document.querySelector(`#main`).insertAdjacentHTML(`beforeend`, markup);

}

function removeSpinner() {
	const spinner = document.querySelector(`#spinner`);
	spinner.remove();

}