import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicGalleryService {

  constructor(private http: HttpClient) { }

  // create local node server 
  postsUrl: string = 'http://localhost:3000/posts'

  addDataToPost(dataToPost: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.postsUrl, dataToPost).subscribe(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }


  getPosts() {
    return new Promise((resolve, reject) => {
      this.http.get(this.postsUrl).subscribe(
        (res) => {
          resolve(res)
        }, (err) => {
          reject(err)
        }
      )
    })
  }

  updateLikes(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.postsUrl + '/' + postObj.id, postObj).subscribe(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }


  updateComment(postObj: any) {
    return new Promise((reject, resolve) => {
      this.http.put(this.postsUrl + '/' + postObj.id, postObj).subscribe(
        (res) => {
          resolve(res)
        }, (err) => {
          reject(err)
        }
      )
    })
  }
}
