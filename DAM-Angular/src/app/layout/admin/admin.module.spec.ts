import { AdminModule } from './admin.module';

describe('ContractModule', () => {
    let contractModule: AdminModule;

    beforeEach(() => {
        contractModule = new AdminModule();
    });

    it('should create an instance', () => {
        expect(contractModule).toBeTruthy();
    });
});
