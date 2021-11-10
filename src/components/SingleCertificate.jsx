import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { upload } from "../utils/crypt";
import Certificate from "./Certificate";

const con = {
	required: { value: true, message: "This field is Required" },
	minLength: { value: 3, message: "At least 3 characters required" },
};

const SingleCertificate = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const [modal, setModal] = useState();

	const onSubmit = (data) => {
		console.log(data);
		const res = upload(data);
		setModal({ mode: "single", ...res });
	};

	return (
		<div className="single">
			{modal ? <Preview /> : null}
			<div className="txt">
				<h2>Issue Certificates</h2>
				<div className="inner">
					<span>
						Issue certificates with the form manually or import CSV files. Fill
						out the adjacent form and create a new certificate.
					</span>
					<span>
						Pay minimal transaction fee and get a copy of the certificate Hash.
					</span>
					<span>Refer to the CSV file format below before importing data.</span>
				</div>
				<hr />
				<Code control={control} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					name="BeneficiaryName"
					label="Beneficiary Name"
					type="text"
					conditions={con}
					register={register}
					errors={errors}
				/>
				<Input
					name="CertificateDescription"
					label="Certificate Description"
					type="text"
					conditions={con}
					register={register}
					errors={errors}
				/>
				<Input
					name="ExpirationDate"
					label="Expiration Date"
					type="date"
					conditions={{ required: true }}
					register={register}
					errors={errors}
					value={"1970-01-01"}
				/>
				<Input
					name="InstituteAuthorityName"
					label="Institute/ Authority Name"
					type="text"
					conditions={con}
					register={register}
					errors={errors}
				/>
				<div className="item">
					<label>Additional Notes</label>
					{errors["Additional Notes"] && <span>Error</span>}
					<textarea
						name="AdditionalNotes"
						label="Additional Notes"
						type="textarea"
						{...register("AdditionalNotes", { min: 3 })}
						errors={errors}
					/>
				</div>
				<input type="submit" value="Issue Certificate" />
			</form>
		</div>
	);
};

const Preview = () => {
	return (
		<div className="preview">
			<Certificate data />
		</div>
	);
};

const Code = ({ control }) => {
	const watchedAllFields = useWatch({ control });
	return (
		<div className="code">
			<span>Certificate JSON</span>
			<pre>{JSON.stringify(watchedAllFields, null, 2)}</pre>
		</div>
	);
};

const Input = ({ name, label, type, register, conditions, errors, value }) => (
	<div className="item">
		<label>{label}</label>{" "}
		<span className="error">
			{errors[name] && <span>{errors[name]?.message}</span>}
		</span>
		<input
			{...register(name, conditions)}
			type={type}
			name={name}
			value={value}
		/>
	</div>
);
export default SingleCertificate;
