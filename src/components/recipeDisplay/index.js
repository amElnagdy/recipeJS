import {state} from "../../state";
import {playDefVideo} from "../videoList";

export default function singleRecipe() {
	const recipe = state.recipe.recipe;
	let markup = `
<div id="recipe" class="ui items">
  <div class="item">
    <a class="ui small image">
      <img src="${recipe.image}" alt="${recipe.label}" />
    </a>
    <div class="content">
      <h2 class="ui header">${recipe.label}</h2>
      <div class="description">
      <ul>`;
	const description = recipe.ingredientLines;
	description.forEach(des => (
			markup += `<li>${des}</li>`
		)
	);
	markup += `</ul>
      </div>
    </div>
  </div>
  <button class="load-videos ui button">Load Videos</button>
</div>
`;
	return markup;
}

export function recipeDetails() {
	const recipe = state.recipe.recipe;
const markup = `
<h2 class="ui header">Nutrition Facts</h2>
<table class="ui celled table">
  <thead>
    <tr><th>Calories</th>
    <th>Fat</th>
    <th>Sugar</th>
  </tr></thead>
  <tbody>
    <tr>
      <td data-label="calroeis">${parseInt(recipe.calories)}</td>
      <td data-label="fat">${parseInt(recipe.totalNutrients.FAT.quantity)}</td>
      <td data-label="sugare">${parseInt(recipe.totalNutrients.SUGAR.quantity)}</td>
    </tr>
  </tbody>
</table>`;

return markup;
}


export function removePreviousRecipe() {
const recipeContainer = document.querySelector(
`#recipe`
);
if (recipeContainer) recipeContainer.remove();

	const recipeDetailsContainer = document.querySelector(
		`#details`
	);
	if (recipeDetailsContainer) recipeDetailsContainer.innerHTML=``;
}

export function loadVideosClick() {
const button = document.querySelector(`.load-videos`);
button.addEventListener(`click`, loadVideos);
button.addEventListener(`click`, playDefVideo)
}

function loadVideos() {
const videosDiv = document.querySelector(`#videos-container`)
		videosDiv.classList.toggle(`hidden`);
}