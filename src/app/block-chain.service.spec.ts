import { TestBed } from '@angular/core/testing';

import { BlockChainService } from './block-chain.service';

describe('BlockChainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockChainService = TestBed.get(BlockChainService);
    expect(service).toBeTruthy();
  });
});
