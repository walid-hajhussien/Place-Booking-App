import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isAuthenticated: boolean;
    private _userId: string;

    constructor() {
        this._isAuthenticated = true;
        this._userId = 'u1';
    }

    login(): void {
        this._isAuthenticated = true;
    }

    logout(): void {
        this._isAuthenticated = false;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get userId(): string {
        return this._userId;
    }
}
