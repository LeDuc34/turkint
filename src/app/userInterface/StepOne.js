export default function StepOne({ formData={}, setFormData, nextStep }) {
  // This function updates the formData state with the selected option
  const handleSelectionChange = (event) => {
    const { value } = event.target;
    setFormData(prevformData => {
    const updatedFormData = {
      ...prevformData,
      pain: value
    };
    console.log(updatedFormData);
    });
  };

  return (
    <div>
      <h2>Etape 1</h2>
      <label htmlFor="choices">Choix du pain</label>
      <select
        id="choices"
        name="pain"
        value={formData.pain || ''} // Ensures the select reflects the current state
        onChange={handleSelectionChange}
      >
        <option value="Pain Maison">Pain Maison</option>
        <option value="Galette">Galette</option>
      </select>
      <br /><br/>
      <button onClick={nextStep}>Next</button>
      {/* Optionally, call submitFormData here or from the parent component */}
    </div>
  );
}
