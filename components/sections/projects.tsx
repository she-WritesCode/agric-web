import { getProjectData, getProjects } from "../../utils/api";
import qs from "qs";
import { useEffect, useState } from "react";
import ProjectCard from "../projects/project-card";
import CardSkeleton from "../elements/card-skeleton";
import { Project } from "../../interfaces/project";

export interface ProjectsSection {
	__component: string;
	id: number;
	title: null;
	limit: number;
	paginate: boolean;
	meta: string;
}

interface Props {
	data: ProjectsSection;
}

const Projects = ({ data }: Props) => {
	// console.log(JSON.stringify(data));
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setError("");
		setLoading(true);
		getData(data.limit, Number(data.paginate)).then((proj) => {
			if (proj) {
				setProjects(proj);
				setLoading(false);
				setError("");
			}
		});
		setError("Error getting projects");
	}, []);

	return (
		<section className="w-full px-10">
			<div className="mx-auto max-w-5xl">
				<div className="container py-24">
					{data.title && (
						<div className="text-center mb-12">
							<div className="text-3xl font-black">{data.title}</div>
						</div>
					)}
					<div className="text-xl font-bold">{error}</div>
					<div className="grid md:grid-cols-3 gap-12">
						{loading
							? [1, 2, 3, 4, 5, 6].map((n) => (
									<div key={n}>
										<CardSkeleton />
									</div>
							  ))
							: projects.map((project) => (
									<div key={project.id}>
										<ProjectCard project={project} />
									</div>
							  ))}
					</div>
				</div>
			</div>
		</section>
	);
};

//TODO: Update to swr
async function getData(_limit: number, _start = 0) {
	const query = qs.stringify({ _limit, _start });
	return await getProjects(query);
}

export default Projects;
