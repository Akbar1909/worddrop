import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useAppNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryParams = () => new URLSearchParams(window.location.search);

  const pushToRouter = (
    params: URLSearchParams,
    options: NavigateOptions = {}
  ) => {
    router.push(`${pathname}?${params.toString()}`, options);
  };

  const shallowPush = (params: URLSearchParams) => {
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return {
    router,
    pathname,
    searchParams,
    createQueryParams,
    pushToRouter,
    shallowPush,
  };
};

export default useAppNavigation;
