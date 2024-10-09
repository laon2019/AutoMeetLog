// WorkOptionStep.tsx
import React, { useState } from "react";
import { VStack, Select, Button, HStack, Input } from "@chakra-ui/react";
import { WeeklyWork, WorkOption } from "../Type/type";
import { getChatGPTResponse, getChatGPT4Response } from "../Api/gpt";

interface WorkOptionStepProps {
  works: string[];
  name: string; // Accept name as a prop
  onSubmit: (weeklyWorks: string) => void;
}

const workOptions: WorkOption = {
  difficulty: ["매우 어려움", "어려움", "보통", "쉬움", "매우 쉬움", "기타"],
  status: ["완료", "진행 중", "지연", "중단", "기타"],
  satisfaction: ["매우 만족", "만족", "보통", "불만족", "매우 불만족", "기타"],
  problems: [
    "시간 부족",
    "기술적 문제",
    "팀 커뮤니케이션 문제",
    "자료 부족",
    "기타",
  ],
  workType: ["개발", "디자인", "기획", "운영", "경영", "마케팅", "기타"],
  hours: ["1시간 미만", "1~3시간", "3~5시간", "하루", "2일 이상", "기타"],
};

const WorkOptionStep: React.FC<WorkOptionStepProps> = ({
  works,
  name,
  onSubmit,
}) => {
  const [weeklyWorks, setWeeklyWorks] = useState<WeeklyWork[]>(
    works.map((work) => ({
      description: work,
      difficulty: "",
      status: "",
      satisfaction: "",
      problems: "",
      workType: "",
      hoursWorked: "",
      additionalInfo: "",
    }))
  );

  const handleOptionChange = (
    index: number,
    field: keyof WeeklyWork,
    value: string
  ) => {
    const newWorks = [...weeklyWorks];
    newWorks[index][field] = value;
    setWeeklyWorks(newWorks);
  };

  const renderSelectWithOtherOption = (
    index: number,
    field: keyof WeeklyWork,
    options: string[]
  ) => (
    <>
      <Select
        placeholder={`${field}을 선택하세요`}
        value={weeklyWorks[index][field]}
        onChange={(e) => handleOptionChange(index, field, e.target.value)}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {weeklyWorks[index][field] === "기타" && (
        <Input
          placeholder="기타 내용을 입력하세요"
          value={
            (field === "difficulty" && weeklyWorks[index].difficultyOther) ||
            (field === "status" && weeklyWorks[index].statusOther) ||
            (field === "satisfaction" &&
              weeklyWorks[index].satisfactionOther) ||
            (field === "problems" && weeklyWorks[index].problemsOther) ||
            (field === "workType" && weeklyWorks[index].workTypeOther) ||
            (field === "hoursWorked" && weeklyWorks[index].hoursWorkedOther) ||
            ""
          }
          onChange={(e) =>
            handleOptionChange(
              index,
              `${field}Other` as keyof WeeklyWork,
              e.target.value
            )
          }
        />
      )}
    </>
  );

  const handleCompletion = async () => {
    const prompt =
      `이름: ${name}\n` +
      weeklyWorks
        .map((work) => {
          return `작업 설명: ${work.description.trim()}
난이도: ${work.difficulty.trim() === "기타" ? work.difficultyOther?.trim() : work.difficulty.trim()}
상태: ${work.status.trim() === "기타" ? work.statusOther?.trim() : work.status.trim()}
만족도: ${work.satisfaction.trim() === "기타" ? work.satisfactionOther?.trim() : work.satisfaction.trim()}
문제: ${work.problems.trim() === "기타" ? work.problemsOther?.trim() : work.problems.trim()}
작업 유형: ${work.workType.trim() === "기타" ? work.workTypeOther?.trim() : work.workType.trim()}
소요 시간: ${work.hoursWorked.trim() === "기타" ? work.hoursWorkedOther?.trim() : work.hoursWorked.trim()}
추가 사항: ${work.additionalInfo.trim()}`;
        })
        .join("\n");
    const additionalInstructions = `
    위의 정보는 주간 회의에 대한 요약이야 이것을 통해 주간회의를 자동으로 만들어줘.
    1. 말투는 존댓말을 사용해줘 xx했습니다. xx입니다.
    2. 첫번째는 작업내용을 적고 그밑에 옵션들을 활용해서 잘조합해줘
    3. 모든 내용이 비슷하게 적지말고 조금 유동적으로 결과가 나오게 해줘
    4. 추가내용은 1줄 이내로 작성해줘 내용을 조금 다듬고 보완해서 만들어줘
    예시를 들어줄게 
    ex) 
    이름
    - xxx 작업을 했습니다. 
      - 어느 xx만큼 걸렸고 현재 진행 상태는 xx입니다. xx의 문제가 있었으며 약 xx만큰 소요되었습니다. 다음주에 완료할 생각입니다.
    - xxx 작업을 했습니다. 
      - 누군가의 도움이 많이 필요합니다. 지금 진행 상태는 xx입니다. xx의 문제가 발생해서 약 xx만큰 소요되었습니다. 
    
    이런식으로 데이터를 활용해서 자동으로 주간회의록을 만들어줘
    `;

    const completePrompt = `${prompt}\n${additionalInstructions}`;
    console.log(completePrompt);
    try {
      const chatGPTResponse = await getChatGPT4Response(prompt);
      //   console.log('ChatGPT 응답:', chatGPTResponse);
      //   // If necessary, you can call onSubmit here
      onSubmit(chatGPTResponse);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  return (
    <VStack spacing={4}>
      {weeklyWorks.map((work, index) => (
        <VStack key={index} spacing={2} align="start">
          <HStack>
            <div>{work.description}</div>
          </HStack>

          {renderSelectWithOtherOption(
            index,
            "difficulty",
            workOptions.difficulty
          )}
          {renderSelectWithOtherOption(index, "status", workOptions.status)}
          {renderSelectWithOtherOption(
            index,
            "satisfaction",
            workOptions.satisfaction
          )}
          {renderSelectWithOtherOption(index, "problems", workOptions.problems)}
          {renderSelectWithOtherOption(index, "workType", workOptions.workType)}
          {renderSelectWithOtherOption(index, "hoursWorked", workOptions.hours)}

          <Input
            placeholder="추가 사항을 입력하세요"
            value={work.additionalInfo}
            onChange={(e) =>
              handleOptionChange(index, "additionalInfo", e.target.value)
            }
          />
        </VStack>
      ))}
      <Button onClick={handleCompletion} colorScheme="blue">
        완료
      </Button>
    </VStack>
  );
};

export default WorkOptionStep;
