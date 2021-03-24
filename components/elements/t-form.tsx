import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { MultiSelect } from "primereact/multiselect";
import { object, string } from "yup";
import { FieldConfig, Form, Formik, FormikHelpers, FormikProps, useField } from "formik";
import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface TFormProps<T = any> {
	schema: FormSchema;
	initialValues: T;
	className: string;
	onSubmit: ((values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>) & Function;
}
export interface FormSchema {
	fields: FieldSchema[];
	validationSchema: any;
}
export interface FieldSchema {
	type: "text" | "email" | "checkbox" | "password" | "select" | "radio" | "date" | "datetime" | "time";
	name: string;
	label: string;
	placeholder?: string;
	style?: Record<string, string | number>;
	className?: string;
	outerClassName?: string;
	children?: Array<any>;
	[key: string]: any;
}

const TextInput = ({ label, ...props }: any) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<InputText className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? <small className="p-invalid bg-red-500">{meta.error}</small> : null}
		</>
	);
};

interface CheckboxInputProps {
	children: string | JSX.Element;
	[key: string]: any;
}
const CheckboxInput = ({ children, ...props }: any) => {
	// React treats radios and checkbox inputs differently other input types, select, and textarea.
	// Formik does this too! When you specify `type` to useField(), it will
	// return the correct bag of props for you -- a `checked` prop will be included
	// in `field` alongside `name`, `value`, `onChange`, and `onBlur`
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<>
			<label className="checkbox-input">
				<Checkbox {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? <small className="p-invalid bg-red-500">{meta.error}</small> : null}
		</>
	);
};

const PasswordInput = ({ label, ...props }: any) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<Password toggleMask {...field} {...props} />
			{meta.touched && meta.error ? <small className="p-invalid bg-red-500">{meta.error}</small> : null}
		</>
	);
};
const SelectInput = ({ label, ...props }: any) => {
	const [field, meta] = useField(props);
	if (props.multiple) {
		return (
			<>
				<label htmlFor={props.id || props.name}>{label}</label>
				<MultiSelect {...field} {...props} />
				{meta.touched && meta.error ? <small className="p-invalid bg-red-500">{meta.error}</small> : null}
			</>
		);
	}
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<Dropdown {...field} {...props} />
			{meta.touched && meta.error ? <small className="p-invalid bg-red-500">{meta.error}</small> : null}
		</>
	);
};

function TForm<T>({ schema, initialValues, onSubmit, className = "" }: TFormProps<T>) {
	return (
		<>
			<Formik initialValues={initialValues} validationSchema={schema.validationSchema} onSubmit={onSubmit}>
				{({ errors, touched, isSubmitting }: FormikProps<T>) => (
					<Form>
						<div className={`grid p-fluid ${className}`}>
							{schema.fields.map(({ outerClassName, type, ...props }) => {
								let element: string | JSX.Element = "";
								switch (type) {
									case "select":
										element = <SelectInput type={type} {...props} />;
										break;

									case "checkbox":
										element = <CheckboxInput type={type} {...props} />;
										break;

									default:
										element = <TextInput type={type} {...props} />;
										break;
								}
								return <div key={props.name} className={`p-field ${outerClassName}`} children={element} />;
							})}
							<Button className="rounded-3xl" label="Submit" disabled={isSubmitting} type="submit" />
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default TForm;
