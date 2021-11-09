import React from "react";
import QRCode from "react-qr-code";

import Verified from "../assets/verified.svg";
import "../styles/view.scss";

const View = () => {
	return (
		<div className="view">
			<h1>Ӂ Certificate Ӂ</h1>
			<br />

			<div className="fields">
				<span className="txt">
					This certificate is presented to{" "}
					<span className="field" id="name">
						{"Name"}
					</span>{" "}
				</span>
				<span className="txt">For</span>
				<span className="field">{"for"}</span>
				<span className="txt">By</span>
				<span className="field">{"By Institute Name"}</span>
			</div>

			<div className="info">
				<div className="tx-info">
					<h4>Additional Information</h4>
					<div className="cols">
						<div className="col">
							<span className="field">
								<span className="label">Expires on : </span>
								<span>DD/MM/YYYY</span>
							</span>

							<span className="field">
								<span className="label">Note : </span>
								<span> Lorem Ipsum Dolor Sir </span>
							</span>

							<span className="field">
								<span className="label">Issuers Address : </span>
								<span>0x0b90994F83D2Fde68f83C418141B42550dE2Cb4c</span>
							</span>
						</div>

						<div className="col">
							<span className="field">
								<span className="label">Certificate ID : </span>
								<span>XXXXXXXXX</span>
							</span>

							<span className="field">
								<span className="label">Created On : </span>
								<span>21/1/2021</span> <br />
							</span>

							<span className="field">
								<span className="label">IPFS Hash : </span>
								<span>
									0x64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C
								</span>
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
							value="http://localhost:3000/view?id=2142354534653453"
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

export default View;
