import { Component, OnInit } from '@angular/core';
import {Video} from "../shared/models/search.interface";

const awsvideos1: string[] = [
  'https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining01.mp4',
  'https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining02.mp4'
];

const awsvideos: Video[] = [
  { videoUrl: "https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining01.mp4#t=0.5", title: "Purchasing Dep Training 01",description: "Purchasing Training " },
  { videoUrl: "https://hinawi-training-videos.s3.ca-central-1.amazonaws.com/PurchasingDepTraining02.mp4", title: "Purchasing DepT raining 02",description: "Cont. Purchasing Training " }
  ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = awsvideos;


  constructor() { }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event:any) => {
    console.log(event);
  }
}
