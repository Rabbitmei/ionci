// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
//run方法用于初始化全局的数据，仅对全局作用域起作用。
.run(function($ionicPlatform) {
  //$ionicPlatform 识别机子
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
//ui-router - 路由控制$stateProvider
//$urlRouterProvider负责处理在状态配置中指定的url路由方式之外的 url 请求的路由方式。
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.hotel', {
      url: '/hotel/:id',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-hotel.html',
          controller: 'CtrlHotel'
        }
      }
    })
  .state('tab.class', {
      url: '/class/:id',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-class.html',
          controller: 'Ctrl'
        }
      }
    })
   
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': { //要显示在哪个模块里
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.seting', {
    url: '/seting',
    views: {
      'tab-seting': {
        templateUrl: 'templates/tab-seting.html',
        controller: 'SetingCtr'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
