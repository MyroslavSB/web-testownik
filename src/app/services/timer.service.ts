import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, takeUntil} from "rxjs";

@Injectable()
export class TimerService implements OnDestroy {
  private destroySubj$: Subject<boolean> = new Subject<boolean>()

  private startTime: number = null
  private timeElapsed$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  ngOnDestroy() {
    this.destroySubj$.next(true)
  }

  public startTimer(date: number): void {
    this.startTime = date

    this.startTimeEmit()
  }

  private startTimeEmit(): void {
    interval(1000)
      .pipe(
        takeUntil(this.destroySubj$)
      ).subscribe(time => {
      console.log(Date.now()-this.startTime)
      this.timeElapsed$.next(Date.now() - this.startTime)
    })
  }

  public get timeElapsed(): Observable<number> {
    return this.timeElapsed$.asObservable()
  }
}
