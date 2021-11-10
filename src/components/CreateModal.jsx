import { useCallback, useEffect, useRef } from "react";
import Certificate from "./Certificate";
import Loader from "../assets/loading.svg";

const Modal = ({ modalData: { mode, data, error }, setModalData }) => {
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

	return mode === "display" ? (
		<div className="modal">
			<div className="content inner" ref={modalRef}>
				<div className="success">
					<h3>
						Success! Certificate Created with encryption key : {data?.certkey}
					</h3>
					Download receipt : <button>Download</button>
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
