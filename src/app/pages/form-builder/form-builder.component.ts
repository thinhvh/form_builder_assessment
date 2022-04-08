import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

      this.addAQuestionGroup(result, true)
    });
  }

  trackByIndex(index: number) {
    return index;
  }

  gotoAnswerPage() {
    this.router.navigate(['form/answers'])
  }

  private addAQuestionGroup(questionModel: QuestionModel, extendOther = false) {
    this.formArr.push(this.fb.group({
      ...questionModel,
      answers: this.fb.array(questionModel.answers.reduce((previousValue, currAnswer, index) => {
        const result = typeof currAnswer === 'string'
          ? { value: currAnswer, check: questionModel.type === QuestionType.CHECKBOX ? false : true }
          : {...currAnswer}
        previousValue.push(this.fb.group(result));
        if (index === questionModel.answers.length - 1 && questionModel.otherOption && extendOther) {
          previousValue.push(this.fb.group({check: false, value: 'Other', isOther: true}))
        }
        return previousValue;
      }, [] as FormGroup[]))
    }));
  }
}
