import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setToLocalStorage(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getFromLocalStorage(key: string): string {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  clearLocalStorage(): boolean {
    localStorage.clear();
    return true;
  }
}
