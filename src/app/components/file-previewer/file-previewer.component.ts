import { Component, Input, OnInit } from '@angular/core';
import { AttachmentInterface, FileType } from '../../models/general.models';
import { SUPPORTED_FILE_TYPES } from '../../utilities/constants';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-file-previewer',
  templateUrl: './file-previewer.component.html',
  styleUrls: ['./file-previewer.component.css']
})
export class FilePreviewerComponent implements OnInit {
  @Input() classes: Array<string>;
  @Input() size: string = '25%';
  @Input() showFileName = true;

  @Input()
  set file(file: AttachmentInterface | NzUploadFile) {
    this._file = file;
    this.fileType = this.file ? this.getFileType(this.file) : 'unknown';
  }

  get file() {
    return this._file;
  }

  private _file: AttachmentInterface | NzUploadFile = null;
  fileThumbBaseUrl = '../../../assets/img/file-thumbnails';
  fileType: FileType = 'unknown';

  constructor() {
  }

  ngOnInit(): void {
  }

  getFileType(file: AttachmentInterface | NzUploadFile): FileType {
    const fileType = file instanceof File ? file.type : file.fileType;
    const definedFileType = SUPPORTED_FILE_TYPES.find(fType => fileType.toLowerCase().includes(fType.toLowerCase()));
    return definedFileType || 'unknown';
  }

  // getFileName() {
  //   if (this.file.hasOwnProperty('filename')) {
  //     // @ts-ignore
  //     return this.file.filename;
  //   } else if (this.file.hasOwnProperty('fileName')) {
  //     return this.file.fileName;
  //   } else {
  //     return '';
  //   }
  // }
}
