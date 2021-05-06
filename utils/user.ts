import useSWR from "swr";
import { User } from "../interfaces/user";
import { Service } from "./service";

export function useCurrentUser() {
    
	const { data, error } = useSWR<User>(`/users`, (url) => {
		return new Service<User>(url, true).getOne("me");
	});
    
    return {
		user: data || {} as User,
		isLoading: !error && !data,
		isError: error,
	};
}
