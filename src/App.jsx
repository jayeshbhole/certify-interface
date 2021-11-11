// Imports
import Web3ContextProvider from "./context/Web3Context";
import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PageLoader from "./components/PageLoader";

// Styles
import "./styles/App.scss";

const View = lazy(() => import("./components/View"));
const Create = lazy(() => import("./components/Create"));

const App = () => {
	return (
		<Web3ContextProvider>
			<Navbar />
			<main>
				<Routes>
					<Route path="/">
						<Route
							exact
							path="create"
							element={
								<Suspense fallback={<PageLoader />}>
									<Create />
								</Suspense>
							}
						/>
						<Route
							path="verify"
							element={
								<Suspense fallback={<PageLoader />}>
									<View />
								</Suspense>
							}
						/>
						<Route exact path="" element={<Home />} />
						<Route exact path="loading" element={<PageLoader />} />
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
