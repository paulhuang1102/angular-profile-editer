import {
    Component, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation, Inject,
    PLATFORM_ID
} from '@angular/core';
import * as d3 from 'd3';
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    currentUser;

    constructor(private renderer: Renderer2, private userService: UserService, private router: Router,
                private authService: AuthService, private alertService: AlertService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {


        if (isPlatformBrowser(this.platformId)) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.createPolygon();
        }

    }


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
            polygon_line
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

    login() {
        this.loading = true;
        this.authService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['profile/:id'], JSON.parse(localStorage.getItem('currentUser'))['id']);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                }
            );
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['redirect']);
    }

    @ViewChild('control') control: ElementRef;


}
