import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AfterIfDirective } from './after-if.directive';

@NgModule({
  declarations: [AfterIfDirective],
  imports: [CommonModule],
  exports: [AfterIfDirective],
})
export class AfterIfModule {}
