import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DialogEditEventArgs,
  EditService,
  FilterService,
  FreezeService,
  GridComponent,
  GroupService,
  IEditCell,
  PageService,
  ReorderService,
  ResizeService,
  RowSelectEventArgs,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
import * as manualIndexFileColumns from './header-columns/manual-index-files-columns.json';
import * as manualListColumns from './header-columns/manual-list-columns.json';
import { GridColumns } from '../../interfaces/GridColumns.interface';
import { CategoriesService } from '../../services/categories.service';
import { forkJoin } from 'rxjs';
import { Categories } from '../../interfaces/Categories.interface';
import { isEmptyObject } from '../../utils/check-empty-object';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { PmsManualIndexService } from '../../services/pms-manual-index.service';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manual-index',
  templateUrl: './manual-index.component.html',
  styleUrls: ['./manual-index.component.css'],
  providers: [
    GroupService,
    SortService,
    EditService,
    PageService,
    ToolbarService,
    FreezeService,
    ResizeService,
    ReorderService,
    FilterService,
  ],
})
export class ManualIndexComponent implements OnInit {
  public FILE_TYPE: string = 'Manual List';
  public clients: Categories[] = [];
  public vessels: Categories[] = [];
  public manualIndexFileColumns: any[] = manualIndexFileColumns;
  public manualListColumns: any[] = manualListColumns;
  public parentData: object[] = [];
  public manualListData: object[] = [];
  public editSettings: object = {
    allowEditing: true,
    allowAdding: false,
    mode: 'Normal',
  };
  public toolbarParent: string[] = ['Add', 'Edit', 'Cancel', 'Update'];
  public toolbarChild: any[] = [
    'Edit',
    'Cancel',
    'Update',
    'Search',
    {
      text: 'Compare Files',
      tooltipText: 'Compare Files',
      prefixIcon: 'e-expand',
      id: 'compare',
    },
  ];
  public pageSettings: object = { pageCount: 5 };
  public selectedClient: Categories = <Categories>{};
  public selectedVessel: Categories = <Categories>{};
  public projectDetail: any = null;
  public categoryParams: IEditCell;
  public categoryElem: HTMLElement;
  public categoryObj: DropDownList;
  public categories: { [key: string]: Object }[] = [];
  public statuses: { [key: string]: Object }[] = [];
  public selectedManualList: any = null;

  @ViewChild('mastergrid') public mastergrid: GridComponent;
  @ViewChild('detailgrid') public detailgrid: GridComponent;

  constructor(
    private categoryService: CategoriesService,
    private pmsProjectService: PmsProjectsService,
    private pmsManualIndexService: PmsManualIndexService,
    private toastrService: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.populateCategoryDropdown();

    const clientReq = this.categoryService.getCategories('Client');
    const vesselReq = this.categoryService.getCategories('Vessel');
    const fleetTypeReq = this.categoryService.getCategories('Fleet Type');
    const statusReq = this.categoryService.getCategories('Status');
    forkJoin([clientReq, vesselReq, fleetTypeReq, statusReq]).subscribe(
      async results => {
        this.clients = results[0];
        this.vessels = results[1];
        this.categories = results[2];
        this.statuses = results[3];
      },
    );
  }

  public onChangeClient(args: any): void {
    this.selectedClient = args.itemData;
    this.getProjectDetail();
  }

  public onChangeVessel(args: any): void {
    this.selectedVessel = args.itemData;
    this.getProjectDetail();
  }

  public onActionBeginManualIndexFile(args: any) {
    const { action, data } = args;

    if (action === 'add') {
      const { file_detail, category } = data;
      const categoryData = this.categories.find(x => x.name === category.name);
      const status = this.statuses.find(x => x.name === 'Open');
      const { _id: project_id } = this.projectDetail;
      //todo: should be dynamic
      const sharepoint_url =
        'https://itjibe.sharepoint.com/Databuilding/Shared%20Documents/Forms/AllItems.aspx?ct=1657893639073&or=OWA%2DNT&cid=90de3389%2Dec67%2D3eef%2Db2aa%2D470b5fce9695&ga=1&OR=Teams%2DHL&CT=1661504311411&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMjA3MzEwMTAwNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&id=%2FDatabuilding%2FShared%20Documents%2FAESM%2FAE%20Technical%20%26%20Maintenance%20Manual%2FMachinery%20Particulars%2FSet%202%20Machinery%20Particulars&viewid=6d49c330%2D718e%2D4b12%2Dbdcf%2D6ed182f81ca9';

      const parentFile = {
        ...data,
        file_detail: {
          ...file_detail,
          fileType: this.FILE_TYPE,
          sharepoint_url,
        },
        project_id,
        category: categoryData,
        status,
      };
      this.pmsProjectService
        .addParentFileForProject(parentFile)
        .subscribe(result => {
          const { _id: parentFileNewId } = result;
          args.data._id = parentFileNewId;
          args.data.project_id = project_id;
          this.toastrService.info('Record has been added successfully.');
          this.getProjectDetail();
        });
    } else if (action === 'edit') {
      const { _id, project_id, category, ...rest } = data;
      const categoryData = this.categories.find(x => x.name === category.name);
      const parentFile = {
        ...rest,
        category: categoryData,
      };
      this.pmsProjectService
        .updateParentFileById(_id, parentFile)
        .subscribe(result => {
          this.toastrService.info('Record has been updated successfully.');
        });
    }
  }

  public onActionCompleteManualListFile(args: any) {
    const { action, data } = args;

    if (action === 'edit') {
      const { _id, availability, pdf_id, source_file_name, notes } = data;
      this.pmsManualIndexService
        .updateChildFileById(_id, {
          availability,
          pdf_id,
          source_file_name,
          notes,
        })
        .subscribe(result => {
          this.toastrService.info('Record has been updated successfully.');
        });
    }
  }

  public toolbarClickManualList(args: any) {
    const { item } = args;

    if (item.id === 'compare') {
      const { _id: projectId } = this.projectDetail;
      this.pmsManualIndexService
        .compareChildFiles(projectId)
        .subscribe(results => {
          this.toastrService.info('Comparison has been finished successfully.');
          this.getProjectDetail();
        });
    }
  }

  private getProjectDetail(): void {
    if (
      !isEmptyObject(this.selectedClient) &&
      !isEmptyObject(this.selectedVessel)
    ) {
      const { name: clientName } = this.selectedClient;
      const { name: vesselName } = this.selectedVessel;
      const payload: any = { ClientName: clientName, VesselName: vesselName };
      this.pmsProjectService
        .GetParticualrVesselInformationFromPmsProject(payload)
        .subscribe(projectDetail => {
          this.projectDetail = projectDetail;
          if (!this.projectDetail) {
            this.toastrService.error('No record found.');
          }
          this.enableDisableAddBtn();
          if (this.projectDetail && !isEmptyObject(this.projectDetail)) {
            this.pmsProjectService
              .getParentFilesByProjectId(this.projectDetail._id, this.FILE_TYPE)
              .subscribe(parentFiles => {
                this.parentData = parentFiles || [];
                const parentFileIds = parentFiles.map(p => p._id);

                this.pmsManualIndexService
                  .getChildFilesByParentFileIds(parentFileIds)
                  .subscribe(childFiles => {
                    this.manualListData = childFiles || [];
                  });
              });
          }
        });
    }
  }

  private enableDisableAddBtn(): void {
    let isAllow = false;
    if (this.projectDetail && !isEmptyObject(this.projectDetail)) {
      isAllow = true;
    }
    this.editSettings = { ...this.editSettings, allowAdding: isAllow };
  }

  private populateCategoryDropdown() {
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
      write: args => {
        this.categoryObj = new DropDownList({
          dataSource: this.categories,
          text: args.rowData?.category?.name,
          fields: { value: '_id', text: 'name' },
          enabled: true,
          placeholder: 'Select a Fleet',
          floatLabelType: 'Never',
        });
        this.categoryObj.appendTo(this.categoryElem);
      },
    };
    this.manualIndexFileColumns.find(
      res => res.displayName === 'Category',
    ).editParam = this.categoryParams;
  }
}
