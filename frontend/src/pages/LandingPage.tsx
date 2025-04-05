import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Layout } from "../components/Layout";

interface Data {
  title: string,
  content: string,
  user: string
}
export const LandingPage = () => {
  const [data, setData] = useState<Data[]>([])
  const fetchData = async () => {
    const res = await fetch('https://backend.hidden-snow-9313.workers.dev/api/v1/blog/bulk', {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3ZWVlMGI5LTQwZmItNGE1YS05YjU4LWNhNTZmMmY5Yzc3OSJ9.-I-GjyOcY2jVLQBgPwwPWSBgR7tceMZortMTTQ1kDsE"
      }
    });
    const data = await res.json();
    console.log("Api Response", data);
    return data;
  }
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
  },[])
  return (
    <div>
      <Header />
      <Layout>
        <div className="mt-20 mx-4">
          {data.map((data, id) => (
            <div key={id} className="border rounded-md shadow flex flex-col p-2 my-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center justify-center rounded-full bg-blue-300 px-2">
                  U
                </span>
                {data.user}
              </div>
              <h4 className="text-4xl font-bold mt-2">{data.title}</h4>
              <p className="text-gray-600">{data.content}</p>
            </div>
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
