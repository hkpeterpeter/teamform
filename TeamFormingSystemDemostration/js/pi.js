// inject firebase service
var app = angular.module("pi", ["firebase"]); 

app.controller("info", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

        $scope.iq = {
            Name : "Kit",
            iq : 0,
            eq : 0
        }

		var ref=firebase.database().ref("pi");
    	ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.level = dataRef.child("level").val();
        	});
            console.log($scope.level);
        });

        var ref=firebase.database().ref("iq");
        ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.newIq = dataRef.child("iq").val();
            $scope.newEq = dataRef.child("eq").val();
            });
        });

        $scope.updateIq = function() {
            var path = "iq/-KXhHdaWWvGuSqqIRaMH";
            var itemRef = firebase.database().ref(path);
            $timeout( function(){ $scope.newIq = 23;
            $scope.iq.iq = 23;
			$scope.newEq = 97;
			$scope.iq.eq = 97;
            itemRef.update($scope.iq); }, 5000);
            
            // $state.go("iqtest");
        }

	}
);