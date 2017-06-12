import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { SavePageService } from "../services/save-page.service";
import * as d3 from 'd3';
import { element } from "protractor";
import { transition } from "d3-transition";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private renderer: Renderer2) {

    }

    uploadFile = document.getElementById('fileToUpload');

    ngOnInit() {
        //     this.getData();
        //     this.createChart();
        //     if (this.data) {
        //         this.updateChart();
        //     }
        //     setTimeout(() => {
        //         setInterval(() => {
        //             this.getData();
        //             this.updateChart();
        //         }, 3000);
        //     }, 1000);
        this.createPolygon();
    }


    // @ViewChild('chart') private chartContainer: ElementRef;
    // private data = [];
    //
    // getData() {
    //     this.data = [];
    //     for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    //         this.data.push([
    //             `Index ${i}`,
    //             Math.floor(Math.random() * 100)
    //         ]);
    //     }
    // }
    //
    // private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    // private chart: any;
    // private width: number;
    // private height: number;
    // private xScale: any;
    // private yScale: any;
    // private colors: any;
    // private xAxis: any;
    // private yAxis: any;
    //
    //
    // createChart() {
    //     let element = this.chartContainer.nativeElement;
    //     this.width = element.offsetWidth - this.margin.left - this.margin.right;
    //     this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    //     let svg = d3.select(element).append('svg')
    //         .attr('width', element.offsetWidth)
    //         .attr('height', element.offsetHeight);
    //
    //     // chart plot area
    //     this.chart = svg.append('g')
    //         .attr('class', 'bars')
    //         .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    //
    //     // define X & Y domains
    //     let xDomain = this.data.map(d => d[0]);
    //     let yDomain = [0, d3.max(this.data, d => d[1])];
    //
    //     // create scales
    //     this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    //     this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
    //
    //     // bar colors
    //     this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);
    //
    //     // x & y axis
    //     this.xAxis = svg.append('g')
    //         .attr('class', 'axis axis-x')
    //         .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
    //         .call(d3.axisBottom(this.xScale));
    //     this.yAxis = svg.append('g')
    //         .attr('class', 'axis axis-y')
    //         .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    //         .call(d3.axisLeft(this.yScale));
    // }
    //
    // updateChart() {
    //     // update scales & axis
    //     this.xScale.domain(this.data.map(d => d[0]));
    //     this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    //     this.colors.domain([0, this.data.length]);
    //     this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //     this.yAxis.transition().call(d3.axisLeft(this.yScale));
    //
    //     let update = this.chart.selectAll('.bar')
    //         .data(this.data);
    //
    //     // remove exiting bars
    //     update.exit().remove();
    //
    //     // update existing bars
    //     this.chart.selectAll('.bar').transition()
    //         .attr('x', d => this.xScale(d[0]))
    //         .attr('y', d => this.yScale(d[1]))
    //         .attr('width', d => this.xScale.bandwidth())
    //         .attr('height', d => this.height - this.yScale(d[1]))
    //         .style('fill', (d, i) => this.colors(i));
    //
    //     // add new bars
    //     update
    //         .enter()
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', d => this.xScale(d[0]))
    //         .attr('y', d => this.yScale(0))
    //         .attr('width', this.xScale.bandwidth())
    //         .attr('height', 0)
    //         .style('fill', (d, i) => this.colors(i))
    //         .transition()
    //         .delay((d, i) => i * 10)
    //         .attr('y', d => this.yScale(d[1]))
    //         .attr('height', d => this.height - this.yScale(d[1]));
    // }

    @ViewChild('polygon') polygonContainer: ElementRef;

    createPolygon() {
        let element = this.polygonContainer.nativeElement;

        let shape_small = '64 144, 184 64, 704 208, 704 624, 584 704, 64 560';

        let shape1 = '0 100, 150 0, 800 180, 800 700, 650 800, 0 620';
        let shape2 = '800 100, 800 620, 150 800, 0 700, 0 180, 650 0';
        let shape3 = '700 0, 800 150, 620 800, 100 800, 0 650, 180 0';
        let shape4 = '620 800, 100 800, 0 650, 180 0, 700 0, 800 150';

        let svg = d3.select(element)
            .append('svg')
            .attr('width', 800)
            .attr('height', 800);

        let polygon_line = svg.append('polygon')
            .style('fill', 'none')
            .style('stroke', '#DDDDDD');

        repeat();

        let polygon = svg.append('polygon')
            .style('fill', ' #D3D3D3')
            .attr('points', shape_small);


        function repeat() {
            polygon_line.transition()
                .duration(2500)
                .attr('points', shape1)
                .transition()
                .duration(2500)
                .attr('points', shape3)
                .transition()
                .duration(2500)
                .attr('points', shape2)
                .transition()
                .duration(2500)
                .attr('points', shape4)
                .on("end", repeat);

        }

    }


}
