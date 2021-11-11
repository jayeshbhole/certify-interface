import LoadingPageSVG from "../assets/loading-page.svg";

const PageLoader = () => {
	return (
		<div className="pageloader">
			<img src={LoadingPageSVG} alt="loading page" />
		</div>
	);
};
export default PageLoader;
