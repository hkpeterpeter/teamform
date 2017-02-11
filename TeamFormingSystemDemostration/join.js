//app.controller("joinTeam",
//               
//    function($scope,$state){
//                
//            var eventRef=firebase.database().ref("events");
//            var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
//            
//            var movingMember = {
//                name:"",
//                intro:"",
//                team:"",
//                uid:""
//                };
//        
//            var newRequest = {
//                eventName : "",
//                targetTeam : "",
//                memberName : "",
//                message : "",
//                receiver : ""
//
//            };
//            
//            
//            
//            $scope.joinTeamInPerson = function (event,teamName){
//                movingMember="";
//                
//                    memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
//                        function(oldLocation){
//                            movingMember=oldLocation.val();
//                            eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
//                                targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
//                                    newLocation.child("member").ref.push().set(movingMember);
//                                    newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
//                                    oldLocation.ref.remove();
//                                    window.alert("Join team success!");
//
//                                });
//                
//                            });
//                
//                        });
//                
//                
//                
//            
//            };
//            
// $scope.joinTeamInPerson = function (event,teamName){
//                movingMember="";
//                
//                    memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
//                        function(oldLocation){
//                            movingMember=oldLocation.val();
//                            eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
//                                targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
//                                    newLocation.child("member").ref.push().set(movingMember);
//                                    newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
//                                    oldLocation.ref.remove();
//                                    window.alert("Join team success!");
//
//                                });
//                
//                            });
//                
//                        });
//                
//                
//                
//            
//            };
//
//             $scope.test = function (){
//                $state.go('personality');
//                
//
//            };
//            
//
//            $scope.reqJoinTeamInPerson = function (event,teamName){
//                
//              
//                        
//                        memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
//                                function(exist)
//                                {
//                                        //if(exist.val()){
//                                                //window.alert("found!");
//                                                newRequest.eventName = event;
//                                                newRequest.targetTeam = teamName;
//                                                newRequest.memberName = exist.child("username").val();
//                                                newRequest.message = $scope.reqMessage;
//                                                
//                                                eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
//                                                        targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(targetTeam){
//                                                             newRequest.receiver=targetTeam.child("teamleader").val();   
//                                                        });
//                                                });
//                                                                
//                                                
//                                                
//                                                
//                                                
//                                                firebase.database().ref("requests").push().set(newRequest);
//        
//                                                window.alert("Request sent!");
//                                                newRequest.message="";
//                                //        }
//                                        //else {
//                                        //        window.alert("You have a team!");
//                                        //}
//                                        
//                                }                       
//                        );
//                   
//            };  
//    }                      
//);
//


app.controller("joinTeam",
               
    function($scope){
                
            var eventRef=firebase.database().ref("events");
            var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
            var teamNoEvent=firebase.database().ref("TeamWithNoEvent");
            
            var movingMember = {
                username:"",
                email:"",
                intro:"",
                team:"",
                uid:"",
                gender: "",
                phone:"",
                birth: "",
                position: "",
                skill: "",
                remark: "",
                event: ""
                };
        
            var newRequest = {
                eventName : "",
                targetTeam : "",
                memberName : "",
                message : "",
                receiver : ""

            };
            
            
            
            $scope.joinTeamInPerson = function (event,teamName){
                movingMember="";
                if(firebase.auth().currentUser){
                    memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
                        function(oldLocation){
                            movingMember=oldLocation.val();
                            movingMember.team = teamName;
                            movingMember.event = event;
                            eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
                                targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
                                    newLocation.child("member").ref.push().set(movingMember);
                                    newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
                                    oldLocation.ref.remove();
                                    window.alert("Join team success!");

                                });
                
                            });
                
                        });
                
                }
                else{
                    window.alert("Please sign in first!");
                }    
            
            };
            
            $scope.joinTeamInTeam = function (event,teamName){
                movingMember="";
                if(firebase.auth().currentUser){
                    //teamNoEvent.orderByChild("uid").on("child_added",
                      //  function(t_team){
                                
                          teamNoEvent.ref.orderByChild("teamleader").equalTo(firebase.auth().currentUser.uid).once("child_added",
                                function(t_team){
                                        
                                        eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
                                                targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
                                                        newLocation.child("member").ref.push().set(t_team.val());
                                                        t_team.ref.remove();
                                                        window.alert("Join team success!");
                                         
                                                        }
                                                );
                        
                                        });
                
                          //      });
                
                        });
                }
                else{
                    window.alert("Please sign in first!");
                }    
            
            };
            
            


            $scope.reqJoinTeamInPerson = function (event,teamName){
                
                if(firebase.auth().currentUser){//if logged in
                        
                        memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
                                function(exist)
                                {
                                        //if(exist.val()){
                                                //window.alert("found!");
                                                newRequest.eventName = event;
                                                newRequest.targetTeam = teamName;
                                                newRequest.memberName = exist.child("username").val();
                                                newRequest.message = $scope.reqMessage;
                                                
                                                eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
                                                        targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(targetTeam){
                                                             newRequest.receiver=targetTeam.child("teamleader").val();   
                                                        });
                                                });
                                                                
                                                
                                                
                                                
                                                
                                                firebase.database().ref("requests").push().set(newRequest);
        
                                                window.alert("Request sent!");
                                                newRequest.message="";
                                //        }
                                        //else {
                                        //        window.alert("You have a team!");
                                        //}
                                        
                                }                       
                        );
                }
                else{
                    window.alert("Please sign in first!");
                }    
            };  
    }                      
);
               