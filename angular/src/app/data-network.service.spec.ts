import { TestBed } from '@angular/core/testing';

import { DataNetworkService } from './data-network.service';

describe('DataNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataNetworkService = TestBed.get(DataNetworkService);
    expect(service).toBeTruthy();
  });
});
