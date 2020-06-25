import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from 'services/jwt-service.service';
import { DataServiceService } from 'services/data-service.service';
import { UserServiceService } from 'services/user-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  constructor(private jwtService:JwtServiceService,
    private data: DataServiceService,
    private user: UserServiceService) { }

  ngOnInit() {
    window.scroll(0,0);
  }
}
