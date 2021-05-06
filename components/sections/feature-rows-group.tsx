import classNames from "classnames";
import Image from "../elements/image";
import Video from "../elements/video";
import CustomLink from "../elements/custom-link";

const FeatureRowsGroup = ({ data }: any) => {
	return (
		<>
			{data.features.map((feature: any, index: number) => (
				<section className="w-full px-10">
					<div className="mx-auto max-w-5xl">
						<div className="container flex flex-col gap-12 py-24">
							<div
								className={classNames(
									// Common classes
									"flex flex-col justify-start md:justify-between md:items-center gap-10",
									{
										"md:flex-row": index % 2 === 0,
										"md:flex-row-reverse": index % 2 === 1,
									},
								)}
								key={feature.id}
							>
								{/* Text section */}
								<div className="w-full md:w-6/12 md:pr-6 text-lg">
									<h3 className="title">{feature.title}</h3>
									<p className="my-6">{feature.description}</p>
									<CustomLink link={feature.link}>
										<div className="text-blue-600 with-arrow hover:underline">{feature.link.text}</div>
									</CustomLink>
								</div>
								{/* Media section */}
								<div className="w-full sm:9/12 md:w-4/12 max-h-full">
									{/* Images */}
									{feature.media.mime.startsWith("image") && <Image media={feature.media} className="w-full h-auto" />}
									{/* Videos */}
									{feature.media.mime.startsWith("video") && (
										<Video media={feature.media} className="w-full h-auto" autoPlay controls={false} />
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			))}
		</>
	);
};

export default FeatureRowsGroup;
