import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {genID} from "../helpers/gen-id";
import {RNG} from "../helpers/rng";
import {BehaviorSubject} from "rxjs";


export interface IUser {
  customSeed: string;
  id: string;
  hash: string;
  oldHashes: string[];
  isAdmin?: boolean;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  obscuredId = ''

  generateObscuredId() {
    function generateString(length: number): string {
      return Array(length).fill(null).map(() => Math.random().toString(36).charAt(2)).join('');
    }
    if (!this.user) {
      return 'xxxxxxxxx'
    }
    return  this.obscuredId = generateString(this.user?.id.length)
  }

  set user(userId: string) {
    this.loading = true;
    userId = genID(userId);
    this.client.get<{ props: IUser }>(`/api/identity/${userId}`).subscribe(user => {
      if (user) {
        localStorage.setItem('user', userId)
        this._user = user.props;
        RNG.setRngSeed(user.props.hash);
        this.loading = false;
      }
      this.generateObscuredId();
      this.userLoading$.next(true)
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
