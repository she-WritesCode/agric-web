import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Sign In",
		metaDescription: "the digital farmers platform",
		shareImage: null,
	};
}

function LoginPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<div> Login page </div>
		</>
	);
}

export default LoginPage;
