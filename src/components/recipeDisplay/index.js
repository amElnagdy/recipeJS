import {state} from "../../state";

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