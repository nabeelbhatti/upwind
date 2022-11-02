import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';


@Component({
  selector: 'app-vessel-information',
  templateUrl: './vessel-information.component.html',
  styleUrls: ['./vessel-information.component.css']
})
export class VesselInformationComponent implements OnInit {

  @ViewChild('sample')
  public listObj: DropDownListComponent;
  public fields: Object = { text: 'text', value: 'value' };
  public height: string = '220px';

  IMO_PH: any = '';
  Hull_Number_PH: any = '';
  Gross_Tonnage_PH: any = '';
  Summer_Dwt_PH: any = '';

  VesselInformatonForm: any | FormGroup;

  allCategories: any = {};
  categorieKeys = ['Client', 'Yard', 'Vessel Class', 'Vessel', 'Stage', 'pms analyst', 'Status', 'Team Member'];

  ClientName: any;
  VesselName: any;
  Pms_Project_Id: any;
  DisableButton: boolean = true;
  ClientObject: any = {};
  VesselNameObject: any = {};
  YardNameObject: any = {};
  VesselClassObject: any = {};
  StageObject: any = {};
  StatusObject: any = {};
  PmsObject: any = {};
  TeamMemberObject: any = {};
  AssigneeArrayObject: any = [];
  AssigneeArrayId: any = [];

  constructor(
    private _FormBuilder: FormBuilder,
    private PMS_ProjectsService: PmsProjectsService,
    private CategoryService: CategoriesService,
    private _ToastrService: ToastrService
  ) {
    this.VesselInformatonFormModel();
  }

  ngOnInit(): void {
    this.categorieKeys.forEach(res => {
      this.getLibrariesData(res);
    })
  }

  getLibrariesData(type) {
    this.CategoryService.getCategories(type).subscribe(res => {
      this.allCategories[type.replaceAll(' ', '')] = res;
    })
  }



  VesselInformatonFormModel() {
    this.VesselInformatonForm = this._FormBuilder.group({
      clientName: ['', [Validators.required]],
      vesselName: ['', [Validators.required]],
      imoNo: ['', [Validators.required]],
      hull_number: ['', [Validators.required]],
      yard_name: ['', [Validators.required]],
      delivery_date: [''],
      gross_tonnage: [''],
      startDate: [''],
      targetDate: [''],
      endDate: [''],
      vessel_class: [''],
      stage: [''],
      status: [''],
      pmsAnalyst: [''],
      team_members: [''],
      summer_dwt: ['']
    })
  }

  GetValues(data) {
    if (data.itemData.categoryType === "Client") {
      this.ClientName = data.itemData.name;
    }

    if (data.itemData.categoryType === "Vessel") {
      this.VesselName = data.itemData.name
    }
    if (!!this.ClientName && !!this.VesselName) {
      const PayLoad = { ClientName: this.ClientName, VesselName: this.VesselName }
      this.PMS_ProjectsService.GetParticualrVesselInformationFromPmsProject(PayLoad).subscribe(res => {
        if (!res) {
          this._ToastrService.error('Record Not Found');
          this.DisableButton = true;
          this.VesselInformatonForm.get('imoNo').reset();
          this.VesselInformatonForm.get('hull_number').reset();
          this.VesselInformatonForm.get('gross_tonnage').reset();
          this.VesselInformatonForm.get('summer_dwt').reset();
          this.VesselInformatonForm.get('yard_name').reset();
          this.VesselInformatonForm.get('delivery_date').reset();
          this.VesselInformatonForm.get('startDate').reset();
          this.VesselInformatonForm.get('endDate').reset();
          this.VesselInformatonForm.get('targetDate').reset();
          this.VesselInformatonForm.get('vessel_class').reset();
          this.VesselInformatonForm.get('stage').reset();
          this.VesselInformatonForm.get('status').reset();
          this.VesselInformatonForm.get('pmsAnalyst').reset();
          this.VesselInformatonForm.get('team_members').reset();
          return
        } else {
          this.DisableButton = false;
          this.Pms_Project_Id = res._id;
          this.VesselInformatonForm.get('imoNo').setValue(res.imoNo);
          this.VesselInformatonForm.get('hull_number').setValue(res.hull_number);
          this.VesselInformatonForm.get('gross_tonnage').setValue(res.gross_tonnage);
          this.VesselInformatonForm.get('summer_dwt').setValue(res.summer_dwt);
          this.VesselInformatonForm.get('yard_name').setValue(res.yard_name?._id);
          this.VesselInformatonForm.get('delivery_date').setValue(res.delivery_date);
          this.VesselInformatonForm.get('startDate').setValue(res.startDate);
          this.VesselInformatonForm.get('endDate').setValue(res.endDate);
          this.VesselInformatonForm.get('targetDate').setValue(res.targetDate);
          this.VesselInformatonForm.get('vessel_class').setValue(res.vessel_class?._id);
          this.VesselInformatonForm.get('stage').setValue(res.stage?._id);
          this.VesselInformatonForm.get('status').setValue(res.status?._id);
          this.VesselInformatonForm.get('pmsAnalyst').setValue(res.pmsAnalyst?.map(res => res._id));
          this.VesselInformatonForm.get('team_members').setValue(res.team_members?._id);
          return
        }
      })
    }

  }

  getClientObject(data) {
    if (data.itemData.categoryType === "Client") {
      this.ClientObject = data.itemData;
    }
  }

  getVesselNameObject(data) {
    if (data.itemData.categoryType === "Vessel") {
      this.VesselNameObject = data.itemData;
    }
  }

  getYardNameObject(data) {
    if (data.itemData.categoryType === "Yard") {
      this.YardNameObject = data.itemData;
    }
  }

  getVesselClassObject(data) {
    if (data.itemData.categoryType === "Vessel Class") {
      this.VesselClassObject = data.itemData;
    }
  }

  getStageObject(data) {
    if (data.itemData.categoryType === "Stage") {
      this.StageObject = data.itemData;
    }
  }

  getSelectStatus(data) {
    if (data.itemData.categoryType === "Status") {
      this.StatusObject = data.itemData;
    }
  }

  getPMSAnalysis(data) {
    this.AssigneeArrayObject = [];
    this.AssigneeArrayId = data.value;
    this.AssigneeArrayId.forEach((objects) => {
      this.allCategories.pmsanalyst.forEach(element => {
        if (element._id === objects) {
          this.AssigneeArrayObject.push(element);
        }
      });
    })
  }

  getTeamMembers(data) {
    if (data.itemData.categoryType === "Team Member") {
      this.TeamMemberObject = data.itemData;
    }
  }

  SaveVesselInformation() {
    const Payload = {
      ...this.VesselInformatonForm.value, 
      id: this.Pms_Project_Id,
      clientName: this.allCategories.Client.find(res => res._id === this.VesselInformatonForm.value.clientName),
      vesselName: this.allCategories.Vessel.find(res => res._id === this.VesselInformatonForm.value.vesselName),
      yard_name: this.allCategories.Yard.find(res => res._id === this.VesselInformatonForm.value.yard_name),
      vessel_class: this.allCategories.VesselClass.find(res => res._id === this.VesselInformatonForm.value.vessel_class),
      stage: this.allCategories.Stage.find(res => res._id === this.VesselInformatonForm.value.stage),
      status: this.allCategories.Status.find(res => res._id === this.VesselInformatonForm.value.status),
      pmsAnalyst: !!this.VesselInformatonForm.value.pmsAnalyst ? this.allCategories.pmsanalyst.filter(res => this.VesselInformatonForm.value.pmsAnalyst.includes(res._id)) : [],
      team_members: this.allCategories.TeamMember.find(res => res._id === this.VesselInformatonForm.value.team_members)
    };
    this.PMS_ProjectsService.updatePmsProject(Payload).subscribe(res => {
      if (res.modifiedCount === 1) {
        this._ToastrService.info('Data Updated Successfuly');
        this.VesselInformatonForm.reset();
        this.ClientObject = {}
        this.VesselNameObject = {}
        this.YardNameObject = {}
        this.VesselClassObject = {}
        this.StageObject = {}
        this.StatusObject = {}
        this.PmsObject = {}
        this.TeamMemberObject = {}
        this.AssigneeArrayObject = []
        this.AssigneeArrayId = []
        this.ClientName = undefined;
        this.VesselName = undefined;
      }
    })
  }
}
