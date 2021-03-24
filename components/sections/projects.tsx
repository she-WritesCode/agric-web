import { getProjectData, getProjects } from "../../utils/api";
import qs from "qs";
import { useEffect, useState } from "react";
import ProjectCard from "../projects/project-card";
import CardSkeleton from "../elements/card-skeleton";
import { Project } from "../../interfaces/project";
import { getQueryString } from "../../utils/helpers";
import { useProjects } from "../../utils/projects";

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
	const query = qs.stringify({
		_limit: data.limit,
		_start: Number(data.paginate),
		_sort: { created_at: "DESC" },
	});

	const { projects, isLoading, isError } = useProjects(getQueryString([query]));

	return (
		<section className="w-full px-10">
			<div className="mx-auto max-w-5xl">
				<div className="container py-24">
					{data.title && (
						<div className="text-center mb-12">
							<div className="text-3xl font-black">{data.title}</div>
						</div>
					)}
					<div className="text-xl font-bold">{isError && "Error fetching projects"}</div>
					<div className="grid md:grid-cols-3 gap-12">
						{isLoading
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

export default Projects;
