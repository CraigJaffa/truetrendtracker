import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { getItem, StorageItem } from '@core/utils';
import { Observable, Subject } from 'rxjs';

@Component({
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
	path = ROUTER_UTILS.config.base;
	readonly apiURL: string = 'http://localhost:8181';
	assetsList: Array<string | any> = [];
	subject = new Subject<string>()
	user: any = getItem(StorageItem.User)

	constructor(private http: HttpClient) {
	}

	ngOnInit(): void {
		this.getAssets().subscribe((r: string | any) => {
			const assetsList = r.currencies as Array<string>;
			assetsList.map((el) => {
				this.assetsList.push({
					symbol: el,
					url: `./assets/cryptocurrencies/${el.toLowerCase()}.png`
				})
			});
		})
	}

	acaoPrimaria(): void {
		//
	}

	getAssets(): Observable<string> {
		this.http.get(`${this.apiURL}/watchlist/${this.user.user}/crypto`)
			.subscribe(
				(result: Array<string> | any) => {
					this.subject.next(result)
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)

		return this.subject.asObservable()
	}

	addAssets(): Observable<string> {
		const watchlist = {
			user: this.user.user
		}

		this.http.post(`${this.apiURL}/watchlist`, watchlist)
			.subscribe(
				(result: Array<string> | any) => {
					this.subject.next(result)
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)

		return this.subject.asObservable()
	}

}
