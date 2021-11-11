import ComponentLoaderSVG from "../assets/loading.svg";

const ComponentLoader = () => {
	return (
		<div>
			<div className="component-loader">
				<img src={ComponentLoaderSVG} alt="loading" />
			</div>
		</div>
	);
};

export default ComponentLoader;
