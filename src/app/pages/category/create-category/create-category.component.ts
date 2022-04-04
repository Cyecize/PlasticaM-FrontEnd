import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {Base64File} from '../../../shared/base64/base64-file';
import {EmptyPage, Page} from '../../../shared/util/page';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {AppRoutingPath} from '../../../app-routing.path';
import {CreateProductCategoryModel} from '../../../core/product-category/create-product-category.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  form!: FormGroup;
  errors: FieldError[] = [];
  base64File!: Base64File;
  tagsPage: Page<string> = new EmptyPage();
  selectedTags: string[] = [];
  tagInput = '';

  constructor(private fb: FormBuilder,
              private nav: RouteNavigator,
              private categoryService: ProductCategoryService) {
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

    this.errors = await this.categoryService.createCategory(model);
    if (this.errors.length === 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
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
