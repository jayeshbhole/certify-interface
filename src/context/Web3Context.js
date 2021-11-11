import {
	createContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import Web3 from "web3";
import abi from "../utils/contractABI";

const Web3Context = createContext({
	balance: null,
	error: null,
	loadWeb3Modal: () => {},
	logoutOfWeb3Modal: () => {},
	accountAddress: "",
	contract: null,
});

const providerOptions = {
	portis: {
		package: Portis, // required
		options: {
			id: "1c106e72-6610-4945-856e-1f0c3d5bc67a", // required
		},
	},
};

const Web3ContextProvider = (props) => {
	const [network, setNetwork] = useState("mainnet");
	const [provider, setProvider] = useState();
	const [signedInAddress, setSignedInAddress] = useState("");

	const web3Modal = useMemo(() => {
		return new Web3Modal({
			network: network,
			cacheProvider: false,
			providerOptions: providerOptions,
		});
	}, [network]);

	const { web3, contract } = useMemo(() => {
		const web3 = new Web3(
			provider ||
				"https://eth-ropsten.alchemyapi.io/v2/hmcLykc82lV3Hv9KwZoMjYwETfo7DwNM"
		);
		const contract = new web3.eth.Contract(
			abi.abi,
			"0x2b76a4fa993f30004b4e92cab6256f98d0612ae5"
		);
		return { web3, contract };
	}, [provider]);

	// Modal Controls - Connect and Disconnect Wallets
	const loadWeb3Modal = useCallback(async () => {
		const newProvider = await web3Modal.connect();
		setProvider(newProvider);
		setSignedInAddress(newProvider.selectedAddress);
	}, [web3Modal]);
	const logoutOfWeb3Modal = useCallback(async () => {
		setSignedInAddress("");
		await web3Modal.clearCachedProvider();
		window.location.reload();
	}, [web3Modal]);

	useEffect(() => {
		console.log(provider);
		if (provider) {
			// Subscribe to accounts change
			provider.on("accountsChanged", (accounts) => {
				console.log("accountsChanged", accounts, provider);
			});
			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log("Provider Chain Changed", chainId, provider);
			});
			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log("Provider Connected", info);
			});
			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("disconnect", error);
			});
		}
	}, [provider]);

	return (
		<Web3Context.Provider
			value={{
				loadWeb3Modal,
				logoutOfWeb3Modal,
				accountAddress: signedInAddress,
				setNetwork,
				contract,
				web3,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

// export default Web3ContextProvider;
export { Web3Context, Web3ContextProvider as default };
