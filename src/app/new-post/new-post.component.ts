import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SavePageService } from "../services/save-page.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { values } from "d3-collection";

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css'],
    host: {
        '(document:click)': 'click($event)',
    },
})
export class NewPostComponent implements OnInit {

    @ViewChild('uploadField') uploadField: ElementRef;
    @ViewChild('editName') editNameEl: ElementRef;
    @ViewChild('editInfo') editInfoEl: ElementRef;

    currentUser: any = {};
    items = [];
    itemId = 0;
    canAdd = true;
    uploading = false;
    editName = false;
    editInfo = false;
    private saved = true;

    postName = 'Click to Edit Post Name';
    postInfo = 'Click to Edit Post Info';

    private postModel = {
        userId: JSON.parse(localStorage.getItem('currentUser')).id,
        postName: this.postName,
        postInfo: this.postInfo,
        postImages: []
    };


    constructor(private savePageService: SavePageService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(platformId)) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    ngOnInit() {

    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
        if (this.saved == false) {
            event.returnValue = 'Important: Please click on \'Save\' button to leave this page.';
            return null;
        }
    }

    getName(e) {
        this.postModel.postName = e.target.value;
    }

    getInfo(e) {
        this.postModel.postInfo = e.target.value;
    }


    click(e) {
        let coverNameField = document.querySelector('.post-name');
        let inputNameField = document.querySelector('.post-name-edit');

        let coverInfoField = document.querySelector('.post-info');
        let inputInfoField = document.querySelector('.post-info-edit');

        let onEdit = Observable.of(e.target);


        //*========================== edit name start===================================*//
        if (coverNameField && this.editName == false) {
            this.editName = true;
            onEdit.subscribe({
                next: value => {
                    if (value == coverNameField || value == coverNameField.childNodes[1]) {
                        this.editName = true;
                        let read = setInterval(() => {
                            if (this.editNameEl) {
                                if (coverNameField.firstElementChild.textContent != this.postName) {
                                    this.editNameEl.nativeElement.childNodes[1].value = this.postModel.postName;
                                }

                                this.editNameEl.nativeElement.childNodes[1].focus();
                                clearInterval(read);
                            }
                        }, 500);

                    } else {
                        this.editName = false;
                    }
                },
                error: error => {
                    console.log(error);
                }
            });

        }

        if (inputNameField && this.editName == true) {
            onEdit.subscribe({
                next: value => {
                    if (value == inputNameField || value == inputNameField.childNodes[1]) {
                        this.editName = true;

                    } else {
                        this.editName = false;
                    }
                },
                error: error => {
                    console.log(error);
                }
            });

        }

        //*============================ edit name stop===================================*//


        //*============================ edit info start===================================*//


        if (coverInfoField && this.editInfo == false) {
            this.editInfo = true;
            onEdit.subscribe({
                next: value => {
                    if (value == coverInfoField || value == coverInfoField.childNodes[1]) {
                        this.editInfo = true;
                        let read = setInterval(() => {
                            if (this.editInfoEl) {
                                if (coverInfoField.firstElementChild.textContent != this.postInfo) {
                                    this.editInfoEl.nativeElement.childNodes[1].value = this.postModel.postInfo;
                                }

                                this.editInfoEl.nativeElement.childNodes[1].focus();
                                clearInterval(read);
                            }
                        }, 500);

                    } else {
                        this.editInfo = false;
                    }
                },
                error: error => {
                    console.log(error);
                }
            });
            return;
        }

        if (inputInfoField && this.editInfo == true) {
            onEdit.subscribe({
                next: value => {
                    if (value == inputInfoField || value == inputInfoField.childNodes[1]) {
                        this.editInfo = true;

                    } else {
                        this.editInfo = false;
                    }
                },
                error: error => {
                    console.log(error);
                }
            });
            return;
        }

        //*============================ edit info stop===================================*//

    }


    addImage() {
        if (this.items.length > 10) {
            alert('最多只能上傳10張照片!');
            return;
        }
        let item = {
            id: this.itemId,
            hasFile: false,
            drop: false
        };

        this.itemId++;
        this.items.push(item);
        this.canAdd = false;
    }

    previewFile(e, item, i) {
        const preview = document.getElementById('preview' + i);
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            item.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
            preview.onload = () => {
                item.width = preview['width'] + 'px';
            };
            item.font = 'none';
            item.hasFile = true;
            for (let j = 0; j < this.items.length; j++) {
                if (this.items[j].hasFile == false) {
                    this.canAdd = false;
                } else {
                    this.canAdd = true;
                }
            }

        } else {
            this.items.splice(this.items.indexOf(item), 1);
            this.canAdd = true;
        }

    }

    closeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        for (let j = 0; j < this.items.length; j++) {
            if (this.items[j].hasFile == false) {
                this.canAdd = false;
            } else {
                this.canAdd = true;
            }
        }
        if (this.items.length < 1) {
            this.canAdd = true;
        }
    }

    uploadAll(e) {
        e.preventDefault();
        if (this.postModel.postName == this.postName) {
            alert('please edit post name and info');
            return;
        }
        this.saved = true;
        let formData: FormData = new FormData();

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].hasFile == false) {
                this.items.splice(this.items.indexOf(this.items[i]), 1);
            }
            if (this.items.length < 1) {
                this.canAdd = true;
                return;
            }
            let fileInput = document.getElementById('file-to-upload' + i);
            let file: File = fileInput['files']['0'];
            formData.append('uploads[]', file, file.name);
            this.postModel.postImages.push(fileInput['value'].replace(/^.*[\\\/]/, ''));
            // canUpload = true;
        }

        console.log(this.postModel);


        this.savePageService.postData(formData, this.postModel, this.currentUser.id + this.postModel.postName).subscribe(
            res => {
                console.log(res);
                this.router.navigate(['profile/:id'], this.currentUser.id);
            },
            error => {
                console.log(error);
            }
        );

    }
}
