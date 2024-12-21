import SearchListView from "@/components/SearchListView";
import WordDetail from "@/components/WordDetail";

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
        <SearchListView search={search || ""} />
      </div>
      <WordDetail {...data} />
    </div>
  );
};

export default WordDetailPage;
