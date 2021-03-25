import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Sign In",
		metaDescription: "the digital farmers platform",
		shareImage: null,
	};
}

function SignUpPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<div> SignUp page </div>
		</>
	);
}

export default SignUpPage;
