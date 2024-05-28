"use client";
import Logout from '../logout/page';
import ClearBasket from '../clearBaksetButton/page';
import DisplayBasket from '../displayBasketButton/page';
import { useState } from 'react';
import StepOne from '../userInterface/StepOne';
import StepTwo from '../userInterface/StepTwo';
import StepThree from '../userInterface/StepThree';
import OnGoing from "../onGoing/page";
import axios from 'axios';
import { withAuth } from '../authContext/page';
import Header from "../header";
import { useRouter } from 'next/navigation'



function Form() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    pain: 'Pain Maison',
    sauce: 'Algerienne',
    salade: 'Non',
    tomate: 'Non',
    oignon: 'Non',
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const addToBasket = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      console.log(formData);
      const response = await axios.post('/api/baskets/add', {ClientID:localStorage.getItem('ClientID'),Article:"Kebab",Options:formData, ArticlePrice:10});
      console.log(response.data); 
      setCurrentStep(4);
    } catch (error: any) {
      console.log(error.response.data.message || 'Something went wrong');
    }
  }

  switch (currentStep) {
    case 1:
      return <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <StepTwo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <StepThree formData={formData} setFormData={setFormData} prevStep={prevStep} addToBasket={addToBasket} />;
    case 4:
      return <div className="text-green-500 text-center mt-4 font-bold">Article(s) ajouté(s) au panier</div>;
    default:
      return null;
  }
}

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/basket');
};
  return (
    /*<div className="container mx-auto p-4 bg-white text-center rounded-lg shadow-lg mb-24" >
      <Form />
      <div className="mt-6 flex justify-around">
        <Logout />
        <ClearBasket />
        <DisplayBasket />
        
      </div>
    </div>*/

    // juste pour y voir plus clair avec un backgroud blanc comme dans presentation
    <div>
    <Header />
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-1/5 w-1/2 container mx-auto bg-white bg-opacity-80 rounded-lg shadow-lg mb-24">
        <Form />
        <div className=" flex justify-between p-4">
          <ClearBasket />
          <div>
            <button   className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={handleClick}>Mon panier</button>
        </div>
        </div>
      </div>
      <footer className="fixed bottom-0 bg-red-600 shadow mt-2 w-full">
        <div className="container mx-auto py-4 px-4 text-center">
            <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
        </div>
    </footer>
    </div>
    </div>
  );
}

export default withAuth(Home);
