import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SavePageService } from "../services/save-page.service";

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css'],
    host: {
        '(document:click)': 'handleClick($event)',
    },
})
export class NewPostComponent implements OnInit {

    @ViewChild('uploadField') uploadField: ElementRef;
    @ViewChild('editName') editNameEl: ElementRef;
    private targetUrl = 'http://localhost:3000';
    currentUser: any = {};
    items = [];
    itemId = 0;
    canAdd = true;
    uploading = false;
    editName = false;
    editInfo = false;


    constructor(private savePageService: SavePageService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    ngOnInit() {

    }


    onEditName() {
        this.editName = true;
        //     let read = setInterval(() => {
        //         if (this.editNameEl.nativeElement) {
        //             this.editNameEl.nativeElement.childNodes[1].focus();
        //             clearInterval(read);
        //         }
        //     }, 500);
    }

    handleClick($event) {




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

    uploadAll() {
        let formData: FormData = new FormData();
        // let xhr = new XMLHttpRequest();
        let canUpload = false;
        let data = { obj: 'obj' };

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].hasFile == false) {
                return;
            }
            let fileInput = document.getElementById('file-to-upload' + i);
            let file: File = fileInput['files']['0'];
            formData.append('uploads[]', file, file.name);
            canUpload = true;
        }

        if (canUpload) {
            this.savePageService.postData(formData, data, this.currentUser.id + 'postName').concatAll().subscribe(
                () => {
                    console.log('nothing');
                },
                complete => {
                    console.log('complete');
                },
                error => {
                    console.log(error);
                }
            )

        }

    }
}
