import {Injectable} from '@angular/core';
import {from, mergeMap, Observable, toArray} from "rxjs";
import {IQuestion} from "../shared/interfaces/i-question";
import {ParsingStrategyFactory} from "../shared/strategies/parsing-strategy-factory";

@Injectable({
  providedIn: 'root'
})
export class QuestionsProcessingService {

  public processFiles(rawQuestions: File[]): Observable<IQuestion[]> {
    return from(rawQuestions).pipe(
      mergeMap(file => {
        const strategy = ParsingStrategyFactory.getStrategy(file)

        return strategy.parse(file)
      }),
      toArray()
    )
  }
}
