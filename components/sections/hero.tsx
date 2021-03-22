import Markdown from "react-markdown";
import ButtonLink from "../elements/button-link";
import Image from "../elements/image";
import { getButtonAppearance } from "../../utils/button";
import { getStrapiMedia } from "../../utils/media";

const Hero = ({ data }: any) => {
	const fullUrl = data.picture ? getStrapiMedia(data.picture.url) : undefined;
	return (
		<section
			className="w-full px-10 relative text-white bg-no-repeat bg-cover bg-center"
			style={{ backgroundImage: `url(${fullUrl})` }}
		>
			<div className={`absolute inset-0 ${fullUrl ? "bg-black bg-opacity-50" : "bg-primary-500"}`}></div>
			<div className="mx-auto max-w-5xl relative">
				<div className="container text-center pt-20 md:pt-24 pb-24 md:pb-28">
					{/* Left column for content */}
					<div className="flex-1 sm:pr-8">
						{/* Hero section label */}
						<p className="uppercase tracking-wide font-semibold">{data.label}</p>
						{/* Big title */}
						<h1 className="text-5xl md:text-6xl font-black mb-8">{data.title}</h1>
						{/* Description paragraph */}
						<p className="text-xl mb-8">{data.description}</p>
						{/* Buttons row */}
						<div className="flex flex-row flex-wrap  items-center justify-center gap-4">
							{data.buttons.map((button: any) => (
								<ButtonLink button={button} appearance={getButtonAppearance(button.type, "light")} key={button.id} />
							))}
						</div>
						{/* Small rich text */}
						<div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
							<Markdown source={data.smallTextWithLink} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
