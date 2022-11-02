import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import {
  FilterService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  GroupService,
  SelectionService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { PmsProjectsService } from '../../services/pms-projects.service';
import {
  AnimationSettingsModel,
  DialogComponent,
} from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-pms-project-detail',
  templateUrl: './pms-project-detail.component.html',
  styleUrls: ['./pms-project-detail.component.css'],
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
export class PMSProjectDetailComponent implements OnInit {
  ocrId: any;
  pmsProjectData: any;
  updatingView: boolean;
  public toolbar: string[];
  public filter: Record<string, any>;
  filterSettings: any;
  public selectionSettings: Record<string, any>;
  formatoptions: any;
  allJobsSelected: any;
  page: any;
  pdfUrl: any;
  addJobForm: FormGroup;
  initialPage: any;
  showJobForm: any;
  addSpareFrom: FormGroup;

  showSpareForm: any;
  singleOcrData: any;
  selectedTabs: string;
  allSpareSelected: any;
  jobsFound: any[];
  spares: any;
  sparesFound: any;
  mainFormData: any;

  components: any = [];
  makers: any = [];
  selectedComponent: any = [];
  selectedModel: any = [];
  selectedMaker: any = [];

  public headerText = [
    { Id: 'header1', headerStyle: 'default', text: 'Main' },
    { text: 'Jobs' },
    { text: 'Spare' },
  ];

  public setTab(tab) {
    // this.selectedTab = tab
    console.log(tab);
  }
  public setSelectedComponent(option) {
    this.selectedComponent.push(option);
  }
  public setSelectedModel(option) {
    this.selectedModel.push(option);
  }
  public setSelectedMaker(option) {
    this.selectedMaker.push(option);
  }
  public sportsData = [
    { Id: 'Game1', Game: 'American Football' },
    { Id: 'Game2', Game: 'Badminton' },
    { Id: 'Game3', Game: 'Basketball' },
    { Id: 'Game4', Game: 'Cricket' },
    { Id: 'Game5', Game: 'Football' },
    { Id: 'Game6', Game: 'Golf' },
    { Id: 'Game7', Game: 'Hockey' },
    { Id: 'Game8', Game: 'Rugby' },
    { Id: 'Game9', Game: 'Snooker' },
    { Id: 'Game10', Game: 'Tennis' },
  ];
  public localFields = { text: 'Game', value: 'Id' };

  public jobSourceWaterMark = 'Select a Job Source';
  public clientWaterMark = 'Select a Client';
  public filterPopupHeight = '220px';
  public fields: Record<string, any> = {
    text: 'clientName',
    value: 'clientName',
  };

  pageSettings: PageSettingsModel;
  public hidden = false;

  public header = 'Add PMS Project';
  public placeholder = 'Select Part Name';

  public popupHeight = '200px';
  public popupWidth = '250px';
  public showCloseIcon = true;
  public dialogwidth = '90%';
  public animationSettings: AnimationSettingsModel = { effect: 'None' };

  @ViewChild('tabObj') public tabObj: TabComponent;
  @ViewChild('Grid') public grid: GridComponent;
  @ViewChild('filterDropDown') public listObj: DropDownListComponent;
  @ViewChild('DialogPop') public Dialog: DialogComponent;

  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private categoryService: CategoriesService,
  ) {
    this.updatingView = true;
    this.showJobForm = false;
    this.showSpareForm = false;
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.ocrId = undefined;
    this.allJobsSelected = false;

    this.PMS_ProjectsService.getPmsProjectDetail(
      this.route.snapshot.params.id,
    ).subscribe(res => {
      this.pmsProjectData = res;
    });

    this.pageSettings = { pageSize: 6 };

    this.toolbar = ['PdfExport', 'CsvExport', 'ExcelExport'];
    this.updatingView = false;
  }

  public filterFunction(e: ChangeEventArgs): void {
    if (e.value === 'All') {
      this.grid.clearFiltering();
    } else {
      e.value;
      this.grid.filterByColumn('clientName', 'equal', e.value);
    }
  }

  rowSelected(args: any) {
    console.log('args', args);
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

  onClose() {
    this.tabObj.select(0);
    this.pdfUrl = undefined;
    this.singleOcrData = undefined;
    this.mainFormData = undefined;
  }
  updateJobs({res}) {
    this.jobsFound = res;
  }

  onSubmit(mainFormValues) {
    const { formValues, offset } = mainFormValues;
    this.mainFormData = formValues;
    this.PMS_ProjectsService.getJobs(
      formValues.Components,
      formValues.MakersName,
      formValues.ModelName,
      offset,
    ).subscribe(res => {
      this.jobsFound = res;
      this.tabObj.select(1);
    });

    this.PMS_ProjectsService.getSparess(
      formValues.Components !== ''? formValues.Components : null,
        formValues.MakersName !== ''? formValues.MakersName : null,
        formValues.ModelName !== ''? formValues.ModelName : null,
         formValues.ModelName,
    ).subscribe(res => {
      this.sparesFound = res;
    });
  }

  openDialog(data) {
    this.ocrId = data._id;
    this.page = data.page_no;
    this.singleOcrData = data;


    this.PMS_ProjectsService.getProjectFiles(data.file_name).subscribe(
      (data: Blob) => {
        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        this.pdfUrl = fileURL;
      },
    );

    this.Dialog.show();
  }

  // addJobSubmit() {
  //   this.PMS_ProjectsService.createNewJob(
  //     this.singleOcrData._id,
  //     this.addJobForm.value,
  //   ).subscribe(res => {
  //     this.closejobFormFunction();
  //   });
  // }
  // showJobFormFunction() {
  //   this.showJobForm = true;
  // }
  // closejobFormFunction() {
  //   this.showJobForm = false;
  //   this.addJobForm.reset();
  // }

  // showSpareFromFunction() {
  //   this.showSpareForm = true;
  // }
  // closeSpareFromFunction() {
  //   this.showSpareForm = false;
  //   this.addSpareFrom.reset();
  // }
  // addSpareSubmit() {
  //   this.PMS_ProjectsService.createNewSpare(this.addSpareFrom.value).subscribe(
  //     res => {
  //       //       this.closeSpareFromFunction();
  //     },
  //   );
  // }
  getAllSparesAfterSubmit() {
    this.PMS_ProjectsService.getSparess(
      this.mainFormData.Components,
      this.mainFormData.MakersName,
      this.mainFormData.ModelName,
      0,
    ).subscribe(res => {
      this.sparesFound = res;
    });
  }

  getAllJobsAfterSubmit() {
    this.PMS_ProjectsService.getJobs(
      this.mainFormData.Components,
      this.mainFormData.MakersName,
      this.mainFormData.ModelName,
      0,
    ).subscribe(res => {
      this.jobsFound = res;
    });
  }

  selectSingleJob(jobSelect) {
    const { event, id } = jobSelect;
    this.jobsFound = this.jobsFound.map(job => {
      const newJob = { ...job };
      if (newJob._id === id) {
        newJob.checked = event.target.checked;
      }
      return newJob;
    });
    this.allJobsSelected = this.jobsFound.every(
      element => element.checked === true,
    );
  }

  selectAllJobs(event) {
    this.jobsFound = this.jobsFound.map(job => {
      const newJob = { ...job };
      newJob.checked = event.target.checked;
      return newJob;
    });
    this.allJobsSelected = this.jobsFound.every(
      element => element.checked === true,
    );
  }

  loadMoreJobs() {
    this.PMS_ProjectsService.getJobs(
      this.mainFormData.Components,

      this.mainFormData.MakersName,
      this.mainFormData.ModelName,
      this.jobsFound.length,
    ).subscribe(res => {
      const newArray = this.jobsFound.concat(res);
      console.log('newArray', newArray.length);
      this.jobsFound = newArray;
    });
  }

  clearChecked() {
    this.jobsFound = this.jobsFound.map(job => {
      job.checked = false;
      return job;
    });
    this.allJobsSelected = false;
  }

  clearCheckedSpares() {
    this.sparesFound = this.sparesFound.map(job => {
      job.checked = false;
      return job;
    });
    this.allSpareSelected = false;
  }

  unlinkAllJobs() {
    this.updatingView = true;
    this.PMS_ProjectsService.deleteJob(
      this.ocrId,
      this.jobsFound.filter(job => job.checked === true).map(job => job._id),
    ).subscribe(res => {
      this.notifyService.showSuccess('All jobs Deleted Successfully', '');
      this.singleOcrData.related_jobs = [...res.related_jobs];
      this.clearChecked();
      this.updatingView = false;
    });
  }

  linkJobs() {
    this.updatingView = true;
    this.PMS_ProjectsService.linkjobs(
      this.ocrId,
      this.jobsFound.filter(job => job.checked === true).map(job => job._id),
    ).subscribe(res => {
      this.singleOcrData.related_jobs = [...res.related_jobs];
      this.clearChecked();
      this.updatingView = false;
    });
  }

  linkSingleJob(id) {
    this.updatingView = true;
    this.PMS_ProjectsService.linkjobs(this.ocrId, [id]).subscribe(res => {
      this.notifyService.showSuccess('Job Linked Successfully', '');
      this.singleOcrData.related_jobs = [...res.related_jobs];
      this.clearChecked();
      this.updatingView = false;
    });
  }

  unlinkSingleJob(id) {
    this.updatingView = true;
    this.PMS_ProjectsService.deleteJob(this.ocrId, [id]).subscribe(res => {
      this.notifyService.showSuccess('Job Unlinked Successfully', '');
      this.singleOcrData.related_jobs = [...res.related_jobs];
      this.clearChecked();
      this.updatingView = false;
    });
  }

  selectSingleSpare(spareSelect) {
    const { event, id } = spareSelect;
    this.sparesFound = this.sparesFound.map(job => {
      const newJob = { ...job };
      if (newJob._id === id) {
        newJob.checked = event.target.checked;
      }
      return newJob;
    });
    this.allSpareSelected = this.sparesFound.every(
      element => element.checked === true,
    );
  }

  selectAllSpare(event) {
    this.sparesFound = this.sparesFound.map(Spare => {
      const newSpare = { ...Spare };
      newSpare.checked = event.target.checked;
      return newSpare;
    });
    this.allSpareSelected = this.sparesFound.every(
      element => element.checked === true,
    );
  }
  unlinkAllSpares() {
    this.updatingView = true;
    this.PMS_ProjectsService.deleteSpare(
      this.ocrId,
      this.sparesFound.filter(job => job.checked === true).map(job => job._id),
    ).subscribe(res => {
      this.notifyService.showSuccess('Spare Unlinked Successfully', '');
      this.singleOcrData.related_spears = [...res.related_spears];
      this.clearCheckedSpares();
      this.updatingView = false;
    });
  }

  linkSpares() {
    this.updatingView = true;
    this.PMS_ProjectsService.linkSpares(
      this.ocrId,
      this.sparesFound
        .filter(spares => spares.checked === true)
        .map(spares => spares._id),
    ).subscribe(res => {
      this.updatingView = false;
      this.clearCheckedSpares();
      this.singleOcrData.related_spears = [...res.related_spears];
    });
  }

  public onOverlayClick: EmitType<object> = () => {
    this.Dialog.hide();
  };

  unlinkSingleSpare(id) {
    this.updatingView = true;
    this.PMS_ProjectsService.deleteSpare(this.ocrId, [id]).subscribe(res => {
      this.notifyService.showSuccess('Spare Unlinked Successfully', '');
      this.singleOcrData.related_spears = [...res.related_spears];
      this.clearCheckedSpares();
      this.updatingView = false;
    });
  }

  linkSingleSpare(id) {
    this.updatingView = true;
    this.PMS_ProjectsService.linkSpares(this.ocrId, [id]).subscribe(res => {
      this.updatingView = false;
      this.clearCheckedSpares();
      this.singleOcrData.related_spears = [...res.related_spears];
    });
  }
  loadMoreSpares() {
    this.PMS_ProjectsService.getSparess(
      this.mainFormData.Components,
      this.mainFormData.MakersName,
      this.mainFormData.ModelName,
      this.sparesFound.length,
    ).subscribe(res => {
      const newArray = this.sparesFound.concat(res);
      console.log('newArray', newArray.length);
      this.sparesFound = newArray;
    });
  }
  ngOnInit(): void {
    this.filterSettings = { value: '6', type: 'menu' };
    this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      checkboxOnly: true,
    };
  }
}
