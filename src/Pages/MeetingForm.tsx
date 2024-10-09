import React, { useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NameStep from "../Components/NameStep";
import WorkStep from "../Components/WorkStep";
import WorkOptionStep from "../Components/WorkOptionStep";
import { MeetingFormProps, WeeklyWork } from "../Type/type";

const MeetingForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [works, setWorks] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<string>(""); // Changed to string

  // navigate를 사용해서 다른 경로로 이동할 수도 있음
  const navigate = useNavigate();

  const handleNameNext = (name: string) => {
    setName(name);
    setStep(1);
  };

  const handleWorkNext = (works: string[]) => {
    setWorks(works);
    setStep(2);
  };

  const handleWorkSubmit = (weeklyWorks: string) => {
    // Assuming `weeklyWorks` is a string, you can format it as needed
    setFinalData(weeklyWorks);
    setStep(3);
  };

  // 돌아가기 버튼을 클릭했을 때 처음 단계로 돌아가는 함수
  const handleReset = () => {
    setStep(0); // 스텝을 다시 첫 단계로 설정
    setName(""); // 이름 초기화
    setWorks([]); // 작업 초기화
    setFinalData(""); // 최종 데이터 초기화
  };

  return (
    <VStack spacing={8}>
      {step === 0 && <NameStep onNext={handleNameNext} />}
      {step === 1 && <WorkStep onNext={handleWorkNext} />}
      {step === 2 && (
        <WorkOptionStep name={name} works={works} onSubmit={handleWorkSubmit} />
      )}
      {step === 3 && (
        <VStack>
          <h2>결과</h2>
          <Box w={600} margin="auto">
            <Text>{finalData}</Text>
          </Box>
          <Button onClick={handleReset}>돌아가기</Button> {/* 돌아가기 버튼 */}
        </VStack>
      )}
    </VStack>
  );
};

export default MeetingForm;
