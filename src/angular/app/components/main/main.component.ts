import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PmsProjectsService } from '../../services/pms-projects.service';
import { NotificationService } from '../../services/notification.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Input() singleOcrData: any;
  @Input() showmain: any;
  @Output() submitForm = new EventEmitter<{ formValues: any; offset: any }>();
  @Output() setSelectedComponent = new EventEmitter<{ value: any }>();
  @Output() setSelectedModel = new EventEmitter<{ value: any }>();
  @Output() setSelectedMaker = new EventEmitter<{ value: any }>();

  exform: FormGroup;
  public placeholder = 'Select Component';
  public popupHeight = '200px';
  public popupWidth = '250px';
  components: any;
  makers: any;
  models: any;

  constructor(
    private PMS_ProjectsService: PmsProjectsService,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private categoryService: CategoriesService,
  ) {

  }

  ngOnInit(): void {
    console.log('main');

    this.exform = new FormGroup({
      FileName: new FormControl(null),
      MakersName: new FormControl(null),
      ModelName: new FormControl(null),
      FilePage: new FormControl(null),
      PartName: new FormControl(null),
      Components: new FormControl(null),
    });

    this.categoryService.getCategories('maker').subscribe(data => {
      this.makers = data.map(item => {
        return item.name;
      });
    });
    this.categoryService.getCategories('component').subscribe(data => {
      this.components = data.map(item => {
        return item.name;
      });
    });
    this.categoryService.getCategories('model').subscribe(data => {
      this.models = data.map(item => {
        return item.name;
      });
    });
    this.categoryService.getCategories('Pat name').subscribe(data => {
      this.models = data.map(item => {
        return item.name;
      });
    });
    // this.exform = new FormGroup({
    //   FileName: new FormControl(this.singleOcrData?.file_name),
    //   MakersName: new FormControl(this.singleOcrData?.makers),
    //   ModelName: new FormControl(this.singleOcrData?.makers_model),
    //   FilePage: new FormControl(this.singleOcrData?.page_no),
    //   PartName: new FormControl(this.singleOcrData?.part_names),
    // });
  }

  onSubmit() {
    this.submitForm.emit({ formValues: this.exform.value, offset: 0 });
  }
  changeComponent($event){
    this.setSelectedComponent.emit($event.itemData)
  }
  changeModal($event){
    this.setSelectedModel.emit($event.itemData)
  }
  changeMaker($event){
    this.setSelectedMaker.emit($event.itemData)
  }

  get FileName() {
    return this.exform.get('FileName');
  }
  get FilePage() {
    return this.exform.get('FilePage');
  }
  get MakersName() {
    return this.exform.get('MakersName');
  }
  get PartName() {
    return this.exform.get('PartName');
  }

  get ModelName() {
    return this.exform.get('ModelName');
  }

  get Components() {
    return this.exform.get('Components');
  }
}
