import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Sign In",
		metaDescription: "the digital farmers platform",
		shareImage: null,
	};
}

function InitResetPasswordPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<div> InitResetPassword page </div>
		</>
	);
}

export default InitResetPasswordPage;
