import { MdOutlineSearchOff } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full text-lg gap-2 opacity-75">
      <p className="text-xl">No Results Found</p>
      <MdOutlineSearchOff className="size-7" />
    </div>
  );
}
