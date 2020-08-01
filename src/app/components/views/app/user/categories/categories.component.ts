import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { CategoryService } from 'src/app/services/user/options/category.service';

import { Categories as CategoriesModel } from 'src/app/models/category.model';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    categoriesOut: CategoriesModel = {
        id: 0,
        categories: {}
    }

    categoriesIn: CategoriesModel = {
        id: 0,
        categories: {}
    }

    id: Number;
    action: String;
    categoryToCreate: any;
    categoryToDelete: any;

    formDelete: FormGroup;
    formCreate: FormGroup;

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private categoryService: CategoryService,
        private currentRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'optionsMenu',
        }
    }

    ngOnInit(): void {
        this.systemService.getCategories('out', this.token).subscribe(
            categoriesReturn => this.categoriesOut = categoriesReturn
        );

        this.systemService.getCategories('in', this.token).subscribe(
            categoriesReturn => this.categoriesIn = categoriesReturn
        );


        this.formDelete = this.formBuilder.group({
            id: new FormControl('', [])
        });

        this.formCreate = this.formBuilder.group({
            category: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            applicable: new FormControl('',
                [
                    Validators.required,
                ]
            ),
        });
    }

    onSubmit(
        action: string,
        origin?: string,
        id?: number,
        rCategory?: string,
    ) {
        switch (action) {
            case 'delete':
                switch (origin) {
                    case 'out':
                        this.deleteCategory(id, this.token);

                        for (var i = 0; i < this.categoriesOut.data.length; i++) {
                            if (this.categoriesOut.data[i].id === id) {
                                this.categoriesOut.data.splice(i, 1);
                            }
                        }
                        break;
                    case 'in':
                        this.deleteCategory(id, this.token);

                        for (var i = 0; i < this.categoriesIn.data.length; i++) {
                            if (this.categoriesIn.data[i].id === id) {
                                this.categoriesIn.data.splice(i, 1);
                            }
                        }
                        break;
                }
                break;
            case 'create':
                const category = this.formCreate.value.category;
                const applicable = this.formCreate.value.applicable;
                this.newCategory(category, applicable, this.token);
                this.formCreate.reset();
                break;
        }
    }

    deleteCategory(id: Number, token: string) {
        this.categoryService.deleteCategory(id, token).subscribe(deleteReturn => {
            this.categoryToDelete = deleteReturn
            this.categoryService.showMessage(this.categoryToDelete.success);
        });
    }

    newCategory(category: string, applicable: string, token: string) {
        let obj = {
            id: Number,
            category
        };

        this.categoryService.newCategory(category, applicable, token).subscribe(createReturn => {

            this.categoryToCreate = createReturn

            obj.id = this.categoryToCreate.categoryId[0];
            obj.category = category;

            if (applicable == 'in')
                this.categoriesIn.data.push(obj);
            else if (applicable == 'out')
                this.categoriesOut.data.push(obj);

            this.categoryService.showMessage(this.categoryToCreate.success);
        });
    }

}
