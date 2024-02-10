import {IFileParsingStrategy} from "../interfaces/i-file-parsing-strategy";
import {IQuestion} from "../interfaces/i-question";
import {Observable} from "rxjs";

export class TxtFileParsingStrategy implements IFileParsingStrategy {
  parse(file: File): Observable<IQuestion> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        const lines = content.split(/\r?\n/);

        const correct_option_index = lines[0].trim().indexOf('1') - 1;
        const question = lines[1].trim();
        const options = lines.slice(2).map(line => ({text: line.trim()}));
        const file_name = file.name;

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
