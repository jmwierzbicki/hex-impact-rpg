import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  users: IUser[] = []

  constructor(public client: HttpClient) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.client.get<IUser[]>(`/api/list-users`).subscribe(users => {
      // console.log(users)
      this.users = users
    });
  }

  refresh(id: string) {
    this.client.post<IUser[]>(`/api/reset-hash`, {id}).subscribe(users => {

      this.getUsers();
    });
  }

  setSeed(id: string, seed: string) {
    this.client.post<IUser[]>(`/api/reset-hash`, {id, seed}).subscribe(users => {

      this.getUsers();
    });
  }

  delete(id: string) {
    this.client.post<IUser[]>(`/api/remove-user`, {id}).subscribe(users => {

      this.getUsers();
    });
  }

}
