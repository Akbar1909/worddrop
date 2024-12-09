import Show from "./Show";
import Image from "next/image";

interface SearchItemViewProps {
  word: string;
  images: any[];
}

const SearchItemView = ({ word, images }: SearchItemViewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{word}</span>
      <Show when={images.length > 0}>
        <div className="flex gap-2">
          {images.map((image, i) => (
            <Image
              alt={image.originalName}
              key={i}
              width={150}
              height={150}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              className="rounded-lg w-[150px] h-[150px]"
              src={`${process.env.SERVER_URL}/upload/serve/${image.originalName}`}
            />
          ))}
        </div>
      </Show>
    </div>
  );
};

export default SearchItemView;
