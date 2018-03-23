import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FieldType, InputType, FormField  } from "../../models";
import { Option, FileSelectorFieldConfig } from '../../../common/interfaces';
import { FileDetails } from 'app/common/interfaces/file-details';

@Component({
  selector: 'schofeat-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent extends FormField<FileSelectorFieldConfig,FieldType.fileselector> implements OnInit {
  
  @Input() accept: string;
  @Input() name: string= 'file';
  @Input() showImage: boolean;
  @Input() fileDetails: FileDetails;

  @ViewChild('inputFile') nativeInputFile: ElementRef;
  readonly fieldType = FieldType.fileselector;
  private file: File;

  uploadErrorMessage: string = '';
  maxFileSizeBytes: number = 10485760; //10MB

  constructor(
    protected formGroupDirective: FormGroupDirective,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(formGroupDirective, changeDetectorRef);
  }

  get fileCount(): number { return this.file ? 1 : 0; }
  get displayImage(): boolean{
    return this.showImage && !!this.fileDetails && !!this.fileDetails.fileContent;
  }

  get fileSource(){
    if(this.fileDetails.fileType==='application/pdf'){
      return 'assets/images/pdficon.png';
    }
    return this.fileDetails.fileContent;
  }

  toFileDetails(file: File, content: any = null): FileDetails {
    return {
      fileType: file.type || null,
      fileContent: content,
      fileName: file.name || null,
      fileSize: file.size || null,
    }
  }

  uploadError(hasError:boolean= false){
    this.uploadErrorMessage = hasError ? 'Select PNG, JPG, PDF or GIF files': '';
    return !hasError;
  }

  isValidFileType(fileDetails: FileDetails){
    if(!fileDetails.fileType) return this.uploadError(true);
    const validExtensions = ['png','jpg','jpeg','gif','pdf'];
    // console.log(fileDetails, 'fileDetails')
    const ext = fileDetails.fileType.split('/').pop();
    if(validExtensions.includes(ext)) return true;
    return this.uploadError(true);
  }

  onNativeInputFileSelect(event) {
    const file = event.target.files && event.target.files[0] || null,
          fileDetails = this.toFileDetails(file);

    this.uploadErrorMessage = '';

    if(fileDetails.fileSize > this.maxFileSizeBytes){
      this.uploadErrorMessage = 'File size must be less than 10 MB.';
      return false;
    }

    if (!this.isValidFileType(fileDetails)) return false;

    var reader = new FileReader();
    reader.onload = (e) => {
      this.onSelect(fileDetails, reader.result)
    }
    reader.readAsDataURL(file);
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

  onSelect(fileDetails: FileDetails, content: any) {
    this.fileDetails = {
      ...fileDetails,
      fileContent: content
    };
    this.onChange.emit(this.fileDetails);
  }
  }
