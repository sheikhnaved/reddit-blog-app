import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(page: number): Observable<any> {
    let param = { page: page.toString(), size: '5' };
    return this.http.get<PostModel[]>('http://localhost:8082/api/posts', {
      params: param,
    });
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8082/api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8082/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(
      'http://localhost:8082/api/posts/by-user/' + name
    );
  }
}
