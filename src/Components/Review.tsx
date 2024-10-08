import React from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';
import { FormData } from '../Type/type';

interface ReviewProps {
  formData: FormData;
}

const Review = ({ formData } : ReviewProps) => {
  return (
    <Box>
      <h2>Review Your Answers</h2>
      <List spacing={3}>
        <ListItem>Question 1: {formData.step1}</ListItem>
        <ListItem>Question 2: {formData.step2}</ListItem>
        <ListItem>Question 3: {formData.step3}</ListItem>
        <ListItem>Question 4: {formData.step4}</ListItem>
        <ListItem>Question 5: {formData.step5}</ListItem>
        <ListItem>Question 6: {formData.step6}</ListItem>
      </List>
    </Box>
  );
};

export default Review;