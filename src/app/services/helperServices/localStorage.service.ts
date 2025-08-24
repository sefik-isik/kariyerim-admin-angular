import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
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
