import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EditService,
  PageService,
  ToolbarService,
  FilterService,
} from '@syncfusion/ej2-angular-grids';
import { PmsManualIndexService } from '../../services/pms-manual-index.service';
import { PmsProjectsService } from '../../services/pms-projects.service';
import * as manualIndexPdfColumns from './header-columns/manual-index-pdf-columns.json';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manual-index-pdf',
  templateUrl: './manual-index-pdf.component.html',
  styleUrls: ['./manual-index-pdf.component.css'],
  providers: [ToolbarService, EditService, PageService, FilterService],
})
export class ManualIndexPdfComponent implements OnInit {
  public manualIndexPdfColumns: any[] = manualIndexPdfColumns;
  public parentFileId: string;
  public manualListData: object[] = [];
  public editSettings: object = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Normal',
  };
  public toolbar: string[] = ['Add', 'Edit', 'Cancel', 'Update', 'Search'];
  public manualIndexData: any = null;
  public pdfSrc = '';
  public page = 1;
  public totalPages = 0;
  public showPdfControls: boolean = false;
  public isFetchingPDF: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pmsManualIndexService: PmsManualIndexService,
    private pmsProjectsService: PmsProjectsService,
    private toastrService: ToastrService,

  ) {}

  ngOnInit(): void {
    this.parentFileId = this.route.snapshot.params.id;
    const parentFileIds = [this.parentFileId];
    this.pmsManualIndexService
      .getChildFilesByParentFileIds(parentFileIds)
      .subscribe(childFiles => {
        this.manualListData = childFiles || [];
      });
    this.isFetchingPDF = true;

    this.pmsProjectsService
      .getParentFileById(this.parentFileId)
      .subscribe(parentFile => {
        this.manualIndexData = parentFile;
        if (this.manualIndexData) {
          const {
            file_detail: { sharepoint_url },
          } = this.manualIndexData;
          const pdfURL = sharepoint_url.split('&id=%2F')[1].split('&')[0];
          this.pmsProjectsService.getProjectFiles(`/home/upwind/${pdfURL}`).subscribe(
              (data: Blob) => {
                this.isFetchingPDF = false;
                const file = new Blob([data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                console.log(fileURL);
                this.pdfSrc = fileURL;
              },
          );
        }
      });
  }

  public onActionComplete(args: any) {
    const { action, data } = args;

    if (action === 'add') {
      const { source_file_name, manual_object } = data;
      const {
        _id: parent_file_id,
        file_detail,
        category,
      } = this.manualIndexData;
      const childObj = {
        source_file_name,
        manual_object,
        parent_file_id,
        file_detail: {
          parent_file_name: file_detail.filename,
        },
        category,
      };

      this.pmsManualIndexService
        .saveChildFileById(childObj)
        .subscribe(result => {
          const { _id: parentFileNewId } = result;
          args.data._id = parentFileNewId;
          this.toastrService.info('Record added.');
        });
    } else if (action === 'edit') {
      const { _id, source_file_name, manual_object, file_detail } = data;
      const childObj = {
        source_file_name,
        manual_object,
        file_detail,
      };
      this.pmsManualIndexService
        .updateChildFileById(_id, childObj)
        .subscribe(result => {
          this.toastrService.info('Record updated.');
        });
    }
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
}
