import React, { useState } from "react";
import Step1 from "../Components/Step1";
import Step2 from "../Components/Step2";
import Step3 from "../Components/Step3";
import Step4 from "../Components/Step4";
import Step5 from "../Components/Step5";
import Review from "../Components/Review";
import { Box, Button } from "@chakra-ui/react";
import Step6 from "../Components/Step6";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: '',
    step6: '',
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    alert('Form Submitted');
    console.log(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      case 6:
        return <Step6 formData={formData} setFormData={setFormData} />;
      case 7:
        return <Review formData={formData} />;
      default:
        return <Step1 formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <Box p={4}>
        <h1>Multi-Step Form Survey</h1>
        <Box my={6}>{renderStep()}</Box>
        {currentStep > 1 && (
          <Button onClick={handlePreviousStep} mr={4}>
            Previous
          </Button>
        )}
        {currentStep < 7 ? (
          <Button onClick={handleNextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
    </Box>
  )
}

export default Home
