import Search from "@/components/Search";
import SearchListView from "@/components/SearchListView";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { search } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to Recall Words
        </h1>
        <p className="text-xl text-gray-600">
          Learn, play, and master words in a fun and interactive way!
        </p>
      </section>
      <Search>
        <Suspense key={search} fallback={<div>Loading..</div>}>
          {search && <SearchListView search={search || ""} />}
        </Suspense>
      </Search>
    </div>
  );
}
