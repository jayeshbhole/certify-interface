import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";

const Navbar = () => {
	const { loadWeb3Modal, accountAddress } = useContext(Web3Context);
	return (
		<nav>
			<div className="bar">
				<NavLink className="item" id="logo" to="../">
					Certify.
				</NavLink>
				<div className="links">
					<NavLink className="item" to="/">
						About
					</NavLink>
					<NavLink className="item" to="/verify">
						Verify
					</NavLink>
					<NavLink className="item" to="/create">
						Create
					</NavLink>

					<NavLink className="item" to="/actions">
						Actions
					</NavLink>
				</div>
				<span
					className="item"
					id="wallet"
					role="button"
					onClick={loadWeb3Modal}>
					{accountAddress
						? `Connected ${accountAddress.slice(0, 5)}`
						: "Connect Wallet"}
				</span>
			</div>
		</nav>
	);
};

export default Navbar;
