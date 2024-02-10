import {IQuestion} from "./i-question";
import {Observable} from "rxjs";

export interface IFileParsingStrategy {
  parse(file: File): Observable<IQuestion>
}
