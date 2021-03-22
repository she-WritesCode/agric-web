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