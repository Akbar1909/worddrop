import Search from "@/components/Search";
import SearchListView from "@/components/SearchListView";
import WelcomeTitle from "@/components/WelcomeTitle";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { search } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <Search initialValue="">
        <Suspense key={search} fallback={<div>Loading..</div>}>
          {search && <SearchListView search={search || ""} />}
        </Suspense>
      </Search>
      <WelcomeTitle />
    </div>
  );
}
