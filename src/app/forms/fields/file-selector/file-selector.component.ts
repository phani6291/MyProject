import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FieldType, InputType, FormField  } from "../../models";
import { Option, FileSelectorFieldConfig } from '../../../common/interfaces';

@Component({
  selector: 'schofeat-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent extends FormField<FileSelectorFieldConfig,FieldType.fileselector> implements OnInit {
  
    @Input() accept: string;
    @Input() name: string= 'file';
    @ViewChild('inputFile') nativeInputFile: ElementRef;
    readonly fieldType = FieldType.fileselector;
    private _files: File[];
    fileName: string;
    fileType: string;
    fileContent: any;
    uploadErrorMessage: string = '';
    maxFileSizeBytes: number = 10485760; //10MB
  
    constructor(protected formGroupDirective: FormGroupDirective) {
      super(formGroupDirective);
    }
  
    get fileCount(): number { return this._files && this._files.length || 0; }
  
    onNativeInputFileSelect(event) {
      this._files = event.srcElement.files;
      this.fileType = this._files.length > 0?this._files[0].type:'';
      this.fileName = this._files.length > 0?this._files[0].name:'';
      let fileSizeBytes = this._files[0].size;
      if(fileSizeBytes > this.maxFileSizeBytes)
        return this.uploadErrorMessage = 'Maximum file size is 10MB.';
      if (this.fileType.includes('png') || this.fileType.includes('jpg') || this.fileType.includes('jpeg') || this.fileType.includes('gif') || this.fileType.includes('pdf')) {
        this.uploadErrorMessage = '';
        for (var i = 0; i < this._files.length; i++) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.fileContent = reader.result;
            if (this.fileContent) {
              this.onChange.emit({ fileContent: this.fileContent, fileName: this.fileName, fileType: this.fileType });
            }
          }
          reader.readAsDataURL(this._files[i]);
        }
      }
      else if(this.fileType){
        this.uploadErrorMessage = 'Select PNG, JPG, PDF or GIF files';
      }
    }
  
    selectFile() {
      this.nativeInputFile.nativeElement.click();
    }
  }
