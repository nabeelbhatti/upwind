import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-category-types',
  templateUrl: './category-types.component.html',
  styleUrls: ['./category-types.component.css'],
})
export class CategoryTypesComponent implements OnInit {
  exform: FormGroup;
  showForm: any;
  allCategoryTypes: any;
  disableDelete: any;
  constructor(
    private categoryService: CategoriesService,
    private notifyService: NotificationService,
  ) {
    this.categoryService.getTypes().subscribe(res => {
      this.allCategoryTypes = res;
    });
    this.exform = new FormGroup({
      CategoryType: new FormControl(null, Validators.required),
    });
    this.showForm = false;
    this.exform.reset();
    this.disableDelete = false;
  }

  showFormFunction() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
    this.exform.reset();
  }
  onSubmit() {
    this.categoryService
      .addCategorytype({
        name: this.exform.value.CategoryType,
      })
      .subscribe(res => {
        this.notifyService.showSuccess(
          'Categories successfully added',
          'Success',
        );
        this.categoryService.getTypes().subscribe(res => {
          this.allCategoryTypes = res;
        });
        this.showForm = false;
        this.exform.reset();
      });
  }

  deleteCategoryType(id) {
    this.disableDelete = true;
    this.categoryService.deleteCategoryType(id).subscribe(res => {
      this.notifyService.showSuccess(
        'Category type successfully deleted',
        'Success',
      );
      this.categoryService.getTypes().subscribe(res => {
        this.allCategoryTypes = res;
        this.disableDelete = false;
      });
    });
  }

  ngOnInit(): void {}

  get CategoryType() {
    return this.exform.get('CategoryType');
  }
}
 