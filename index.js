'use strict';
const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
let arr = [];


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(__dirname + "/")); 


app.get('/', function (req, res) {
	// express.static(__dirname + 'index.html');
	var index = fs.readFileSync('index.html');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(index);
});

app.get('/api/showproof/:id', function (req, res) {
	console.log(req.params.id);
	var origin = req.headers.origin;
	console.log(origin);
	console.log(req.headers);
	var cssFile = "<link href=\\\"https://fonts.googleapis.com/css?family=Lato|Roboto:300,400\\\" rel=\\\"stylesheet\\\"><style type=\\\"text/css\\\">.imomin div.action div.icon,.imomin div.action div.info{align-self:center;display:inline-block}.imomin{font-family:Roboto,sans-serif;font-family:Lato,sans-serif;position:fixed;bottom:0;left:0;margin:0 0 12px 16px;transform:translateX(-100%);-webkit-transform:translateX(-100%)}.imomin div.action{min-width:260px;width:fit-content;height:70px;box-shadow:0 0 23px rgba(0,0,0,.2);margin:8px 16px 8px 0;background-color:#fff;transition:box-shadow .2s,transform .2s;border-radius:8px;border:1px solid rgba(0,0,0,.1);display:flex;padding:0 8px;cursor:pointer}.imomin div.action.curve{border-radius:38px;padding:0 15px 0 3px}.imomin div.action div.icon i,.imomin div.action div.icon img{height:60px;width:60px;border-radius:50%;position:relative}.imomin div.action div.icon i{display:inline-block;width:60px;height:60px;border-radius:50%;background-repeat:no-repeat;background-size:60px;transition:opacity .2s;background-position:0 0}.imomin div.action div.icon i.thumbup{background-image:url(data:image/png;base64,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)}.imomin div.action div.icon i:after,.imomin div.action div.icon img:after{content:\\\"\\\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.imomin div.action:hover{box-shadow:0 0 23px rgba(0,0,0,.4)}.imomin div.action div.info{margin-left:7px}.imomin div.action div.info .title{font-weight:600;font-size:.85em;line-height:1.4em;max-width:275px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.imomin div.action div.info .ago,.imomin div.action div.info .description{font-size:.8em;line-height:1.3em;color:#000;max-width:275px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.imomin.animate{opacity:1;-webkit-animation:slide-in 2.5s 1s 1 ease forwards,fade-out 2s 5s 1 ease forwards;-moz-animation:slide-in 2.5s 1s 1 ease forwards,fade-out 2s 5s 1 ease forwards;-ms-animation:slide-in 2.5s 1s 1 ease forwards,fade-out 2s 5s 1 ease forwards;-o-animation:slide-in 2.5s 1s 1 ease forwards,fade-out 2s 5s 1 ease forwards;animation:slide-in 2.5s 1s 1 ease forwards,fade-out 2s 5s 1 ease forwards}.imomin.animate:hover{-webkit-animation-play-state:paused;-moz-animation-play-state:paused;-o-animation-play-state:paused;animation-play-state:paused}@keyframes slide-in{100%{transform:translateX(0)}}@-webkit-keyframes slide-in{100%{-webkit-transform:translateX(0)}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@media only screen and (min-device-width:320px) and (max-device-width:480px) and (-webkit-min-device-pixel-ratio:2){.imomin{margin:0 0 12px 16px;transform:translateY(100%);-webkit-transform:translateY(100%)}}</style>";
	var dataString = 'var now = new Date();var data=[{title:"Jason from Chicago Illinois",description:"Signed up for free trail.",date:new Date(new Date(now.setMinutes(now.getMinutes()-20))),icon:""},{title:"imomin from Houston Texas",description:"Signed up for free trial",date:new Date(new Date(now.setMinutes(now.getMinutes()-2))),icon:"https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=29.7604,-95.3698"},{title:"Shahir from Edminton Canada",description:"Signed up for free trial",date:new Date(new Date(now.setMinutes(now.getMinutes()-5))),icon:"https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=53.5440,-113.4990"},{title:"Azeem from Clear Lake Texas",description:"Signed up for free trial",date:new Date(new Date(now.setMinutes(now.getMinutes()-8))),icon:"https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=29.5052,-95.0960"},{title:"John from Los Angelies California",description:"Signed up for Pro Plan",date:new Date(new Date(now.setMinutes(now.getMinutes()-12))),icon:"https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=34.05146,-118.254733"}];';
	var jsFile = "var index=0,popNext=function(){index&&index>=data.length&&(index=0);document.getElementById(\"title\").innerHTML=data[index].title,document.getElementById(\"description\").innerHTML=data[index].description,document.getElementById(\"date\").innerHTML=timeSince(data[index].date);var e=document.getElementById(\"map\");e.src=data[index].icon,e.style.opacity=\"1\";var t=document.getElementsByClassName(\"imomin\")[0];t.classList.add(\"animate\"),t.addEventListener(\"animationend\",resetAnimation),t.addEventListener(\"webkitAnimationEnd\",resetAnimation),t.addEventListener(\"oAnimationEnd\",resetAnimation),t.addEventListener(\"MSAnimationEnd\",resetAnimation)},resetAnimation=function(e){\"fade-out\"===e.animationName&&(document.getElementsByClassName(\"imomin\")[0].classList.remove(\"animate\"),setTimeout(function(){index++,popNext()},100))},timeSince=function(e){\"object\"!=typeof e&&(e=new Date(e));var t,n=Math.floor((new Date-e)/1e3),i=Math.floor(n/31536e3);return i>=1?t=\"year\":(i=Math.floor(n/2592e3))>=1?t=\"month\":(i=Math.floor(n/86400))>=1?t=\"day\":(i=Math.floor(n/3600))>=1?t=\"hour\":(i=Math.floor(n/60))>=1?t=\"minute\":(i=n,t=\"second\"),(i>1||0===i)&&(t+=\"s\"),i+\" \"+t+\" ago\"};!function(){var e=setInterval(function(){!document||\"complete\"!==document.readyState&&\"interactive\"!==document.readyState||(document.body.innerHTML+=\"" + cssFile + "<div class=imomin><div class=action><div class=icon><i class=thumbup><img id=map onerror=\\\"this.style.opacity=\\'0\\'\\\" src=\\\"\\\"></i></div><div class=info><div class=title id=title></div><div class=description id=description></div><div class=ago id=date></div></div></div></div>\",clearInterval(e),popNext())},10)}();";
	var response = dataString + jsFile;
	res.set('Content-Type', 'text/javascript');
	res.send(response);
});

app.get('/api/ip', function(req, res){
	var ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
	res.send(ip);
});

app.post('/api/123', function (req, res) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        res.end('ok');
    });
});

app.get('/api/plugin', function (req, res) {
	var script = "function __plugin_() {" +
						"$this = this, this.data = {};" +
						"var postData = this.data;" +
						"function init(clientId) {" +
							"postData.clientId = clientId;" +
							"postData.domain = window.location.hostname;" +
						"}" +
						"function call(method, url, params, cb){" +
							"var params = params || {};" +
							"params = Object.assign(params, postData);" +
							"var xhr = new XMLHttpRequest();" +
							"if ('withCredentials' in xhr) {" +
								// XHR for Chrome/Firefox/Opera/Safari.
								"xhr.open(method, url, true);" +
							"} else if (typeof XDomainRequest != 'undefined') {" +
								// XDomainRequest for IE."
							"	xhr = new XDomainRequest();" +
							"	xhr.open(method, url);" +
							"} else {" +
								// CORS not supported.
							"	xhr = null;" +
							"}" +
							"if (!xhr) {" +
							"	console.log('CORS not supported');" +
							"	return;" +
							"}" +
							// Response handlers.
							"xhr.onload = function() {" +
							"	var text = xhr.responseText;" +
							"	cb && cb(text);" +
								// console.log(text);"
							"};" +
							"xhr.onerror = function(err) {" +
								// alert('Woops, there was an error making the request.');
							"	console.log(err);" +
							"};" +
							// xhr.setRequestHeader("Content-Type", "application/json");
							"xhr.setRequestHeader('Accept', 'application/json');" +
							"method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(params)); " +
						"}" +
						"this.getIPData = function(){" +
						"	call('GET', 'http://localhost:3000/api/ip', {}, function(IP){" +
					    "		$howProof.data.ip = IP;" +
					    "	});" +
						"}," +
					    " this.addProof = function(params) {" +
					    "	params = params || {};" +
					    "	params.timestamp = new Date().getTime();" +
					    "   call('POST','http://localhost:3000/api/123', params);" +
					    "}, this.init = function(code) {" +
					    "    init(code);" +
					    "}" +
					"}" +
					"window.$howProof = new __plugin_;";
	res.set('Content-Type', 'text/javascript');
	// res.sendStatus(200);
	res.send(script);
});

app.listen(port, function(){
  console.log('Node js Express js Tutorial');
});

// <head>
// 	<link href="https://fonts.googleapis.com/css?family=Lato|Roboto:300,400" rel="stylesheet">
//     <style type="text/css">
// 		.imomin {
// 			font-family: 'Roboto', sans-serif;
// 			font-family: 'Lato', sans-serif;
// 			position: fixed;
// 			bottom: 0;
// 			left: 0;
// 			margin: 0px 0px 12px 16px;
// 			transform: translateX(-100%);
// 			-webkit-transform: translateX(-100%);
// 		}
// 		.imomin div.action {
// 			min-width: 260px;
// 			width: fit-content;
// 			height: 70px;
// 			box-shadow: 0px 0px 23px rgba(0,0,0,.2);
// 			margin: 8px 16px 8px 0;
// 			background-color: #fff;
// 			transition: box-shadow .2s,transform .2s;
// 			border-radius: 8px;
// 			border: 1px solid rgba(0,0,0,0.1);
// 			display: flex;
// 			padding: 0 8px;
// 			cursor: pointer;
// 		}
// 		.imomin div.action.curve {
// 			border-radius: 38px;
// 			padding: 0px 15px 0px 3px;
// 		}
// 		.imomin div.action div.icon {
// 		    display: inline-block;
// 		    align-self: center;
// 		}
// 		.imomin div.action div.icon i, .imomin div.action div.icon img {
// 		    height: 60px;
// 		    width: 60px;
// 		    border-radius: 50%
// 		}
// 		.imomin div.action div.icon i, .imomin div.action div.icon img {
// 		    position: relative
// 		}
// 		.imomin div.action div.icon i {/*,.imomin div.action div.icon i:after*/
// 		    display: inline-block;
// 		    width: 60px;
// 		    height: 60px;
// 		    border-radius: 50%;
// 		    background-repeat: no-repeat;
// 		    background-size: 60px;
// 		    transition: opacity .2s;
// 		    background-position: 0 0
// 		}
// 		.imomin div.action div.icon i.thumbup {
// 			background-image: url('data:image/png;base64,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');
// 		}
// 		.imomin div.action div.icon i:after, .imomin div.action div.icon img:after {
// 		    content: "";
// 		    position: absolute;
// 		    top: 0;
// 		    left: 0;
// 		    bottom: 0;
// 		    right: 0;
// 		    opacity: 0;
// 		}
// 		.imomin div.action:hover {
// 		    box-shadow: 0px 0px 23px rgba(0,0,0,.4);
// 		}
// 		.imomin div.action div.info {
// 		    display: inline-block;
// 		    align-self: center;
// 		    margin-left: 7px
// 		}
// 		.imomin div.action div.info .title {
// 			font-weight: 600;
// 		    font-size: .85em;
// 		    line-height: 1.4em;
// 			max-width: 275px;
// 		    text-overflow: ellipsis;
// 		    overflow: hidden;
// 		    white-space: nowrap;
// 		}
// 		.imomin div.action div.info .description, .imomin div.action div.info .ago {
// 			font-size: .8em;
// 		    line-height: 1.3em;
// 		    color: #000;
// 			max-width: 275px;
// 		    text-overflow: ellipsis;
// 		    overflow: hidden;
// 		    white-space: nowrap;
// 		}
// 		.imomin.animate {
// 			opacity: 1;
// 			-webkit-animation: slide-in 2.5s 1.0s 1 ease forwards, fade-out 2s 5.0s 1 ease forwards;
// 			-moz-animation: slide-in 2.5s 1.0s 1 ease forwards, fade-out 2s 5.0s 1 ease forwards;
// 			-ms-animation: slide-in 2.5s 1.0s 1 ease forwards, fade-out 2s 5.0s 1 ease forwards;
// 			-o-animation: slide-in 2.5s 1.0s 1 ease forwards, fade-out 2s 5.0s 1 ease forwards;
// 			animation: slide-in 2.5s 1.0s 1 ease forwards, fade-out 2s 5.0s 1 ease forwards;
// 		}
// 		.imomin.animate:hover {
// 			-webkit-animation-play-state: paused;
// 			-moz-animation-play-state: paused;
// 			-o-animation-play-state: paused;
// 			animation-play-state: paused;
// 		}
// 		@keyframes slide-in {
// 		    100% {transform: translateX(0%);}
// 		}
// 		@-webkit-keyframes slide-in {
// 		    100% {-webkit-transform: translateX(0%);}
// 		}
// 		@keyframes fade-out {
// 			0% { opacity: 1;}
// 			100% { opacity: 0;}
// 		}
// 		@-webkit-keyframes fade-out {
// 			0% { opacity: 1;}
// 			100% { opacity: 0;}
// 		}
// 		@media only screen 
// 		  and (min-device-width: 320px) 
// 		  and (max-device-width: 480px)
// 		  and (-webkit-min-device-pixel-ratio: 2) {
// 		    .imomin {
// 		    	margin: 0px 0px 12px 16px;
// 		        transform: translateY(100%);
// 				-webkit-transform: translateY(100%);
// 		    }
// 		}
//     </style>
//     <script type="text/javascript">
//     var now = new Date();
//     var data = [{'title':'Jason from Chicago Illinois','description':'Signed up for free trail.','date':new Date(new Date(now.setMinutes(now.getMinutes()-20))), icon:''},{'title':'imomin from Houston Texas','description':'Signed up for free trial','date':new Date(new Date(now.setMinutes(now.getMinutes()-2))), icon:'https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=29.7604,-95.3698'},
//     			{'title':'Shahir from Edminton Canada','description':'Signed up for free trial','date':new Date(new Date(now.setMinutes(now.getMinutes()-5))), icon:'https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=53.5440,-113.4990'},
//     			{'title':'Azeem from Clear Lake Texas','description':'Signed up for free trial','date':new Date(new Date(now.setMinutes(now.getMinutes()-8))), icon:'https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=29.5052,-95.0960'},
//     			{'title':'John from Los Angelies California','description':'Signed up for Pro Plan','date':new Date(new Date(now.setMinutes(now.getMinutes()-12))), icon:'https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=34.05146,-118.254733'}];
//     			//https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=92x92&scale=3&center=41.8755,-87.6320
//     var index = 0;
//    	var popNext = function() {
//    		if(index && index >= data.length) {
// 				index = 0;
// 			}

//         var title = document.getElementById('title').innerHTML = data[index].title;
//         var description = document.getElementById('description').innerHTML = data[index].description;
//         var time = document.getElementById('date').innerHTML = timeSince(data[index].date);

//         var map = document.getElementById('map');
//         map.src = data[index].icon;
//         map.style.opacity='1';

//         var container = document.getElementsByClassName('imomin')[0];
//         container.classList.add('animate');
//         container.addEventListener('animationend', resetAnimation);
//         container.addEventListener('webkitAnimationEnd', resetAnimation);
//         container.addEventListener('oAnimationEnd', resetAnimation);
//         container.addEventListener('MSAnimationEnd', resetAnimation);
// 	}
// 	var resetAnimation = function(event){
// 		if(event.animationName === 'fade-out') {
// 			document.getElementsByClassName('imomin')[0].classList.remove('animate');
// 			setTimeout(function(){
// 				index++;
// 				popNext();
// 			},100);
// 		}
// 	}
//     var timeSince = function(date) {
// 		if (typeof date !== 'object') {
// 			date = new Date(date);
// 		}
// 		var seconds = Math.floor((new Date() - date) / 1000);
// 		var intervalType;
// 		var interval = Math.floor(seconds / 31536000);
// 		if (interval >= 1) {
// 			intervalType = 'year';
// 		} else {
// 			interval = Math.floor(seconds / 2592000);
// 			if (interval >= 1) {
// 			  intervalType = 'month';
// 			} else {
// 			  interval = Math.floor(seconds / 86400);
// 			  if (interval >= 1) {
// 			    intervalType = 'day';
// 			  } else {
// 			    interval = Math.floor(seconds / 3600);
// 			    if (interval >= 1) {
// 			      intervalType = "hour";
// 			    } else {
// 			      interval = Math.floor(seconds / 60);
// 			      if (interval >= 1) {
// 			        intervalType = "minute";
// 			      } else {
// 			        interval = seconds;
// 			        intervalType = "second";
// 			      }
// 			    }
// 			  }
// 			}
// 		}
// 		if (interval > 1 || interval === 0) {
// 			intervalType += 's';
// 		}
// 		return interval + ' ' + intervalType + ' ' + 'ago';
// 	};
// 	(function() {
// 	  var isReady = setInterval(function() {
// 	    if (document && (document.readyState === 'complete' || document.readyState === 'interactive')) { // Or 'interactive'
// 	      document.body.innerHTML += "<div class=imomin><div class=action><div class=icon><i class=thumbup><img id=map onerror='this.style.opacity=\"0\"'src=\"\"></i></div><div class=info><div class=title id=title></div><div class=description id=description></div><div class=ago id=date></div></div></div></div>";
// 	      clearInterval(isReady);
// 	      popNext();
// 	    }
// 	  }, 10);
// 	})();
//     </script>
// </head>


// <script type="text/javascript">
// 	function __plugin_() {
// 		$this = this, this.data = {};
// 		var postData = this.data;
// 		function init(clientId) {
// 			postData.clientId = clientId;
// 			postData.domain = window.location.hostname;
// 		}
// 		function call(method, url, params, cb){
// 			var params = params || {};
// 			params = Object.assign(params, postData);
// 			var xhr = new XMLHttpRequest();
// 			if ("withCredentials" in xhr) {
// 				// XHR for Chrome/Firefox/Opera/Safari.
// 				xhr.open(method, url, true);
// 			} else if (typeof XDomainRequest != "undefined") {
// 				// XDomainRequest for IE.
// 				xhr = new XDomainRequest();
// 				xhr.open(method, url);
// 			} else {
// 				// CORS not supported.
// 				xhr = null;
// 			}
// 			if (!xhr) {
// 				alert('CORS not supported');
// 				return;
// 			}
// 			// Response handlers.
// 			xhr.onload = function() {
// 				var text = xhr.responseText;
// 				cb && cb(text);
// 				// console.log(text);
// 			};
// 			xhr.onerror = function(err) {
// 				alert('Woops, there was an error making the request.');
// 				console.log(err);
// 			};
// 			// xhr.setRequestHeader("Content-Type", "application/json");
// 			xhr.setRequestHeader('Accept', 'application/json');
// 			method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(params)); 
// 		}
// 		function getIPData(){
// 			call('GET', 'https://api.ipdata.co/', {}, function(data){
// 	    		$howProof.data = Object.assign($howProof.data,JSON.parse(data));
// 	    	});
// 		}
// 	    this.addProof = function(params) {
// 	    	params = params || {};
// 	    	params.timestamp = new Date().getTime();
// 	        call('POST','',params);
// 	    }, this.init = function(code) {
// 	        init(code);
// 	    }
// 	}
// 	window.$howProof = new __plugin_;
// </script>
