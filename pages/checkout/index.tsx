import Checkout from "../../components/checkout/page";
import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Checkout",
		metaDescription: "the digital farmers platform",
		shareImage: null,
	};
}

function CheckoutPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<Checkout />
		</>
	);
}

export default CheckoutPage;
