import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.scss']
})
export class IndexnavbarComponent implements OnInit {


  status:boolean;
  constructor() { }

  ngOnInit() {
    this.status=false;
  }
  changeclass(){
    if (this.status==false) {
      this.status=true;
    } else {
      this.status=false;
    }
  }
  

}
