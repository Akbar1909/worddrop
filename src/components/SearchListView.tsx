import { AnimatePresence } from "framer-motion";
import MotionUl from "./MotionUl";
import MotionLi from "./MotionLi";
import { returnArray } from "@/utils/common";
import Link from "next/link";
import SearchDropdown from "./SearchDropdown";
import Search from "./Search";

export const dynamic = "force-dynamic";

const SearchListView = async ({ search, children }: { search: string }) => {
  const result = await fetch(
    `${process.env.SERVER_URL}/word/search?query=${search}`
  );

  const data = await result.json();

  const preparedData = returnArray(data);

  return (
    <SearchDropdown
      isOpen={preparedData.length > 0}
      toggler={<Search initialValue={search} />}
    >
      <div className="flex flex-col bg-white rounded-[24px] border border-black overflow-hidden">
        {preparedData.map((word) => (
          <Link
            href={`/word/${word.word}`}
            key={word.text}
            className="px-3 py-2 hover:bg-gray-100 hover:underline border-b border-gray-200 flex items-center space-x-2"
          >
            {word.word}
          </Link>
        ))}
      </div>
    </SearchDropdown>
  );
};

export default SearchListView;
