import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { NotificationService } from '../../services/notification.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  FilterService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  GroupService,
  SelectionService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { ClientsService } from '../../services/clients.service';
@Component({
  selector: 'app-spares',
  templateUrl: './spares.component.html',
  styleUrls: ['./spares.component.css'],
  providers: [
    FilterService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,
    GroupService,
    VirtualScrollService,
    SelectionService,
  ],
})
export class SparesComponent implements OnInit {
  @Input() allSpareSelected: any;
  @Input() sparesFound: any;
  @Input() updatingView: any;
  @Input() singleOcrData: any;
  @Output() selectAllspares = new EventEmitter<any>();
  @Output() selectSinglespare = new EventEmitter<any>();
  @Output() linkspares = new EventEmitter<any>();
  @Output() linkAllspares = new EventEmitter<any>();
  @Output() unlinkAllspares = new EventEmitter<any>();
  @Output() unlinkSinglespare = new EventEmitter<any>();
  @Output() linkSinglespare = new EventEmitter<any>();
  @Output() loadMorespares = new EventEmitter<any>();
  @Output() getAllSparesAftersubmit = new EventEmitter<any>();

  @ViewChild('Grid')
  public grid: GridComponent;

  showJobForm: any;
  addSpareFrom: FormGroup;
  showSpareForm: any;
  clients: any;

  public clientField = { text: 'label', value: 'value' };
  public jobSourceWaterMark = 'Select a Job Source';
  public clientWaterMark = 'Select a Client';
  public filterPopupHeight = '220px';

  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private getClients: ClientsService,
  ) {
    this.showSpareForm = false;

    this.getClients.getAllClients().subscribe(res => {
      this.clients = res.map(item => ({
        label: item.clientName,
        value: item.clientName,
      }));
    });

    this.addSpareFrom = new FormGroup({
      sparePartNumber: new FormControl(null, Validators.required),
      sparePartName: new FormControl(null, Validators.required),
      UnitOfMeasurement: new FormControl(null, Validators.required),
      drawingNumber: new FormControl(null, Validators.required),
      drawingPosition: new FormControl(null, Validators.required),
      spareDimension: new FormControl(null, Validators.required),
      spareMaterial: new FormControl(null, Validators.required),
      spareMaker: new FormControl(null, Validators.required),
      spareModel: new FormControl(null, Validators.required),
      spareDescription: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  addSpareSubmit() {
    const data = {
      sparePartNumber: this.addSpareFrom.value.sparePartNumber,
      sparePartName: this.addSpareFrom.value.sparePartName,
      UnitOfMeasurement: this.addSpareFrom.value.UnitOfMeasurement,
      drawingNumber: this.addSpareFrom.value.drawingNumber,
      drawingPosition: this.addSpareFrom.value.drawingPosition,
      spareDimension: this.addSpareFrom.value.spareDimension,
      spareMaterial: this.addSpareFrom.value.spareMaterial,
      spareMaker: this.addSpareFrom.value.spareMaker,
      spareModel: this.addSpareFrom.value.spareModel,
      spareDescription: this.addSpareFrom.value.spareDescription,
    };
    this.PMS_ProjectsService.createNewSpare(data).subscribe(
      res => {
        this.notifyService.showSuccess('Spare Added Successfully', 'Success');
        this.showSpareForm = false;
        this.addSpareFrom.reset();
        this.getAllSparesAftersubmit.emit();
      },
      err => {
        this.notifyService.showError(err.error.message, 'Error');
      },
    );
  }
  showSpareFromFunction() {
    this.showSpareForm = true;
  }
  closeSpareFromFunction() {
    this.showSpareForm = false;
    this.addSpareFrom.reset();
  }

  selectAllSpare(event) {
    this.selectAllspares.emit(event);
  }

  selectSingleSpare(event, id) {
    this.selectSinglespare.emit({ event, id });
  }
  onScroll() {
    this.loadMorespares.emit();
  }
  unlinkAllSpares() {
    this.unlinkAllspares.emit();
  }
  linkSpares() {
    this.linkspares.emit();
  }
  unlinkSingleSpare(id) {
    this.unlinkSinglespare.emit(id);
  }

  linkSingleSpare(id) {
    this.linkSinglespare.emit(id);
  }

  calcCssSpare(spare) {
    if (this.singleOcrData) {
      const linkedJob =
        this.singleOcrData.related_spears.filter(f => f._id === spare._id)
          .length > 0;
      return linkedJob;
    } else {
      return '';
    }
  }

  get sparePartNumber() {
    return this.addSpareFrom.get('sparePartNumber');
  }
  get sparePartName() {
    return this.addSpareFrom.get('sparePartName');
  }
  get UnitOfMeasurement() {
    return this.addSpareFrom.get('UnitOfMeasurement');
  }
  get drawingNumber() {
    return this.addSpareFrom.get('drawingNumber');
  }

  get drawingPosition() {
    return this.addSpareFrom.get('drawingPosition');
  }
  get spareDimension() {
    return this.addSpareFrom.get('spareDimension');
  }
  get spareMaterial() {
    return this.addSpareFrom.get('spareMaterial');
  }
  get spareMaker() {
    return this.addSpareFrom.get('spareMaker');
  }
  get spareModel() {
    return this.addSpareFrom.get('spareModel');
  }

  get spareDescription() {
    return this.addSpareFrom.get('spareDescription');
  }
}
