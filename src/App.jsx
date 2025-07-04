import Terminal from "./components/Terminal.jsx";
import WebApp from "./components/WebApp.jsx";

export default function App(){
	if (localStorage.getItem('preferredUI') === null) 	localStorage.setItem('preferredUI' , 'Terminal');
	const preferredUI = localStorage.getItem('preferredUI');

	return (
		preferredUI === 'Terminal' ? <Terminal /> : <WebApp />	
	)
}