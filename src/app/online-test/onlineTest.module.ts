import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';
import { CountdownComponent } from './countdown/countdown.component';
import { PracticeService } from './practice/practice.service';
import { ExamService } from './exam/exam.service';
import { MistakeComponent } from './mistake/mistake.component';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExamComponent,
        PracticeComponent,
        CountdownComponent,
        MistakeComponent
    ],
    providers: [
        PracticeService,
        ExamService
    ],
    exports: [ExamComponent]
})
export class OnlineTestModule { }
