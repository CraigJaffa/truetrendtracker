import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { ModalModule } from '@shell/ui/modal/modal.module';
import { FallbackImageModule } from '@core/directives/fallback-image/fallback-image.module';
import { AfterIfModule } from '@core/directives/after-if/after-if.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
	 ModalModule,
	 FallbackImageModule,
	 AfterIfModule,
	 FormsModule,
	 ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPage,
        data: {
          title: 'Dashboard',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],
})
export class DashboardModule {}
