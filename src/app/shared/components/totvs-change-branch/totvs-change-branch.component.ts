import { Establishment } from './../../interfaces/approval.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  IonLoading,
  LoadingController,
  ModalController,
  NavParams,
} from '@ionic/angular';

@Component({
  selector: 'app-totvs-change-branch',
  templateUrl: './totvs-change-branch.component.html',
  styleUrls: ['./totvs-change-branch.component.scss'],
})
export class TotvsChangeBranchComponent implements OnInit {
  @ViewChild(IonLoading, { static: true, read: '' }) loading!: IonLoading;
  public establishmentsList: Establishment[] = [
    {
      code: 'D MG 01',
      description: 'Filial Belo Horizente',
    },
    {
      code: 'D MG 02',
      description: 'Filial São Paulo',
    },
    {
      code: 'D MG 03',
      description: 'Filial Rio de Janeiro',
    },
    {
      code: 'D MG 04',
      description: 'Filial Distrito Federal',
    },
    {
      code: 'D MG 05',
      description: 'Maranhão',
    },
  ];
  public searchKeyLoading!: boolean;
  public translate: any;

  public filterText!: string;
  private isLoading: boolean = true;
  public form!: FormGroup;
  public selectedItems: any[] = [];
  //public collectList: Array<Establishment> = [];

  constructor(
    private modalChange: ModalController,
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    this.transformDataEstablishment();

    this.form = this.formBuilder.group({
      items: new FormArray([]),
    });
  }

  ngOnInit() {
    this.getItemsChangeBranch();
  }

  cancel(value: string) {
    return this.modalChange.dismiss(null, value);
  }

  private transformDataEstablishment() {
    return this.establishmentsList;
  }

  public doRefresh(event: any) {
    this.loadData(event);
  }

  public selectItem(item: any) {
    return this.modalChange.dismiss(item, 'confirm');
  }

  public async searchKey(searchText: CustomEvent) {
    const loadingSearch = await this.loadingCtrl.create({});
    await loadingSearch.present();
    this.searchKeyLoading = true;
    this.filterText = String(searchText.detail?.value).toLowerCase();

    if (this.filterText === '') {
      this.transformDataEstablishment();
      if (loadingSearch) {
        this.loadingCtrl.dismiss();
      }
    }

    if (this.filterText) {
      this.establishmentsList = this.establishmentsList?.filter(
        (item: Establishment) => {
          return (
            String(item.code).toLowerCase().indexOf(this.filterText) >= 0 ||
            String(item.companyName).toLowerCase().indexOf(this.filterText) >=
              0 ||
            String(item.description).toLowerCase().indexOf(this.filterText) >= 0
          );
        }
      );
      if (loadingSearch) {
        this.loadingCtrl.dismiss();
      }
    }
  }

  public async loadData(refresh?: any) {
    this.transformDataEstablishment();
    if (refresh) {
      refresh?.detail?.complete();
    }
  }

  submit() {
    const selectedItemsIds = this.form.value.items
      .map((checked: any, i: any) =>
        checked ? this.establishmentsList[i]?.code : null
      )
      .filter((v: any) => v !== null);
    this.selectedItems = selectedItemsIds;
  }

  getItemsChangeBranch() {
    this.selectedItems = [];
    const controls = this.establishmentsList.map((c) => {
      return new FormControl(false);
    });
    this.form = this.formBuilder.group({
      items: new FormArray(controls),
    });
  }

  public selectItemsChangeBranch() {
    return this.modalChange.dismiss(this.selectedItems, 'confirm');
  }
}
