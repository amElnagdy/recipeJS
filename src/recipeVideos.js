import {state} from "./state";

export default function fetchVideo() {

	const YT_API_KEY = `AIzaSyAGe_FTMQJMizv6xwYFLtW-beRGMidEzlE`;
	const type = `video`;
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${YT_API_KEY}&q=${state.searchTerm}%20recipe`;

	return fetch(url)
		.then(res => res.json())
		.then(data => data.items)
		.catch(err => console.log(err));
}