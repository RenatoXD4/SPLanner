import { TestBed } from '@angular/core/testing';

import { KanvanServ } from './kanvan-serv';

describe('KanvanServ', () => {
  let service: KanvanServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanvanServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
