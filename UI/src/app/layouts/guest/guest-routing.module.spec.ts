import { GuestRoutingModule } from './guest-routing.module';

describe('GuestRoutingModule', () => {
  let guestRoutingModule: GuestRoutingModule;

  beforeEach(() => {
    guestRoutingModule = new GuestRoutingModule();
  });

  it('should create an instance', () => {
    expect(guestRoutingModule).toBeTruthy();
  });
});
