import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { QuestionModel } from 'src/app/shared/models/question.model';
import { DestroyService } from 'src/app/shared/services/destroy.service';
import { QuestionFormSaveService } from 'src/app/shared/services/question-form-save.serivce';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss'],
  providers: [DestroyService]
})
export class FormAnswersComponent implements OnInit {
  questions: QuestionModel[] = [];

  constructor(
    private questionFormSaveService: QuestionFormSaveService,
    private destroyService: DestroyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.questionFormSaveService.getData$()
      .pipe(
        takeUntil(this.destroyService.destroyed$)
      )
      .subscribe(data => {
        this.questions = data;
      });
  }

  backToFormBuilder() {
    this.router.navigate(['form/builder'])
  }
}
