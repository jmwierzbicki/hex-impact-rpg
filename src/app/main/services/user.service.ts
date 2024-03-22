import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";
import {genID} from "../helpers/gen-id";
import {RNG} from "../helpers/rng";



interface IUser {
  id: string;
  hash: string;
  oldHashes: string[];
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  set user(userId: string) {
    this.loading = true;
    userId = genID(userId);
    this.client.get<{props: IUser}>(`/api/identity/${userId}`).subscribe(user => {
      console.log(user)
      if(user) {
        localStorage.setItem('user', userId)
        this._user = user.props;
        RNG.setRngSeed(user.props.hash);
        this.loading = false;
      }
    });
  };

  get user(): IUser | undefined {
    return this._user
  }

  public loading = true;

  private _user?: IUser;

  constructor(private client: HttpClient) {
    const previousUser = localStorage.getItem('user')
    if (previousUser) {
      this.user = previousUser;
    } else {
      this.loading = false;
    }
  }
}
