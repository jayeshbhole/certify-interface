import { useCallback, useEffect, useRef } from "react";
import Certificate from "./Certificate";
import Loader from "../assets/loading.svg";
import { saveAs } from "file-saver";

const Modal = ({ modalData: { mode, data, receipt }, setModalData }) => {
	const modalRef = useRef();

	const handleClickOutside = useCallback(
		(e) => {
			if (mode === "display") {
				console.log("click");
				if (!modalRef.current?.contains(e.target)) {
					setModalData({ mode: "closed" });
				}
			} else {
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[mode]
	);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	const createReceipt = () => {
		const obj = {
			transactionHash: receipt?.transactionHash,
			ipfsHash: data?.ipfsHash,
			certkey: data?.certkey,
			shareableLink: `http://192.168.1.6:3000/verify/?ipfsHash=${data?.ipfsHash}&certkey=${data?.certkey}`,
		};
		const blob = new Blob([JSON.stringify(obj, null, "\t")], {
			type: "application/json",
		});
		saveAs(blob, `certify-${data?.ipfsHash}`);
	};

	return mode === "display" ? (
		<div className="modal">
			<div className="content inner" ref={modalRef}>
				<div className="success">
					<h3>
						Success! Certificate Created with encryption key : {data?.certkey}{" "}
						<br />
						<button onClick={createReceipt}>Download a Receipt</button>
					</h3>
					<br />
					<hr />
					<br />
				</div>
				<Certificate ipfsHash={data?.ipfsHash} certkey={data?.certkey} />
			</div>
		</div>
	) : mode === "loading" ? (
		<Loading modalRef={modalRef} />
	) : (
		<></>
	);
};

const Loading = () => {
	useEffect(() => {
		window.onbeforeunload = confirmExit;
		function confirmExit() {
			return "Warning";
		}
	}, []);
	return (
		<div className="modal">
			<div className="loading inner">
				<img src={Loader} alt="loading" />
				<br />
				<h3>Processing Transaction! Do not close this tab.</h3>
			</div>
		</div>
	);
};

export default Modal;
