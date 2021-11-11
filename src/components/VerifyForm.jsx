import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/verify.scss";

const VerifyForm = () => {
	// eslint-disable-next-line no-unused-vars
	const [_, setSearchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const params = { certkey: data.certkey, ipfsHash: data.ipfsHash };
		setSearchParams(params);
	};
	return (
		<div className="verify">
			<h2>Verify Certificate</h2>
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="item">
					<label>IPFS Hash (Address)</label>{" "}
					<span className="error">
						{errors["ipfsHash"] && <span>{errors["ipfsHash"]?.message}</span>}
					</span>
					<input
						{...register("ipfsHash", {
							required: { value: true, message: "This field is Required" },
						})}
						type="text"
						name="ipfsHash"
					/>
				</div>
				<div className="item">
					<label>Certificate Key</label>{" "}
					<span className="error">
						{errors["certkey"] && <span>{errors["certkey"]?.message}</span>}
					</span>
					<input
						{...register("certkey", {
							required: { value: true, message: "This field is Required" },
						})}
						type="text"
						name="certkey"
					/>
				</div>
				<input type="submit" value="Verify Certificate" />
			</form>
		</div>
	);
};

export default VerifyForm;
