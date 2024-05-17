export default function StepOne({ formData = {}, setFormData, nextStep }) {
  const handleSelectionChange = (event) => {
      const { value } = event.target;
      setFormData(prevFormData => ({
          ...prevFormData,
          pain: value
      }));
  };

  return (
      <div>
          <h2 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-red-600">Etape 1</h2>
          <div class="flex-row flex items-center">
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="choices"
              name="pain"
              value={formData.pain || ''} // Ensures the select reflects the current state
              onChange={handleSelectionChange}
          >
              <option value="Pain Maison">Pain Maison</option>
              <option value="Galette">Galette</option>
          </select>
          </div>
          <br /><br />
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={nextStep}>Next</button>
      </div>
  );
}
