import { getProjectData, getProjects, getStrapiURL } from "../../utils/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import ProjectDetails from "../../components/projects/project-details";
import Seo from "../../components/elements/seo";
import { Project } from "../../interfaces/project";
import { useRouter } from 'next/router'

function generateSeoMetadata(project: Project) {
	return { metaTitle: project.title, metaDescription: project.shortDescription, shareImage: project.mainImage };
}

function SingleProject({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return (
		<>
			{/* Add meta tags for SEO*/}
			<Seo metadata={generateSeoMetadata(project)} />;
			<ProjectDetails project={project} />
		</>
	);
}

export async function getStaticPaths() {
	// Get all projects from Strapi
	const projects = await getProjects();
	const paths = projects?.map((project) => {
		return {
			params: { slug: project.slug },
		};
	});
	return { paths, fallback: true };
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
	// Call an external API endpoint to get projects
	const project = await getProjectData(params?.slug as string);

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
