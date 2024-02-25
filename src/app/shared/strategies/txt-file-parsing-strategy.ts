import {IFileParsingStrategy} from "../interfaces/i-file-parsing-strategy";
import {IQuestion} from "../interfaces/i-question";
import {Observable} from "rxjs";
import {IQuestionOption} from "../interfaces/i-question-option";

export class TxtFileParsingStrategy implements IFileParsingStrategy {
  parse(file: File, fe_id = 0): Observable<IQuestion> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        const content: string = reader.result as string;
        const questionObj = this.processContent(content, fe_id, file.name);
        observer.next(questionObj);
        observer.complete();
      };

      reader.onerror = error => observer.error(error);

      reader.readAsText(file);
    });
  }

  processContent(content: string, fe_id: number, file_name: string): IQuestion {
    const lines: string[] = content.split(/\r?\n/);

    const correct_option_ids: number[] = [];
    let index = -1;
    while ((index = lines[0].indexOf('1', index + 1)) !== -1) {
      correct_option_ids.push(index);
    }

    const question: string = lines[1].trim();

    let option_id: number = 1;
    const options: IQuestionOption[] = lines.slice(2).map((line: string): IQuestionOption => {
        return {
          text: line.trim(),
          id: option_id++
        }
      }
    );

    return {
      question,
      fe_id,
      remaining_attempts: 2,
      options,
      correct_option_ids,
      file_name
    };
  }}
