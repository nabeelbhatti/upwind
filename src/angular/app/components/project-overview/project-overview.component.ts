import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { columns } from './project-overview.-json';
import {
    ColumnChooserService, ExcelExportService, ExcelQueryCellInfoEventArgs, FilterService, FilterSettingsModel, FreezeService, GridComponent, PdfExportService,
    PdfQueryCellInfoEventArgs, ReorderService, ResizeService, ToolbarService, VirtualScrollService
} from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

setCulture('en-US');

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

@Component({
    selector: 'app-project-overview',
    templateUrl: './project-overview.component.html',
    styleUrls: ['./project-overview.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [FilterService, VirtualScrollService, ToolbarService, FreezeService,
        ExcelExportService, PdfExportService, ColumnChooserService, ResizeService, ReorderService]
})
export class ProjectOverviewComponent implements OnInit {
    @ViewChild('sample') listObj: DropDownListComponent;
    @ViewChild('overviewgrid') gridInstance: GridComponent;
    @ViewChild('Dialog') dialogEle: DialogComponent;


    AssigneeArrayId: any = [];
    AssigneeArrayObject: any = [];

    ClientName: any;
    VesselName: any;
    hideSubmitButtom = false;
    public data: any;
    public toolbar: string[] = ['ExcelExport', 'PdfExport', 'Search', 'ColumnChooser'];
    public isInitial: Boolean = true;
    public initialPage: Object
    public columns = columns;
    dataClientName: any;
    data_vessel_name: any;
    PublicId: any;
    DisableButton: boolean = true;
    projectForm: FormGroup = new FormGroup({
        clientName: new FormControl(null, Validators.required),
        vesselName: new FormControl(null, Validators.required),
        vesselType: new FormControl(null, Validators.required),
        category: new FormControl(''),
        typeOfBuilding: new FormControl(''),
        estStartDate: new FormControl(''),
        assignee: new FormControl(''),
        estEndDate: new FormControl(''),
        url: new FormControl(''),
    });
    allCategories: any = {};
    categorieKeys = ['Client', 'Yard', 'Vessel Type', 'Vessel', 'Categories', 'Building Types', 'pms manager', 'Stage', 'Status'];
    get clientName() {
        return this.projectForm.get('clientName');
    }
    get vesselName() {
        return this.projectForm.get('vesselName');
    }
    get vesselType() {
        return this.projectForm.get('vesselType');
    }
    gridAction = '';
    constructor(
        private pmsProjectSrv: PmsProjectsService, private categoryService: CategoriesService,
        private ToastrService: ToastrService
    ) { }
    ngOnInit(): void {
        this.getPMSOverviewData();
        this.initialPage = { pageSizes: true, pageCount: 4 };
        this.categorieKeys.forEach(res => {
            this.getLibrariesData(res);
        })
    }
    getLibrariesData(type) {
        this.categoryService.getCategories(type).subscribe(res => {
            this.allCategories[type.replaceAll(' ', '')] = res;
        })
    }

    formSubmit() {
        const FormDataValues = {
            ...this.projectForm.value,
            clientName: this.allCategories.Client.find(res => res._id === this.projectForm.value.clientName),
            vesselName: this.allCategories.Vessel.find(res => res._id === this.projectForm.value.vesselName),
            vesselType: this.allCategories.VesselType.find(res => res._id === this.projectForm.value.vesselType),
            category: this.allCategories.Categories.find(res => res._id === this.projectForm.value.category),
            typeOfBuilding: this.allCategories.BuildingTypes.find(res => res._id === this.projectForm.value.typeOfBuilding),
            assignee: !!this.projectForm.value.assignee ? this.allCategories.pmsmanager.filter(res => this.projectForm.value.assignee.includes(res._id)) : [],
            targetDate: this.projectForm.value.estEndDate
        };
        if (!!this.projectForm.valid) {
            this.pmsProjectSrv.addPmsProject(FormDataValues).subscribe(res => {
                this.getPMSOverviewData();
                this.dialogEle.hide();
            });
        }
    }
    getPMSOverviewData() {
        this.pmsProjectSrv.getAllpmsProject().subscribe(res => {
            this.data = res;
        })
    }

    onDeletePmsProject(data, canDelete = false) {
        this.gridAction = 'delete';
        !!data ? this.PublicId = data._id : null;
        this.dialogEle.show();
        if (!!canDelete) {
            this.pmsProjectSrv.deletePmsProject(this.PublicId).subscribe(res => {
                if (!res) {
                    this.ToastrService.info('Cannot Delete because record edited from Vessel Information page');
                    this.dialogEle.hide();
                    this.ngOnInit();
                } else {
                    this.ToastrService.error('Deleted Successfuly');
                    this.dialogEle.hide();
                    this.ngOnInit();
                }
            });
        }
    }

    onEditPmsProject(data) {
        this.gridAction = 'edit';
        this.projectForm = new FormGroup({
            clientName: new FormControl(data.clientName?._id, Validators.required),
            vesselName: new FormControl(data.vessel_name?._id, Validators.required),
            vesselType: new FormControl(data.vessel_type?._id, Validators.required),
            category: new FormControl(data.category?._id),
            typeOfBuilding: new FormControl(data.building_type?._id),
            estStartDate: new FormControl(data.est_start_date),
            assignee: new FormControl(data.assignee.map(res => res._id)),
            estEndDate: new FormControl(data.targetDate),
            url: new FormControl(data.url)
        });
        this.hideSubmitButtom = true;
        this.DisableButton = false;
        this.PublicId = data._id;
        this.dialogEle.show();
    }

    onClose() {
        this.gridAction = '';
        this.hideSubmitButtom = false;
        this.DisableButton = true;
        this.projectForm.reset();
        this.PublicId = undefined;
        this.dataClientName = undefined;
        this.data_vessel_name = undefined;
        return
    }

    updateForm() {
        const Payload = {
            ...this.projectForm.value,
            id: this.PublicId,
            clientName: this.allCategories.Client.find(res => res._id === this.projectForm.value.clientName),
            vesselName: this.allCategories.Vessel.find(res => res._id === this.projectForm.value.vesselName),
            vesselType: this.allCategories.VesselType.find(res => res._id === this.projectForm.value.vesselType),
            category: this.allCategories.Categories.find(res => res._id === this.projectForm.value.category),
            typeOfBuilding: this.allCategories.BuildingTypes.find(res => res._id === this.projectForm.value.typeOfBuilding),
            assignee: !!this.projectForm.value.assignee ? this.allCategories.pmsmanager.filter(res => this.projectForm.value.assignee.includes(res._id)) : []
        };
        this.pmsProjectSrv.updatePmsProjectWithPut(Payload).subscribe(res => {
            this.ToastrService.info(res.Message);
            this.dialogEle.hide();
            this.ngOnInit();
        })
    }

    getValues(data) {
        if (data.itemData.categoryType === "Client") {
            this.ClientName = data.itemData.name;
        }

        if (data.itemData.categoryType === "Vessel") {
            this.VesselName = data.itemData.name;
        }

        if (!!this.ClientName && !!this.VesselName) {
            const PayLoad = { ClientName: this.ClientName, VesselName: this.VesselName }
            this.pmsProjectSrv.GetParticualrVesselInformationFromPmsProject(PayLoad).subscribe(res => {
                if (res) {
                    this.ToastrService.info('Client and Vessel name Already exists in Database');
                    this.DisableButton = true;
                } else {
                    this.DisableButton = false;
                }
            })
        }

    }

    toolbarClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'PDF Export':
                this.gridInstance.pdfExport();
                break;
            case 'Excel Export':
                this.gridInstance.excelExport();
                break;
            case 'CSV Export':
                this.gridInstance.csvExport();
                break;
        }
    }

    exportQueryCellInfo(args: ExcelQueryCellInfoEventArgs | PdfQueryCellInfoEventArgs): void {
        if (args.column.headerText === 'Employee Image') {
            if ((args as any).name === 'excelQueryCellInfo') {
                args.image = { height: 75, base64: (args as any).data.EmployeeImage, width: 75 };
            } else {
                args.image = { base64: (args as any).data.EmployeeImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.EmailID,
                displayText: (args as any).data.EmailID
            };
        }
    }

    onFiletrApply(e) {
        !!e.value && e.value.length > 0 ?
            this.gridInstance.filterByColumn(e.element.id + '.name', 'equal', e.value) : 
            this.gridInstance.clearFiltering([e.element.id + '.name']);
    }
}

