import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // GETTING PROFILE INFO
  public getProfileInfo(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/profiles/${username}`);
  }

  //FOLLOW / UNFOLLOW
  public followUser(username: string): Observable<any> {
    return this.http.post(`http://localhost:3000/api/profiles/${username}/follow`, '');
  }
  public unfollowUser(username: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/profiles/${username}/follow`);
  }
}
