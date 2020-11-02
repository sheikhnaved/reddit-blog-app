import { TestBed } from '@angular/core/testing';

import { SubredditService } from './subreddit.service';

describe('SubredditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubredditService = TestBed.get(SubredditService);
    expect(service).toBeTruthy();
  });
});
