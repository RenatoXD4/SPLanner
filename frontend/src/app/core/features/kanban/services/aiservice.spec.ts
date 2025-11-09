import { TestBed } from '@angular/core/testing';

import { AiService } from './aiservice';

describe('Aiservice', () => {
  let service: AiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
