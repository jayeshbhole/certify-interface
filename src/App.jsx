// Imports
import Web3ContextProvider from "./context/Web3Context";
import { Routes, Route, Navigate } from "react-router";

// Components
import Navbar from "./components/Navbar";
import Verify from "./components/Verify";
import View from "./components/View";
import Create from "./components/Create";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// Styles
import "./styles/App.scss";

const App = () => {
	return (
		<Web3ContextProvider>
			<Navbar />

			<main>
				<Routes>
					<Route path="/">
						{/* <Route exact path="verify" element={<Verify />} /> */}
						<Route exact path="create" element={<Create />} />
						<Route path="verify" element={<View />} />
						<Route exact path="" element={<Home />} />
						<Route exact path="404" element={<NotFound />} />
						<Route path="*" element={<Navigate to="/404" />} />
					</Route>
				</Routes>
			</main>

			<footer>
				<div>Certify - BUILT with &lt;3</div>
			</footer>
		</Web3ContextProvider>
	);
};

export default App;
