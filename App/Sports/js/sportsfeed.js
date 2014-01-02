var sportsApp = angular.module('sportsApp',['ngRoute','ngAnimate']);

function loadFeed(url,id){
		$.jGFeed(url,function(data){
			var output = '<ul class = "searchresults">';
			console.log(data);
			$.each(data['entries'],function(key,val) {
				console.log('val'+val);
				output += '<li>';
				output += '<h2><a href="' + val.link + '">'+ val.title + '</a></h2>';
				output += '<p>' + val.contentSnippet +'</p>';
				output += '<p> published: ' + val.publishedDate + ' </p>';
				output += '</li>';				
			});
			output += '</li>';
			$('#'+id).html(output);
		});
};

function StreamController($scope,$route,$routeParams,$location){
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.streams = ['Cricbuzz','Cricinfo','ESPN','FIFA'];
	$scope.onh3Click = function(streamName){
		console.log("Clicked! "+streamName);
		switch(streamName.toUpperCase()){
			case 'ESPN':
				$.getJSON('http://api.espn.com/v1/now?apikey=ymbeu2f2pu5fg6hfzncb4kys',function(data){
				var output = '<ul class = "searchresults">';
				$.each(data['feed'],function(key,val) {
					console.log('key:'+key);
					console.log('val'+val);
						output += '<li>';
						output += '<h2> <a href="' + val.links.web.href + '">'+ val.headline + '</a></h2>';
						output += '<p>' + val.description +'</p>';
						output += '<p> published: ' + val.lastModified + ' </p>';
						output += '</li>';				
				});
				output += '</li>';
				$('#ESPN').html(output);
				});
			break;
			case 'CRICBUZZ':
				loadFeed("http://live-feeds.cricbuzz.com/CricbuzzFeed","Cricbuzz");
			break;
			case 'CRICINFO':
				loadFeed("http://www.espncricinfo.com/rss/content/story/feeds/0.xml","Cricinfo");
			break;
			case 'FIFA':
				loadFeed("http://www.fifa.com/rss/index.xml","FIFA");
			break;
		}
	};
};

sportsApp.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/', {
		templateUrl: 'Sports/views/sportsFeed.html',
		controller: StreamController
	});
});


$(document).ready(function (){	
	$('.chkb').click(function() {
		console.log(this.value,this.checked);
		var id = this.value;
		$('#'+id).toggle(this.checked);		
		$( "h3[name='"+id+"']" ).toggle(this.checked);
		$( "h3[name='"+id+"']" ).click();
	});
});
