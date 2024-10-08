export default function StepTwo({ formData = {}, setFormData, nextStep, prevStep }) {
    const handleSelectionChange = (event) => {
      const { value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        sauce: value,
      }));
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Étape 2</h2>
        <label htmlFor="choices" className="block text-sm font-medium text-gray-700 mb-2">Sauce:</label>
        <select
          id="choices"
          name="choices"
          value={formData.sauce || ''}
          onChange={handleSelectionChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
        >
          <option value="Algerienne">Algerienne</option>
          <option value="Blanche">Blanche</option>
          <option value="Biggy">Biggy</option>
          <option value="Samourai">Samourai</option>
        </select>
        <div className="mt-4 flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Précédent
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Suivant
          </button>
        </div>
      </div>
    );
  }
  