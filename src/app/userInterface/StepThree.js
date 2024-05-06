export default function StepThree({ formData, setFormData, prevStep,addToBasket }) {
    const handleChangeSalade = (event) => {
        const { checked } = event.target;
        setFormData(prevformData => {
            const updatedFormData = {
                ...prevformData,
                salade: checked
            };
            console.log(updatedFormData);
            return updatedFormData;
        });
    };
    const handleChangeTomate = (event) => {
        const { checked } = event.target;
        setFormData(prevformData => {
            const updatedFormData = {
                ...prevformData,
                tomate: checked
            };
            console.log(updatedFormData);
            return updatedFormData;
        });
    };
    const handleChangeOnion = (event) => {
        const { checked } = event.target;
        setFormData(prevformData => {
            const updatedFormData = {
                ...prevformData,
                oignon: checked
            };
            console.log(updatedFormData);
            return updatedFormData;
        });
    };
    return (
        <div>
            <div>
                <input type="checkbox" onChange={handleChangeSalade} />
                <label>Salade</label>
            </div>
            <div>
                <input type="checkbox" onChange={handleChangeTomate}/>
                <label>Tomate</label>
            </div>
            <div>
                <input type="checkbox" onChange={handleChangeOnion}/>
                <label>Onion</label>
            </div>
            <button onClick={prevStep}>Prev</button>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
        
    );
}
  