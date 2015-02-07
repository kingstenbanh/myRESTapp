myApp.controller('LoginCtr', _LoginCtr);

_LoginCtr.$inject = ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory'];

function _LoginCtr($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
  $scope.user = {
    username: 'kingsten@gmail.com',
    password: 'pass123'
  };

  $scope.login = function() {
    var username = $scope.user.username;
    var password = $scope.user.password;

    if (username  && password) {
      UserAuthFactory.login(username, password).success(function(data) {
        AuthenticationFactory.isLogged = true;
        AuthenticationFactory.user = data.user.username;
        AuthenticationFactory.userRole = data.user.role;

        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
        $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

        $location.path('/');
      }).error(function(status) {
        alert('Oops something went wrong!');
      });
    } else {
      alert('Invalid credentials');
    }
  };
}
