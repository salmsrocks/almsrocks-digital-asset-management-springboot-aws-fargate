import { RightsinModule } from './rightsin.module';

describe('AdminPageModule', () => {
    let AdminPageModule: RightsinModule;

    beforeEach(() => {
        AdminPageModule = new RightsinModule();
    });

    it('should create an instance', () => {
        expect(AdminPageModule).toBeTruthy();
    });
});
