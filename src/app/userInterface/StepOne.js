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
          <br /><br />
          <button onClick={nextStep}>Next</button>
      </div>
  );
}
