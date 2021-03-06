import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
@Component({
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss']
})
export class SignInPage {
	returnUrl: string;
	currentTab: number;

	loginForm = this.formBuilder.group({
		username: '',
		password: ''
	})

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
	) {
		this.returnUrl =
			this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
			`/${ROUTER_UTILS.config.base.home}`;

		this.currentTab = 1;
	}

	onClickSignIn(): void {
		this.authService.signIn(this.loginForm.value);
	}

	onClickChangeTab(tab: number): void {
		this.currentTab = tab;
	}
}
