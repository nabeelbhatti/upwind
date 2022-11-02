import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnChooserService, ExcelExportService, FilterService, FreezeService, GridComponent, PageSettingsModel, PdfExportService, ReorderService, ResizeService, RowDataBoundEventArgs, RowSelectEventArgs, ToolbarService, VirtualScrollService, EditService, IEditCell } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToolbarClickEventArgs, ToolbarCreateEventArgs } from '@syncfusion/ej2-filemanager';
import { CategoriesService } from '../../services/categories.service';
import { PmsProjectsService } from '../../services/pms-projects.service';
import {
  ParticularMachineryParticularColumn,
  MachineryComponentColumn
} from './machinery-particular-json';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-machinery-particular',
  templateUrl: './machinery-particular.component.html',
  styleUrls: ['./machinery-particular.component.css'],
  providers: [FilterService, VirtualScrollService, ToolbarService, FreezeService,
    ExcelExportService, PdfExportService, ColumnChooserService, ResizeService, ReorderService, EditService]
})

export class MachineryParticularComponent implements OnInit {
  @ViewChild('particularGrid') public particularGrid: GridComponent;
  @ViewChild('ComponentsGrid') public ComponentsGrid: GridComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;

  ClientName: any;
  VesselName: any;
  FILE_TYPE: any;
  public targetElement: HTMLElement;
  public columns: any = ParticularMachineryParticularColumn;
  public columns2 = MachineryComponentColumn;
  public toolbar: string[] = ['ExcelExport', 'PdfExport', 'Search', 'ColumnChooser'];
  public initialPage = { pageSizes: true, pageCount: 4 };
  public editSettings = {
    allowEditing: true,
    allowAdding: false,
    allowDeleting: true,
    mode: 'Normal',
  };
  SourceData: Object[];
  SourceData2: Object[];
  public toolbarChild: string[];
  public toolbarParent = ['Add', 'Delete', 'Edit', 'Update', 'Cancel', 'ColumnChooser'];
  public pageSettings1: Object;
  public pageSettings2: Object;

  allCategories: any = {};
  categorieKeys = ['Client', 'Vessel', 'Categories'];
  public position: object = { X: 'center', Y: 'center' };

  ParticualrsDataFields = {};
  ComponentsDataFields = {};
  CustomtoolbarParent = ['Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
  CustomtoolbarChild: string[];
  categoryParams: IEditCell;
  categoryElem: HTMLElement;
  categoryObj: DropDownList;
  projectDetail: any;
  Parent_File_Type = 'MachineryComponent'

  constructor(
    private pmsProjectSrv: PmsProjectsService,
    private CategoryService: CategoriesService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.toolbarChild = [...this.toolbarParent];
    this.CustomtoolbarChild = [...this.CustomtoolbarParent];
    this.categorieKeys.forEach(res => {
      this.getLibrariesData(res);
    });
    this.getCategoryForEdit();
  }

  public getDataOfRow(args: any): void {
    const rowData: any = args;
    this.pmsProjectSrv.SendMessageWithData(rowData);
    this._Router.navigate([]).then(() => {
      window.open('pages/view-data', '_blank');
    });
  }

  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  }

  // Enables the footer buttons
  public buttons: Object = [
    {
      'click': this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'OK',
        // Enables the primary button
        isPrimary: true
      }
    }
  ];

  getLibrariesData(type) {
    this.CategoryService.getCategories(type).subscribe(res => {
      this.allCategories[type.replaceAll(' ', '')] = res;
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
      this.pmsProjectSrv.GetParticualrVesselInformationFromPmsProject(PayLoad).subscribe(res => {
        if (!res) {
          this._ToastrService.error('Record no found !');
          this.SourceData = [];
          this.SourceData2 = [];
        }
        else {
          let IdArray = [];
          this.editSettings = { ...this.editSettings, allowAdding: true };
          this._ToastrService.success('Record found');
          this.projectDetail = res._id;
          this.pmsProjectSrv.getParentFilesByProjectId(this.projectDetail, this.Parent_File_Type).subscribe(res => {
            this.SourceData = res;
            res.forEach(element => {
              IdArray.push(element._id);
            });
            let reqObject = { _id: IdArray }
            this.pmsProjectSrv.getAllChildsByParentIdArray(reqObject).subscribe(res => {
              this.SourceData2 = res;
            })
          });
        }
      })
    }

  }


  onActionCompleteManualIndexFile(args: any) {

    const { action, data, requestType } = args;
    if (action === 'add') {
      const dataObject = data;
      let { file_detail } = data;
      file_detail = {
        ...file_detail,
        fileName: data.name_mapping,
        fileType: 'MachineryComponent'
      }

      const project_id = this.projectDetail;

      const parentFile = {
        ...dataObject,
        project_id,
        file_detail
      };

      this.pmsProjectSrv

        .addParentFileForProject(parentFile)

        .subscribe(result => {
          this._ToastrService.success('Data saved successfully')
        });

    } else if (action === 'edit') {
      const { _id, project_id, ...rest } = data;
      this.pmsProjectSrv

        .updateParentFileById(_id, rest)

        .subscribe(result => {

          this._ToastrService.info('Updated successfully')

        });
    } else if (requestType === 'delete') {
      const _id = data[0]._id;
      this.pmsProjectSrv

        .deleteParentFileByID(_id)

        .subscribe(result => {

          this._ToastrService.error('Deleted Successfuly')

        });
    }
  }

  childAction(args: any) {
    const { data, requestType, action } = args;
    if (requestType === 'delete') {
      console.log(args);
      const _id = data[0]._id;
      this.pmsProjectSrv

        .deleteChildFileByID(_id)

        .subscribe(result => {
          this._ToastrService.error('Deleted Successfuly')
        });
    } else if (action === 'edit') {
      const { _id, parent_file_id, ...rest } = data;
        this.pmsProjectSrv.updateChildFileById(_id, rest).subscribe(result => {
          this._ToastrService.info('Updated successfully');
        });
    }
  }

  getCategoryForEdit() {
    this.categoryParams = {
      create: () => {
        this.categoryElem = document.createElement('input');
        return this.categoryElem;
      },
      read: () => {
        return this.categoryObj.text;
      },
      destroy: () => {
        this.categoryObj.destroy();
      },
      write: (args) => {
        this.categoryObj = new DropDownList({
          dataSource: this.allCategories.Categories,
          text: args.rowData?.category?.name,
          fields: { value: '_id', text: 'name' },
          enabled: true,
          placeholder: 'Select a Fleet',
          floatLabelType: 'Never'
        });
        this.categoryObj.appendTo(this.categoryElem);
      }
    }
    this.columns[2].editParam = this.categoryParams;
  }
}
