import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-month-details',
    templateUrl: 'month-details.component.html',
    styleUrls: ['./month-details.component.css']
})
export class MonthDetailsComponent implements OnInit {

    token = localStorage.getItem('authToken');
    year = '';
    month = '';

    pieChartInLabels = [];
    pieChartInData = [];

    pieChartOutLabels = [];
    pieChartOutData = [];

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private currentRoute: ActivatedRoute,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'launchMenu',
        }
    }

    ngOnInit(): void {
        this.year = this.currentRoute.snapshot.paramMap.get('year');
        this.month = this.currentRoute.snapshot.paramMap.get('month');

        if (parseInt(this.month) > 12 || parseInt(this.month) < 1) {
            this.systemService.showMessage('Mês informado não localizado', true)
            this.goBack();
        }
        
        this.pieChart();
    }

    pieChart() {
        this.systemService.pieChart(this.year, this.month, this.token)
            .subscribe(pieChartReturn => {
                //#region pieChartIn
                this.pieChartInLabels = pieChartReturn.categoriesIn;
                this.pieChartInData = pieChartReturn.valuesIn;
                //#endregion

                //#endregion pieChartOut
                this.pieChartOutLabels = pieChartReturn.categoriesOut;
                this.pieChartOutData = pieChartReturn.valuesOut;

                //#endregion
                if (this.pieChartInData.length == 0 && this.pieChartOutData.length == 0) {
                    let msg = 'Não existem dados de lançamento para o mês selecionado';
                    this.systemService.showMessage(msg, true);
                    this.goBack();
                }
            });
    }

    goBack(): void {
        window.history.back();
    }
}
