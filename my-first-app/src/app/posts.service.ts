import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private serverURL = 'https://angularcoursehttprequests-default-rtdb.firebaseio.com/posts.json'
  error = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};

    this.http.post(this.serverURL, postData, {observe: 'response'})
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{[key: string]: Post}>(
        this.serverURL,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      ).pipe(map(response => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if(response.hasOwnProperty(key)){
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }), catchError((error: any) => {
        // Send to analytics server
        return throwError(error);
      })
    );
  }

  deletePosts() {
    return this.http.delete(this.serverURL, {observe: 'events', responseType: 'text'})
      .pipe(tap(event => {
        console.log(event);
        if(event.type === HttpEventType.Response) {
          //
        }
        if(event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
