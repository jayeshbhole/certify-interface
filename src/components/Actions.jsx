import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Web3Context } from "../context/Web3Context";

import Modal from "./CreateModal";
import ActionsSVG from "../assets/actions.svg";
import "../styles/actions.scss";

const Actions = () => {
	const [modalData, setModalData] = useState({ mode: "closed" });

	return (
		<div className="actions">
			<Modal modalData={modalData} setModalData={setModalData} />

			<h2>Actions</h2>

			<div className="action">
				<div className="inner">
					<div className="txt">
						Actions allow users to mutate the certificate status. They can
						either be <b>Revoked</b> or <b>Reinstated</b>
						<br />
						<br />
						Only certificates belonging to the users address will be revoked/
						reinstated.
						<br />
						<br />
						Encryption key is needed to perform any action.
						<br />
						<br />
					</div>
					<img src={ActionsSVG} alt="actions" />
				</div>
			</div>

			<hr width="75%" />
			<div className="action revoke">
				<h2>Revoke Certificate</h2>
				<div className="inner">
					<div className="txt">
						Revoke existing certificates by filling out the adjacent form.
						<br />
						<br />
						This action is reversible.
						<br />
						<br />
						Reinstate/ extend the validity of a certificate using the form
						below.
						<br />
						<br />
						Transaction gas charges are applied.
					</div>

					<Revoke setModalData={setModalData} />
				</div>
			</div>
			<hr width="75%" />
			<div className="action reinstate">
				<h2>Reinstate Certificate</h2>
				<div className="inner">
					<div className="txt">
						Certificates can be reinstated using the adjacent form.
						<br />
						<br />
						Reinstating certificates only extends the expiration date and
						nothing more.
						<br />
						<br />
						Transaction gas charges are applied.
					</div>

					<Reinstate setModalData={setModalData} />
				</div>
			</div>
		</div>
	);
};

const condition = {
	required: { value: true, message: "This field is Required" },
};
const Revoke = ({ setModalData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { contract, accountAddress } = useContext(Web3Context);

	const onSubmit = async (data) => {
		if (accountAddress) {
			setModalData({ mode: "loading" });

			await contract.methods
				.revoke(data.ipfsHash)
				.send({ from: accountAddress })

				.on("transactionHash", function (hash) {
					console.log(hash);
				})

				.on("receipt", function (receipt) {
					setModalData({
						mode: "display",
						data: { ipfsHash: data.ipfsHash, certkey: data.certkey },
						receipt: receipt,
					});
				})

				.on("error", function (error) {
					console.log(error);
					window.alert(error.message);
					setModalData("closed");
				});
		} else window.alert("Please connect a wallet first");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="item">
				<label>IPFS Hash (Address)</label>{" "}
				<span className="error">
					{errors["ipfsHash"] && <span>{errors["ipfsHash"]?.message}</span>}
				</span>
				<input
					{...register("ipfsHash", condition)}
					type="text"
					name="ipfsHash"
				/>
			</div>
			<div className="item">
				<label>Certificate Key</label>{" "}
				<span className="error">
					{errors["certkey"] && <span>{errors["certkey"]?.message}</span>}
				</span>
				<input {...register("certkey", condition)} type="text" name="certkey" />
			</div>
			<input type="submit" value="Revoke Certificate" />
		</form>
	);
};

const Reinstate = ({ setModalData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const { contract, accountAddress } = useContext(Web3Context);

	const onSubmit = async (data) => {
		if (accountAddress) {
			setModalData({ mode: "loading" });
			const expDate = getValues("validtill")
				? Math.floor(new Date(getValues("validtill")).getTime() / 1000)
				: 0;

			await contract.methods
				.reinstate(data.ipfsHash, expDate)
				.send({ from: accountAddress })

				.on("transactionHash", function (hash) {
					console.log(hash);
				})

				.on("receipt", function (receipt) {
					setModalData({
						mode: "display",
						data: { ipfsHash: data.ipfsHash, certkey: data.certkey },
						receipt: receipt,
					});
				})

				.on("error", function (error) {
					console.log(error);
					window.alert(error.message);
					setModalData("closed");
				});
		} else window.alert("Please connect a wallet first");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="item">
				<label>IPFS Hash (Address)</label>{" "}
				<span className="error">
					{errors["ipfsHash"] && <span>{errors["ipfsHash"]?.message}</span>}
				</span>
				<input
					{...register("ipfsHash", condition)}
					type="text"
					name="ipfsHash"
				/>
			</div>
			<div className="item">
				<label>New Expiry Date</label>{" "}
				<span className="error">
					{errors["validtill"] && <span>{errors["validtill"]?.message}</span>}
				</span>
				<input
					{...register("validtill", condition)}
					type="date"
					name="validtill"
				/>
			</div>
			<div className="item">
				<label>Certificate Key</label>{" "}
				<span className="error">
					{errors["certkey"] && <span>{errors["certkey"]?.message}</span>}
				</span>
				<input {...register("certkey", condition)} type="text" name="certkey" />
			</div>
			<input type="submit" value="Reinstate Certificate" />
		</form>
	);
};

export default Actions;
