import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step3 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 3</FormLabel>
      <Input
        value={formData.step3}
        onChange={(e) => setFormData({ ...formData, step3: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step3
