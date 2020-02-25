const state = {
	searchTerm: null,
	recipe: null,
	videos: null,
	video: null,
};

function setState(toSet, newValue) {
	state[toSet] = newValue;
}

export {state, setState};