import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EditService,
  ToolbarService,
  PageService,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import {
  ChangeEventArgs,
  DropDownListComponent,
} from '@syncfusion/ej2-angular-dropdowns';
import { PmsProjectsService } from '../../services/pms-projects.service';

import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import {
  AnimationSettingsModel,
  DialogComponent,
} from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { ClientsService } from '../../services/clients.service';
import {
  EditSettingsModel,
  ToolbarItems,
  IEditCell,
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-screening-reports',
  templateUrl: './screening-reports.component.html',
  styleUrls: ['./screening-reports.component.css'],
  providers: [ToolbarService, EditService, PageService],
})
export class ScreeningReportsComponent implements OnInit {
  @ViewChild('ddsample')
  public dropDown: DropDownListComponent;
  @ViewChild('normalgrid') gridInstance: GridComponent;
  @ViewChild('ReportSummaryGrid') SourceFilesGridInstance: GridComponent;
  @ViewChild('DialogPop') public Dialog: DialogComponent;
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  @ViewChild('filterDropDown')
  public listObj: DropDownListComponent;

  public fieldss: Record<string, any> = {
    text: 'label',
    value: 'value',
  };
  public filterPopupHeight = '220px';
  allClients: any;
  pdfQuery = '';
  public popupWidth = '250px';
  public showCloseIcon = true;
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public childData: Record<string, any>[];
  public data2: Record<string, any>[];
  public editSettingsSf: Record<string, any>;
  projectId: any;
  selectedVesselId: any;
  ClientName: any;
  interValId: any;
  clientId: any;
  VesselName: any;
  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public toolbar2: string[];
  public orderidrules: Record<string, any>;
  public customeridrules: Record<string, any>;
  public freightrules: Record<string, any>;
  public editparams: Record<string, any>;
  public pageSettings: Record<string, any>;
  public formatoptions: Record<string, any>;
  fileContentForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public isInitial: boolean = true;
  public initialPage: Record<string, any>;
  totalPages = 0;
  public hidden = false;
  page = 1;
  allCategories: any;
  batch_numberFeild: any;
  sharepoint_urlFeild: any;
  manualTypes: any;
  hull_number_similarityData: any;
  public JobStatusParams: IEditCell;
  public statusParams: IEditCell;

  public JobStatusElem: HTMLElement;
  public JobStatusObj: DropDownList;

  public statusElem: HTMLElement;
  public statusObj: DropDownList;
  public JobStatus: any;
  public SparesStatusParams: IEditCell;
  public SparesStatusElem: HTMLElement;
  public SparesStatusObj: DropDownList;

  public ManualReceivedParams: IEditCell;
  public ManualReceivedElem: HTMLElement;
  public ManualReceivedObj: DropDownList;
  statues: any;
  public dpParams;
  public elem: HTMLElement;
  public multiSelectObj: MultiSelect;
  public multiselectDatasource = [
    { Country: 'France', Id: '1' },
    { Country: 'Germany', Id: '2' },
    { Country: 'Brazil', Id: '3' },
    { Country: 'Switzerland', Id: '4' },
    { Country: 'Venezuela', Id: '5' },
  ];
  batchNumbers: any;
  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private router: Router,
    private getallClients: ClientsService,
    private _ToastrService: ToastrService,
    private categories: CategoriesService,
  ) {
    this.categories.getCategories('Client').subscribe(res => {
      this.allClients = res.map(item => ({
        label: item.name,
        value: item._id,
      }));
    });
    this.filterFunction();

    this.statues = [
      {
        name: 'Open',
        value: 'Open',
      },
      {
        name: 'Completed',
        value: 'Completed',
      },
    ];
    this.JobStatus = [
      {
        name: 'Received',
        value: 'Received',
      },
      {
        name: 'Not Received',
        value: 'Not Received',
      },
      {
        name: 'Partially Received',
        value: 'Partially Received',
      },
    ];

    this.data2 = [
      {
        Vessel_Type: 'Type',
        Type_of_Update: 'Type Of Update',
        Plant: 'Plant',
        Manual_Received: 'Manual_Received',
        Jobs_Status: 'Jobs_Status',
        Spares_Status: 'Spares_Status',
        Client_Remarks: 'Awesome',
        Updated_Date: '30/2/2022',
        Updated_By: 'John',
      },
    ];
  }

  public ngOnInit(): void {
    this.toolbar = ['Search', 'Add', 'Edit', 'Update', 'Cancel'];
    this.toolbar2 = [
      'Search',
      'Edit',
      'Add',
      'Update',
      'Cancel',
      'ExcelExport',
      'PdfExport',
    ];
    this.editSettings = {
      allowEditing: false,
      allowAdding: false,
      allowDeleting: false,
      newRowPosition: 'Top',
    };
    this.editSettingsSf = {
      allowEditing: false,
      allowAdding: false,
      // allowDeleting: true,
      newRowPosition: 'Top',
    };

    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5, pageSize: 6 };
    this.formatoptions = { type: 'date', format: 'M/d/y' };
    this.JobStatusParams = {
      create: () => {
        this.JobStatusElem = document.createElement('input');
        return this.JobStatusElem;
      },
      read: () => {
        return this.JobStatusObj.text;
      },
      destroy: () => {
        this.JobStatusObj.destroy();
      },
      write: () => {
        this.JobStatusObj = new DropDownList({
          dataSource: this.JobStatus,
          fields: { value: 'name', text: 'name' },
          placeholder: 'Select Status',
          floatLabelType: 'Never',
        });
        this.JobStatusObj.appendTo(this.JobStatusElem);
      },
    };

    this.SparesStatusParams = {
      create: () => {
        this.SparesStatusElem = document.createElement('input');
        return this.SparesStatusElem;
      },
      read: () => {
        return this.SparesStatusObj.text;
      },
      destroy: () => {
        this.SparesStatusObj.destroy();
      },
      write: () => {
        this.SparesStatusObj = new DropDownList({
          dataSource: this.JobStatus,
          fields: { value: 'name', text: 'name' },
          placeholder: 'Select Status',
          floatLabelType: 'Never',
        });
        this.SparesStatusObj.appendTo(this.SparesStatusElem);
      },
    };

    this.ManualReceivedParams = {
      create: () => {
        this.ManualReceivedElem = document.createElement('input');
        return this.ManualReceivedElem;
      },
      read: () => {
        return this.ManualReceivedObj.text;
      },
      destroy: () => {
        this.ManualReceivedObj.destroy();
      },
      write: () => {
        this.ManualReceivedObj = new DropDownList({
          dataSource: this.JobStatus,
          fields: { value: 'name', text: 'name' },
          placeholder: 'Select Status',
          floatLabelType: 'Never',
        });
        this.ManualReceivedObj.appendTo(this.ManualReceivedElem);
      },
    };
    this.statusParams = {
      create: () => {
        this.statusElem = document.createElement('input');
        return this.statusElem;
      },
      read: () => {
        return this.statusObj.text;
      },
      destroy: () => {
        this.statusObj.destroy();
      },
      write: () => {
        this.statusObj = new DropDownList({
          dataSource: this.statues,
          fields: { value: 'name', text: 'name' },
          placeholder: 'Select A Status',
          floatLabelType: 'Never',
        });
        this.statusObj.appendTo(this.statusElem);
      },
    };

    this.dpParams = {
      create: () => {
        this.elem = document.createElement('input');
        return this.elem;
      },
      read: () => {
        return this.multiSelectObj.value.join(',');
      },
      destroy: () => {
        this.multiSelectObj.destroy();
      },
      write: (args: { rowData: object; column: any }) => {
        const tempVal = args.rowData[args.column.field]
          ? args.rowData[args.column.field].split(',')
          : [];
        this.multiSelectObj = new MultiSelect({
          value: tempVal,
          dataSource: this.batchNumbers,
          fields: { value: 'batch_no', text: 'batch_no' },
          floatLabelType: 'Never',
          placeholder: 'Select BatchNo',

          mode: 'Delimiter',
        });
        this.multiSelectObj.appendTo(this.elem);
      },
    };
  }

  public filterFunction(): void {
    this.categories.getCategories('Vessel').subscribe(res => {
      this.allCategories = res.map(item => ({
        label: item.name,
        value: item._id,
      }));
    });
    this.categories.getCategories('Manual Type').subscribe(res => {
      this.manualTypes = res;
    });
    this.categories.getCategories('Hull Number Similarity').subscribe(res => {
      this.hull_number_similarityData = res;
    });
  }
  // ngOnDestroy() {
  //   // if (this.interValId) {
  //   //   clearInterval(this.interValId);
  //   // }
  // }

  public getProjectsByClientid(e: ChangeEventArgs): void {
    this.clientId = e.value;
    this.ClientName = e.itemData['label'];

    this.fetchRootProjects();
  }
  public getProjectsByid(e: ChangeEventArgs): void {
    this.projectId = e.value;
    this.VesselName = e.itemData['label'];
    this.fetchRootProjects();
  }

  fileContentFormSubmit() {
    console.log(this.fileContentForm.value);
  }

  public localFields: Record<string, any> = {
    text: 'newRowPosition',
    value: 'id',
  };

  rootFoldersToolBar(args: any) {}

  actionBegin(args: any): void {
    console.log(args);
  }
  disableFeilds() {
    this.batch_numberFeild = false;
    this.sharepoint_urlFeild = false;
  }

  fetchRootProjects() {
    if (!!this.ClientName && !!this.VesselName) {
      const PayLoad = {
        ClientName: this.ClientName,
        VesselName: this.VesselName,
      };
      this.PMS_ProjectsService.GetParticualrVesselInformationFromPmsProject(
        PayLoad,
      ).subscribe(res => {
        if (res?._id) {
          this.selectedVesselId = res._id;
          this.PMS_ProjectsService.getScreeningReportByprojectId(
            this.selectedVesselId,
          ).subscribe(res => {
            this.data = res.map(item => {
              return {
                report_Date: item.report_Date ? item.report_Date : '',
                batch_no: item.batch_number ? item.batch_number : [],
                latest_Date_of_Data_Received: item.last_date
                  ? item.last_date
                  : '',
                Status: item.status.name ? item.status.name : '',
              };
            });
            this.editSettings = {
              allowEditing: true,
              allowAdding: true,
              allowDeleting: true,
              newRowPosition: 'Top',
            };
            this.editSettingsSf = {
              allowEditing: true,
              // allowAdding: true,
              // allowDeleting: true,
              newRowPosition: 'Top',
            };
          });
          this.PMS_ProjectsService.getParentFilesByProjectId(
            this.selectedVesselId,
          ).subscribe(res => {
            this.batchNumbers = res.map(data => {
              const newDtaa = {
                batch_no: data?.batch_number ? data?.batch_number : 0,
              };
              return newDtaa;
            });
          });
        } else {
          this.editSettings = {
            allowEditing: false,
            allowAdding: false,
            allowDeleting: false,
            newRowPosition: 'Top',
          };
          this.editSettingsSf = {
            allowEditing: false,
            // allowAdding: true,
            newRowPosition: 'Top',
          };
          this._ToastrService.error('Record Not Found');
        }
      });
    }
  }
  sourceFilesGridActions(args: any) {}
}
