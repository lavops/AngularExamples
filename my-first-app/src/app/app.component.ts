import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://angularcoursehttprequests-default-rtdb.firebaseio.com/posts.json', postData).subscribe(response => {
      console.log(response);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.http.get<{[key: string]: Post}>('https://angularcoursehttprequests-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(response => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if(response.hasOwnProperty(key)){
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe((posts: Post[]) => {
        console.log(posts);
        this.loadedPosts = posts;
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
