import { ProgramModule } from './program.module';

describe('ProgramModule', () => {
  let programModule: ProgramModule;

  beforeEach(() => {
    programModule = new ProgramModule();
  });

  it('should create an instance', () => {
    expect(programModule).toBeTruthy();
  });
});
