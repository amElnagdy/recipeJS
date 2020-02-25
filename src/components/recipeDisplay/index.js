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
      <a class="header">${recipe.label}</a>
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


export function removePreviousRecipe() {
const recipeContainer = document.querySelector(
`#recipe`
);
if (recipeContainer) recipeContainer.remove();
}

export function loadVideosClick() {
const button = document.querySelector(`.load-videos`);
button.addEventListener(`click`, loadVideos);
button.addEventListener(`click`, playDefVideo)
}

function loadVideos() {
const videosDiv = document.querySelector(`.hidden`)
		videosDiv.classList.toggle(`hidden`)
}