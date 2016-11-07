
app.controller("teamSubmit",
               
               function($scope, $firebaseArray){
                
                $scope.input = {
		event:"",
                    name:"",
                    intro:"",
                    holder:"",
                    state:false
                };
                
                var ref=firebase.database().ref("events");
                
                $scope.submit = function() {
                    
                    if($scope.input.name!==""&&$scope.input.intro!==""){
                        $scope.input.state=true;
                        $scope.input.holder=1;
                        $scope.team = {
                              name:"",
			intro:""									
			};
                              $scope.team.name=$scope.input.name;
                              $scope.team.intro=$scope.input.intro;
                              childRef=ref.child($scope.input.event);
                              if(!firebase.auth().currentUser){
                                        ref.orderByChild("name").equalTo($scope.input.event).once("child_added",function(location){
                                                  location.child("Team").ref.push().set($scope.team);
                                        });
				}
                              else{
                                        window.alert("Please sign in first!");
                              }
                              $scope.input.event= "";
                              $scope.input.intro= "";
                              $scope.input.name= "";
								                    

                    
                    }
                    
                    
                    
                };
                
                
               }
               
               
);