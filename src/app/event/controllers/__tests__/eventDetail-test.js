import event from '../../';
describe('EventDetailController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(event);
        inject((_$controller_) => {
            $controller = _$controller_('EventDetailCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getEvent', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvent').and.returnValue(Promise.resolve({id: 1})));
        });
        $controller.$stateParams.eventId = 1;
        await $controller.getEvent();
        $timeout.flush();
        expect($controller.event.id).toEqual(1);
        done();
    });

    it('should reject getEvent', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvent').and.returnValue(Promise.reject(new Error('Event not exist'))));
        });
        $controller.$stateParams.eventId = 1;
        await $controller.getEvent();
        $timeout.flush();
        expect($controller.error.message).toEqual('Event not exist');
        done();
    });

    it('should resolve joinEvent', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'joinEvent').and.returnValue(Promise.resolve({id: 1})));
        });
        $controller.$stateParams.eventId = '1';
        await $controller.joinEvent();
        $timeout.flush();
        done();
    });

    it('should reject joinEvent', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'joinEvent').and.returnValue(Promise.reject(new Error('Fail to Join Event'))));
        });
        $controller.$stateParams.eventId = '1';
        await $controller.joinEvent();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Join Event');
        done();
    });

    it('autoFormTeam', () => {
        let $timeout;
        inject((_$timeout_) => {
            $timeout = _$timeout_;
        });
        $controller.event = {
            getEventUsers: () => {
                return [{id: 1, hasTeam: false}, {id: 2, hasTeam: false}];
            },
            data: {teamMin: 2, teamMax: 2}
        };
        $timeout.flush();
        // expect($controller.autoTeam.failed).toBe(null);
        $controller.autoFormTeam();
        $controller.event = {
            getEventUsers: () => {
                return [{id: 1, hasTeam: false}, {id: 2, hasTeam: false}, {id: 3, hasTeam: false}];
            },
            data: {teamMin: 2, teamMax: 2}
        };
        $controller.autoFormTeam();
        $timeout.flush();
        expect($controller.autoTeam.failed).not.toBe(null);
    });

});
