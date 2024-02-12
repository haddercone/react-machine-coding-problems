import { ChangeEvent, FormEvent, useState } from "react";
import StepTracker from "./StepTracker";

type FormProps = {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
};
const initialState: FormProps = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formState, setFormState] = useState(initialState);
  function handleNext() {
    if(currentStep === 1 && formState.firstName === "") {
        alert("Please fill in the First Name field before proceeding.");
        return;
    }
    if(currentStep === 2 && formState.lastName === "") {
        alert("Please fill in the Last Name field before proceeding.");
        return;
    }
    if(currentStep === 3 && formState.number === "") {
        alert("Please fill in the Number field before proceeding.");
        return;
    }
    if(currentStep === 4 && formState.email === "") {
        alert("Please fill in the Email field before proceeding.");
        return;
    }

    if (currentStep === 4) return;
    setCurrentStep((currentStep) => currentStep + 1);
    
  }
  function handlePrevious() {
    if (currentStep === 1) return;
    setCurrentStep((currentStep) => currentStep - 1);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((previousState) => (
        { ...previousState, [name] : value}
    ))
  }
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formState);
    
  }

  return (
    <>
      <StepTracker currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <form onSubmit={handleFormSubmit} className="form">
        {currentStep === 1 && (
          <input
          className="input"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formState.firstName}
            placeholder="Enter First name..."
          />
        )}
        {currentStep === 2 && (
          <input
          className="input"
            
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formState.lastName}
            placeholder="Enter Last name..."
          />
        )}
        {currentStep === 3 && (
          <input
          className="input"
            
            type="text"
            name="number"
            pattern="[0-9]"
            onChange={handleChange}
            value={formState.number}
            placeholder="Enter phone number..."
          />
        )}
        {currentStep === 4 && (
          <input
          className="input"
            
            type="email"
            name="email"
            onChange={handleChange}
            value={formState.email}
            placeholder="Enter Email..."
          />
        )}
        <div className="navBtnWrapper">
          <button type="button" onClick={handlePrevious}>
            Previous
          </button>
          {currentStep !== 4 ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button>Submit</button>
          )}
        </div>
      </form>
    </>
  );
};

export default MultiStepForm;
