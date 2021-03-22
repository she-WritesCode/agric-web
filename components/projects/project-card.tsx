import { Project } from "../../interfaces/project";
import React from "react";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="shadow-xl bg-white rounded-2xl hover:shadow-2xl">
			<div className="h-32 bg-primary-300 rounded-t-2xl">
				<img
					className="object-cover w-full h-full rounded-t-2xl object-center"
					src="https://picsum.photos/700/500"
					alt=""
				/>
			</div>
			<div className="py-6 px-4">
				<div className="font-semibold text-lg">{project.title}</div>
				<div className="text-xl font-black text-primary-500 mb-2">₦75,000.00</div>
				<div className="flex justify-between text-lg">
					<div>
						<div className="text-base">Returns</div>
						<div className="font-semibold">{project.roi}%</div>
					</div>
					<div>
						<div className="text-base">Duration</div>
						<div className="font-semibold">{project.duration} months</div>
					</div>
				</div>
				<div className="mt-6 mb-4 w-full text-center">
					<Link href="/projects/[slug]" as={"/projects/" + project.slug}>
						<a className="bg-primary-500 border-2 border-primary-500 px-6 py-2 rounded-full text-white font-bold shadow hover:shadow-lg hover:border-primary-500 hover:bg-primary-500">
							Fund Project
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
export default ProjectCard;
