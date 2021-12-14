import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	path = ROUTER_UTILS.config.base;
	public now: Date = new Date();
	open = false;

	constructor(private router: Router, private authService: AuthService) {
		setInterval(() => {
			this.now = new Date();
		}, 1);
	}

	onClickSignOut(): void {
		this.authService.signOut();

		const { root, signIn } = ROUTER_UTILS.config.auth;
		this.router.navigate(['/', root, signIn]);
	}

	openMenu(): void {
		this.open = !this.open;
	}
}
