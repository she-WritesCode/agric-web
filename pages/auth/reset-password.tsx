import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Sign In",
		metaDescription: "the digital farmers platform",
		shareImage: null,
	};
}

function ResetPasswordPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<div> ResetPassword page </div>
		</>
	);
}

export default ResetPasswordPage;
