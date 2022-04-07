import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { DIALOG_DATA } from '../../consts/dialog-token';
import { QuestionType } from '../../consts/question-type.enum';
import { DialogRef } from '../../models/dialog-ref.model';
import { DestroyService } from '../../services/destroy.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss'],
  providers: [DestroyService]
})
export class QuestionModalComponent implements AfterViewInit {
  readonly questionTypes = Object.values(QuestionType);
  readonly QuestionType = QuestionType;
  questionForm = this.fb.group({
    type: QuestionType.PARAGRAPH,
    question: ['', Validators.required],
    answers: this.fb.array([''])
  })

  get type(): QuestionType {
    return (this.questionForm.get('type') as FormControl).value;
  }

  get typeControl(): FormControl {
    return this.questionForm.get('type') as FormControl
  }
  
  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  get question(): FormControl {
    return this.questionForm.get('question') as FormControl;
  }

  ngAfterViewInit() {
    this.typeControl.valueChanges
      .pipe(
        takeUntil(this.destroyService.destroyed$)
      )
      .subscribe((value: QuestionType) => {
        if (value !== QuestionType.CHECKBOX) {
          while (this.answers.length > 1) {
            this.answers.removeAt(0)
          }
        }
      });
  }

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    private destroyService: DestroyService
  ) {}

  submit() {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    };

    this.dialogRef.close(this.questionForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  addOption() {
    this.answers.push(new FormControl(''));
  }
}
