import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormAnswersComponent } from './pages/form-answers/form-answers.component';
import { QuestionPresentationModule } from './shared/components/question-presentation/question-presentation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionModalComponent } from './shared/components/question-modal/question-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TransformEnterRowPipeModule } from './shared/pipes/transform-enter-row/transform-enter-row.module';
import { SafePipeModule } from './shared/pipes/safe/safe-pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormAnswersComponent,
    QuestionModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionPresentationModule,
    ReactiveFormsModule,
    OverlayModule,
    TransformEnterRowPipeModule,
    SafePipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
