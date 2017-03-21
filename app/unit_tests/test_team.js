describe('Test team.js', function() {
   
	var $scope, TeamCtrl;

	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}

	beforeEach(module('teamform-team-app'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		TeamCtrl = $controller('TeamCtrl', {$scope: $scope});
	}));

	it("test saveFunc", function() {
		expect($scope.saveFunc()).toBeUndefined();
	});
	
	// it("test loadFunc", function() {
	// 	expect($scope.loadFunc()).toBe('function');
	// });
	
	// it("test openCategory", function() {
	// 	expect($scope.openCategory(0)).toBe('function');
	// });
	
	it("test processRequest", function() {
		expect($scope.processRequest("a")).toBeUndefined();
	});

	it("test smartAdd", function() {
		$scope.requests = ["member"];
		$scope.member = [
			{$id: "member", tags: ["Java", "C++"]}
		];
		$scope.param.teamMembers = ["Exist"];
		$scope.param.currentTeamSize = 2;
		$scope.param.tags = ["Java", "Python"];
		$scope.param.weight = [5, 10];
		
		$scope.smartAdd();
		expect($scope.param.teamMembers.length).toEqual(2);
	});
	
	it("test retrieveTagsFromID", function() {
		$scope.member = [{
			$id: "member2", tags: ["C++", "Java"]
		},
		{
			$id: "member", tags: ["C++", "Java"]
		}];
		expect($scope.retrieveTagsFromID("member")).toEqual(["C++", "Java"]);
		$scope.member = [{$id: "member"}];
		expect($scope.retrieveTagsFromID("member")).toEqual("null");
		$scope.member = [];
		expect($scope.retrieveTagsFromID("whatever")).toEqual("null");
	});
	
	it("test retrieveScoreFromTags", function() {
		$scope.param.tags = ["C++", "Python"];
		$scope.param.weight = [5, 10];
		expect($scope.retrieveScoreFromTags($scope.param.tags)).toEqual(15);
		expect($scope.retrieveScoreFromTags(["Java", "C++"])).toEqual(5);
		expect($scope.retrieveScoreFromTags("null")).toEqual(0);
	});

	it("test retrieveNameFromID", function() {
		$scope.users = [
			{$id: "123", name: "hi"},
			{$id: "456", name: "hello"},
			{$id: "789", name: "bye"},
		];
		expect($scope.retrieveNameFromID("123")).toEqual("hi");
		expect($scope.retrieveNameFromID("random")).toEqual("null");
	});
	
	it("test retrieveNamesFromJSON", function() {
		$scope.users = [
			{$id: "123", name: "hi"},
			{$id: "456", name: "hello"},
			{$id: "789", name: "bye"},
		];
		var teamMembers = ["123","456","789"]
		var result = $scope.retrieveNamesFromJSON(teamMembers);
		expect(result).toEqual(["hi", "hello", "bye"]);
	});
	

	it("test returnMaxidx", function() {
		$scope.array = [
			{score: 1},
			{score: 3},
			{score: 2}];
		expect($scope.returnMaxidx($scope.array)).toEqual(1);
		expect($scope.returnMaxidx([])).toEqual(-1);
	});
	
	it("test changeCurrentTeamSize", function() {
		$scope.param = {
			currentTeamSize: 2
		};
		$scope.range = {
			minTeamSize: 1, 
			maxTeamSize: 5
		};
		$scope.changeCurrentTeamSize(1);
		expect($scope.param.currentTeamSize).toEqual(3);
		$scope.changeCurrentTeamSize(-5);
		expect($scope.param.currentTeamSize).toEqual(3);
	});

	
	it("test refreshViewRequestsReceived", function() {
		$scope.param = {teamName: "team1"};
		$scope.member = [
			{$id: "123", selection: ["team1", "team2"]},
			{$id: "456", selection: ["team3", "team2"]},
			{$id: "789", selection: ["team1", "team3"]}
		];
		$scope.refreshViewRequestsReceived();
		expect($scope.requests).toEqual(["123", "789"]);
	});
	
	it("test tagChecked", function() {
		$scope.param = {
			tags: ["male", "female", "ug", "pg"]
		};
		expect($scope.tagChecked("male")).toEqual(true);
		expect($scope.tagChecked("python")).toEqual(false);
		$scope.param = {};
		expect($scope.tagChecked("python")).toEqual(false);
	});

	it("test addTags", function() {
		$scope.param = {
			tags: ["male", "female", "ug", "pg"],
			weight: [1,2,3,4]
		};
		$scope.addTags("Java");
		expect($scope.param.tags.length).toEqual(5);
		$scope.addTags("male");
		expect($scope.param.tags.length).toEqual(4);
	});
	
	it("test removeMember", function() {
		$scope.eventName = "Event";
		$scope.param.teamName = "TeamName";
		$scope.param.teamMembers = ["mem1","mem2"];
		$scope.removeMember("mem1");
		expect($scope.param.teamMembers.length).toEqual(1);
		
		// remove member dosen't exist
		$scope.removeMember("member");
		expect($scope.param.teamMembers.length).toEqual(1);
		
		$scope.removeMember("mem2");
		expect($scope.param.teamMembers.length).toEqual(0);
	});
	
	
	it("test checkTeam", function() {		
		expect($scope.checkTeam()).toBeDefined();
	});
	
	it("test sendInvite", function() {
		$scope.team = [
			{$id: "Team1"}
		];
		$scope.member = [
			{$id: "User1", inTeam: "Team2"},
			{$id: "User2"}
		]
		$scope.param.teamName = "Team1";
		$scope.sendInvite("User1");
		expect(typeof $scope.member[0].invitedBy).toEqual('undefined');
		
		$scope.sendInvite("User2");
		expect($scope.member[1].invitedBy.length).toEqual(1);
		expect($scope.member[1].invitedBy[0]).toEqual("Team1");
		
	});

	it("test removeMember", function() {
		expect($scope.removeMember("Member1")).toBeUndefined();
	});
});
