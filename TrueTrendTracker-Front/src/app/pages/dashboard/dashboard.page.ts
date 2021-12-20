import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { getItem, StorageItem } from '@core/utils';
import { Observable, Subject } from 'rxjs';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import {environment} from '../../../environments/environment'

@Component({
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
	path = ROUTER_UTILS.config.base;
	readonly apiURL: string = environment.apiUrl;
	assetsList: Array<string | any> = [];

	items: Array<string> = []

	assetsSubject = new Subject<string>()
	tickersSubject = new Subject<string>()

	user: any = getItem(StorageItem.User)
	tickerList: Array<string | any> = []

	systemList: Array<string | any> = []

	tickers = this._fb.group({
		otherControls: [''],
		// The formArray, empty 
		myChoices: new FormArray([]),
	})

	constructor(private http: HttpClient, private _fb: FormBuilder) {
	}

	ngOnInit(): void {
		this.updateTickers()
	}

	getAssets(): Observable<string> {
		this.http.get(`${this.apiURL}/assets`)
			.subscribe(
				(result: Array<string> | any) => {
					this.tickersSubject.next(result)
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)

		return this.tickersSubject.asObservable()
	}

	modalInstance(event: any): void {
		if (event === 'add-ticker') {

			const formArray: FormArray = this.tickers.get('myChoices') as FormArray
			this.assetsList.map((el) => {
				if (!formArray.value.includes(el.symbol)) {
					formArray.push(new FormControl(el.symbol))
				}
			})

			this.getAssets().subscribe((r: string | any) => {
				const t = r as Array<string>
				t.filter((ar: any) => {
					if (this.assetsList.find(rm => (rm.symbol === ar.symbol))) {
						ar.status = true
					}
				})
				this.tickerList = t
			})
		}
	}

	getWatchlist(): Observable<string> {
		this.http.get(`${this.apiURL}/watchlist/${this.user.user}/crypto`)
			.subscribe(
				(result: Array<string> | any) => {
					this.assetsSubject.next(result)
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)

		return this.assetsSubject.asObservable()
	}

	onCheckChange(event: any): void {
		const formArray: FormArray = this.tickers.get('myChoices') as FormArray;

		/* Selected */
		if (event.target.checked) {
			// Add a new control in the arrayForm
			formArray.push(new FormControl(event.target.value));
		}
		/* unselected */
		else {
			// find the unselected element
			let i = 0;

			formArray.controls.forEach((ctrl: any) => {
				if (ctrl.value == event.target.value) {
					// Remove the unselected element from the arrayForm
					formArray.removeAt(i);
					return;
				}

				i++;
			});
		}
	}

	updateTickers(): void {
		this.getWatchlist().subscribe((r: string | any) => {
			this.assetsList = []
			const assetsList = r.currencies as Array<string>;
			assetsList.map((el: any) => {
				this.assetsList.push({
					symbol: el,
					url: `./assets/cryptocurrencies/${el.toLowerCase()}.png`
				})
			});
		})
	}

	addAssets(): void {
		const formArray: FormArray = this.tickers.get('myChoices') as FormArray;

		const watchlist = {
			user: this.user.user,
			crypto: {
				currencies: formArray.value
			}
		}

		this.http.post(`${this.apiURL}/watchlist`, watchlist)
			.subscribe(
				result => {
					this.updateTickers()
				},
				erro => {
					if (erro.status == 404) {
						console.log('Assets not found!');
					}
				}
			)
	}

	createSystem(): void {
		this.systemList.push(1);
	}

}
