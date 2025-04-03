import { CirclePlus } from "lucide-react";
import { Layout } from "../components/Layout";
import StoryHeader from "../components/StoryHeader";
import { useState } from "react";

export const NewStory = () => {
  const [isClicked, setIsClicked] = useState<string | null>(null);
  const handleInputFocus = (inputId: string) => {
    setIsClicked(inputId);
  };

  return (
    <div>
      <StoryHeader />
      <Layout>
        <div className="flex items-start md:px-20 lg:px-40 mt-10 py-4">
          <div className="flex flex-col items-center w-full">
            <div className={`flex items-center w-full gap-2`}>
              <CirclePlus
                className={`h-10 w-10 cursor-pointer ${
                  isClicked !== "title" ? "hidden" : "block"
                }`}
              />
              <input
                id="title"
                type="text"
                className={`w-full text-5xl pt-5 pl-4 font-serif appearence outline-none ${isClicked !== "title" ? "ml-12" : "ml-0"}`}
                placeholder="Title..."
                onFocus={() => handleInputFocus("title")}
              />
            </div>
            <div className="flex items-center w-full gap-2">
              <CirclePlus
                className={`h-10 w-10 cursor-pointer ${
                  isClicked !== "story" ? "hidden" : "block"
                }`}
              />
              <input
                id="story"
                type="text"
                className={`w-full text-xl pt-5 pl-4 font-serif appearence outline-none ${isClicked !== "story" ? "ml-11" : "ml-0"}`}
                placeholder="Tell Your Story..."
                onFocus={() => handleInputFocus("story")}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
