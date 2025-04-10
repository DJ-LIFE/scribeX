// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import AuthForm from "./AuthForm";
import { X } from "lucide-react";
import { AppContext } from "@/context/AppContext";

const HomePage = () => {
  const {isSigned} = useContext(AppContext);
    const [popup, setPopup] = useState(false);
    // const navigate = useNavigate()
    useEffect(() => {
      if(isSigned === true) {
        setPopup(false);
      }
    }, [])
    console.log(isSigned, "isSigned");
  return (
    <div>
      <Header />
      <Layout className="space-y-10 py-40 font-serif flex flex-col items-start px-4 relative">
        <h1 className="text-7xl font-bold">
          Write <br /> Create Publish
        </h1>
        <p className="text-2xl">Start writing your mind...</p>
        <Button className="text-2xl cursor-pointer" onClick={() => setPopup(true)}>Get started</Button>
        <span className="absolute top-40 -right-80"><img src="./heroImg.svg" alt="Hero Img" className="h-200 w-200" /></span>
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
