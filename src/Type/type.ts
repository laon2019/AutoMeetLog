// types.ts
export interface WeeklyWork {
  description: string;
  difficulty: string;
  status: string;
  satisfaction: string;
  problems: string;
  workType: string;
  hoursWorked: string;
  additionalInfo: string;
  
  // 기타 선택 시 추가 입력값을 위한 필드들
  difficultyOther?: string;
  statusOther?: string;
  satisfactionOther?: string;
  problemsOther?: string;
  workTypeOther?: string;
  hoursWorkedOther?: string;
}

export interface MeetingFormProps {
  name: string;
  weeklyWorks: string;
}

// 옵션을 위한 타입 정의
export type WorkOption = {
  difficulty: string[];
  status: string[];
  satisfaction: string[];
  problems: string[];
  workType: string[];
  hours: string[];
};
