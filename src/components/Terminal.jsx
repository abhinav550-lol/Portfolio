import { useEffect, useRef, useState } from "react";

const commandMap = {
	help : <div>Hello</div>,
	error : <div>Command not recognized by the program.</div>
};

export default function Terminal() {
	const inputRef = useRef(null);
	const [terminalHistory , setTerminalHistory] = useState([]);

	function handleCommand(e){
		if(e.key === 'Enter'){
			const currCommand = e.target.value;
			e.target.value = "";
			
			switch(currCommand){
				case 'h':
				case 'help' : 
				setTerminalHistory((oldHistory) => [...oldHistory , 'help']);
				break;
				
				case 'clear':
				case 'cls':
				setTerminalHistory([]);
				break;
				
				default : 
				setTerminalHistory((oldHistory) => [...oldHistory , 'error']);
			}
		}
	}

	useEffect(() => {
		const commandInput = inputRef.current;
		if (commandInput) {
			commandInput.focus();
			const keepFocus = () => commandInput.focus();
			commandInput.addEventListener('blur', keepFocus);
			return () => {
				commandInput.removeEventListener('blur', keepFocus);
			};
		}
	}, []);

	return (
		<div className="font-term flex justify-center w-screen h-screen flex-col">
			<div className="terminalBox w-full border-b border-b-[#199819] h-11/12 overflow-y-auto">
				{terminalHistory.map((command) => {
					console.log(1);
					return commandMap[command];
				})}
			</div> 
			<div className="controls h-1/12 w-full  grid grid-cols-24 items-center  text-2xl ">
				<span className="col-span-1 grid place-content-center">&gt;</span>
				<input type="command-input"
					ref={inputRef}
					onKeyDown={handleCommand}
					id="commandInput" className="h-full col-span-23 focus:outline-none focus:border-transparent" />
			</div>
		</div>
	)
}