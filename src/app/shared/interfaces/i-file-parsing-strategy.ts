import {IQuestion} from "./i-question";
import {Observable} from "rxjs";

export interface IFileParsingStrategy {
  parse(file: File, fe_id: number): Observable<IQuestion>

  processContent(content: string, fe_id: number, file_name: string): IQuestion
}
