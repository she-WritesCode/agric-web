import { generatePaymentReference, getToken, toCurrency } from "../../utils/helpers";
import { useCheckout } from "../../utils/projects";
import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { Service } from "../../utils/service";
import {
	User,
	CreateUserParam,
	LoginData,
	PaymentStatus,
	InvestmentStatus,
	InvestmentCreateParam,
	Investment,
	Payment,
	PaymentCreateParam,
} from "../../interfaces/user";
import { string, object, ref } from "yup";
import { FormikHelpers } from "formik";
import TForm, { FormSchema } from "../elements/t-form";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";

const CreateAccountSchema = object().shape({
	email: string().email().required(),
	firstname: string().required().label("First name"),
	lastname: string().required().label("Last name"),
	password: string().min(6).required().label("Password"),
	confirm_password: string()
		.oneOf([ref("password")], "Password does not match")
		.required(),
});

const formSchema: FormSchema = {
	fields: [
		{
			type: "text",
			name: "firstname",
			label: "First name",
			placeholder: "Adedapo",
			outerClassName: "col-span-1",
		},
		{
			type: "text",
			name: "lastname",
			label: "Last name",
			placeholder: "Okeowo",
			outerClassName: "col-span-1",
		},
		{
			type: "email",
			name: "email",
			label: "Email",
			placeholder: "you@email.com",
			outerClassName: "col-span-1",
		},
		{
			type: "text",
			name: "phone",
			label: "Mobile No.",
			placeholder: "",
			outerClassName: "col-span-1",
		},
		{
			type: "password",
			name: "password",
			label: "Password",
			outerClassName: "col-span-2",
			feedback: false,
			toggleMask: true,
		},
		{
			type: "password",
			name: "confirm_password",
			label: "Confirm Password",
			outerClassName: "col-span-2",
			feedback: false,
			toggleMask: true,
		},
	],
	validationSchema: CreateAccountSchema,
};

function Checkout() {
	const { retriveProject, removeProject } = useCheckout();
	const { project, quantity } = retriveProject();
	const router = useRouter();
	const publicKey = "pk_test_3ad1a83f414de81ebbbf41872ac3860784e45f28";

	if (!project) return <div>No project selected</div>;

	const [state, setState] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: "",
		quantity: quantity,
	});

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<Partial<User>>({});
	const [isRegistered, setIsRegistered] = useState(!!user);
	const [paymentCreated, setPaymentCreated] = useState(false);
	const [investmentCreated, setInvestmentCreated] = useState(false);

	const amount = project.investmentFee * state.quantity;
	let reference = "";

	async function createAccount(
		values: Partial<CreateUserParam & { confirm_password: string }>,
		{
			setSubmitting,
		}: FormikHelpers<
			Partial<CreateUserParam> & {
				confirm_password: string;
			}
		>,
	) {
		reference = generatePaymentReference(`${state.email}${Date.now()}`);
		setLoading(true);
		if (getToken()) {
			setUser(await new Service<User>("/users", true).getOne("me"));
			setIsRegistered(true);
		} else {
			const loginData = await new Service<LoginData, Partial<CreateUserParam>>("/auth/local/register").create({
				firstname: values.firstname,
				lastname: values.lastname,
				email: values.email,
				username: values.email,
				phone: values.phone,
				password: values.password,
			});
			if (typeof window !== "undefined") {
				window.localStorage.setItem("token", loginData.jwt);
			}
			setIsRegistered(true);
			setUser(loginData.user);
			setSubmitting(false);
		}
		setLoading(false);
		const payment = await new Service<Payment, Partial<PaymentCreateParam>>("/payments", true).create({
			status: PaymentStatus.pending,
			reference: reference,
			amountPaid: amount,
		});
		setPaymentCreated(true);
		const investment = await new Service<Investment, Partial<InvestmentCreateParam>>("/investments", true).create({
			payment: payment,
			user: user,
			project: { id: project?.id },
			quantity: state.quantity,
			status: InvestmentStatus.awaiting_confirmation,
			amountPerSlot: project?.investmentFee,
		});
		setInvestmentCreated(true);
		removeProject();
	}

	const componentProps = {
		email: state.email,
		amount: amount * 100,
		firstname: state.firstname,
		phone: state.phone,
		reference,
		publicKey,
		text: "Pay Now",
		onSuccess: async () => {
			// await new Service<Payment, Partial<PaymentCreateParam>>("/payments", true).update(reference, {
			// 	status: PaymentStatus.awaitingConfirmation,
			// });
			router.push("/dashboard");
		},
	};

	return (
		<section className="w-full px-10">
			<div className="mx-auto max-w-5xl">
				<div className="container py-20">
					<div className="mb-8">
						<h1 className="title text-3xl">Checkout</h1>
					</div>
					<div className="grid md:grid-cols-5 gap-10">
						<div className="md:col-span-2">
							{/* <div className="mb-2 font-bold text-lg">Summary</div> */}
							<div className="shadow bg-white rounded-2xl">
								<div className="h-32 bg-primary-300 rounded-t-2xl relative">
									<img
										className="object-cover w-full h-full rounded-t-2xl object-center"
										src="https://picsum.photos/700/500"
										alt=""
									/>
								</div>
								<div className=" py-6 px-4">
									<div className="font-black text-xl">{project?.title}</div>
									<div className="text-xl font-semibold text-primary-500 mb-2">
										{project && toCurrency(project.investmentFee)}
										<span className="ml-2 text-base text-gray-700">
											x
											<input
												type="number"
												className="ml-2 w-16 p-1 p-inputtext p-inputnumber p-component"
												value={state.quantity}
												min={1}
												max={project.availableSlots}
												name="quantity"
												onChange={(e: any) => setState({ ...state, quantity: Number(e.target.value) })}
											/>
										</span>
									</div>
									<div className="grid grid-cols-2 gap-4 text-lg">
										<div>
											<div className="text-sm">Returns</div>
											<div className="font-semibold">{project?.roi}%</div>
										</div>
										<div>
											<div className="text-sm">Duration</div>
											<div className="font-semibold">{project?.duration} months</div>
										</div>
										<div>
											<div className="text-sm">Investment</div>
											<div className="font-semibold">
												{project && toCurrency(project.investmentFee * state.quantity)}
											</div>
										</div>
										<div>
											<div className="text-sm">Profit</div>
											<div className="font-semibold">
												{project &&
													toCurrency(
														(project.investmentFee + (project.investmentFee * project.roi) / 100) * state.quantity,
													)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="md:col-start-1 md:row-start-1 md:col-span-3">
							<div className="register-form p-fluid">
								{!isRegistered ? (
									<TForm<Partial<CreateUserParam> & { confirm_password: string }>
										schema={formSchema}
										onSubmit={createAccount}
										initialValues={{ ...state }}
										className="grid-cols-2 gap-x-4"
									/>
								) : !user ? (
									<>
										<div className="flex flex-col items-center py-8 justify-center">
											<div className="text-2xl">Awesome!! Your account has been created</div>
											{!paymentCreated || !investmentCreated ? (
												<div className="text-base">
													<ProgressSpinner />
													{!investmentCreated || <p>Please wait... we are creating your investment</p>}
													{!paymentCreated || <p>Please wait... while we finish up some paper work</p>}
												</div>
											) : (
												<>
													<div className="text-base">Your investment has been created. Proceed to pay</div>
													<div className="p-field">
														<PaystackButton
															className="p-component p-button rounded-3xl flex justify-center items-center"
															{...componentProps}
														/>
													</div>
												</>
											)}
										</div>
									</>
								) : (
									<>
										<div className="text-base">Hi {user.firstname}!</div>
										<div className="p-field">
											<PaystackButton
												className="p-component p-button rounded-3xl flex justify-center items-center"
												{...componentProps}
											/>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;
