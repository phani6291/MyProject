import {
    AfterContentInit, AfterViewInit, ComponentRef, Directive, EventEmitter, forwardRef,
    ContentChild, Input, OnInit, OnDestroy, Output, ViewChildren, ContentChildren, QueryList
} from "@angular/core";
import { FormGroup, FormGroupDirective, FormControl, FormControlDirective } from "@angular/forms";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import "rxjs/add/operator/take";
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

import { FormStore } from "./form.interfaces";

@Directive({
    selector: '[connectForm]',
    exportAs: 'connectForm',
    providers: [FormGroupDirective]
})

export class ConnectFormDirective implements OnInit, OnDestroy, AfterContentInit {
    @Input('connectform') formStore: FormStore<any>;
    @Input() savingMessage: string;
    @Input() completedMessage: string;
    @Output() onSubmitSuccess = new EventEmitter<void>();

    form: FormGroup;

    _onDestroy$: Subject<boolean> = new Subject<boolean>();

    isPending$: Observable<boolean>;
    hasError$: Observable<boolean>;
    errorMessage$: Observable<string | null>;
    isCompleted$: Observable<boolean>;
    isFetching$: Observable<boolean>;
    isSubmitting$: Observable<boolean>;
    isInvalid$: Observable<boolean>;
    isSubmitted: boolean;
    formChanges$: Observable<any>;
    _formDirty$ = new BehaviorSubject<boolean>(false);
    formDirty$: Observable<boolean>;
    progressBarColor$: Observable<string>;
    progressBarMode$: Observable<string>;
    submitButtonDisabled$: Observable<boolean>;
    status$: Observable<any>;

    constructor(
        public formGroupDirective: FormGroupDirective
    ) { }
    ngOnInit() {

        this.hasError$ = this.formStore.hasError$.distinctUntilChanged();
        this.errorMessage$ = this.formStore.errorMessage$;
        this.isCompleted$ = this.formStore.isCompleted$.distinctUntilChanged();
        this.isSubmitting$ = this.formStore.isSubmitting$.distinctUntilChanged();
        this.isFetching$ = this.formStore.isFetching$.distinctUntilChanged();


        this.form = this.formGroupDirective.form;
        this.formChanges$ = Observable.combineLatest(
            this.form.statusChanges,
            this.form.valueChanges
        );

        this.isInvalid$ = this.form.statusChanges
            .map(status => status === 'INVALID');


        this.isPending$ = this.form.statusChanges
            .map(status => status === 'PENDING');        

        this.submitButtonDisabled$ = Observable.combineLatest(
                this.isSubmitting$,
                this.hasError$,
                this.isInvalid$
            )
            .map(([isSubmitting, hasError, isInvalid]) => isSubmitting || hasError || isInvalid)
            .distinctUntilChanged();


        this.progressBarColor$ = Observable.combineLatest(
            this.isInvalid$,
            this.hasError$,
            this.isCompleted$
        )
            .map(([invalid, hasError, completed]) => {
                if (hasError || (invalid && this.isSubmitted)) {
                    return 'warn';
                }
                return 'primary'
            });

        this.progressBarMode$ = Observable.combineLatest(
            this.isPending$,
            this.isSubmitting$
        )
            .map(([pending, submitting]) => {
                if (pending || submitting) {
                    return 'indeterminate';
                }
                return 'determinate';
            });


        this.formDirty$ = this._formDirty$.asObservable()
            .distinctUntilChanged()
            .filter(dirty => dirty);

        this.formChanges$            
            .takeUntil(this._onDestroy$)
            .subscribe(changes => {             
                this._formDirty$.next(this.form.dirty);
            })


        this.formDirty$
            .withLatestFrom(this.hasError$)
            .takeUntil(this._onDestroy$)
            .subscribe(([formDirty, hasError]) => {
                if (hasError) this.formStore.clearError();
            });


        this.isSubmitting$
            .filter(isSubmitting => isSubmitting)
            .takeUntil(this._onDestroy$)
            .withLatestFrom(this.hasError$)
            .subscribe(([isSubmitting, hasError]) => {              
            });

        this.isSubmitting$
            .filter(isSubmitting => !isSubmitting)
            .takeUntil(this._onDestroy$)
            .withLatestFrom(this.hasError$)
            .subscribe(([isSubmitting, hasError]) => {                
                this.form.markAsPristine();
                this._formDirty$.next(false);
            });

        this.isCompleted$
            .filter(isCompleted => isCompleted)
            .takeUntil(this._onDestroy$)
            .subscribe(isCompleted => this.onSubmitSuccess.emit());

    }

    ngAfterContentInit() {
        /*this.formChanges$
        .take(1)
        .subscribe(([changes, status]) => console.log(changes,'initial take 1'));*/
    }

    ngOnDestroy() {
        this._onDestroy$.next(true);
        this._onDestroy$.unsubscribe();
    }
}