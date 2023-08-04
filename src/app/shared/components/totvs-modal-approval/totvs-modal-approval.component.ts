import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-totvs-modal-approval',
  templateUrl: './totvs-modal-approval.component.html',
  styleUrls: ['./totvs-modal-approval.component.scss'],
})
export class TotvsModalApprovalComponent implements OnInit {
  constructor(
    private modal: ModalController,
    private loadingController: LoadingController,
    private params: NavParams
  ) {}

  ngOnInit() {
    const data = this.params.data as any;
  }

  cancel(): void {
    this.modal.dismiss();
  }

  public showModal(): void {
    this.approve();
  }

  private async approve(): Promise<void> {
    const loading = await this.loadingController.create({
      duration: 5000,
    });
    await loading.present();
  }
}
