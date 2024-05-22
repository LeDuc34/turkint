export default function StepOne({ formData = {}, setFormData, nextStep }) {
    const handleSelectionChange = (event) => {
      const { value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        pain: value,
      }));
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Etape 1</h2>
        <label htmlFor="choices" className="block text-sm font-medium text-gray-700 mb-2">Choix du pain</label>
        <select
          id="choices"
          name="pain"
          value={formData.pain || ''} // Ensures the select reflects the current state
          onChange={handleSelectionChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Pain Maison">Pain Maison</option>
          <option value="Galette">Galette</option>
        </select>
        <br /><br />
        <button
          onClick={nextStep}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    );
  }
  