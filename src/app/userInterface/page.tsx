"use client";
import Logout from '../logout/page';
import ClearBasket from '../basket/clearBasket';
import DisplayBasket from '../basket/displayBasket';
import { useState } from 'react';
import StepOne from '../userInterface/StepOne';
import StepTwo from '../userInterface/StepTwo';
import StepThree from '../userInterface/StepThree';
import axios from 'axios';
import { withAuth } from '../authContext/page';

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
      const response = await axios.post('/api/baskets/add', {ClientID:localStorage.getItem('ClientID'),Article:"kebab",Options:formData, ArticlePrice:10});
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
      return <div className="text-green-500 text-center mt-4">Article(s) ajouté(s) au panier</div>;
    default:
      return null;
  }
}

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Kebab Shop</h1>
      <Form />
      <div className="mt-6 flex justify-around">
        <Logout />
        <ClearBasket />
        <DisplayBasket />
      </div>
    </div>
  );
}

export default withAuth(Home);
