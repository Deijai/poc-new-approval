import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-totvs-header',
  templateUrl: './totvs-header.component.html',
  styleUrls: ['./totvs-header.component.scss'],
})
export class TotvsHeaderComponent  implements OnInit {

  @Output()
  public emitterClose: EventEmitter<string> = new EventEmitter();
  @Output()
  public emitterSearchKey: EventEmitter<any> = new EventEmitter();
  @Output()
  public emitterNotification: EventEmitter<any> = new EventEmitter();
  @Output()
  public emitterSettings: EventEmitter<any> = new EventEmitter();

  @Input()
  title!: string;
  @Input()
  showCloseButton: boolean = true;
  @Input()
  showSearch: boolean = true;
  @Input()
  showNotification: boolean = true;
  @Input()
  showSettings: boolean = true;
  public translate: any;

  constructor() { }

  ngOnInit() {

  }


  public close(value: string): void {
    this.emitterClose.emit(value)
  }

  public searchKey(searchText: any){
    if(searchText){
      this.emitterSearchKey.emit(searchText);
    }
  }

  public notifications(route: string){
    this.emitterNotification.emit(route);
  }

  public settings(route: string){
    this.emitterSettings.emit(route);
  }

}
