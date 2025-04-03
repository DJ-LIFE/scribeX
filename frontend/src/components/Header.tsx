import { Bell, Search, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-black/10 shadow ">
      <div className="max-w-420 p-2 flex justify-between mx-auto">
        <div className="flex gap-4 items-center">
          <a href="/" className="text-2xl font-serif font-semibold">
            ScribeX
          </a>
          <div className="hidden md:block">
            <div className="flex items-center rounded-full  bg-gray-100 p-2">
              <span>
                <Search className="cursor-pointer h-5 ml-2" />
              </span>
              <input
                type="text"
                className="pl-2 appearance-none "
                placeholder="search"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="md:hidden">
            <Search className="cursor-pointer" />
          </div>
          <div
            className="hidden md:block cursor-pointer"
            onClick={() => navigate("new-story")}
          >
            <span className="flex items-center gap-2 font-semibold text-sm text-gray-500 hover:text-gray-700">
              <SquarePen />
              Write
            </span>
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

export default Header;
