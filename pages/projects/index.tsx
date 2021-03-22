import { fetcher, getProjectData, getProjects, getStrapiURL } from "../../utils/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import ProjectList from "../../components/projects/project-list";
import Seo from "../../components/elements/seo";
import { Project } from "../../interfaces/project";
import { useRouter } from "next/router";
import { Media } from "../../interfaces/elements";
import useSWR from "swr";
import { useProjects } from "../../utils/projects";

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
