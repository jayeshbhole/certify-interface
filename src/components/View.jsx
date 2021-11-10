import { useSearchParams } from "react-router-dom";
import Certificate from "./Certificate";

const View = () => {
	const [searchParams] = useSearchParams();

	return (
		<div className="view">
			<Certificate
				certkey={searchParams.get("certkey")}
				ipfsHash={searchParams.get("ipfsHash")}
			/>
		</div>
	);
};

export default View;
