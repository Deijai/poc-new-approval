import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotvsCardApprovalComponent } from './components/totvs-card-approval/totvs-card-approval.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotvsChangeBranchComponent } from './components/totvs-change-branch/totvs-change-branch.component';
import { TotvsFilterComponent } from './components/totvs-filter/totvs-filter.component';
import { TotvsHeaderComponent } from './components/totvs-header/totvs-header.component';
import { TotvsModalApprovalComponent } from './components/totvs-modal-approval/totvs-modal-approval.component';

@NgModule({
  declarations: [
    TotvsCardApprovalComponent,
    TotvsChangeBranchComponent,
    TotvsFilterComponent,
    TotvsHeaderComponent,
    TotvsModalApprovalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TotvsCardApprovalComponent,
    TotvsChangeBranchComponent,
    TotvsFilterComponent,
    CommonModule,
    IonicModule,
    RouterModule,
    TotvsHeaderComponent,
    TotvsModalApprovalComponent,
  ],
})
export class SharedModule {}
