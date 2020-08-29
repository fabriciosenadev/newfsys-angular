import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
    selector: 'app-pie-chart',
    templateUrl: 'pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

    pieChartType: ChartType = 'pie';
    pieChartOptions: ChartOptions = {
        responsive: true
    }

    pieChartLabels: Label[] = ['SciFi', 'Drama', 'Comedy'];
    pieChartData: SingleDataSet = [30, 50, 20];
    pieChartLegend = true;
    pieChartPlugins = [];

    @Input() dataSet: [];
    @Input() labels: [];

    constructor() {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    ngOnInit(): void {
        this.pieChartData = this.dataSet;
        this.pieChartLabels = this.labels

    }

}
