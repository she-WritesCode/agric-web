import { getProjectData, getProjects, getStrapiURL } from "../../utils/api";
import { GetStaticProps } from "next";
import ProjectDetails from "../../components/projects/project-details";

function SingleProject({ project }) {
	return <ProjectDetails project={project} />;
}

export async function getStaticPaths() {
	// Get all projects from Strapi
	const projects = await (await fetch(getStrapiURL("/projects"))).json();
	const paths = projects.map((project) => {
		return {
			params: { slug: project.slug },
		};
	});
	return { paths, fallback: true };
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
	// Call an external API endpoint to get projects
	const project = await getProjectData(params.slug as string);

	if (project == null) {
		// Giving the project no props will trigger a 404 project
		return { props: {} };
	}

	// We have the required project data, pass it to the project component
	// TODO: generate metadata for project

	return {
		props: {
			project,
			//   metadata,
		},
	};
};

export default SingleProject;
