import header from '../../';
describe('HeaderDirective', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(header);
        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('Header', () => {
        let element = $compile('<ui-header></ui-header>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBeNull();
    });
});
