import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SavePageService } from "../services/save-page.service";
import { Router, ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

    //@ViewChild('uploadField') uploadField: ElementRef;

    currentUser: User;
    postId: string;
    postModel: Post;
    newModel = {
        user_id: '',
        images: [],
        name: '',
        info: ''
    };

    items = [];
    itemId = 0;
    canAdd = true;
    uploading = false;


    removeItems = [];


    constructor(private savePageService: SavePageService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object,
                private route: ActivatedRoute) {
        if (isPlatformBrowser(platformId)) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        this.postId = this.route.snapshot.params['id'];
        this.newModel.user_id = this.currentUser.id;

    }

    ngOnInit() {
        this.getPost();
        // let showImg = setInterval(() => {
        //     let run = true;
        //     for (let i = 0; i < this.items.length; i++) {
        //         let imgDom = document.getElementById('preview' + i);
        //         if (imgDom) {
        //             this.renderer.setStyle(imgDom, 'display', 'block');
        //             this.items[i].font = 'none';
        //             let img = new Image();
        //             let appThis = this;
        //
        //             img.onload = function () {
        //                 let width = img.width;
        //                 let height = img.height;
        //                 appThis.items[i].width = 200 / height * width;
        //                 appThis.renderer.setStyle(document.getElementById('img-upload' + i), 'width', appThis.items[i].width + 'px');
        //                 document.getElementById('file-to-upload' + i)['files']['0'] = imgDom['src'];
        //             };
        //
        //             img.src = imgDom['src'];
        //             //document.getElementById('file-to-upload' + i)['value'] = imgDom['src'].replace(/^.*[\\\/]/, '')
        //             document.querySelector('#img-upload' + i).classList.add('no-hover');
        //         }
        //     }
        //
        //     if (document.getElementById('preview' + (this.items.length - 1))) {
        //         run = false;
        //     }
        //
        //     if (run == false) {
        //         clearInterval(showImg);
        //         console.log(this.postModel);
        //     }
        //
        // }, 500)
    }

    getPost() {
        this.savePageService.getPost(this.postId).subscribe(
            data => {
                this.postModel = data;
                this.newModel.info = this.postModel['info'];
                this.newModel.name = this.postModel['name'];
                // for (this.itemId = 0; this.itemId < data.images.length; this.itemId++) {
                //     this.items.push({
                //         id: this.itemId,
                //         hasFile: true,
                //         drop: false,
                //         src: 'assets/uploads/' + this.postModel['user_id'] + this.postModel['name'] + '/' + this.postModel['images'][this.itemId]
                //     });
                // }

            },
            error => {
                console.log(error);
            }
        );
    }

    removeImage(image) {
        this.postModel['images'].splice(image, 1);
        this.removeItems.push(image);
    }

    addImage() {
        if (this.items.length >= (10 - this.postModel['images'].length)) {
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
            preview.style.display = 'block';
            item.drop = false;
            document.querySelector('#img-upload' + i).classList.add('no-hover');
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
        if (!this.newModel.name) {
            alert('please edit post name and info');
            return;
        }

        let formData: FormData = new FormData();
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].hasFile == false) {
                this.items.splice(i, 1);
            }
            if (this.items.length < 1) {
                this.canAdd = true;
            }
            let fileInput = document.getElementById('file-to-upload' + i);
            let file: File = fileInput['files']['0'];

            if (file) {
                formData.append('uploads[]', file, file.name);
            }
            if (fileInput['value'] != '') {
                this.newModel.images.push(fileInput['value'].replace(/^.*[\\\/]/, ''));
            }
        }
        formData.append('folderName', this.newModel.user_id + '_' + this.postModel['_id']);
        this.savePageService.putPost(formData, this.postId, this.newModel, this.removeItems).concatAll().subscribe(
            res => {
                if (res == true) {
                    this.uploading = false;
                    this.router.navigate(['profile/:id'], this.currentUser.id);
                }
            }
        )

    }
}


