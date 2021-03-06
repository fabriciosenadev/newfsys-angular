import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LaunchShow } from 'src/app/models/launch/launchShow.model';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { LaunchService } from 'src/app/services/user/launch.service';


@Component({
	selector: 'app-launch-show',
	templateUrl: 'launch-show.component.html',
	styleUrls: ['./launch-show.component.css']
})
export class LaunchShowComponent implements OnInit {

	token: string = localStorage.getItem('authToken');

	launch: LaunchShow;
	applicable: String;
	category: String;
	date: Date;
	status: String;
	description: String;
	id: Number;
	pay_method: String;
	value: Number;
	scheduling: String = '';

	launchDelete: any;

	constructor(
		private headerService: HeaderService,
		private router: Router,
		private currentRoute: ActivatedRoute,
		private launchService: LaunchService,
	) {
		headerService.headerData = {
			topMenu: 'appMenu',
			sideMenu: 'launchMenu',
		}
	}

	ngOnInit(): void {
		this.id = parseInt(this.currentRoute.snapshot.paramMap.get('id'));

		this.launchService.filterById(this.id, this.token).subscribe(launchReturn => {
			this.launch = launchReturn.data;
			// console.log(this.launch);
			if (this.launch === undefined) {
				this.launchService.showMessage('this register does not exist', true);
				this.router.navigate(['/app/profile']);
			}

			this.applicable = this.launch.applicable;
			this.date = this.launch.date;
			this.category = this.launch.category;
			this.pay_method = this.launch.pay_method;
			this.value = this.launch.value;
			this.description = this.launch.description;
			this.status = this.launch.status;
			this.scheduling = launchReturn.schedulingData.next_month;
			console.log(this.scheduling);
			
		});
	}

	deleteLaunch(): void {
		this.launchService.deleteLaunch(this.id, this.token).subscribe(deleteReturn => {
			this.launchDelete = deleteReturn;
			// console.log(this.launchDelete);
			this.launchService.showMessage(this.launchDelete.success);
			setInterval('3000');
			this.router.navigate(['/app/profile']);
		});
	}

	goBack(): void {
		window.history.back();
	}

	updateStatus(): void {
		if (this.pay_method === null && this.status === 'pending')
			this.status = 'received';
		else if (this.pay_method !== null && this.status === 'pending')
			this.status = 'paid';
		else
			this.status = 'pending';

		this.launchService.updateStatus(
			this.status,
			this.id,
			this.token
		).subscribe(updateReturn => {
			this.launchService.showMessage(updateReturn.success)
		});
	}

	sendToEdit() {
		let launchType = 'in';
		if (this.pay_method !== null) launchType = 'out';

		this.router.navigate([`/app/launch/${launchType}/${this.id}`]);
	}
}
