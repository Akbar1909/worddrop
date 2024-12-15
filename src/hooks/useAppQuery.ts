import { useQuery, UseQueryOptions } from "@tanstack/react-query";
const useAppQuery = (options: UseQueryOptions) => useQuery(options);

export default useAppQuery;
