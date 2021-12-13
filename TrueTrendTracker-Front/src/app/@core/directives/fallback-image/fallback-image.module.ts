import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FallbackImageDirective } from './fallback-image.directive';

@NgModule({
  declarations: [FallbackImageDirective],
  imports: [CommonModule],
  exports: [FallbackImageDirective],
})
export class FallbackImageModule {}
