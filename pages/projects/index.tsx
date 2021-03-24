import ProjectList from "../../components/projects/project-list";
import Seo from "../../components/elements/seo";

function generateSeoMetadata() {
	return {
		metaTitle: "Projects",
		metaDescription: "Fund a projects and get returns on your investments",
		shareImage: null,
	};
}

function ProjectsPage() {
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata()} />
			<ProjectList />
		</>
	);
}

export default ProjectsPage;
