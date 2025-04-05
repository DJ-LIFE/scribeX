// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import AuthForm from "./AuthForm";
import { X } from "lucide-react";

const HomePage = () => {
    const [popup, setPopup] = useState(false);
    // const navigate = useNavigate()
  return (
    <div>
      <Header />
      <Layout className="space-y-10 py-40 font-serif flex flex-col items-start px-4">
        <h1 className="text-7xl font-bold">
          Write <br /> Create Publish
        </h1>
        <p className="text-2xl">Start writing your mind...</p>
        <Button className="text-2xl" onClick={() => setPopup(true)}>Get started</Button>
      </Layout>

      {popup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg h-150 w-120 shadow-2xl p-8 tansition-all duration-300 flex flex-col items-center">
            <div className="w-full flex justify-end">
            <Button className=" cursor-pointer bg-white shadow-none" variant="secondary" onClick={() => setPopup(false)}><X  /></Button>
            </div>
            <div className="flex justify-between items-center w-full py-10">
              <p className="text-3xl font-bold font-serif">Join ScribeX</p>
            </div>
                <AuthForm />
            </div>
        </div>
      )}
    </div>
    
  );
};

export default HomePage;
