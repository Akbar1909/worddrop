import { useMutation, UseMutationOptions } from "@tanstack/react-query";
const useAppMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => useMutation<TData, TError, TVariables, TContext>(options);

export default useAppMutation;
