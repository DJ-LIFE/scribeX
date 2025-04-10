import Header from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { AppContext } from "@/context/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePost, upDatePost } from "@jarvis22719/common-app";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const UpdateStory = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState<string | null>(null);
  const { postId } = useContext(AppContext);
const { register, handleSubmit, reset } = useForm<upDatePost>({
    resolver: zodResolver(updatePost),
    defaultValues: {
        title: postId?.title || "",
        content: postId?.content || "",
    },
});

  const handleInputFocus = (inputId: string) => {
    setIsClicked(inputId);
  };
  const onSubmit = async (data: upDatePost) => {
    const token = localStorage.getItem("token");
    const payload = { ...data, id: postId?.id };

    console.log("Payload being sent:", payload); // Debugging payload

    try {
      const res = await axios.put(
        "https://backend.hidden-snow-9313.workers.dev/api/v1/blog",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", res.data); // Debugging response

      toast("Story Updated Successfully", {
        description: "keep it up",
        action: {
          label: "close",
          onClick: () => console.log("toast closed"),
        },
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Error updating story:", error); // Debugging error
      toast("Story Update failed", {
        description: "Try Again!",
        action: {
          label: "close",
          onClick: () => console.log("Toast Closed"),
        },
      });
    }
  };
  return (
    <div>
      <Header />
      <Layout>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("title", { required: "Title is Required" })}
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
                {...register("content", { required: "Title is Required" })}
                className={`w-full text-xl pt-5 pl-4 font-serif appearence outline-none h-40 ${
                  isClicked !== "story" ? "ml-11" : "ml-0"
                }`}
                placeholder="Tell Your Story..."
                onFocus={() => handleInputFocus("story")}
              />
            </div>
            <Button type="submit">Update Story</Button>
          </div>
        </div>
        </form>
      </Layout>
    </div>
  );
};
