import React, { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface WorkStepProps {
  onNext: (works: string[]) => void;
}

const WorkStep: React.FC<WorkStepProps> = ({ onNext }) => {
  const [workInputs, setWorkInputs] = useState<string[]>(['']);

  const addWorkInput = () => {
    setWorkInputs([...workInputs, '']);
  };

  const handleChange = (index: number, value: string) => {
    const newInputs = [...workInputs];
    newInputs[index] = value;
    setWorkInputs(newInputs);
  };

  return (
    <VStack spacing={4}>
      {workInputs.map((work, index) => (
        <Input
          key={index}
          value={work}
          placeholder={`이번 주에 한 일 ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
      <Button onClick={addWorkInput} leftIcon={<AddIcon />} colorScheme="blue">
        일 추가
      </Button>
      <Button onClick={() => onNext(workInputs)} isDisabled={workInputs.some(work => !work)} colorScheme="blue">
        다음
      </Button>
    </VStack>
  );
};

export default WorkStep;
