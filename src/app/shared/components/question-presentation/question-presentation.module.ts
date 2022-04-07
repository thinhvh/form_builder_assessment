import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionPresentationComponent } from './question-presentation.component';

@NgModule({
  declarations: [
    QuestionPresentationComponent
  ],
  imports: [CommonModule],
  exports: [QuestionPresentationComponent]
})
export class QuestionPresentationModule { }
