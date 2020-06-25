import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';

@Component({
  selector: 'app-static-content',
  templateUrl: './static-content.component.html',
  styleUrls: ['./static-content.component.scss']
})
export class StaticContentComponent implements OnInit {

  public action:string;
  router: Router;
  constructor(private activateRoute:ActivatedRoute,
    private data: DataServiceService) {
    this.action=this.activateRoute.snapshot.queryParams['action']
   }

  ngOnInit() {
    this.headerText();
  }
  headerText()
  {
    if(this.router.url=="/home")
    {
      this.data.changeMessage(true);
    }
    else{
      this.data.changeMessage(false);
    }
  }
}
