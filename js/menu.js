var app = angular.module("app", ["ngResource"]);

app.controller("menuCtrl", ['$scope', '$http','$filter' , function ( $scope, $http ,$filter) {

    var uri ='http://192.168.33.10/angular/public/menu.php';

    $scope.salary = [];


    $scope.targetMonthArr=[];

    $scope.isShow     = false;

    $scope.isBlogShow = false;

    $scope.doSearch = function() {

        $scope.isShow = false;

        $http({
            method : 'GET',
            url : uri
        }).success(function(data, status, headers, config) {

            $scope.salary               = data;
            $scope.current_target_month = data.current_target_month;
            $scope.targetMonthArr       = data.target_month_arr;

            filterSalaryByTargetMonth()

        }).error(function(data, status, headers, config) {
            console.log(status);
        });
    };
    //読み込み時にまずはgetでアクセスをする
    $scope.doSearch();

    $scope.showButton = function(){
        if( $scope.isShow === true ){
            $scope.isShow = false;
        } else {
            $scope.isShow = true;
        }
    }

    $scope.blogShowButton = function(){
        if( $scope.isBlogShow === true ){
            $scope.isBlogShow = false;
        } else {
            $scope.isBlogShow = true;
        }
    }

    $scope.filterdItems2 = $filter("filter")($scope.salary, {
        name: "130"
    });

    $scope.hoge = function(){
    	$scope.isShow = false;
        filterSalaryByTargetMonth();
    }

    $scope.saveBlogSalary = function( blogArr ){

    	$http({
            method : 'POST',
            url : uri,
            data: blogArr
         //   headers: { 'Content-Type': ' text/javascript; charset=UTF-8' }
    	}).success(function(data, status, headers, config) {

    		 console.log("aaaa");
        }).error(function(data, status, headers, config) {
            console.log(status);
        });
    }

    $scope.calcAmount = function(){
    	var blog = $scope.blog.detail;

    	var totalBlogExpenses = blog.sum(function(blog_expense) {
            return blog_expense.entry_number.toNumber();
        });

    	$scope.blog.amount = totalBlogExpenses * 300 ;
    }

    function filterSalaryByTargetMonth(){

        var salary      = $scope.salary;
        var targetMonth = $scope.current_target_month;

        $scope.blog  =  filterBlogSalaryByTargetMonth( salary.blog_expenses , targetMonth );
        $scope.issues = filterTicketSalaryByTargetMonth( salary.issues, targetMonth);
    }

    function filterBlogSalaryByTargetMonth( blog_expenses ,targetMonth ){
        var blogObject ={
            'detail': "",
            'amount': 0
        };

        var blogExpensesByTargetMonth = blog_expenses.filter(function( blog_expense) {
              return blog_expense.target_month == targetMonth;
        })

        var totalBlogExpenses = blogExpensesByTargetMonth.sum(function(blog_expense) {
              return blog_expense.salary.toNumber();
        });

        blogObject.detail = blogExpensesByTargetMonth;
        blogObject.amount = totalBlogExpenses;
        return blogObject;
    }

    function filterTicketSalaryByTargetMonth( tickets ,targetMonth ){
        var ticketObject ={
            'made_detail': "",
            'made_amount': 0,
            'finished_detail': "",
            'finished_amount': 0,
            'total_amout':0
        };

        var madeTicketExpensesByTargetMonth = tickets.filter(function( ticket) {
              return ticket.created_target_month === targetMonth &&
                     ticket.author_id === "3";
        })

        var madeTotalExpenses = madeTicketExpensesByTargetMonth.length * 300;

        var finishedTicketExpensesByTargetMonth = tickets.filter(function(ticket) {
            return ticket.closed_target_month === targetMonth &&
                   ticket.assigned_to_id === "3" &&
                   ticket.status_id === "6";
        })

        var finishedTotalExpenses = finishedTicketExpensesByTargetMonth.length * 700;

        ticketObject['made_detail']     = madeTicketExpensesByTargetMonth;
        ticketObject['made_amount']     = madeTotalExpenses;
        ticketObject['finished_detail'] = finishedTicketExpensesByTargetMonth;
        ticketObject['finished_amount'] = finishedTotalExpenses;
        ticketObject['total_amount']    = madeTotalExpenses + finishedTotalExpenses;


        return ticketObject;
    }

}]);


