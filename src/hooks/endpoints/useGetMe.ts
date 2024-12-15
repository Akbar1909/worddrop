import useAppQuery from "../useAppQuery";
import { request } from "@/services/request";

const useGetMe = () => {
  const state = useAppQuery({
    queryKey: ["get-me"],
    queryFn: () => request.get("/user/me"),
    retry: 1,
  });

  const me = state.data?.data || {};

  return {
    ...state,
    me,
    hasToken: Boolean(state.data?.data),
  };
};

export default useGetMe;
