import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {Base64File} from '../../../shared/base64/base64-file';
import {EmptyPage, Page} from '../../../shared/util/page';
import {CreateProductCategoryModel} from '../../../core/product-category/create-product-category.model';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {ProductCategory} from '../../../core/product-category/product.category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  private _category!: ProductCategory;

  form!: FormGroup;
  @Input()
  errors: FieldError[] = [];
  base64File!: Base64File;
  tagsPage: Page<string> = new EmptyPage();
  selectedTags: string[] = [];
  tagInput = '';

  @Input()
  set category(cat: ProductCategory) {
    this._category = cat;
    if (!this._category || !this.form) {
      return;
    }
    this.form.patchValue(cat);
    this.selectedTags = cat.tags;
  }

  @Output('formSubmitted')
  formSubmitted: EventEmitter<CreateProductCategoryModel> = new EventEmitter<CreateProductCategoryModel>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nameEn: ['', [Validators.required, Validators.maxLength(255)]],
      nameBg: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  async onFormSubmit(): Promise<void> {
    const model: CreateProductCategoryModel = this.form.value;
    model.image = this.base64File;
    model.tagNames = this.selectedTags;

    this.formSubmitted.emit(model);
  }

  handleImageUpload($event: Event): void {
    // @ts-ignore
    const file = $event?.target.files[0];
    const reader = new FileReader();
    reader.onload = res => {
      // @ts-ignore
      this.base64File = Base64FileUtil.createBase64File(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  }

  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  addTag($event: Event): void {
    $event.preventDefault();
    // @ts-ignore
    const tag = this.tagInput;
    if (!tag) {
      return;
    }

    this.removeTag(tag);
    this.selectedTags.push(tag);
    this.tagInput = '';
  }
}
