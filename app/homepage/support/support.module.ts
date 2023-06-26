import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupportComponent} from './support.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [
        SupportComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class SupportModule { }
