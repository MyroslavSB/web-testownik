import {IFileParsingStrategy} from "../interfaces/i-file-parsing-strategy";
import {IQuestion} from "../interfaces/i-question";
import {Observable} from "rxjs";
import {IQuestionOption} from "../interfaces/i-question-option";

export class TxtFileParsingStrategy implements IFileParsingStrategy {
  parse(file: File): Observable<IQuestion> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        const content: string = reader.result as string;
        const lines: string[] = content.split(/\r?\n/);

        const correct_option_index: number = lines[0].trim().indexOf('1') - 1;
        const question: string = lines[1].trim();

        let fe_id: number = 0;
        const options: IQuestionOption[] = lines.slice(2).map((line: string): IQuestionOption => {
            return {
              text: line.trim(),
              id: fe_id++
            }
          }
        )

        const file_name: string = file.name;

        const questionObj: IQuestion = {
          question,
          remaining_attempts: 2,
          options,
          correct_option_index,
          file_name
        }

        observer.next(questionObj);
        observer.complete();
      };

      reader.onerror = error => observer.error(error);

      reader.readAsText(file);
    });
  }
}
