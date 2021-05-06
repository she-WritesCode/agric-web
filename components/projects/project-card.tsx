import { Project } from "../../interfaces/project";
import React from "react";
import Link from "next/link";
import { toCurrency } from "../../utils/helpers";

function ProjectCard({ project }: { project: Project }) {
	const imageUrl = project.mainImage ? project.mainImage.url : "/images/default.png";
	return (
		<div className="shadow-xl bg-white rounded-2xl hover:shadow-2xl">
			<div className="h-32 bg-primary-300 rounded-t-2xl relative">
				<img className="object-cover w-full h-full rounded-t-2xl object-center" src={imageUrl} alt={project.title} />
				<div className="absolute mb-2 bg-primary-500 text-white text-sm p-1 bottom-0 right-0 rounded-l">
					{project.availableSlots} slots left
				</div>
			</div>
			<div className="py-6 px-4">
				<div className="text-xs">{project.project_categories.map((category) => category.title).join(", ")}</div>
				<Link href="/projects/[slug]" as={"/projects/" + project.slug}>
					<a>
						<div className="font-semibold text-lg">{project.title}</div>
					</a>
				</Link>
				<div className="text-xl font-black text-primary-500 mb-2">{toCurrency(project.investmentFee)}</div>
				<div className="flex justify-between text-lg">
					<div>
						<div className="text-sm">Returns</div>
						<div className="font-semibold">{project.roi}%</div>
					</div>
					<div>
						<div className="text-sm">Duration</div>
						<div className="font-semibold">{project.duration} months</div>
					</div>
				</div>
				<div className="mt-2 flex flex-wrap gap-3 justify-center text-center">
					<Link href="/projects/[slug]" as={"/projects/" + project.slug}>
						<a className="bg-primary-500 border-2 border-primary-500 px-3 py-2 rounded-full text-sm text-white font-bold shadow hover:shadow-lg hover:border-primary-600 hover:bg-primary-600">
							View Project
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
export default ProjectCard;
