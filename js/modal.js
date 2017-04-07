var app = angular.module("app", ['ui.bootstrap'])
.controller('modalCtrl', ['$scope', '$uibModal', function($scope, $uibModal) {

	$scope.showYesNo = function() {

		    ModalService.showModal({
		      templateUrl: "yesno/yesno.html",
		      controller: "YesNoController"
		    }).then(function(modal) {
		      modal.element.modal();
		      modal.close.then(function(result) {
		        $scope.yesNoResult = result ? "You said Yes" : "You said No";
		      });
		    });

		  };
  }])