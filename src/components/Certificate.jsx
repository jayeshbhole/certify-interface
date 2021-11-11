import { Suspense, useContext } from "react";
import QRCode from "react-qr-code";
import { Web3Context } from "../context/Web3Context";
import fetchCertData from "../utils/fetchCertData";
import ComponentLoader from "./ComponentLoader";
import PageLoader from "./PageLoader";

import Verified from "../assets/verified.svg";
import "../styles/certificate.scss";

const Certificate = ({ ipfsHash, certkey }) => {
	const { contract } = useContext(Web3Context);

	const resource = fetchCertData(ipfsHash, certkey, contract);

	const link = `https://certify-v2.netlify.app/verify/?ipfsHash=${ipfsHash}&certkey=${certkey}`;

	return (
		<Suspense fallback={<PageLoader />}>
			<div className="certificate">
				<h1>Ӂ Certificate Ӂ</h1>
				<br />
				<Suspense fallback={<ComponentLoader />}>
					<Fields resource={resource} />

					<Info resource={resource} link={link} />
					<br />
					<hr width="50%" />
					<a className="foot-link" href={link}>
						{link}
					</a>
				</Suspense>
			</div>
		</Suspense>
	);
};
const Fields = ({ resource }) => {
	const data = resource.read();
	return (
		<div className="fields">
			<span>
				This certificate is presented to{" "}
				<span className="field" id="name">
					{data?.BeneficiaryName}
				</span>{" "}
			</span>
			<span>For</span>
			<span className="field">{data?.CertificateDescription}</span>
			<span>By</span>
			<span className="field">{data?.InstituteAuthorityName}</span>
		</div>
	);
};
const Info = ({ resource, link }) => {
	const data = resource.read();
	return (
		<div className="info">
			<div className="tx-info">
				<h4>Additional Information</h4>
				<div className="cols">
					<div className="col">
						<span className="field">
							<span className="label">Expires on : </span>
							<span>
								{new Date(Number(data?.validtill)).toLocaleDateString()}
							</span>
						</span>

						<span className="field">
							<span className="label">Note : </span>
							<span> {data?.AdditionalNotes}</span>
						</span>

						<span className="field">
							<span className="label">Issuers Address : </span>
							<span>{data?.issuer}</span>
						</span>
					</div>

					<div className="col">
						<span className="field">
							<span className="label">Certificate ID : </span>
							<span>{data?.certID}</span>
						</span>

						<span className="field">
							<span className="label">Created On : </span>
							<span>
								{new Date(Number(data?.issuetime)).toLocaleDateString()}
							</span>{" "}
							<br />
						</span>

						<span className="field">
							<span className="label">IPFS Hash : </span>
							<span>{data?.ipfs}</span>
						</span>
					</div>
				</div>
			</div>

			<div>
				<h4>Certificate Status</h4>
				<div className="status">
					<img src={Verified} alt="" />

					<div className="label">Verified</div>
				</div>
			</div>

			<div>
				<h4>Scan to share</h4>
				<div className="share">
					<QRCode value={link} size={100} bgColor="#fdfaf7" fgColor="#4c4c4c" />
				</div>
			</div>
		</div>
	);
};

export default Certificate;
