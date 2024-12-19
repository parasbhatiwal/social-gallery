import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PublicGalleryService } from 'src/app/services/public-gallery.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-gallary',
  templateUrl: './public-gallary.component.html',
  styleUrls: ['./public-gallary.component.scss']
})
export class PublicGallaryComponent implements OnInit {

  selectedFile: any;
  post: Array<any> = [];
  postText = '';
  allPosts: Array<any> = [];
  likedPost: Boolean = false;
  commentText:Array<string> = [];

  constructor(private us: UserService, private router: Router, private storage: AngularFireStorage, private publlicgalleryservice: PublicGalleryService) { }

  ngOnInit(): void {
    if (this.us.user == undefined || this.us.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.us.user = JSON.parse(str)
      } else {

        this.router.navigate(['/login'])
      }
    }
    this.getPosts()
  }

  postSchema = {
    username: '',
    imgUrl: '',
    text: '',
    like: [],
    comment: [{
      username: '', commentText: ''
    }]
  }

  onFIleSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      let file = this.selectedFile;
      let filePath = `image/${n}`;
      let fileRef = this.storage.ref(filePath);
      let task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          let imgUrl = fileRef.getDownloadURL();
          imgUrl.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url)
            }
          })
        })
      ).subscribe(
        (url: any) => {
          console.log(url);

        }
      )
    }
    )
  }


  postImage() {
    if (this.selectedFile) {
      this.uploadImage().then(
        (imageUrl) => {
          console.log(imageUrl);
          let postObj = {
            username: this.us.user.username,
            imgUrl: imageUrl,
            text: this.postText,
            like: [],
            comment: []
          }
          this.publlicgalleryservice.addDataToPost(postObj).then(
            (res) => {
              console.log("post created", res);
              this.getPosts()
            }
          ).catch((err) => {
            console.log('An error has occured', err);
          })
        }
      ).catch((err) => {
        console.log(err);

      })
    } else {
      this.publlicgalleryservice.addDataToPost({
        username: this.us.user.username,
        imgUrl: null,
        text: this.postText,
        like: [],
        comment: []
      }).then(
        (res) => {
          console.log("post created", res);
          this.getPosts()
        }
      ).catch((err) => {
        console.log('An error has occured', err);
      })
    }
  }

  liked(postId: any) {
    for (let i = 0; i <= this.allPosts.length; i++) {
      if (this.allPosts[i].id == postId) {
        if (this.allPosts[i].like.indexOf(this.us.user.id) >= 0) {
          this.allPosts[i].like.splice(this.allPosts[i].like.indexOf(this.us.user.id), 1)
        } else {
          this.allPosts[i].like.push(this.us.user.id)
        }
        this.publlicgalleryservice.updateLikes(this.allPosts[i]).then(
          (res) => {
            console.log(res);
          }
        ).catch((err) => {
          console.log(err);
        })
        // console.log(this.allPosts[i]);
      }
      // console.log(this.allPosts[i] == postId);
    }

  }

  addComment( postId: any, commentIndex: any) {
    for (let i = 0; i <= this.allPosts.length; i++) {
      if (this.allPosts[i].id == postId) {
        this.allPosts[i].comment.push(
          {
            'commentText': this.commentText[commentIndex],
            'username': this.us.user.username
          }
        );
        this.publlicgalleryservice.updateComment(this.allPosts[i]).then(
          (res) => {
            console.log(res);
            this.commentText[commentIndex] = ''
          }
        ).catch((err) => {
          console.log(err);
        })
      }
    }
  }

  getPosts() {
    this.publlicgalleryservice.getPosts().then(
      (res: any) => {
        // console.log(res);
        this.allPosts = res.reverse();
        for(let post of this.allPosts){
          this.commentText.push('')
        }
      }
    ).catch((err) => {
      console.log(err);
    })
  }

}
