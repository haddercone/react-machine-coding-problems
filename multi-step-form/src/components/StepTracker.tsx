import React, { SetStateAction, useEffect, useState } from "react";

const StepTracker = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const [visitedSteps, setVisitedSteps] = useState<number[]>([currentStep]);

  useEffect(() => {
    if (!visitedSteps.includes(currentStep)) {
      setVisitedSteps((prev) => [...prev, currentStep]);
    }
  }, [currentStep]);

  function handleClick(step: number) {
    setCurrentStep(step);
  }

  return (
    <>
      <div className="button-container">
        {Array.from({ length: 4 }).map((_, index) => {
          const isVisited = visitedSteps.includes(index + 1);
          return (
            <button
              key={`button_${index + 1}`}
              type="button"
              className={`stepButton ${isVisited ? "visited" : ""}`}
              disabled={!isVisited}
              onClick={() => {
                handleClick(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default StepTracker;
