import { DocumentApproval } from './../../interfaces/approval.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ApprovalElement,
  ApprovalModel,
  Document,
  Measurements,
  PurchaseOrder,
  PurchaseRequest,
} from '../../interfaces/approval.interface';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TotvsModalApprovalComponent } from '../totvs-modal-approval/totvs-modal-approval.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-totvs-card-approval',
  templateUrl: './totvs-card-approval.component.html',
  styleUrls: ['./totvs-card-approval.component.scss'],
})
export class TotvsCardApprovalComponent implements OnInit {
  public formPurchaseOrder!: FormGroup;
  public formPurchaseRequest!: FormGroup;
  public formMeasurement!: FormGroup;
  @Input() approvalsPurchaseOrder: ApprovalModel[] = [];
  @Input() approvalsPurchaseRequest: ApprovalModel[] = [];
  @Input() approvalsMeasurement: ApprovalModel[] = [];

  @Input()
  approval: boolean = false;

  public selectedItems: Document[] = [];

  public checked: boolean = false;
  public disabledPurchaseRequest!: boolean;
  public disabledPurchaseOrder!: boolean;
  public disabledMeasurement!: boolean;

  @Output()
  emitterDetails: EventEmitter<string> = new EventEmitter();

  @Output()
  emitterItemSelected: EventEmitter<boolean> = new EventEmitter();

  @Output()
  emitterDataApprovals: EventEmitter<
    (PurchaseOrder | PurchaseRequest | Measurements)[]
  > = new EventEmitter();

  @Input()
  selected!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private modalApproval: ModalController
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.getItemsPurchaseOrder();
    this.getItemsPurchaseRequest();
    this.getItemsMeasurement();
  }

  initForms(): void {
    // formPurchaseOrder
    this.formPurchaseOrder = this.formBuilder.group({
      documents: new FormArray([]),
    });

    // formPurchaseRequest
    this.formPurchaseRequest = this.formBuilder.group({
      documents: new FormArray([]),
    });

    // formMeasurement
    this.formMeasurement = this.formBuilder.group({
      documents: new FormArray([]),
    });
  }

  goToDetails(value: any) {
    this.emitterDetails.emit(value);
  }

  // PurchaseOrder
  submitPurchaseOrder() {
    const selectedItemsIds = this.formPurchaseOrder.value.documents
      .map((checked: any, i: any) => {
        let result;
        this.approvalsPurchaseOrder.map((item, index) => {
          result = checked ? item.documents[i] : null;
        });
        return result;
      })
      .filter((v: any) => v !== null);
    this.selectedItems = selectedItemsIds;
    this.disabledPurchaseOrder =
      this.formPurchaseOrder.value.documents.includes(true);
    this.selected = this.formPurchaseOrder.value.documents.includes(true);
    this.emitterItemSelected.emit(this.selected);
  }

  // PurchaseRequest
  submitPurchaseRequest() {
    const selectedItemsIds = this.formPurchaseRequest.value.documents
      .map((checked: any, i: any) => {
        let result;
        this.approvalsPurchaseRequest.map((item, index) => {
          result = checked ? item.documents[i].documentNumber : null;
        });
        return result;
      })
      .filter((v: any) => v !== null);
    this.selectedItems = selectedItemsIds;
    this.disabledPurchaseRequest =
      this.formPurchaseRequest.value.documents.includes(true);
    this.selected = this.formPurchaseRequest.value.documents.includes(true);
    this.emitterItemSelected.emit(this.selected);
  }

  // Measurement
  submitMeasurement() {
    const selectedItemsIds = this.formMeasurement.value.documents
      .map((checked: any, i: any) => {
        let result;
        this.approvalsMeasurement.map((item, index) => {
          result = checked ? item.documents[i].documentNumber : null;
        });
        return result;
      })
      .filter((v: any) => v !== null);
    this.selectedItems = selectedItemsIds;
    this.disabledMeasurement =
      this.formMeasurement.value.documents.includes(true);
    this.selected = this.formMeasurement.value.documents.includes(true);
    this.emitterItemSelected.emit(this.selected);

    this.getApproval();
  }

  // PurchaseRequest
  getItemsPurchaseRequest() {
    this.selectedItems = [];
    let controls!: any;
    this.approvalsPurchaseRequest.map((item, index) => {
      controls = item.documents.map((c) => {
        return new FormControl(false);
      });
    });
    this.formPurchaseRequest = this.formBuilder.group({
      documents: new FormArray(controls),
    });
  }

  // PurchaseOrder
  getItemsPurchaseOrder() {
    this.selectedItems = [];
    let controls!: any;
    this.approvalsPurchaseOrder.map((item, index) => {
      controls = item.documents.map((c) => {
        return new FormControl(false);
      });
    });
    this.formPurchaseOrder = this.formBuilder.group({
      documents: new FormArray(controls),
    });
  }

  // Measurement
  getItemsMeasurement() {
    this.selectedItems = [];
    let controls!: any;
    this.approvalsMeasurement.map((item, index) => {
      controls = item.documents.map((c) => {
        return new FormControl(false);
      });
    });
    this.formMeasurement = this.formBuilder.group({
      documents: new FormArray(controls),
    });
  }

  // submit to approval document
  async approvalDocument() {
    if (!this.selectedItems) {
      return;
    }
    //this.transformItemToApprove(this.selectedItems)

    const openModal = await this.modalApproval.create({
      component: TotvsModalApprovalComponent,
      componentProps: this.transformItemToApprove(this.selectedItems),
      cssClass: 'approval-modal',
      showBackdrop: true,
    });

    await openModal.present();

    const { data, role } = await openModal.onDidDismiss();
  }

  public getApproval() {
    return this.approval;
  }

  transformItemToApprove(items: Document[]) {
    return items?.map((item, i) => {
      let documentsApproval: ApprovalElement = {
        branch: '',
        documents: [
          {
            documentId: '',
            itemGroup: '',
            justification: '',
            toApprove: false,
          },
        ],
      };

      documentsApproval!.branch = item.documentBranch;
      documentsApproval!.documents = [
        {
          documentId: item.documentNumber,
          itemGroup: item.documentItemGroup,
          justification: 'Teste',
          toApprove: true,
        },
      ];

      return documentsApproval;
    });
  }
}
