"use client";
import Logout from '../logout/page';
import ClearBasket from '../clearBaksetButton/page';
import DisplayBasket from '../displayBasketButton/page';
import { useState, useEffect } from 'react';
import StepOne from '../userInterface/StepOne';
import StepTwo from '../userInterface/StepTwo';
import StepThree from '../userInterface/StepThree';
import OnGoing from "../onGoing/page";
import axios from 'axios';
import { withAuth } from '../authContext/page';
import Header from "../header";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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

  const stepVariants = {
    initial: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  switch (currentStep) {
    case 1:
      return (
        <motion.div
          key="step1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={stepVariants}
          transition={{ duration: 1 }}
        >
          <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />
        </motion.div>
      );
    case 2:
      return (
        <motion.div
          key="step2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={stepVariants}
          transition={{ duration: 1 }}
        >
          <StepTwo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
        </motion.div>
      );
    case 3:
      return (
        <motion.div
          key="step3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={stepVariants}
          transition={{ duration: 1 }}
        >
          <StepThree formData={formData} setFormData={setFormData} prevStep={prevStep} addToBasket={addToBasket} />
        </motion.div>
      );
    case 4:
      return (
        <motion.div
          key="step4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={stepVariants}
          transition={{ duration: 1}}
        >
          <div className="text-green-500 text-center mt-4 font-bold">Article(s) ajouté(s) au panier</div>
        </motion.div>
      );
    default:
      return null;
  }
}

const Home = () => {
  const router = useRouter();
  const [hasOngoingOrder, setHasOngoingOrder] = useState(false);

  useEffect(() => {
    const checkOngoingOrder = async () => {
      const clientID = localStorage.getItem('ClientID');
      if (!clientID) return;

      try {
        const response = await axios.get(`/api/orders/current?ClientID=${clientID}`);
        if (response.data && response.data.status) {
          const status = response.data.status;
          if (['waiting', 'processing', 'ready'].includes(status)) {
            setHasOngoingOrder(true);
          }
        }
      } catch (error) {
        console.error('Error checking ongoing order:', error);
      }
    };

    checkOngoingOrder();
  }, []);

  const handleClick = () => {
    router.push('/basket');
  };

  const handleOngoingOrderClick =  async () => {
    const response = await axios.get('api/orders/getOrderID?ClientID='+localStorage.getItem('ClientID'))
    router.push('/orderTracking?orderID='+ response.data.CommandeID); // Change this to the correct route if necessary
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-1/5 w-1/2 container mx-auto bg-white bg-opacity-80 rounded-lg shadow-lg mb-24">
          <Form />
          <div className="flex justify-between p-4">
            <ClearBasket />
            <div>
              <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={handleClick}>Mon panier</button>
              {hasOngoingOrder && (
                <button className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleOngoingOrderClick}>Commande en cours</button>
              )}
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
};

export default withAuth(Home);
