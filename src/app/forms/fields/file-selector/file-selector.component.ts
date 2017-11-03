import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FieldConfig, Option } from '../../../common/interfaces';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'schofeat-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent extends FormField implements OnInit{

  @Input() accept: string;
  @Input() btnName: string;
  @Input() isDisabled: boolean;
  
  @ViewChild('inputFile') nativeInputFile: ElementRef;

  private _files: File[];
  fileName: string;
  fileType: string;
  fileContent: any;
  hasIncorrectFileType: string;


  get fileCount(): number { return this._files && this._files.length || 0; }

  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;    
    this.fileType = this._files.length > 0?this._files[0].type:'';
    this.fileName = this._files.length > 0?this._files[0].name:'';
    if (this.fileType.includes('png') || this.fileType.includes('jpg') || this.fileType.includes('jpeg') || this.fileType.includes('gif')) {
      this.hasIncorrectFileType = '';
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
      this.hasIncorrectFileType = 'Select PNG, JPG or GIF files';
    }
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

  ngOnInit() {
     this.hasIncorrectFileType = '';
  }
}
