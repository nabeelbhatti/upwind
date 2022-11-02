import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditService, GridComponent, IEditCell, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { CategoriesService } from '../../services/categories.service';
import * as FSDJSON from './fleet-standard-documents-columns.json';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { ClientsService } from '../../services/clients.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-fleet-standard-documents',
  templateUrl: './fleet-standard-documents.component.html',
  styleUrls: ['./fleet-standard-documents.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService, EditService]
})
export class FleetStandardDocumentsComponent implements OnInit {
  @ViewChild('overviewgrid') gridInstance: GridComponent;
  columnsJSON: any = FSDJSON?.columns;
  FSDData = [];
  allLibraryData: any = {};
  toolbar = ['Edit', 'Update'];
  fleetTypeParams: IEditCell;
  fleetTypeElem: HTMLElement;
  fleetTypeObj: DropDownList;
  statusParams: IEditCell;
  statusElem: HTMLElement;
  statusObj: DropDownList;
  reaquiredCatData = ['Client', 'Doc Types', 'Fleet Type', 'Availability Status'];
  gridConfig = {
    rowHeight: '38',
    height: '400',
    allowResizing: true,
    allowReordering: true,
    allowPaging: true,
    allowSelection: true,
    enableHeaderFocus: true,
    allowFiltering: true,
    allowSorting: true,
    enableHover: false,
    editSettings: {allowEditing: true, newRowPosition: true},
    filterSetting: { type: 'CheckBox'}
  }

  constructor(private categoryService: CategoriesService, private clientService: ClientsService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.reaquiredCatData.forEach(cat => { this.getLibraryData(cat)})
    this.getInlineDrpDwnValues()
  }

  /**
   * @description this method used to get all library data based on library type
   * @param type library type
   */
  getLibraryData(type) {
    this.categoryService.getCategories(type).subscribe(res => {
      this.allLibraryData[type.replaceAll(' ', '')] = res;
    })
  }

  /**
   * @description this method will invoked on selection of client to get data
   * @param event selected object of client dropdown
   */
  onClientChanges(event) {
    this.getFSDDataByClient(event?.itemData);
  }

  /**
   * @description this method used to get documents data based on selected client
   * @param clientObj 
   */
  getFSDDataByClient(clientObj) {
    this.FSDData = [];
    let newDocs = []
    this.clientService.getDocsByClient({ clientId: clientObj._id }).subscribe(res => {
      newDocs = newDocs.filter(rb => !res.map(ra => ra.doc_type._id).includes(rb.doc_type._id))
      newDocs.forEach(res => {
        res.client = clientObj
      })
      this.FSDData = [...res, ...newDocs];
      if (newDocs?.length > 0) {
        this.clientService.createClientDocs(newDocs).subscribe(res => { })
      }
    })
    this.allLibraryData?.DocTypes?.forEach(res => {
      newDocs.push({ doc_type: res });
    })
  }

  /**
   * @description this method used to perform operation based on grid action
   * @param event grid actions event
   */
  gridActions(event) {
    if (event.requestType === 'save') {
      const data = event.data;
      data.fleet_type = this.allLibraryData.FleetType.find(res => res.name === data.fleet_type?.name);
      data.status = this.allLibraryData.AvailabilityStatus.find(res => res.name === data.status?.name);
      data.date_received = !!data.date_received ? data.date_received.toString().slice(4, 24) : null;
      if (!!data.file_name && (!data.status || !data.fleet_type)) {
        event.cancel = true;
        this.toastrService.error('Please select Status and Fleet Type');
        return;
      }
      this.clientService.updateClientDocs(data).subscribe(res => { })
    }
  }
  /**
   * @description this method used to set the inline edit dropdown list
   */
  getInlineDrpDwnValues() {
    this.fleetTypeParams = {
      create: () => {
        this.fleetTypeElem = document.createElement('input');
        return this.fleetTypeElem;
      },
      read: () => {
        return this.fleetTypeObj.text;
      },
      destroy: () => {
        this.fleetTypeObj.destroy();
      },
      write: (args) => {
        this.fleetTypeObj = new DropDownList({
          dataSource: this.allLibraryData.FleetType,
          text: args.rowData?.fleet_type?.name,
          fields: { value: '_id', text: 'name' },
          enabled: true,
          placeholder: 'Select a Fleet',
          floatLabelType: 'Never'
        });
        this.fleetTypeObj.appendTo(this.fleetTypeElem);
      }
    }
    this.columnsJSON[8].editParam = this.fleetTypeParams;
    this.statusParams = {
      create: () => {
        this.statusElem = document.createElement('input');
        return this.statusElem;
      },
      read: () => {
        return this.statusObj.text;
      },
      destroy: () => {
        this.statusObj.destroy();
      },
      write: (args) => {
        this.statusObj = new DropDownList({
          dataSource: this.allLibraryData.AvailabilityStatus,
          text: args.rowData?.status?.name,
          fields: { value: '_id', text: 'name' },
          enabled: true,
          placeholder: 'Select a Status',
          floatLabelType: 'Never'
        });
        this.statusObj.appendTo(this.statusElem);
      }
    }
    this.columnsJSON[7].editParam = this.statusParams;
  }
}
