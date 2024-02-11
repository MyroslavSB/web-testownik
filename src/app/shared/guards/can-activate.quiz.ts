import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {QuestionsService} from "../../services/questions-service/questions.service";

export const canActivateQuiz: CanActivateFn = (route, state) => {
  if (inject(QuestionsService).canActivate()) {
    return true;

  } else {
    inject(Router).navigate(['']);
    return false;
  }
};
