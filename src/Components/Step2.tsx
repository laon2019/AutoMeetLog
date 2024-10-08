import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step2 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 2</FormLabel>
      <Input
        value={formData.step2}
        onChange={(e) => setFormData({ ...formData, step2: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step2
