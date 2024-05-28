export default function StepThree({ formData, setFormData, prevStep, addToBasket }) {
    const handleChangeSalade = (event) => {
      const { checked } = event.target;
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          salade: checked,
        };
        console.log(updatedFormData);
        return updatedFormData;
      });
    };
  
    const handleChangeTomate = (event) => {
      const { checked } = event.target;
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          tomate: checked,
        };
        console.log(updatedFormData);
        return updatedFormData;
      });
    };
  
    const handleChangeOnion = (event) => {
      const { checked } = event.target;
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          oignon: checked,
        };
        console.log(updatedFormData);
        return updatedFormData;
      });
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Étape 3</h2>
        <div className="mb-4">
          <input
            type="checkbox"
            onChange={handleChangeSalade}
            id="salade"
            className="mr-2 w-4 h-4 accent-red-500"
          />
          <label htmlFor="salade" className="text-sm font-medium text-gray-700">
            Salade
          </label>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            onChange={handleChangeTomate}
            id="tomate"
            className="mr-2 w-4 h-4 accent-red-500"
          />
          <label htmlFor="tomate" className="text-sm font-medium text-gray-700">
            Tomate
          </label>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            onChange={handleChangeOnion}
            id="oignon"
            className="mr-2 w-4 h-4 text-red-500 accent-red-500"
          />
          <label htmlFor="oignon" className="text-sm font-medium text-gray-700">
            Onion
          </label>
        </div>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Précédent
          </button>
          <button
            onClick={addToBasket}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    );
  }
  