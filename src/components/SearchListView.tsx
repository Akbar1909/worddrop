import { AnimatePresence } from "framer-motion";
import MotionUl from "./MotionUl";
import MotionLi from "./MotionLi";
import { returnArray } from "@/utils/common";
import SearchItemView from "./SearchItemView";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SearchListView = async ({ search }: { search: string }) => {
  const result = await fetch(
    `${process.env.SERVER_URL}/word/search?query=${search}`
  );

  const data = await result.json();

  return (
    <AnimatePresence>
      {returnArray(data).length > 0 && (
        <MotionUl
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full bg-white mt-2 rounded-lg shadow-lg z-10 overflow-hidden"
        >
          {returnArray(data).map(({ word, images }, index) => (
            <MotionLi
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <Link className="p-3" href={`/word/${word}`}>
                <SearchItemView word={word} images={returnArray(images)} />
              </Link>
            </MotionLi>
          ))}
        </MotionUl>
      )}
    </AnimatePresence>
  );
};

export default SearchListView;
