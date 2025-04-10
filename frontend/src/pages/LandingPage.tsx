import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import axios from "axios";
import { PostCard } from "@/components/PostCard";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

interface Data {
  title: string;
  content: string;
  user: string;
  id: string;
}
export const LandingPage = () => {
  const [data, setData] = useState<Data[]>([]);
  const { setPostId } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchData = async () => {
    const res = await axios.get(
      "https://backend.hidden-snow-9313.workers.dev/api/v1/blog/bulk",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = res.data;
    console.log("Api Response", data);
    return data;
  };
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await fetchData();
        setData(response.blogs);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchDataAndUpdateState();
  }, []);

 
  return (
    <div>
      <Header />
      <Layout>
          <div className="mt-20 mx-4">
            {data.map((data, id) => (
              <PostCard
                key={id}
                data={data}
                id={id}
                onClick={() => {
                  navigate('/update');
                  setPostId({
                    id:data.id || null,
                    title: data.title,
                    content: data.content
                  });
                }}
              />
            ))}
          </div>
        
      </Layout>
    </div>
  );
};

// const cardData = [
//   {
//     user: "Robb",
//     title: "React Tutorial",
//     content: "This is a React tutorial that covers the basics of React.",
//   },
//   {
//     user: "Arya",
//     title: "JavaScript Essentials",
//     content: "Learn the fundamentals of JavaScript, the language of the web.",
//   },
//   {
//     user: "Jon",
//     title: "CSS Tricks",
//     content: "Explore advanced CSS techniques for modern web design.",
//   },
//   {
//     user: "Sansa",
//     title: "HTML Basics",
//     content: "A beginner's guide to understanding and using HTML.",
//   },
//   {
//     user: "Bran",
//     title: "Next.js Guide",
//     content:
//       "Learn how to build server-side rendered applications with Next.js.",
//   },
//   {
//     user: "Tyrion",
//     title: "Node.js Crash Course",
//     content: "Get started with backend development using Node.js.",
//   },
//   {
//     user: "Daenerys",
//     title: "Web Accessibility",
//     content: "Understand the importance of making your websites accessible.",
//   },
//   {
//     user: "Cersei",
//     title: "TypeScript for Beginners",
//     content: "An introduction to TypeScript and its benefits over JavaScript.",
//   },
//   {
//     user: "Jaime",
//     title: "Redux Simplified",
//     content: "Learn how to manage state effectively with Redux.",
//   },
//   {
//     user: "Samwell",
//     title: "GraphQL Basics",
//     content: "Discover how to use GraphQL for efficient data fetching.",
//   },
// ];
