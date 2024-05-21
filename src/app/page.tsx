
"use client"
import { useRouter } from "next/navigation";
function Home() {
  const router = useRouter();

  const handleSubmit = async() => {
    router.push("/userInterface")
  }
  return (
    <div class="flex flex-col items-center justify-center items-center h-screen">
      <div class="w-80 items-center">
        <img src="logo.png"></img>
        <div class="flex items-center justify-center">
          <button onClick={handleSubmit} type="button" class="text-white font-extrabold flex justify-center w-50 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-50 font-medium rounded-full text-3xl w-60 py-5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Commander</button>
        </div>
      </div>
    </div>
  );
}
export default Home;


