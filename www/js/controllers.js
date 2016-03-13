angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope, $state, $ionicPopup) {
    BaasBox.setEndPoint("http://localhost:9000");
    BaasBox.appcode = "1234567890";
    console.log("BaasBox initiated");


    // Form data for the login modal
    $scope.loginData = {};

    // Form data for the signUp modal
    $scope.signUpData = {};

    console.log(window.localStorage);

    var userData = JSON.parse(window.localStorage['user-data'] || '{}');
    console.log(userData);
    if (userData != null) {
        $scope.username = userData.username;
        $scope.email = userData.email;
        $scope.token = userData.token;

    }

    // Richiede il logout
    $scope.logout = function() {
        if(confirm('Vuoi effettuare il logout')) {
            $scope.doLogout();
        }
    };



    // Perform the login action when the user submits the login form
    $scope.doLogout = function() {
        console.log('Doing logout', $scope.loginData);
        BaasBox.logout()
            .done(function (res) {
                console.log(res);
                $scope.username = null;
            })
            .fail(function (error) {
                console.log("error ", error);
            })
        window.localStorage['user-data'] = null;
        $scope.username = null;
    };




    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        BaasBox.login($scope.loginData.username, $scope.loginData.password)
            .done(function (user) {
                console.log("Logged in ", user.username);
                $scope.username = user.username;
                $scope.email = user.visibleByTheUser.email;

                window.localStorage['user-data'] = JSON.stringify({
                    'username' : user.username,
                    'password' : $scope.loginData.password,
                    'token' : user.token
                });

                console.log('Logged ', window.localStorage['user-data']);
                $state.go('home');

            })
            .fail(function (err) {
                console.log("error ", err.responseText )
                alert("Login errato, riprovare.")
            });
    };

    $scope.doSignUp = function() {
        console.log('Doing SignUp', $scope.signUpData);

        BaasBox.signup($scope.signUpData.username, $scope.signUpData.password, {"visibleByTheUser": {"email" : $scope.signUpData.email}})
            .done(function (res) {
                console.log("signup ", user);

                $scope.username = user.username;
                $scope.email = $scope.signUpData.email;
                window.localStorage['user-data'] = JSON.stringify({
                    'username' : $scope.signUpData.username,
                    'password' : $scope.loginData.password,
                    'token' : user.token
                });

                console.log(window.localStorage);
            })
            .fail(function (error) {$scope.signUpData
                console.log("error ", err.responseText );
            });
    };

    $scope.showSignUp = function() {
        $scope.signUpData = {};

        var customPopup = $ionicPopup.show({
            title: 'Registrazione',
            template: '<input type="text" ng-model="signUpData.username" placeholder="Username"> <input type="password" ng-model="signUpData.password" placeholder="Password"> <input type="text" ng-model="signUpData.email" placeholder="Email">',
            subTitle: 'Immetti Username, Password e Email',
            scope: $scope,
            buttons: [{
                text: 'Annulla'
            }, {
                text: 'Registrati!',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.signUpData.username && !$scope.signUpData.password) {
                        // Don't allow the user to close unless they enter a WiFi password.
                        e.preventDefault();
                    } else {
                        return $scope.signUpData;
                    }
                }
            }]
        });

        customPopup.then(function(res) {
            console.log('Tapped!', res);
            $scope.doSignUp();
        });
    };

    $scope.createDocument = function() {
        // Assumes a collection named "schede" has been created
        var post = new Object();
        post.title = "My new post";
        post.body = {"d":4};
        BaasBox.save(post, "schede")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    $scope.deleteCollection = function() {
        console.log("chiamata deleteCollection");
        BaasBox.deleteCollection("schede")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
        console.log("chiamata deleteCollection");
    };

})
   
.controller('homeCtrl', function($scope) {

})
   
.controller('profiloCtrl', function($scope) {

    // Retrieve documents
    $scope.retrieveDocuments = function() {
        BaasBox.loadObject("posts", "090dd688-2e9a-4dee-9afa-aad72a1efa93")
            .done(function(res) {
                console.log("res ", res['data']);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
        };

    // follow a user
    $scope.followaUser = function() {
        BaasBox.followUser("cesare")
            .done(function(res) {
                console.log("res ", res['data']);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // unfollow a user
    $scope.unfollowaUser = function() {
        BaasBox.unfollowUser("cesare")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

})
   
.controller('cercaCtrl', function($scope) {
    /*HttpService.getPost()
        .then(function(response) {
            $scope.post = response;
        });

    HttpService.getUsers()
        .then(function(response) {
            $scope.users = response;
        });*/

    $scope.retrieveDocuments = function() {

        // Version with pagination
        BaasBox.loadCollectionWithParams("schede", {page: 0, recordsPerPage: BaasBox.pagelength})
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };
})
   
.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('profiloTrainerCtrl', function($scope) {

    // change password
    $scope.retrieveDocuments = function() {
        BaasBox.changePassword("oldpass", "newpass")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // follow a user
    $scope.followaUser = function() {
        BaasBox.followUser("cesare")
            .done(function(res) {
                console.log("res ", res['data']);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // unfollow a user
    $scope.unfollowaUser = function() {
        BaasBox.unfollowUser("cesare")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };
})

.controller('creaSchedeCtrl', function($scope) {

    $scope.delCollection = function() {
        console.log("chiamata deleteCollection");
        BaasBox.deleteCollection("schede")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // Create a document
    $scope.createDocument = function() {
        // Assumes a collection named "schede" has been created
        var post = new Object();
        post.title = "My new post";
        post.body = {"d":4};
        BaasBox.save(post, "schede")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // fetch following
    $scope.createDocument = function() {
        BaasBox.fetchFollowing("cesare")
            .done(function(res) {
                console.log("res ", res['data']);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // Fetch followers
    $scope.createDocument = function() {
        BaasBox.fetchFollowers("cesare")
            .done(function(res) {
                console.log("res ", res['data']);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    };

    // Upload a file
    // Assumes 'uploadForm' is a form with an input tag of type 'file'
    $scope.caricaFile = function() {

        $("#uploadForm").submit(function(e) {
            e.preventDefault();
            var formObj = $(this);
            var formData = new FormData(this);
            BaasBox.uploadFile(formData)
                .done(function(res) {
                    console.log("res ", res);
                })
                .fail(function(error) {
                    console.log("error ", error);
                })

            })
    };

    //Grant permissions on a Document
    $scope.createDocument = function() {
        BaasBox.grantAccessToUser("posts", "4cbfe03c-632b-4d3e-9a2b-0d4a0326d89e", BaasBox.READ_PERMISSION, "a")
            .done(function(res) {
                console.log("res ", res);
            })
            .fail(function(error) {
                console.log("error ", error);
            })
    }
})