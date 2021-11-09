// Imports
import Web3ContextProvider from "./context/Web3Context";

// Components

import Navbar from "./components/Navbar";

// Styles
import "./styles/App.scss";

const App = () => {
	return (
		<Web3ContextProvider>
			<Navbar />
			<main>Hello</main>
			<footer>
				<div>BUILT with &lt;3</div>
			</footer>
		</Web3ContextProvider>
	);
};

export default App;
