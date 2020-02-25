import {state, setState} from "../../state";
import './index.css'

export function videoList() {
	const videos = state.videos;

	let markup = `<div id="video-list" class="ui relaxed divided list">`;
	videos.forEach(video => {
		markup += `
	<div class="video-item item" data-id="${video.id.videoId}">
	<img class="ui image" src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" />
	<div class="content">
	<div class="header">
	${video.snippet.title}
	</div>
</div>
</div>
	`
	});
	markup += `</div>`;
	return markup;
}

export function init() {
	const videos = Array.from(document.querySelectorAll(`#video-list .item`));

	videos.forEach(video => {
			video.addEventListener(`click`, openVideo)
		}
	)
}

function openVideo(e) {
	e.preventDefault();
	const videoToPlayId = this.dataset.id;
	const videoToPlay = state.videos.filter(video => videoToPlayId == video.id.videoId)[0];
	setState(`video`, videoToPlay);

	let markup = `<div id="video-player">
<iframe width="720px" height="420px" src="https://www.youtube.com/embed/${videoToPlay.id.videoId}" /></div>`

	markup += `
<div class="ui segment"><h2 class="ui header">${videoToPlay.snippet.title}</h2>
<p>${videoToPlay.snippet.description}</p></div>`;

	const container = document.querySelector(`#selected-video`);
	container.innerHTML = markup;

}

export function removeVideos() {
	const videoPlayer = document.querySelector(
		`#video-player`
	);
	const videoList = document.querySelector(
		`#video-list`
	);
	if (videoList) videoList.remove();
	if (videoPlayer) videoPlayer.remove();

}