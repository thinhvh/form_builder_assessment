import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe
  ],
  imports: [],
  exports: [SafeHtmlPipe]
})
export class SafePipeModule { }
