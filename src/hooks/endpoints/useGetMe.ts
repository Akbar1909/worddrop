import { useQueryClient } from "@tanstack/react-query";
import useAppQuery from "../useAppQuery";
import { request } from "@/services/request";

const useGetMe = () => {
  const queryClient=useQueryClient()
  const queryKey=["get-me"]
  const state = useAppQuery({
    queryKey,
    queryFn: () => request.get("/user/me"),
    retry: 1,
  });

  const me = state.data?.data || {};

  const inValidateQuery=()=>queryClient.invalidateQueries({queryKey})

  return {
    ...state,
    me,
    hasToken: Boolean(state.data?.data),
    inValidateQuery
  };
};

export default useGetMe;
