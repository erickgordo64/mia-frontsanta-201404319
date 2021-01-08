import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    users = null;
    user = null;

    // center = { lat: -12.0262676, lng: -77.1278653 };
    // zoom = 15;
    // display?: google.maps.LatLngLiteral;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.accountService.getEntregasById(this.user[0].idsanta)
            .pipe(first())
            .subscribe(users => this.users = users);
        this.form = this.formBuilder.group({
            titulo: ['', Validators.required],
            contenido: ['', Validators.required],
            imagen: ['', Validators.required],
            idsanta: ['', Validators.required]
        });


    }

    get f() { return this.form.controls; }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    enviar() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        this.accountService.addPublicacion(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('comenatrio exitoso', { keepAfterRouteChange: true });
                    window.location.reload();
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    onSubmit() {

        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        this.accountService.addPublicacion(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('comenatrio exitoso', { keepAfterRouteChange: true });
                    window.location.reload();
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}