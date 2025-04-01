import { TestBed } from '@angular/core/testing';

import { DataMngtService } from './data-mngt.service';

describe('DataMngtService', () => {
  let service: DataMngtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMngtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
