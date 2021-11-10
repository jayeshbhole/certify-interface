import QRCode from "react-qr-code";
import Verified from "../assets/verified.svg";
import "../styles/view.scss";

const Certificate = ({ data }) => {
	return (
		<div className="certificate">
			<h1>Ӂ Certificate Ӂ</h1>
			<br />

			<div className="fields">
				<span className="txt">
					This certificate is presented to{" "}
					<span className="field" id="name">
						{data?.BeneficiaryName}
					</span>{" "}
				</span>
				<span className="txt">For</span>
				<span className="field">{data?.CertificateDescription}</span>
				<span className="txt">By</span>
				<span className="field">{data?.InstituteAuthorityName}</span>
			</div>

			<div className="info">
				<div className="tx-info">
					<h4>Additional Information</h4>
					<div className="cols">
						<div className="col">
							<span className="field">
								<span className="label">Expires on : </span>
								<span>{data?.ExpirationDate}</span>
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
								<span>{data?.createdOn}</span> <br />
							</span>

							<span className="field">
								<span className="label">IPFS Hash : </span>
								<span>{data?.ipfsHash}</span>
							</span>
						</div>
					</div>
				</div>

				<div>
					<h4>Certificate Status</h4>
					<div className="status">
						<img src={Verified} alt="" srcset="" />

						<div className="label">Verified</div>
					</div>
				</div>

				<div>
					<h4>Scan to share</h4>
					<div className="share">
						<QRCode
							value={window.location.href}
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
