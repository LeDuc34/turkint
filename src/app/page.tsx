"use client"
import { useRouter } from "next/navigation";
import Header from "./header";
import { useState } from "react";
import '../../styles/globals.css';

function Home() {
  const router = useRouter();
  const [shake, setShake] = useState(false);

  const handleSubmit = async() => {
    router.push("/userInterface")
  }

  const handleLogoClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Remove shake class after animation
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-80 items-center">
          <img src="logo.png" className={shake ? "shake" : ""} onClick={handleLogoClick} />
          <div className="flex items-center justify-center">
            <button onClick={handleSubmit} type="button" className="duration-300 hover:scale-125 text-white flex justify-center w-50 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-50 font-medium rounded-full text-3xl w-60 py-5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Commander</button>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 bg-red-600 shadow mt-2 w-full">
        <div className="container mx-auto py-4 px-4 text-center">
          <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
export default Home;
