// Imports
// import { Suspense, lazy } from "react";
import Web3ContextProvider from "./context/Web3Context";

// Components
import UI from "./components/UI";

// Styles
import "./styles/App.scss";

const App = () => {
	return (
		<Web3ContextProvider>
			<main>
				<UI />
			</main>
		</Web3ContextProvider>
	);
};

export default App;
