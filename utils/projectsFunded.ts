import useSWR from "swr";
import { Investment } from "../interfaces/user";
import { Service } from "./service";

export function useInvestment(queryString = "_sort=created_at:DESC") {
	const { data, error } = useSWR<Investment[]>(`/investments/?${queryString}`, (url) => {
		return new Service<Investment>(url, true).getAll();
	});

	return {
		investments: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}