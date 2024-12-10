import Search from "@/components/Search";
import SearchListView from "@/components/SearchListView";
import WordDetail from "@/components/WordDetail";
import { returnArray } from "@/utils/common";
import React, { Suspense } from "react";

const WordDetailPage = async ({
  params,
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { word } = await params;
  const { search } = await searchParams;

  const res = await fetch(`${process.env.SERVER_URL}/word/${word}`);
  const data = await res.json();

  return (
    <div>
      <div className="mb-10">
        <Search initialValue={word}>
          <Suspense key={search} fallback={<div>Loading..</div>}>
            {search && <SearchListView search={search || ""} />}
          </Suspense>
        </Search>
      </div>
      <WordDetail {...data} />
    </div>
  );
};

export default WordDetailPage;
