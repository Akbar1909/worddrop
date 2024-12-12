import Show from "./Show";
import Image from "next/image";

interface SearchItemViewProps {
  word: string;
  images: any[];
}

const SearchItemView = ({ word, images }: SearchItemViewProps) => {
  return (
    <div>
      <span>{word}</span>
    </div>
  );
};

export default SearchItemView;
