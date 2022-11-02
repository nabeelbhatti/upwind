import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnChooserService, ExcelExportService, FilterService, FreezeService, GridComponent, PageSettingsModel, PdfExportService, ReorderService, ResizeService, RowDataBoundEventArgs, RowSelectEventArgs, ToolbarService, VirtualScrollService, EditService, row } from '@syncfusion/ej2-angular-grids';
import { PmsProjectsService } from '../../../services/pms-projects.service';
import { ViewColumnData } from './view-data-json';
import { CategoriesService } from 'src/angular/app/services/categories.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';





@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
  providers: [FilterService, VirtualScrollService, ToolbarService, FreezeService,
    ExcelExportService, PdfExportService, ColumnChooserService, ResizeService, ReorderService, EditService]
})
export class ViewDataComponent implements OnInit {
  @ViewChild('ComponentsGrid') public ComponentsGrid: GridComponent;
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  constructor(
    private PMS_Service: PmsProjectsService,
    private _ToastrService: ToastrService,
    private categoryService: CategoriesService
  ) { }

  allCategories: any = {};
  totalPages = 0;
  public columns = ViewColumnData;
  rowData: any;
  SourceData2: any = [];
  public pageSettings2: Object;
  public editSettings: Object;
  CustomtoolbarParent: string[];
  CustomtoolbarChild: string[];
  showPdfControls: Boolean = false;
  isFetchingPDF: Boolean = false;

  // pdfUrl = '';
  pdfUrl = '';
  page = 1;
  pdfQuery = '';
  public viewData: any = null;


  ngOnInit(): void {
    this.getDataFromLocalStorage();
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
    };
    this.CustomtoolbarParent = ['Edit', 'Cancel', 'Update'];
    this.CustomtoolbarChild = [...this.CustomtoolbarParent];
  }

  getDataFromLocalStorage() {
    this.rowData = this.PMS_Service.getLocalStorageValue();
    this.PMS_Service.getFilesByParentFileId(this.rowData._id).subscribe(res => {
      this.SourceData2 = res;
      this.getLibrariesData('Shell Components')
    })

    // this.PMS_Service
    //   .getParentFileById(this.rowData._id)
    //   .subscribe(parentFile => {
    //     this.viewData = parentFile;
    //     if (this.viewData) {
    //       const {
    //         file_detail: { sharepoint_url },
    //       } = this.viewData;
    //       this.pdfUrl = sharepoint_url;
    //     }
    //   });
    this.PMS_Service
        .getParentFileById(this.rowData._id)
        .subscribe(parentFile => {
          const manualIndexData = parentFile;
          if (manualIndexData) {
            const {
              file_detail: { sharepoint_url },
            } = manualIndexData;
            const pdfURL = sharepoint_url.split('&id=%2F')[1].split('&')[0];
            this.PMS_Service.getProjectFiles(`/home/upwind/${pdfURL}`).subscribe(
                (data: Blob) => {
                  this.isFetchingPDF = false;
                  const file = new Blob([data], { type: 'application/pdf' });
                  const fileURL = URL.createObjectURL(file);
                  console.log(fileURL);
                  this.pdfUrl = fileURL;
                },
            );
          }
        });
  }

  getLibrariesData(type) {
    this.categoryService.getCategories(type).subscribe(res => {
      res = res.filter(re => !this.SourceData2.find(rs => rs.component_object.name === re.name));
      this.allCategories[type.replaceAll(' ', '')] = res;
      const additionComponents = [];
      this.allCategories.ShellComponents.forEach(element => {
        const objectToAdd = {
          component_object: {
            specification: "",
            maker_address: "",
            maker_name: "",
            model: "",
            name: element.name,
            page_reference: "",
            quantity: "",
          },
          parent_file_id: this.rowData._id,
        };
        additionComponents.push(objectToAdd)
      });
      this.SourceData2 = [
        ...this.SourceData2,
        ...additionComponents
      ];
    })
  }

  prevPage() {
    this.page--;
  }

  nextPage() {
    this.page++;
  }

  afterLoadComplete(args: any) {
    this.showPdfControls = true;
    this.totalPages = args._pdfInfo.numPages;
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

  onActionCompleteManualIndexFile(args: any) {
    const { action, data } = args;
    if (action === 'edit') {
      let finalData = {
        ...data,
        parent_file_id: this.rowData._id,
        file_detail: {
          parent_file_name: this.rowData.mapping_object.name_mapping
        },
        category: this.rowData.category
      }
      const { _id, parent_file_id, ...rest } = data;
      if(data.component_object.maker_address === undefined &&
        data.component_object.maker_address === undefined &&
        data.component_object.maker_name === undefined &&
        data.component_object.model === undefined &&
        data.component_object.page_reference === undefined &&
        data.component_object.quantity === undefined &&
        data.component_object.specification === undefined
        )
        {
          this._ToastrService.error('Cannot Edit because your data is empty');
          return
        }
      if (!!_id) {
        this.PMS_Service.updateChildFileById(_id, rest).subscribe(result => {
          this._ToastrService.info('Updated successfully');
        });
      } else {
        this.PMS_Service.createChildFileForProject(finalData).subscribe(result => {
          this._ToastrService.success('Data saved successfully');
        });
      }
    }
  }

}
