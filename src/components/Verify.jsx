import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Certificate from "./Certificate";
import PageLoader from "./PageLoader";

const VerifyForm = lazy(() => import("./VerifyForm"));

const Verify = () => {
	const [searchParams] = useSearchParams();

	return !!searchParams.has("certkey") & !!searchParams.has("ipfsHash") ? (
		<div className="view">
			<Certificate
				certkey={searchParams.get("certkey")}
				ipfsHash={searchParams.get("ipfsHash")}
			/>
		</div>
	) : (
		<Suspense fallback={<PageLoader />}>
			<VerifyForm />
		</Suspense>
	);
};

export default Verify;
