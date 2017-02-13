import TeamDetailView from '../views/teamDetail.html';
import TeamListView from '../views/teamList.html';
import TeamCreateView from '../views/teamCreate.html';
import TeamEditView from '../views/teamEdit.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when(/^\/team\/?$/, '/team/list');
    $stateProvider
        .state('team', {
            url: '/team',
            template: '<ui-view />',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('team.list', {
            url: '/list',
            template: TeamListView,
            controller: 'TeamListCtrl',
            controllerAs: 'teamList',
            ncyBreadcrumb: {
                label: 'Teams'
            }
        })
        .state('team.create', {
            resolve: {
                auth: ['UserService', (userService) => {
                    return userService.checkRules({
                        signIn: true
                    });
                }]
            },
            url: '/create/:eventId?',
            template: TeamCreateView,
            controller: 'TeamCreateCtrl',
            controllerAs: 'teamCreate',
            ncyBreadcrumb: {
                label: 'Create',
                parent: 'team.list'
            }
        })
        .state('team.detail', {
            url: '/:teamId',
            views: {
                '@': {
                    template: TeamDetailView,
                    controller: 'TeamDetailCtrl',
                    controllerAs: 'teamDetail',
                }
            },
            ncyBreadcrumb: {
                label: '{{ teamDetail.team.data.name || teamEdit.team.data.name }}',
                parent: 'team.list'
            }
        })
        .state('team.detail.edit', {
            resolve: {
                auth: ['UserService', 'TeamService', '$stateParams', async (userService, teamService, $stateParams) => {
                    let team = await teamService.getTeam($stateParams.teamId);
                    return userService.checkRules({
                        signIn: true,
                        userId: team.data.createdBy
                    });
                }]
            },
            url: '/edit',
            views: {
                '@': {
                    template: TeamEditView,
                    controller: 'TeamEditCtrl',
                    controllerAs: 'teamEdit',
                }
            },
            ncyBreadcrumb: {
                label: 'Edit'
            }
        });
}];
