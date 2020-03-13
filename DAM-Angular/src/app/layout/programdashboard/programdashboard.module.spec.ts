import { ProgramDashboardModule } from './programdashboard.module';

describe('DashboardModule', () => {
  let dashboardModule: ProgramDashboardModule;

  beforeEach(() => {
    dashboardModule = new ProgramDashboardModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
