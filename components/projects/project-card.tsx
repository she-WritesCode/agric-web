import { Card } from "primereact/card";
import { Project } from "../sections/projects";

function ProjectCard({ project }: { project: Project }) {
	return (
		<Card title={project.title} subTitle={project.location}>
			{project.description}
		</Card>
	);
}
export default ProjectCard;
