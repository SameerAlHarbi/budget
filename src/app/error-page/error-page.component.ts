import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;
  errorType: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this.route.snapshot.data.message;
      this.errorType = this.route.snapshot.data.errorType;
      this.route.data.subscribe(
        (data: Data) => {
          this.errorMessage = data.message;
          this.errorType = data.errorType;
        }
      );
  }

}
