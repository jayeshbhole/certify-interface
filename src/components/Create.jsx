import React from "react";
import { useForm } from "react-hook-form";
import "../styles/create.scss";

const Create = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		console.log(errors);
	};
	const con = {
		required: { value: true, message: "This field is Required" },
		minLength: { value: 3, message: "At least 3 characters required" },
	};
	console.log(errors);
	return (
		<div className="create">
			<div className="single">
				<SingleInfo />

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
							conditions={{ min: 3 }}
							register={register}
							errors={errors}
						/>
					</div>
					<input type="submit" value="Issue Certificate" />
				</form>
			</div>
			<div className="batch"></div>
		</div>
	);
};

const SingleInfo = () => {
	return (
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
			<Code />
		</div>
	);
};

const Code = () => {
	return <div className="code"></div>;
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

export default Create;
