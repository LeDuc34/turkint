"use client";

import { useState } from 'react';
import StepOne from '../userInterface/StepOne';
import StepTwo from '../userInterface/StepTwo';
import StepThree from '../userInterface/StepThree';
import axios from 'axios';
import { withAuth } from '../authContext/page';

function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pain: 'Pain Maison',
    sauce:'Algerienne',
    salade: 'Oui',
    tomate: 'Oui',
    tignon : 'Oui',
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      console.log(formData);
      const response = await axios.post('/api/users/commande', formData);
      console.log(response.data); // Handle response according to your needs
      // Redirect or give a success message
    } catch (error: any) {
      console.log(error.response.data.message || 'Something went wrong');
    }
  }



  switch(currentStep) {
    case 1:
      return <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <StepTwo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <StepThree formData={formData} setFormData={setFormData} prevStep={prevStep} />;
    default:
      return <div>Form Completed</div>;
  }
}

export default withAuth(Home);