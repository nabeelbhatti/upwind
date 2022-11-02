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
import {
  EditSettingsModel,
  ToolbarItems,
  IEditCell,
} from '@syncfusion/ej2-angular-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-source-manual',
  templateUrl: './source-manual.component.html',
  styleUrls: ['./source-manual.component.css'],
  providers: [ToolbarService, EditService, PageService],
})
export class SourceManualComponent implements OnInit {
  @ViewChild('ddsample')
  public dropDown: DropDownListComponent;
  @ViewChild('normalgrid') gridInstance: GridComponent;
  @ViewChild('SourceFilesGrid') SourceFilesGridInstance: GridComponent;
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
  public dialogwidth = '90%';
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public data: Record<string, any>[];
  public childData: Record<string, any>[];
  public data2: Record<string, any>[];
  public editSettings: Record<string, any>;
  public editSettingsSf: Record<string, any>;
  pdfUrl1 =
    '/Users/tk-lpt-0569/Desktop/All work/Angular/upwind-app copy/files/dummy.pdf';
  pdfUrl = '';
  projectId: any;
  selectedVesselId: any;
  ClientName: any;
  interValId: any;
  clientId: any;
  VesselName: any;
  public toolbar: any;
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
  mainRoute: any;
  allCategories: any;
  batch_numberFeild: any;
  sharepoint_urlFeild: any;
  manualTypes: any;
  hull_number_similarityData: any;
  public manualTypesParams: IEditCell;
  public hullNumberSimilarityParams: IEditCell;

  public manualTypesElem: HTMLElement;
  public manualTypesObj: DropDownList;

  public hullNumberSimilarityElem: HTMLElement;
  public hullNumberSimilarityObj: DropDownList;
  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private router: Router,
    private getallClients: ClientsService,
    private _ToastrService: ToastrService,
    private categories: CategoriesService,
  ) {
    // this.getallClients.getAllClients().subscribe(res => {
    //   this.allClients = res.map(item => ({
    //     label: item.clientName,
    //     value: item.clientName,
    //   }));
    // });

    this.categories.getCategories('Client').subscribe(res => {
      this.allClients = res.map(item => ({
        label: item.name,
        value: item._id,
      }));
    });
    this.filterFunction();
    this.mainRoute = router.url.split('/');
    this.fileContentForm = new FormGroup({
      fileName: new FormControl(
        { value: '', disabled: true },
        Validators.required,
      ),
      manualType: new FormControl(null, Validators.required),
      appendixPages: new FormControl(null),
      notes: new FormControl(null),
    });
  }
  onClose() {
    this.fileContentForm.reset();
    this.Dialog.hide();
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
  ngOnDestroy() {
    if (this.interValId) {
      clearInterval(this.interValId);
    }
  }

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
  public ngOnInit(): void {
    this.editSettings = {
      allowEditing: false,
      allowAdding: false,
      allowDeleting: false,
      newRowPosition: 'Top',
    };
    this.editSettingsSf = {
      allowEditing: false,
      // allowAdding: true,
      // allowDeleting: true,
      newRowPosition: 'Top',
    };

    this.toolbar = ['Search', 'Add', 'Edit', 'Update', 'Cancel'];
    this.toolbar2 = [
      'Search',
      'Edit',
      'Update',
      'Cancel',
      'ExcelExport',
      'PdfExport',
    ];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5, pageSize: 6 };
    this.formatoptions = { type: 'date', format: 'M/d/y' };
    this.manualTypesParams = {
      create: () => {
        this.manualTypesElem = document.createElement('input');
        return this.manualTypesElem;
      },
      read: () => {
        return this.manualTypesObj.text;
      },
      destroy: () => {
        this.manualTypesObj.destroy();
      },
      write: () => {
        this.manualTypesObj = new DropDownList({
          dataSource: this.manualTypes,
          fields: { value: '_id', text: 'name' },
          placeholder: 'Select a Manual Type',
          floatLabelType: 'Never',
        });
        this.manualTypesObj.appendTo(this.manualTypesElem);
      },
    };
    this.PMS_ProjectsService.getProjectFiles(this.pdfUrl1).subscribe(
      (data: Blob) => {
        debugger;
        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        this.pdfUrl = fileURL;
      },
    );
    this.hullNumberSimilarityParams = {
      create: () => {
        this.hullNumberSimilarityElem = document.createElement('input');
        return this.hullNumberSimilarityElem;
      },
      read: () => {
        return this.hullNumberSimilarityObj.text;
      },
      destroy: () => {
        this.hullNumberSimilarityObj.destroy();
      },
      write: () => {
        this.hullNumberSimilarityObj = new DropDownList({
          dataSource: this.hull_number_similarityData,
          fields: { value: '_id', text: 'name' },
          placeholder: 'Select a Hull Number Similarity',
          floatLabelType: 'Never',
        });
        this.hullNumberSimilarityObj.appendTo(this.hullNumberSimilarityElem);
      },
    };
  }

  public localFields: Record<string, any> = {
    text: 'newRowPosition',
    value: 'id',
  };
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
  rootFoldersToolBar(args: any) {}
  public onOverlayClick: EmitType<object> = () => {
    this.Dialog.hide();
  };
  previewFile(data: any) {
    this.fileContentForm.patchValue({
      fileName: data?.source_file_name,
      manualType: data?.manual_type,
      appendixPages: data?.appendix_pages,
      notes: data?.notes,
    });
    this.Dialog.show();
  }

  // afterLoadComplete(pdfData: any) {
  //   this.totalPages = pdfData.numPages;
  // }

  nextPage() {
    this.page++;
    console.log(this.page);
  }

  prevPage() {
    this.page--;
    console.log(this.page);
  }

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    }
  }
  extractParentFileForProject(project: any) {
    console.log(project);
    this.PMS_ProjectsService.extractParentFileForProject(
      project.spl_id,
    ).subscribe(res => {
      this.fetchRootProjects();
    });
  }
  startParentFileForProject(project: any) {
    this.PMS_ProjectsService.startParentFileForProject(
      project.spl_id,
    ).subscribe(res => {
      this.fetchRootProjects();
    });
  }
  actionBegin(args: any): void {
    console.log(args.requestType);
    if (args.requestType === 'add') {
      this.batch_numberFeild = true;
      this.sharepoint_urlFeild = true;
    } else if (args.requestType === 'beginEdit') {
      this.disableFeilds();
    } else if (args.requestType === 'save') {
      let gridInstance: any = (<any>document.getElementById('Normalgrid'))
        .ej2_instances[0];
      const data = {
        project_id: this.selectedVesselId,
        file_detail: {
          sharepoint_url: args.data.sharePoint_link,
          fileName: '',
          fileType: 'Source Manual',
        },
        batch_number: args?.data?.batch_no || 0,
        active_status: true,
        date_received: !!args.data.date_revieved
          ? args.data.date_revieved.toString().slice(4, 24)
          : '',
        row_activity: {
          created_by: '',
          modified_by: '',
          creation_date: new Date(),
          modification_date: new Date(),
        },
      };
      console.log(JSON.stringify(data));
      if (args.action === 'edit') {
        this.PMS_ProjectsService.updateParentFileForProject(
          args.data,
          args.data.spl_id,
        ).subscribe(res => {
          this.fetchRootProjects();
        });
      } else {
        this.PMS_ProjectsService.createParentFileForProject(data).subscribe(
          res => {
            this.fetchRootProjects();
          },
        );
      }

      if (
        gridInstance.pageSettings.currentPage !== 1 &&
        gridInstance.editSettings.newRowPosition === 'Top'
      ) {
        args.index =
          gridInstance.pageSettings.currentPage *
            gridInstance.pageSettings.pageSize -
          gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index =
          gridInstance.pageSettings.currentPage *
            gridInstance.pageSettings.pageSize -
          1;
      }
    }
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
          this.PMS_ProjectsService.getParentFilesByProjectId(
            this.selectedVesselId,
          ).subscribe(res => {
            const projIds = [];
            this.data = res.map(data => {
              projIds.push(data?._id);
              const newDtaa = {
                spl_id: data?._id ? data?._id : '',
                batch_no: data?.batch_number ? data?.batch_number : 0,
                date_revieved: data?.date_received ? data?.date_received : '',
                sharePoint_link: data?.file_detail?.sharepoint_url
                  ? data?.file_detail?.sharepoint_url
                  : '',
                screening_status: data?.status ? data?.status.name : '',
                total_files: data?.number_of_files ? data?.number_of_files : '',
                screening_date: data?.creation_date ? data?.creation_date : '',
                progress: data?.progress ? data?.progress : 0,
              };
              return newDtaa;
            });
            this.PMS_ProjectsService.getChildFilesByProjectIds(
              projIds,
            ).subscribe(res1 => {
              this.childData = res1.map(child => {
                return {
                  pdf_id: child?._id ? child?._id : '',
                  batch_no: child?.batch_number ? child?.batch_number : '',
                  notes: child?.notes ? child?.notes : '',
                  hull_number_similarity: child?.hull_number_similarity?.name
                    ? child?.hull_number_similarity.name
                    : '',
                  source_file_name: child?.file_detail?.file_name
                    ? child?.file_detail?.file_name
                    : '',
                  file_size: child?.file_detail?.file_size
                    ? child?.file_detail?.file_size
                    : 0,
                  file_type: child?.file_detail?.file_type
                    ? child?.file_detail?.file_type
                    : '',
                  title_text: child?.title_text ? child?.title_text : '',
                  created_date: child?.row_detail?.creation_date
                    ? child?.row_detail?.creation_date
                    : '',
                  manual_type: child?.manual_object?.manual_name
                    ? child?.manual_object?.manual_name
                    : '',
                  screening_result: child?.screening_date
                    ? child?.screening_date
                    : '',
                  appendix_pages: child?.appendix_pages
                    ? child?.appendix_pages
                    : '',
                  skipped_pages: child?.skipped_pages
                    ? child?.skipped_pages
                    : '',
                  screening: child?.total_pages ? child?.total_pages : '',
                };
              });
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
            // allowDeleting: true,
            newRowPosition: 'Top',
          };
          this._ToastrService.error('Record Not Found');
        }
      });
      // this.interValId = setInterval(() => {
      //   this.fetchRootProjects();
      // }, 5000);
    }
  }

  sourceFilesGridActions(args: any) {
    console.log(args.requestType === 'save');
    if (args.requestType === 'save') {
      this.PMS_ProjectsService.updateChildFileById(
        args?.data.pdf_id,
        args.data,
      ).subscribe(data => {
        this.fetchRootProjects();
        this._ToastrService.success('Source File Updated Successfuly');
      });
    } else if (args.requestType === 'add') {
    }
  }

  get fileName() {
    return this.fileContentForm.get('fileName');
  }
  get manualType() {
    return this.fileContentForm.get('manualType');
  }
  get appendixPages() {
    return this.fileContentForm.get('appendixPages');
  }
  get notes() {
    return this.fileContentForm.get('notes');
  }
  get jobDescription() {
    return this.fileContentForm.get('jobDescription');
  }
}
