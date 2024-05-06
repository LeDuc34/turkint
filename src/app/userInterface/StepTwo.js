export default function StepTwo({ formData = {}, setFormData, nextStep, prevStep }) {
  const handleSelectionChange = (event) => {
      const { value } = event.target;
      setFormData(prevFormData => ({
          ...prevFormData,
          sauce: value
      }));
  };

  return (
      <div>
          <h2>Step2</h2>
          <label htmlFor="choices">Sauce:</label>
          <select id="choices" name="choices" value={formData.sauce || ''} onChange={handleSelectionChange}>
              <option value="Algerienne">Algerienne</option>
              <option value="Blanche">Blanche</option>
              <option value="Biggy">Biggy</option>
              <option value="Samourai">Samourai</option>
          </select>
          <br />
          <button onClick={nextStep}>Next</button>
          <button onClick={prevStep}>Prev</button>
      </div>
  );
}
