import Image from "../elements/image";
import Markdown from "react-markdown";

function HowItWorks({ data }: any) {
	return (
		<>
			<div class="w-full relative -mt-16 py-8 bg-primary-500 text-white rounded-t-full"></div>
			<section className="w-full px-10 bg-primary-500 text-white relative">
				<div className="mx-auto max-w-5xl">
					<div className="container pt-4 pb-20">
						<div className="text-center mb-16">
							<h3 className="title">How it works</h3>
						</div>
						<div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
							{data.steps.map((feature: any, index: number) => (
								<div key={feature.id}>
									<div className="step">
										<div className="w-full flex items-center mb-4 justify-center md:justify-start">
											<div className="step-number font-semibold text-3xl w-10">{index + 1}</div>
											<div className="step-icon w-20 h-20">
												<Image media={feature.icon} className="w-full h-auto" />
											</div>
										</div>
										<div>
											<h4 className="font-black text-xl mb-2">{feature.title}</h4>
											<div className="prose dark text-current prose-lg">
												<Markdown source={feature.content} />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default HowItWorks;
