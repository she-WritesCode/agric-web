import useSWR from "swr";
import { Investment } from "../interfaces/user";
import { Service } from "./service";

export function useInvestments(queryString = "_sort=created_at:DESC") {
	const { data, error } = useSWR<Investment[]>(`/investments`, (url) => {
		return new Service<Investment>(url, true).getAll(queryString);
	});

	return {
		investments: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}

export function useInvestment(id: number) {
	const { data, error } = useSWR<Investment>(`/investments/`, (url) => {
		return new Service<Investment>(url, true).getOne(id);
	});

	return {
		investment: data || {},
		isLoading: !error && !data,
		isError: error,
	};
}