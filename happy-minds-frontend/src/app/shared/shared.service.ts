import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http:HttpClient){}
  private emotionSource = new Subject<{ emotion: string, backgroundColor: string }>();
  emotionChanged = this.emotionSource.asObservable();

  changeEmotion(emotion: string, backgroundColor: string) {
    this.emotionSource.next({ emotion, backgroundColor });
  }

  createUser(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/createUser",body)
  }

  login(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/login",body);
  }

  createAdmin(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/addTherapist",body)
  }

  loginAdmin():Observable<any>{
    return this.http.get("http://localhost:8080/getAllTheripast");
  }

  loginUser():Observable<any>{
    return this.http.get("http://localhost:8080/getAllUsers");
  }

  questionSubmission(body:any,id:number){
    return this.http.post(`http://localhost:8080/submitQuestion/${id}`, body);
  }

}
