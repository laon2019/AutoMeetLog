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
아래는 주간 회의록 생성을 위한 정보입니다. 이 정보를 기반으로 주간 회의록을 작성해 주세요. 작성 시 다음 조건을 준수해 주세요.

말투는 존댓말을 사용해 주세요. 예: "xx했습니다", "xx입니다".
첫 번째 항목으로는 작업 내용을 적고, 그 아래에 관련 옵션들을 활용하여 잘 조합해 주세요.
모든 내용이 비슷하게 적지 않도록 유동적으로 결과가 나오게 해 주세요.
추가 내용은 1줄 이내로 작성해 주세요. 내용을 조금 다듬고 보완하여 생성해 주세요.
예시:

이름
xxx 작업을 했습니다.
어느 xx만큼 걸렸고 현재 진행 상태는 xx입니다. xx의 문제가 있었으며 약 xx만큼 소요되었습니다. 다음 주에 완료할 생각입니다.
xxx 작업을 했습니다.
누군가의 도움이 많이 필요합니다. 지금 진행 상태는 xx입니다. xx의 문제가 발생해서 약 xx만큼 소요되었습니다.
최종적으로 아래와 같은 형식으로 주간 회의록이 작성되도록 해 주세요:

규범님 @on la
금주 진행 사항
사이드 바 및 맵 버그 해결
constr_id 이슈 해결
사이드바 이슈 해결
url 리다이렉트 - constr_id가 없을 때만 Map 으로 이동 (커스텀 훅)
지도 버그 이슈 해결
지도 -> 현장대시보드 url 이동 로직 개발
geoJSON API 연결
민영님이 만들어주신 API 연결
현장개소 UI, 유효성 검사, API 연결
현장 개소 UI 효중님과 같이 작업
유효성 검사 민영님과 같이 작업
API 민영님과 작업
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
