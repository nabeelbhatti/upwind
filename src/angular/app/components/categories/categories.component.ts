import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CategoriesService } from '../../services/categories.service';
import {
  NodeSelectEventArgs,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  showForm: any;
  categoryType: any;
  categoryTypeS: any;
  defaultType: any;
  categoryId: any;
  typeForAdd: any;
  field: any;
  showparentAdd: any;
  showChildAdd: any;
  pageVariable = 2;
  exform: FormGroup;
  constructor(
    private categoryService: CategoriesService,
    private notifyService: NotificationService,
  ) {
    this.categoryService.getTypes().subscribe(
      data => {
        this.defaultType = data[0]?.name;
        this.categoryTypeS = data;
        this.typeForAdd = data[0]?.name;
        this.categoryService.getCategories(data[0]?.name).subscribe(
          data => {
            this.showChildAdd = false;
            const Dataa = data.map(Category => {
              const newCategory = { ...Category };
              newCategory.name = Category.name + '-' + Category.code;
              newCategory.subCategory = Category.subCategory.map(subCat => {
                const newSubcat = { ...subCat };
                newSubcat.name = subCat.name + '-' + subCat.code;
                return newSubcat;
              });
              return newCategory;
            });

            this.field = {
              dataSource: Dataa,

              id: 'catId',
              text: 'name',
              child: 'subCategory',
            };
          },
          error => {
            //Error callback
            //throw error;   //You can also throw the error to a global error handler
          },
        );
        this.categoryId = undefined;
      },
      error => {
        this.notifyService.showError(error.error.message, 'Error');
      },
    );
    this.showForm = false;
    this.showChildAdd = false;
    this.exform = new FormGroup({
      Category: new FormControl(null, Validators.required),
      Code: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.categoryService
      .addCategory({
        name: this.exform.value.Category,
        code: this.exform.value.Code,
        categoryType: this.typeForAdd,
      })
      .subscribe(
        data => {
          !!data ? this.notifyService.showSuccess(
            'Category added successfully',
            'Success',
          ) : this.notifyService.showError(
            'Category already exist',
            'Error',
          )
          this.showForm = false;
          this.exform.reset();
          this.categoryService
            .getCategories(this.typeForAdd)
            .subscribe(data => {
              this.showChildAdd = false;
              const Dataa = data.map(Category => {
                const newCategory = { ...Category };
                newCategory.name = Category.name + '-' + Category.code;

                newCategory.subCategory = Category.subCategory.map(subCat => {
                  const newSubcat = { ...subCat };
                  newSubcat.name = subCat.name + '-' + subCat.code;
                  return newSubcat;
                });
                return newCategory;
              });

              this.field = {
                dataSource: Dataa,

                id: 'catId',
                text: 'name',
                child: 'subCategory',
              };
            });
        },
        error => {
          this.notifyService.showError(error.error.message, 'Error');
        },
      );
  }

  addcategory() {
    this.categoryService
      .addCategory({
        name: this.exform.value.Category,
        code: this.exform.value.Code.trim(),
        child: this.categoryId,
      })
      .subscribe(
        data => {
          this.showForm = false;
          this.exform.reset();

          this.categoryService
            .getCategories(this.typeForAdd)
            .subscribe(data => {
              this.showChildAdd = false;
              const Dataa = data.map(Category => {
                const newCategory = { ...Category };
                newCategory.name = Category.name + '-' + Category.code;

                newCategory.subCategory = Category.subCategory.map(subCat => {
                  const newSubcat = { ...subCat };
                  newSubcat.name = subCat.name + '-' + subCat.code;
                  return newSubcat;
                });
                return newCategory;
              });

              this.field = {
                dataSource: Dataa,

                id: 'catId',
                text: 'name',
                child: 'subCategory',
              };
            });
          this.categoryId = undefined;
        },
        error => {
          this.notifyService.showError(error.error.message, 'Error');
        },
      );
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe(data => {
      this.notifyService.showSuccess(
        'Category deleted successfully',
        'Success',
      );

      this.categoryService.getCategories(this.typeForAdd).subscribe(data => {
        this.showChildAdd = false;
        const Dataa = data.map(Category => {
          const newCategory = { ...Category };
          newCategory.name = Category.name + '-' + Category.code;

          newCategory.subCategory = Category.subCategory.map(subCat => {
            const newSubcat = { ...subCat };
            newSubcat.name = subCat.name + '-' + subCat.code;
            return newSubcat;
          });
          return newCategory;
        });

        this.field = {
          dataSource: Dataa,

          id: 'catId',
          text: 'name',
        };
      });
      this.categoryId = undefined;
    });
  }

  showFormFunction() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
    this.categoryType = '';
    this.exform.reset();
    this.categoryId = undefined;
  }

  @ViewChild('filterDropDown')
  public listObj: DropDownListComponent;

  public fieldss: Record<string, any> = {
    text: 'name',
    value: 'name',
  };

  deleteCat(categoryId) {
    this.categoryService.deleteCategory(categoryId).subscribe(data => {
      this.notifyService.showSuccess(
        'Category deleted successfully',
        'Success',
      );

      this.categoryService.getCategories(this.typeForAdd).subscribe(data => {
        this.showChildAdd = false;
        const Dataa = data.map(Category => {
          const newCategory = { ...Category };
          newCategory.name = Category.name + '-' + Category.code;

          newCategory.subCategory = Category.subCategory.map(subCat => {
            const newSubcat = { ...subCat };
            newSubcat.name = subCat.name + '-' + subCat.code;
            return newSubcat;
          });
          return newCategory;
        });

        this.field = {
          dataSource: Dataa,

          id: 'catId',
          text: 'name',
        };
      });
      this.categoryId = undefined;
    });
  }
  public filterPopupHeight = '220px';
  public filterFunction(e: ChangeEventArgs): void {
    this.typeForAdd = e.value;
    this.showChildAdd = false;
    this.categoryId = undefined;
    this.categoryService.getCategories(e.value).subscribe(data => {
      this.showChildAdd = false;
      const Dataa = data.map(Category => {
        const newCategory = { ...Category };
        // newCategory.name = Category.name + '-' + Category.code; // Old Code Name+Code
        newCategory.name = Category.name; //New Code Only Nam
        newCategory.image =
          'https://ej2.syncfusion.com/demos/src/images/employees/3.png';

        newCategory.subCategory = Category.subCategory.map(subCat => {
          const newSubcat = { ...subCat };
          newSubcat.name = subCat.name + '-' + subCat.code; // Old Code Name+Code
          newSubcat.name = subCat.name;  //New Code Only Nam
          return newSubcat;
        });
        return newCategory;
      });

      this.field = {
        dataSource: Dataa,
        id: 'catId',
        text: 'name',
        child: 'subCategory',
      };
    });
  }

  @ViewChild('tree')
  public tree: TreeViewComponent;
  public nodeSelected(e: NodeSelectEventArgs) {
    this.categoryId = e.nodeData.id;
    if (e.nodeData.parentID !== null) {
      this.showChildAdd = true;
    } else {
      this.showChildAdd = false;
    }
  }
  get Category() {
    return this.exform.get('Category');
  }
  get Code() {
    return this.exform.get('Code');
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Data shown successfully !!',
      'ItSolutionStuff.com',
    );
  }

  showToasterError() {
    this.notifyService.showError('Something is wrong', 'ItSolutionStuff.com');
  }

  showToasterInfo() {
    this.notifyService.showInfo('This is info', 'ItSolutionStuff.com');
  }

  showToasterWarning() {
    this.notifyService.showWarning('This is warning', 'ItSolutionStuff.com');
  }

  ngOnInit(): void {}
}
