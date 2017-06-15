import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    @ViewChild('header_bg') headerBg: ElementRef;

    constructor(private ngZone: NgZone) {
        window.onresize = (e) => {
            this.ngZone.run(() => {
                this.headerBg.nativeElement.removeChild(this.headerBg.nativeElement.childNodes[0]);
                this.createHeaderBg();
            });
        };
    }

    ngOnInit() {
        this.createHeaderBg();
    }

    createHeaderBg() {
        let element = this.headerBg.nativeElement;
        let height = 130;
        let width = window.innerWidth;
        let sitesArray = [];
        let svg = d3.select(element)
            .on("touchmove mousemove", moved)
            .append('svg')
            .attr('height', height)
            .attr('width', width);

        let sites = d3.range(25)
            .map(function (d) {
                return [Math.random() * width, Math.random() * height];
            });
        let voronoi = d3.voronoi()
            .extent([[-1, -1], [width, height]]);


        let site = svg.append('g')
            .attr("class", "sites")
            .selectAll("circle")
            .data(sites)
            .enter()
            .append('circle')
            .call(drawSites);

        let polygon = svg.append("g")
            .attr("class", "polygons")
            .selectAll("path")
            .data(voronoi.polygons(sitesArray))
            .enter().append("path")
            .call(drawPolygon);

        let link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(voronoi.links(sitesArray))
            .enter().append("line")
            .style('stroke', '#DDDDDD')
            .call(drawLink);

        function drawSites(site) {
            site
                .attr('r', 2)
                .style('fill', '#696969')
                .attr('cx', function (d) {
                    return d[0]
                })
                .attr('cy', function (d) {
                    return d[1]
                });

            sitesArray = sites;
        }

        function drawLink(link) {
            setTimeout(function () {
                link.attr("x1", function (d) {
                    return d.source[0];
                })
                    .attr("y1", function (d) {
                        return d.source[1];
                    })
                    .attr("x2", function (d) {
                        return d.target[0];
                    })
                    .attr("y2", function (d) {
                        return d.target[1];
                    });
            }, 500);
        }

        function drawPolygon(polygon) {
            polygon
                .attr("d", function (d) {
                    return d ? "M" + d.join("L") + "Z" : null;
                })
                .style('fill', 'none')
                .style('stroke', 'DCDCDC')
        }

        function moved() {
            sites[0] = d3.mouse(this);
            redraw();
        }

        function redraw() {
            let diagram = voronoi(sitesArray);
            polygon = polygon.data(diagram.polygons()).call(drawPolygon);
            link = link.data(diagram.links()), link.exit().remove();
            link = link.enter().append("line").merge(link).call(drawLink);
            site = site.data(sites).call(drawSites);
        }

    }

}


