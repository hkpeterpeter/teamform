app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'main.html',
            resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
        })
        
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'AuthCtrl',
            resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
        })
        
         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'AuthCtrl'
        })

         .state('personal', {
            url: '/personal',
            templateUrl: 'personal_page.html',
            controller: 'Personal',
            authRequired: true,
             resolve: {
      "currentAuth": ["Auth", function(Auth) {

        return Auth.$requireSignIn();
      }]
      }})

      .state('event', {
            url: '/event',
            templateUrl: 'event.html',
            authRequired: true,
            controller: 'eventSubmit'
            })
            
             .state('search', {
            url: '/search',
            templateUrl: 'search.html',
            controller: 'eventSearch'
            })
        
       .state('Teaminformation', {
            url: '/Teaminformation',
            templateUrl: 'Teaminformation.html',
            controller: 'teaminfo'
            })
			
	   .state('randomTeam', {
            url: '/randomTeam',
            templateUrl: 'randomTeam.html',
            controller: 'random_Team'
            })

        .state('TerminateEvent', {
            url: '/TerminateEvent',
            templateUrl: 'terminate_event.html',
            controller: 'eventterm'
            })

        .state('Eventjoin', {
            url: '/eventjoin',
            templateUrl: 'joinevent.html',
            authRequired: true,
            controller: 'eventjoin'
            })

		.state('createTeam', {
            url: '/createTeam',
            templateUrl: 'createTeam.html',
            authRequired: true,
            controller: 'teamSubmit'
            })

    .state('editteaminfo', {
            url: '/editteaminfo',
            templateUrl: 'editteaminfo.html',
            controller: 'teamedit'
            })

             .state('kickmember', {
            url: '/kickmember',
            templateUrl: 'kick.html',
            controller: 'kick'
            })
            
             .state('privatepublic', {
            url: '/privatepublic',
            templateUrl: 'publicprivate.html',
            controller: 'openness'
            })

             .state('personal_information', {
            url: '/personal_information',
            templateUrl: 'personal_information.html',
            authRequired: true,
            controller: 'piCtrl'
            })
             
             .state('requests', {
            url: '/handleRequests',
            templateUrl: 'handleRequests.html',
            controller: 'handleRequests',
            })
			
			.state('randomEvent', {
            url: '/randomEvent',
            templateUrl: 'randomEvent.html',
            controller: 'random_Event',
            });
});

