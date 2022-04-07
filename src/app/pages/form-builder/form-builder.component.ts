import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { QuestionModalComponent } from 'src/app/shared/components/question-modal/question-modal.component';
import { QuestionType } from 'src/app/shared/consts/question-type.enum';
import { QuestionModel } from 'src/app/shared/models/question.model';
import { DestroyService } from 'src/app/shared/services/destroy.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { QuestionFormSaveService } from 'src/app/shared/services/question-form-save.serivce';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  providers: [DestroyService]
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
  QuestionType = QuestionType;

  form = this.fb.group({
    formArr: this.fb.array([])
  })

  get formArr(): FormArray {
    return this.form.get('formArr') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private destroyService: DestroyService,
    private questionFormSaveService: QuestionFormSaveService,
    private router: Router
  ) {}

  ngOnInit() {
    const records = this.questionFormSaveService.getData()
    records.forEach(record => {
      this.addAQuestionGroup(record);
    });
  }

  ngAfterViewInit() {
    this.formArr.valueChanges
      .pipe(
        takeUntil(this.destroyService.destroyed$)
      )
      .subscribe(() => {
        this.questionFormSaveService.syncData(this.formArr.value);
      });
  }

  addNewQuestion() {
    const dialogRef = this.modalService.open(QuestionModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.addAQuestionGroup(result)
    });
  }

  trackByIndex(index: number) {
    return index;
  }

  gotoAnswerPage() {
    this.router.navigate(['form/answers'])
  }

  private addAQuestionGroup(questionModel: QuestionModel) {
    this.formArr.push(this.fb.group({
      ...questionModel,
      answers: this.fb.array(questionModel.answers.map(answer => {
        const result = typeof answer === 'string'
          ? { value: answer, check: questionModel.type === QuestionType.CHECKBOX ? false : true, isOther: (answer as string).toLowerCase() === 'other' }
          : {...answer, isOther: answer.value.toLowerCase() === 'other'}
        return this.fb.group(result);
      }))
    }))
  }
}
