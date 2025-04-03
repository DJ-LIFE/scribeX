import { Bell, Ellipsis} from "lucide-react";

const StoryHeader = () => {
  return (
    <header className="border-b border-black/10 shadow">
      <div className="max-w-420 p-2 flex justify-between mx-auto">
        <div className="flex gap-4 items-center">
          <a href="/" className="text-4xl font-serif font-semibold">
            ScribeX
          </a>
          <div className="text-sm font-semibold">Draft</div>
        </div>
        <div className="flex gap-6 items-center">
          <button className="rounded-full px-4 text-sm cursor-pointer bg-green-800 py-1">
            <span className="text-white">publish</span>
          </button>
          <div className="rounded-full px-2 cursor-pointer">
            <Ellipsis className="text-gray-500 hover:text-gray-700" />
          </div>
          <div>
            <Bell className="cursor-pointer" />
          </div>
          <div className="rounded-full bg-green-200 w-10 h-10 flex items-center justify-center cursor-pointer">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoryHeader;
