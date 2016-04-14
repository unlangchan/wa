app.controller('IndexController', ['$scope', '$http', '$filter', '$timeout','$compile',
  function($scope, $http, $filter, $timeout,$compile) {
    $scope.login = {
      ready: false,
      TitleMenu:[
        {name:"InitalStart",pos:"0",ctr:loadmenu},
        {name:"LoadSave",pos:"1",ctr:"LoadSave"},
        {name:"SystemSetting",pos:"2",ctr:"SysSet"},
        {name:"SpecialCpntents",pos:"3",ctr:loadmenu},
        {name:"CloseGame",pos:"4",ctr:closeGame}
      ],
      InitalStart:[
        {name:"IC",pos:"5",ctr:start},
        {name:"CC",pos:"6",ctr:"start_CC"},
        {name:"Coda",pos:"7",ctr:"srart_Coda"},
        {name:"TitleMenu",pos:"8",ctr:loadmenu},
      ],
      SpecialCpntents:[
        {name:"DigitalNovel",pos:"9",ctr:loadmenu},
        {name:"CGMode",pos:"10",ctr:"start_CC"},
        {name:"SceneReplay",pos:"11",ctr:"title_menu"},
        {name:"SoundMode",pos:"12",ctr:"title_menu"},
        {name:"VoiceMessage",pos:"13",ctr:"title_menu"},
        {name:"TitleMenu",pos:"8",ctr:loadmenu},
      ],
      DigitalNovel:[
        {name:"SpecialGiftIC",pos:"14",ctr:"start_CC"},
        {name:"SpecialGiftCC",pos:"15",ctr:"srart_Coda"},
        {name:"SpecialCpntents",pos:"8",ctr:loadmenu},
      ]
    }
    $scope.loadlogin = function() {
      $scope.movie.ready = false;
      $scope.login.ready = true;
      $scope.list=[];
      $timeout(function() {
        $scope.list = $scope.login.TitleMenu;
      },1500)
    }
    $scope.movie = {
      ready: true,
      src: "/source/video/mv0000.ogv",
      list:[
        "/source/video/mv0000.ogv",
        "/source/video/mv0001.ogv",
        "/source/video/mv0002.ogv",
        "/source/video/mv0003.ogv",
        "/source/video/mv0004.ogv",
        "/source/video/mv0005.ogv"
      ],
    }
    $scope.voice={
      index:0,
      list:["source/audio/voice/login.ogg","source/audio/voice/1.mp3"]
    }
    $scope.test =function(){
        var v = $scope.voice;
        var voice = '<voice ng-src="' +v.list[v.index]+ '"   autoplay callback="test"></voice>';
        v.index = ++v.index < v.list.lenth?v.index:0;
        $scope.movie=false;
        var html = $compile(voice)($scope);
        $('.audio').append(html);
  
    }
    function loadmenu() {
      var menu = this.name
      $scope.list = '';
      $timeout(function() {
        $scope.list = $scope.login[menu];
      },500)

    }
    function start(){
        var m = $scope.movie;
        var l = $scope.login;
        $scope.list = [];
        m.src=m.list[3];
        l.ready = false;
        m.ready = true; 
       $scope.next = $scope.test;     
    }
    function closeGame(){
      window.location.href="about:blank";
    }
    function init(){
      $scope.next = function(next) {
        var m = $scope.movie;
        m.src = m.list[5];
        $scope.next = next;
      };
    }
    init();
  }
])