import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Verified from "../assets/verified.svg";
import { Web3Context } from "../context/Web3Context";
import "../styles/view.scss";
import { retrieve } from "../utils/crypt";

const Certificate = ({ ipfsHash, certkey }) => {
	const [data, setData] = useState({});
	const { contract } = useContext(Web3Context);

	useEffect(() => {
		let ipfsData, certData;

		(async () => {
			if (!!ipfsHash & !!certkey) {
				await contract.methods
					.verify(ipfsHash)
					.call()
					.then((res) => {
						certData = res;
					})
					.catch((error) => console.log(error));
				ipfsData = JSON.parse(await retrieve(ipfsHash, certkey));
				setData({ ...ipfsData, ...certData });
			}
		})();
	}, []);

	return (
		<div className="certificate">
			<h1>Ӂ Certificate Ӂ</h1>
			<br />

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
								<span>{ipfsHash}</span>
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
						<QRCode
							value={`http://192.168.1.6:3000/verify/?ipfsHash=${ipfsHash}&certkey=${certkey}`}
							size={100}
							bgColor="#fdfaf7"
							fgColor="#4c4c4c"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Certificate;
