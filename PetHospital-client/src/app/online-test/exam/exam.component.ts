import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild  } from '@angular/core';
import { ExamQuestion } from '../../model/model';
import { DataService } from './../../shared/service/data.service';
import { Http } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, AfterViewInit, OnDestroy {

  QuestionLists: any[];
  hour: number;
  minute: number;
  second: number;
  time_diff: number;
  startTime: number;
  isFinished: boolean;
  isOutTime: boolean;

  private timer;
  formData = {} as any;
  @ViewChild('examForm') examForm: NgForm;
  id: number;
  duration: number = 0;
  headers: Headers;
  options: RequestOptions;
  token: String;

  constructor(private dataService: DataService, private http: Http, private route: ActivatedRoute) {
        let strcookie = document.cookie;
        let arrcookie = strcookie.split("; ");
        for ( let i = 0; i < arrcookie.length; i++) {
           let arr = arrcookie[i].split("=");
           if (arr[0] === "token") {
              this.token = arr[1];
           }else if (arr[0] === "examTime") {
             this.duration = parseInt(arr[1], 10);
           }
        } 
        this.headers = new Headers({'Authorization': 'Token ' + this.token});
        this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
    this.isFinished = false;
    this.isOutTime = false;
    this.route.params.subscribe((params) => this.id = params.id);
    if (this.duration === 0) {
      this.route.params.subscribe((params) => this.duration = params.duration);
      this.duration = this.duration * 60;
    }
    this.dataService.getQuestions(this.id)
                        .subscribe(data => {
                          this.QuestionLists = data;
                        });
  }
  
  private get diff() {
      return this.time_diff;
  }
  private set diff(val) {
      this.time_diff = Math.floor(val / 1000);
      this.hour = Math.floor(this.time_diff / 3600);
      this.minute = Math.floor((this.time_diff % 3600) / 60);
      this.second = (this.time_diff % 3600) % 60;
  }
    
  ngAfterViewInit() {
      this.startTime = Date.now();
      this.startTime += this.duration * 1000;
      this.timer = setInterval(() => {
        this.diff = this.startTime - Date.now();
        if (!this.isFinished) {
          let time = 3600 * 1000;
          let exp = new Date();
          exp.setTime(exp.getTime() + time);
          document.cookie = "examTime=" + this.diff + ";expires=" + exp.toUTCString();
        }
        }, 1000);
      let self = this;
      setTimeout(function (){
        let exam = {
          examid: self.id,
          submission: self.examForm.value,
        };
        self.isFinished = false;
        self.isOutTime = true;
        if (!self.examForm.valid) {
          return;
        }
        let url = 'http://115.159.143.108/test/submit';
        self.http.post(url, exam, self.options).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
        });
      }, self.duration * 1000);
  }
  
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  doSubmit(obj: any) {
    if (!this.examForm.valid) {
      return;
    }
    let exam = {
      examid: this.id,
      submission: obj,
    };
    this.isFinished = true;
    let url = 'http://115.159.143.108/test/submit';
    this.http.post(url, exam, this.options).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
    });
  }
}
