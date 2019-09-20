import { TestBed } from '@angular/core/testing';

import { SwitchboardService } from './switchboard.service';

describe('SwitchboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwitchboardService = TestBed.get(SwitchboardService);
    expect(service).toBeTruthy();
  });
});
