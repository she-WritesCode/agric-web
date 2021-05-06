import useSWR from "swr";
import { ProjectUpdate } from "../interfaces/project";
import { Service } from "./service";

export function useProjectUpdates(queryString = "_sort=created_at:DESC") {
	const { data, error } = useSWR<ProjectUpdate[]>(`/project-updates`, (url) => {
		return new Service<ProjectUpdate>(url, true).getAll(queryString);
	});

	return {
		updates: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}

export function useProjectUpdate(id: number) {
	const { data, error } = useSWR<ProjectUpdate>(`/project-updates`, (url) => {
		return new Service<ProjectUpdate>(url, true).getOne(id);
	});

	return {
		updates: data || {} as ProjectUpdate,
		isLoading: !error && !data,
		isError: error,
	};
}