import { Injectable, Inject, InjectionToken } from '@angular/core';

export const SERVICE_TOKEN = new InjectionToken<any>('SERVICE_TOKEN');
export const HELPER_SERVICE_TOKEN = new InjectionToken<any>(
  'HELPER_SERVICE_TOKEN'
);

@Injectable()
export class UtulityService<TService, THelperService, TEntity> {
  entities: TEntity[] = [];

  constructor(
    @Inject(SERVICE_TOKEN) private service: TService,
    @Inject(HELPER_SERVICE_TOKEN) private helperService: THelperService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getEntities() {
    (this.service as any).getAllDTO().subscribe(
      (response: { data: any[] }) => {
        (this.helperService as any).handleSuccesses(response);

        this.entities = response.data;
      },
      (responseError: any) =>
        (this.helperService as any).handleErrors(responseError)
    );
  }
}
