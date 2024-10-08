import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step5 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 5</FormLabel>
      <Input
        value={formData.step5}
        onChange={(e) => setFormData({ ...formData, step5: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step5
