import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step1 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 1</FormLabel>
      <Input
        value={formData.step1}
        onChange={(e) => setFormData({ ...formData, step1: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step1
