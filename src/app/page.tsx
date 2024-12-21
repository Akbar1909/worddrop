import SearchListView from "@/components/SearchListView";
import WelcomeTitle from "@/components/WelcomeTitle";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { search } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SearchListView search={search || ""} />

      <WelcomeTitle />
    </div>
  );
}
