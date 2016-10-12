angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope,$ionicSlideBoxDelegate) {
    $scope.index=0;
    $scope.imgSrc = ['img/10.png','img/11.jpg','img/12.jpg']
    $scope.go = function(index){
      $ionicSlideBoxDelegate.slide(index);//slide切到索引为index的图
    }
    // 用jquery 来调用。
    $('.row div').on('click',function(){
      window.location.href=$(this).attr('src')
     // alert("你点的是 "+$(this).html()+'!')
    });
    /*$scope.showLeft = function(){
      alert(0)
    }*/
})
.controller('Ctrl', function($scope) {


  
})
.controller('CtrlHotel', function($scope,$stateParams) { 
  console.log($stateParams)  
})
.controller('ChatsCtrl', function($scope, Chats,$ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$ionicPopup 弹窗服务
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  console.log(Chats)
  $scope.chats = Chats.all();

  $scope.remove = function(chat) {
     var confirmPopup = $ionicPopup.confirm({
       title: '删除热点',
       template: '你确定要删除吗?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         Chats.remove(chat);
         console.log('yes');
       } else {
         console.log('no');
       }
     });
    
  };
})

.controller('ChatDetailCtrl', function($scope,$stateParams,$ionicActionSheet,$timeout,Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.shareClick = function(){
    // Show the action sheet
    var hideSheet= $ionicActionSheet.show({
            cancelOnStateChange:true, //切换视图时，是否关
            cssClass:'action_s',
      titleText: "操作当前文章我是标题",
      buttons: [ //这里定义多个button
        { text: "<b>分享</b>文章" },
        { text: "移动到..." }
      ],
      buttonClicked: function(index) {
        alert('第'+index+'个按钮')
        console.log('操作了第'+index+'个文章');
        return true;
      },
      cancelText: "取消",
      cancel: function() {
        // add cancel code..
        console.log('执行了取消操作');
        return true;
      },
      destructiveText: "删除",
      destructiveButtonClicked:function(){
        console.log('执行了删除操作');
        return true;
      }
    });

    // For example's sake, hide the sheet after two seconds
    /*$timeout(function() {
      hideSheet();
    }, 20000);*/
  }
})

.controller('AccountCtrl', function($scope,$timeout,$ionicLoading) {
  
  $scope.items = ['1111','222'];
  var base = 0;
  $scope.load_more = function(){
   // alert(每次都执行)
    //$timeout(function(){
      for(var i=0;i<3;i++,base++){
        if($scope.items.length>15){break;}  
        $scope.items.push(["item ",base].join(""));
      }
      $scope.$broadcast("scroll.infiniteScrollComplete");
      
   // },500);
  };
  $scope.doRefresh = function() {
    // for(var i=0;i<10;i++,base++)
     //$scope.items.unshift(["item ",base].join(""));
    // Stop the ion-refresher from spinning
    $scope.$broadcast("scroll.refreshComplete");
  };
  var idx = 0;
  $scope.load = function() {
    //显示载入指示器
    $ionicLoading.show({
      template: "正在载入数据，请稍后...",
      duration:1000 //时间自动隐藏
    });
    //延时2000ms来模拟载入的耗时行为
    $timeout(function(){
      for(var i=0;i<5;i++,idx++) $scope.items.push("ycm " + idx);
      //隐藏载入指示器
      //$ionicLoading.hide();
    },2000);
  };
  
  $scope.flag={showDelete:false,showReorder:false};
 // $scope.items=["Chinese","English","German","Italian","Janapese","Sweden","Koeran","Russian","French"];
  $scope.delete_item=function(item){
    console.log(item)
    var idx = $scope.items.indexOf(item);
    $scope.items.splice(idx,1);
  };
  $scope.move_item = function(item, fromIndex, toIndex) {
    console.log(fromIndex);
    console.log(toIndex);
    console.log(item);
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
        console.log(item);
  };
  /*$scope.settings = {
    enableFriends: true
  };*/
})


.controller('SetingCtr', function($scope,$stateParams,$ionicActionSheet,$timeout,Chats) {
  $scope.items = [
    {label:"HTML5",selected:true},
    {label:"CSS3"},
    {label:"ECMAScript6"}
  ];
  $scope.ret = {choice:"CSS3"};
});
/*

angular.module('mySuperApp', ['ionic'])
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: 'Enter Wi-Fi Password',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };
});*/