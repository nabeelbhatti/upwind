import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditService, EditSettingsModel, ExcelExportService, FilterService, ForeignKeyService, FreezeService, GridComponent, PageEventArgs, PdfExportService, SortService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { GeneralLibrariesService, LibraryDropdownData } from './general-libraries.service';

@Component({
  selector: 'app-general-libraries',
  templateUrl: './general-libraries.component.html',
  styleUrls: ['./general-libraries.component.css'],
  providers: [
    EditService,
    ExcelExportService,
    FilterService,
    ForeignKeyService,
    FreezeService,
    PdfExportService,
    SortService,
    ToolbarService,
  ]
})
export class GeneralLibrariesComponent implements OnInit {
  @ViewChild('grid')
  public grid: GridComponent;

  public libraryDropdownData: LibraryDropdownData[];
  public selectedLibrary: string;
  public libraryData: any[];
  public filterSettings: Object;
  public toolbarItems: ToolbarItems[];
  public filterPopupHeight = '220px';
  public editSettings: EditSettingsModel;
  public libraryDropdownFields: Record<string, string> = {
    text: 'name',
    value: 'value',
  };
  private selectedLibrarySubscription: Subscription;

  constructor(
    private readonly service: GeneralLibrariesService,
    private readonly notifyService: NotificationService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.libraryDropdownData = await lastValueFrom(this.service.getLibrariesList());
    this.selectLibrary(this.libraryDropdownData[0]);

    this.filterSettings = { type: 'CheckBox' };
    this.toolbarItems = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  }

  public selectLibrary(e: ChangeEventArgs | LibraryDropdownData) {
    this.selectedLibrary = e.value as string;
    this.updateLibraryData();
  }

  public toolbarClick(args: ClickEventArgs): void {
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

  public async actionBegin(args: PageEventArgs & { data: any }): Promise<void> {
    if (args.requestType === 'save') {
      args.cancel = true; /** prevent default actions */
      this.save(args.data);
    } else if (args.requestType === 'delete') {
      args.cancel = true; /** prevent default actions */
      this.delete(args.data[0]._id);
    }
  }

  private updateLibraryData(): void {
    this.selectedLibrarySubscription?.unsubscribe();
    this.grid.showSpinner();
    this.selectedLibrarySubscription =
      this.service.getLibraryData(this.selectedLibrary).subscribe({
        next: (data) => {
          this.libraryData = data;
          this.grid.hideSpinner();
        },
        error: () => {
          this.libraryData = [];
        }
      });
  }

  private save(data: any): void {
    this.service.createUpdateLibraryItem(this.selectedLibrary, data).subscribe({
      next: () => {
        this.notifyService.showSuccess(
          data._id ? 'Library item updated successfully' : 'Library item added successfully',
          'Success',
        );
        this.updateLibraryData();
      },
      error: () => {
        this.notifyService.showError(
          'An error occurred while adding a library item',
          'Error',
        );
      }
    });
  }

  private delete(id: string): void {
    this.service.deleteLibraryItem(this.selectedLibrary, id).subscribe({
      next: () => {
        this.notifyService.showSuccess(
          'Library item deleted successfully',
          'Success',
        );
        this.updateLibraryData();
      },
      error: () => {
        this.notifyService.showError(
          'An error occurred while deleting a library item',
          'Error',
        );
      }
    });
  }
}
