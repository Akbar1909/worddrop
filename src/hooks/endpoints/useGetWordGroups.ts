import useAppQuery from "../useAppQuery";
import { request } from "@/services/request";
import { returnArray } from "@/utils/common";

const useGetWordGroups = () => {
  const state = useAppQuery({
    queryKey: ["group"],
    queryFn: () => request.get("/word-group"),
  });

  return {
    ...state,
    groups: returnArray(state?.data?.data),
  };
};

export default useGetWordGroups;
