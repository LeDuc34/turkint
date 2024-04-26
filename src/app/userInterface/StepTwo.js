export default function StepOne({ formData={}, setFormData, nextStep,prevStep}) {
    const handleSelectionChange = (event) => {
        const { value } = event.target;
        setFormData(prevformData => {
        const updatedFormData = {
            ...prevformData,
            sauce: value
        };
        console.log(updatedFormData);
        });
        }
    return (
      <div>
        <h2>Step2</h2>
        <label for="choices"> Sauce : </label>
        <select id="choices" name="choices" onChange={handleSelectionChange} >
            <option value="Algerienne">Algerienne</option>
            <option value="Blanche">Blanche</option>
            <option value="Biggy">Biggy</option>
            <option value="Samourai">Samourai</option>
        </select>
        <br></br>
        <button onClick={nextStep}>Next</button>
        <button onClick={prevStep}>Prev</button>
      </div>
    );
  }
  