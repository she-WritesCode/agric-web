import { Card } from "primereact/card";
import { Project } from "../sections/projects";

function ProjectDetails({ project }: { project: Project }) {
	return (
		<div>
			<Card title={project.title} subTitle={project.location}>
				{project.description}
			</Card>
		</div>
	);
}
export default ProjectDetails;
