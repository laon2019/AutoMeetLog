import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step4 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 4</FormLabel>
      <Input
        value={formData.step4}
        onChange={(e) => setFormData({ ...formData, step4: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step4
