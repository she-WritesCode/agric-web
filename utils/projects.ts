import useSWR from "swr";
import { Project, ProjectCategory } from "../interfaces/project";
import { fetcher } from "./api";

export function useProjects(queryString = "_sort=created_at:DESC") {
	const { data, error } = useSWR<Project[]>(`/projects/?${queryString}`, fetcher);

	return {
		projects: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}
export function useProjectCategories(queryString = "_sort=created_at:DESC") {
	const { data, error } = useSWR<ProjectCategory[]>(`/project-categories/?${queryString}`, fetcher);

	return {
		categories: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}

export function useCheckout() {

	const storeProject = (project: Project, quantity: number) => {
		if (typeof window !== 'undefined') {
		window.localStorage.setItem("project", JSON.stringify({project, quantity}));
		}
	}
	const removeProject = () => {
		if (typeof window !== 'undefined') {
		window.localStorage.removeItem("project");
		}
	}
	const retriveProject = () => {
		if (typeof window !== 'undefined') {
		const stringValue = window.localStorage.getItem("project")
		if (stringValue) {
			return JSON.parse(stringValue) as { project: Project; quantity: number};
		}
	}
		return { project: null, quantity:0 }
	}

	return {
		retriveProject,
		storeProject,
		removeProject
	}

}