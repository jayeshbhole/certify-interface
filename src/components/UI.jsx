// Imports
import { useContext } from "react";

// Contexts, Components
import { Web3Context } from "../context/Web3Context";

const UI = () => {
	const { signedInAddress, loadWeb3Modal, logoutOfWeb3Modal } =
		useContext(Web3Context);
	return (
		<div className="ui">
			UI
			{!signedInAddress ? (
				<button onClick={loadWeb3Modal}>Connect Wallet</button>
			) : (
				<button onClick={logoutOfWeb3Modal}>Disconnect Wallet</button>
			)}
		</div>
	);
};

export default UI;
