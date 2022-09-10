import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EncounterService } from './encounter.service';

describe('EncounterService', () => {
  let service: EncounterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
