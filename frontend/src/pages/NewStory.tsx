import { CirclePlus } from "lucide-react";
import { Layout } from "../components/Layout";
import StoryHeader from "../components/StoryHeader";
import { useRef, useState } from "react";
import axios from "axios";
import { createPost, CreatePost } from "../../../common/src";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

export const NewStory = () => {
  const navigate = useNavigate();
  
  const [isClicked, setIsClicked] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {register, handleSubmit, reset} = useForm<CreatePost>({
    resolver: zodResolver(createPost),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  const handleInputFocus = (inputId: string) => {
    setIsClicked(inputId);
  };
  const onSubmit = async (data: CreatePost) => {
    const payload = data;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://backend.hidden-snow-9313.workers.dev/api/v1/blog",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Story created successfully:", res.data);
      toast("Story Created Successfully!", {
        description: "Way to go",
        action: {
          label: "close",
          onClick: () => console.log("Toast Closed"),
        },
      });
      reset();
      navigate('/')
    } catch (error) {
      console.error("Story Creation Failed", error);
      toast("Story Creation failed", {
        description: "Try Again!",
        action: {
          label: "close",
          onClick: () => console.log("Toast Closed"),
        },
      });
    }
  };

  const handlePublish = () => {
    if(formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <div>
      <StoryHeader onPublish = {handlePublish} />
      <Layout>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
                  {...register('title', {required: "Title is Required"})}
                  className={`w-full text-5xl pt-5 pl-4 font-serif appearence outline-none ${
                    isClicked !== "title" ? "ml-12" : "ml-0"
                  }`}
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
                <textarea
                  id="story"
                  {...register('content', {required: "Title is Required"})}
                  className={`w-full text-xl pt-5 pl-4 font-serif appearence outline-none h-40 ${
                    isClicked !== "story" ? "ml-11" : "ml-0"
                  }`}
                  placeholder="Tell Your Story..."
                  onFocus={() => handleInputFocus("story")}
                />
              </div>
              {/* <Button type="submit">Submit</Button> */}
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
};
