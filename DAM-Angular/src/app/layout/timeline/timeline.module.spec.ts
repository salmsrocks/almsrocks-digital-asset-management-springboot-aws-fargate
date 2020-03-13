import { TimelineModule } from './timeline.module';

describe('ContractModule', () => {
    let contractModule: TimelineModule;

    beforeEach(() => {
        contractModule = new TimelineModule();
    });

    it('should create an instance', () => {
        expect(contractModule).toBeTruthy();
    });
});
