import { Component, OnInit } from '@angular/core';
import {Video} from "@app/shared/models/search.interface";


const awsvideos: Video[] = [
  { videoUrl: "https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining01.mp4#t=0.5", title: "Purchasing Dep Training 01",description: "Purchasing Training " },
  { videoUrl: "https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining02.mp4", title: "Purchasing DepT raining 02",description: "Cont. Purchasing Training " }
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  videos: Video[] = awsvideos;


  constructor() { }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event:any) => {
    console.log(event);
  }

}
