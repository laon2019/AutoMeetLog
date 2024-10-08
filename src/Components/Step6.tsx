import React from 'react'
import { Box, Input, FormLabel } from '@chakra-ui/react';
import { StepProps } from '../Type/type';

const Step6 = ({ formData, setFormData }: StepProps) => {
  return (
    <Box>
      <FormLabel>Question 6</FormLabel>
      <Input
        value={formData.step6}
        onChange={(e) => setFormData({ ...formData, step6: e.target.value })}
        placeholder="Enter your answer"
      />
    </Box>
  );
};

export default Step6
