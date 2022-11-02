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
import { ClientsService } from '../../services/clients.service';

import {
  FilterService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  GroupService,
  SelectionService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
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
export class JobsComponent implements OnInit {
  @Input() updatingView: any;
  @Input() jobsFound: any;
  @Input() singleOcrData: any;
  @Input() selectedComponent: any;
  @Input() selectedModel: any;
  @Input() selectedMaker: any;
  @Input() allJobsSelected: any;
  @Output() linkjobs = new EventEmitter<any>();
  @Output() updateJobs = new EventEmitter<{ res: any }>();
  @Output() selectAlljobs = new EventEmitter<any>();
  @Output() deleteAlljobs = new EventEmitter<any>();
  @Output() selectSinglejob = new EventEmitter<{ event: any; id: any }>();
  @Output() linkSinglejob = new EventEmitter<any>();
  @Output() unlinkSinglejob = new EventEmitter<any>();
  @Output() loadMorejobs = new EventEmitter<any>();
  @Output() getAllJobsAftersubmit = new EventEmitter<any>();

  addJobForm: FormGroup;
  showJobForm: any;
  selectedClient: string;
  clients: any;
  selectClient = '';
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
  public clientField = { text: 'label', value: 'value' };

  public jobSourceWaterMark = 'Select a Job Source';
  public clientWaterMark = 'Select a Client';
  public filterPopupHeight = '220px';
  @ViewChild('Grid') public grid: GridComponent;

  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private getClients: ClientsService,
  ) {
    this.showJobForm = false;
    this.getClients.getAllClients().subscribe(res => {
      this.clients = res.map(item => ({
        label: item.clientName,
        value: item.clientName,
      }));
    });
    this.addJobForm = new FormGroup({
      jibeJobtitle: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
      frequencyType: new FormControl(null, Validators.required),
      jobAction: new FormControl(null, Validators.required),
      jobDescription: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  linkJobs() {
    this.linkjobs.emit();
  }
  selectAllJobs(event) {
    this.selectAlljobs.emit(event);
  }

  selectSingleJob(event, id) {
    this.selectSinglejob.emit({ event, id });
  }

  unlinkAllJobs() {
    this.deleteAlljobs.emit();
  }

  linkSingleJob(id) {
    this.linkSinglejob.emit(id);
  }
  unlinkSingleJob(id) {
    this.unlinkSinglejob.emit(id);
  }
  showJobFormFunction() {
    this.showJobForm = true;
  }

  closejobFormFunction() {
    this.showJobForm = false;
    this.addJobForm.reset();
  }
  selectJob(clientName) {
    this.updatingView = true;
    this.selectedClient = clientName
    this.PMS_ProjectsService.getJobs(
        this.selectedComponent,
        this.selectedMaker,
        this.selectedModel,
        0,
        clientName
    ).subscribe(res => {
      this.jobsFound = res;
      this.updatingView = false;

    });
  }
  addJobSubmit() {
    const data = {
      jibeJobtitle: this.addJobForm.value.jibeJobtitle,
      frequency: this.addJobForm.value.frequency,
      frequencyType: this.addJobForm.value.frequencyType,
      jobAction: this.addJobForm.value.jobAction,
      jobDescription: this.addJobForm.value.jobDescription,
    };
    this.PMS_ProjectsService.createNewJob('', data).subscribe(res => {
      this.notifyService.showSuccess('Spare Added Successfully', 'Success');
      this.showJobForm = false;
      this.addJobForm.reset();
      this.getAllJobsAftersubmit.emit();
     }
    );
  }
  calcCss(job) {
    if (this.singleOcrData) {
      const linkedJob =
        this.singleOcrData.related_jobs.filter(f => f._id === job._id).length >
        0;
      return linkedJob;
    } else {
      return '';
    }
  }
  onScroll() {
    this.loadMorejobs.emit();
  }

  get jibeJobtitle() {
    return this.addJobForm.get('jibeJobtitle');
  }
  get frequency() {
    return this.addJobForm.get('frequency');
  }
  get frequencyType() {
    return this.addJobForm.get('frequencyType');
  }
  get jobAction() {
    return this.addJobForm.get('jobAction');
  }
  get jobDescription() {
    return this.addJobForm.get('jobDescription');
  }
}
