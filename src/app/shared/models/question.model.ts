import { QuestionType } from "../consts/question-type.enum";

export interface QuestionModel {
  type: QuestionType;
  question: string;
  answers: Array<{ check?: boolean, value: string }>;
}