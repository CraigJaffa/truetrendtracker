import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@core/utils';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import {environment} from '../../../../environments/environment'

@Injectable({
	providedIn: 'root',
})

export class AuthService {
	readonly apiURL: string = environment.apiUrl;

	constructor(private http: HttpClient,
		private router: Router,
		private activatedRoute: ActivatedRoute,) {
	}

	isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

	get isLoggedIn(): boolean {
		return this.isLoggedIn$.getValue();
	}

	signIn(form: string | unknown): any {
		this.http.post(`${this.apiURL}/auth/login`, form)
			.subscribe(
				(result: string | any) => {
					if (result._id) {
						const token = Array(4)
							.fill(0)
							.map(() => Math.random() * 99)
							.join('-');

						setItem(StorageItem.Auth, token);
						setItem(StorageItem.User, { user: result._id, role: result.role, username: result.usernane, name: result.name });
						this.isLoggedIn$.next(true);
						this.router.navigate(['/', 'dashboard']);
					} else {
						removeItem(StorageItem.Auth);
						removeItem(StorageItem.User);
						this.isLoggedIn$.next(false);
					}
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)
	}

	signOut(): void {
		removeItem(StorageItem.Auth);
		removeItem(StorageItem.User);
		this.isLoggedIn$.next(false);
	}
}
