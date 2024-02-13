import { useState } from "react";
import "./App.css";

function Cmp1() {
  return <p>Hi 1</p>;
}
function Cmp2() {
  return <p>Hi 2</p>;
}
function Cmp3() {
  return <p>Hi 3</p>;
}
function Cmp4() {
  return <p>Hi 4</p>;
}

const componentsConfig = [
  {
    name: "component 1",
    Component: <Cmp1 />,
  },
  {
    name: "component 2",
    Component: <Cmp2 />,
  },
  {
    name: "component 3",
    Component: <Cmp3 />,
  },
  {
    name: "component 4",
    Component: <Cmp4 />,
  },
];

function App() {
  const components = componentsConfig;
  const [step, setStep] = useState(1);

  if (!components.length) {
    return null;
  }

  function handlePrev() {
    if(step === 1) return;
    setStep((prev) => prev - 1);
  }

  function handleNext() {
    // setStep((prev) => (prev % components.length) + 1);
    if(step === components.length) return;
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <h2 style={{textAlign: "center"}}>Config driver UI Example</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {components.map((component, index) => {
          const isCurrentStep = step === index + 1;
          return (
            isCurrentStep && (
              <div key={component.name}>
                <p>{component.name}</p>
                {component.Component}
              </div>
            )
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export default App;
