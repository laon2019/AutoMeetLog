// NameStep.tsx
import React, { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';

interface NameStepProps {
  onNext: (name: string) => void;
}

const NameStep: React.FC<NameStepProps> = ({ onNext }) => {
  const [name, setName] = useState('');

  return (
    <VStack spacing={4}>
      <Input
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        onClick={() => onNext(name)}
        isDisabled={!name}
        colorScheme="blue"
      >
        다음
      </Button>
    </VStack>
  );
};

export default NameStep;
