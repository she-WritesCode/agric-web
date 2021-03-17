import classNames from "classnames";
import { getProjectData, getProjects } from "../../utils/api";
import qs from "qs";
import { useEffect, useState } from "react";
import ProjectCard from "../projects/project-card";

export interface Project {
	id: number;
	title: string;
	slug: string;
	description: string;
	location: string;
	duration: number;
	roi: number;
	investmentFee: number;
	availableSlots: number;
	slotsCapacity: string;
	insuredBy: string;
	shortDescription: string;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
	project_categories: any[];
	order_products: any[];
}

const Projects = ({ data }) => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		getData(data.limit, Number(data.paginate)).then((proj) => {
			setProjects(proj);
		});
	}, []);

	return (
		<div className="container py-12">
			<h3>{data.title || ""}</h3>
			<div className="grid grid-col-3">
				{projects.map((project) => (
					<div key={project.id}>
						<ProjectCard project={project} />
					</div>
				))}
			</div>
		</div>
	);
};

async function getData(_limit: number, _start = 0) {
	const query = qs.stringify({ _limit, _start });
	return await getProjects(query);
}

export default Projects;
