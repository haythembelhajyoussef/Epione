import { DoctolibModule } from './doctolib.module';

describe('DoctolibModule', () => {
  let doctolibModule: DoctolibModule;

  beforeEach(() => {
    doctolibModule = new DoctolibModule();
  });

  it('should create an instance', () => {
    expect(doctolibModule).toBeTruthy();
  });
});
