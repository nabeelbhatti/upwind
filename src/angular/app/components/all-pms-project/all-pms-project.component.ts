import { Component, ViewChild, OnInit } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import {
  FilterService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  GroupService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import {
  ProgressBar,
  ILoadedEventArgs,
  ProgressTheme,
} from '@syncfusion/ej2-progressbar';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';

import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ClientsService } from '../../services/clients.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-all-pms-project',
  templateUrl: './all-pms-project.component.html',
  styleUrls: ['./all-pms-project.component.css'],
  providers: [
    FilterService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,
    GroupService,
    VirtualScrollService,
  ],
})
export class AllPMSProjectComponent implements OnInit {
  pmsProjectData$!: Observable<any>;
  pmsProjectData: any;
  allClients: any;
  editMode: boolean;
  editModeData: any;
  public toolbar: string[];
  filterByClient: any;

  public filter: Record<string, any>;
  filterSettings: any;
  public selectionSettings: Record<string, any>;
  formatoptions: any;
  projectStatuses: any;
  projectStages: any;
  projectForm: FormGroup;
  disableFields: any;

  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private getallClients: ClientsService,
  ) {
    this.disableFields = true;
    // this.PMS_ProjectsService.getPMSprojectStatuses().subscribe(res => {
    //   this.projectStatuses = res.map(item => ({
    //     label: item.name,
    //     value: item.name,
    //   }));
    // });
    // this.PMS_ProjectsService.getProjectStages().subscribe(res => {
    //   this.projectStages = res.map(item => ({
    //     label: item.name,
    //     value: item.name,
    //   }));
    // });
    this.pageSettings = { pageSize: 10 };
    this.PMS_ProjectsService.getAllpmsProject().subscribe(res => {
      this.pmsProjectData = res;
    });
    this.getallClients.getAllClients().subscribe(res => {
      const data = [{ label: 'All', value: 'All' }];
      data.push(
        ...res.map(item => ({
          label: item.clientName,
          value: item.clientUid,
        })),
      );

      this.filterByClient = data;
      this.allClients = res.map(item => ({
        label: item.clientName,
        value: item.clientUid,
      }));
    });
    this.toolbar = ['PdfExport', 'CsvExport'];

    this.projectForm = new FormGroup({
      clientName: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      imoNo: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      targetDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      pmsManager: new FormControl(null, Validators.required),
      pmsAnalyst: new FormControl(null, Validators.required),
      noOfFiles: new FormControl(null, Validators.required),
    });
  }
  @ViewChild('Grid') public grid: GridComponent;
  public filterFunction(e: ChangeEventArgs): void {
    if (e.value === 'All') {
      this.grid.clearFiltering();
    } else {
      e.value;
      this.grid.filterByColumn('clientName', 'equal', e.value);
    }
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        this.grid.pdfExport();

        break;
      case 'Excel Export':
        this.grid.excelExport();
        break;
      case 'CSV Export':
        this.grid.csvExport();
        break;
    }
  }
  formSubmit() {
    this.PMS_ProjectsService.addPmsProject({
      clientName: this.projectForm.value.clientName,
      url: this.projectForm.value.url,
      name: this.projectForm.value.name,
      pmsAnalyst: this.projectForm.value.PMSAnanlyst,
      pmsManager: this.projectForm.value.PMSManager,
      endDate: this.projectForm.value.endDate,
      imoNo: this.projectForm.value.imoNo,
      noOfFiles: this.projectForm.value.noFiles,
      stage: this.projectForm.value.stage,
      startDate: this.projectForm.value.startDate,
      status: this.projectForm.value.status,
      targetDate: this.projectForm.value.targetDate,
    }).subscribe(res => {
      this.PMS_ProjectsService.getAllpmsProject().subscribe(res => {
        this.pmsProjectData = res;
      });
      this.projectForm.reset();
      this.Dialog.hide();
    });
  }

  @ViewChild('filterDropDown')
  public listObj: DropDownListComponent;

  public fieldss: Record<string, any> = {
    text: 'label',
    value: 'value',
  };
  public filterPopupHeight = '220px';

  projectPmsId: any;
  editPmsProject(data: any) {
    this.PMS_ProjectsService.editPmsProject({
      id: this.projectPmsId,
      data: {
        clientName: data.clientName,
        url: data.url,
        name: data.name,
      },
    }).subscribe(res => {
      this.PMS_ProjectsService.getAllpmsProject().subscribe(res => {
        this.pmsProjectData = res;
      });
      this.editMode = false;
      this.projectForm.reset();
      this.editModeData = {
        clientName: '',
        url: '',
        name: '',
      };
      this.Dialog.hide();
    });
  }
  @ViewChild('Dialog')
  public Dialog: DialogComponent;

  public openDialog = (): void => {
    this.header = 'Add PMS Project';
    this.editModeData = {
      clientName: '',
      url: '',
      name: '',
    };
    this.editMode = false;

    this.Dialog.show();
  };

  editPmsProjectMode(data: any) {
    this.projectPmsId = data.id;
    this.editModeData = {
      clientName: data.clientName,
      url: data.url,
      name: data.name,
    };
    this.editMode = true;

    this.Dialog.show();

    this.header = 'Edit PMS Project';
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  onClose() {
    this.disableFields = false;
    this.projectForm.reset();
  }

  previewProject(data: any) {
    this.disableFeilds();
    this.disableFields = true;
    this.projectPmsId = data._id;
    this.editModeData = {
      clientName: data.clientName,
      url: data.url,
      name: data.name,
      createdAt: data.createdAt,
      endDate: data.endDate,
      imoNo: data.imoNo,
      noOfFiles: data.noOfFiles,
      pmsAnalyst: data.pmsAnalyst,
      pmsManager: data.pmsManager,
      stage: data.statge,
      startDate: data.startDate,
      status: data.status,
      targetDate: data.targetDate,
      updatedAt: data.updatedAt,
    };

    this.projectForm = new FormGroup({
      clientName: new FormControl(data.clientName, Validators.required),
      name: new FormControl(data.name, Validators.required),
      imoNo: new FormControl(data.imoNo, Validators.required),
      url: new FormControl(data.url, Validators.required),
      startDate: new FormControl(data.startDate, Validators.required),
      targetDate: new FormControl(data.targetDate, Validators.required),
      endDate: new FormControl(data.endDate, Validators.required),
      pmsManager: new FormControl(data.pmsManager, Validators.required),
      pmsAnalyst: new FormControl(data.pmsAnalyst, Validators.required),
      noOfFiles: new FormControl(data.noOfFiles),
    });

    this.editMode = true;

    this.Dialog.show();

    this.header = 'View PMS Project';
  }

  disableFeilds() {
    this.projectForm.get('clientName').disable();
    this.projectForm.get('url').disable();
    this.projectForm.get('name').disable();
    this.projectForm.get('pmsManager').disable();
    this.projectForm.get('pmsAnalyst').disable();
    this.projectForm.get('endDate').disable();
    this.projectForm.get('imoNo').disable();
    this.projectForm.get('noOfFiles').disable();
    this.projectForm.get('startDate').disable();
    this.projectForm.get('targetDate').disable();
  }

  enableFields() {
    this.disableFields = false;
    this.header = 'Edit PMS Project';
    this.projectForm.get('clientName').enable();
    this.projectForm.get('url').enable();
    this.projectForm.get('name').enable();
    this.projectForm.get('pmsManager').enable();
    this.projectForm.get('pmsAnalyst').enable();
    this.projectForm.get('endDate').enable();
    this.projectForm.get('imoNo').enable();
    this.projectForm.get('noOfFiles').enable();
    this.projectForm.get('startDate').enable();
    this.projectForm.get('targetDate').enable();
  }

  public fields: Record<string, any> = {
    text: 'clientName',
    value: 'clientName',
  };
  public heightttw = '220px';

  pageSettings: PageSettingsModel;
  type = 'Linear';
  width = '100%';
  height = '40px';
  trackThickness = 24;
  progressThickness = 24;
  min = 0;
  max = 100;
  value1 = 40;
  value2 = 50;
  value3 = 60;
  value4 = 70;
  showProgressValue = true;
  progressBarRole = 'Success';

  @ViewChild('linear1')
  linear1: ProgressBar;

  load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    args.progressBar.theme = <ProgressTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
        .replace(/-dark/i, 'Dark')
        .replace(/contrast/i, 'Contrast')
    );
    if (args.progressBar.theme === 'Material') {
      args.progressBar.trackColor = '#eee';
    }
    if (selectedTheme === 'highcontrast') {
      args.progressBar.labelStyle.color = '#000000';
      args.progressBar.trackColor = '#969696';
    }
  }

  public header = 'Add PMS Project';

  public showCloseIcon = true;
  public dialogwidth = '700px';
  public heighttt = '300px';
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public hidden = false;

  download(id: any, filename: any) {
    this.PMS_ProjectsService.downLoadVessel(id, filename).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'File_' + id + '.csv';
      a.click();
    });
  }

  refreshPmsProject(id: any) {
    this.PMS_ProjectsService.refreshProject(id).subscribe(res => {});
  }
  public filteringType: [
    { Id: 'Menu'; type: 'Menu' },
    { Id: 'CheckBox'; type: 'Checkbox' },
    { Id: 'Excel'; type: 'Excel' },
  ];
  interValId: any;

  ddldata: any;
  ngOnInit(): void {
    this.pageSettings = { pageCount: 10 };
    this.filterSettings = { value: '6', type: 'Menu' };
    this.ddldata = this.filteringType;
    this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      // checkboxOnly: true,
    };
    this.interValId = setInterval(() => {
      this.PMS_ProjectsService.getAllpmsProject().subscribe(res => {
        this.pmsProjectData = res;
      });
    }, 3000);
  }
  ngOnDestroy() {
    if (this.interValId) {
      clearInterval(this.interValId);
    }
  }

  get clientName() {
    return this.projectForm.get('clientName');
  }

  get name() {
    return this.projectForm.get('name');
  }
  get imoNo() {
    return this.projectForm.get('imoNo');
  }
  get url() {
    return this.projectForm.get('url');
  }
  get startDate() {
    return this.projectForm.get('startDate');
  }
  get targetDate() {
    return this.projectForm.get('targetDate');
  }
  get endDate() {
    return this.projectForm.get('endDate');
  }
  get pmsManager() {
    return this.projectForm.get('pmsManager');
  }
  get pmsAnalyst() {
    return this.projectForm.get('pmsAnalyst');
  }
  get noOfFiles() {
    return this.projectForm.get('noOfFiles');
  }
}
