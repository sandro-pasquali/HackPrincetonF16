/**
 * @file myScript.js
 * Script to analyze Facebook feed;
 *
 * @author Mark Craft, Qinglin Chen
 * @date Fall 2016
 */

var feeds = new Set();

(function(document) {

/**
 * Http request to fbserve.herokuapp.com.
 *
 * @param the text or url to send to the server.
 */
function httpGet(input) {

	var server = "https://fbserve.herokuapp.com/";
	var theUrl = "https://api.wordnik.com/v4/word.json/javascript/";
	//var theUrl = server+"?content="+"\""+input+"\"";
	
	fetch(theUrl).then(function(res)
		{ return res.text(); }).then(function(text)
		{ console.log(text);});

}

/**
 * Receive each Facebook post and analyze texts, urls, pics for validity.
 * Refreshes every second.
 *
 */
setInterval(function() {

	var test = document.getElementsByClassName('_4-u2 mbm _5v3q _4-u8');

	for(var i=0; i<test.length; i++) {

		var data = test[i];

		// Check if feed needs to be modified

		if(!feeds.has(data)) {
			feeds.add(data);

			// Send server requests

			var shared = test[i].querySelector('._52c6');
			if(shared != null && shared.href!=undefined)
				httpGet(shared.href);

			var text = test[i].querySelector('._5pbx.userContent');
			if(text != null && text.textContent!=undefined)
				httpGet(text.textContent);

			var picComment = test[i].querySelector('.uiScaledImageContainer._4-ep');
			if(picComment != null && picComment.src!=undefined)
				httpGet(picComment.src);

			var picPost = test[i].querySelector('._46-h _517g');
			if(picPost != null && picPost.src!=undefined)
				httpGet(picPost.src);

			// Add indication for validity

			var div = document.createElement('div');
			data.appendChild(div);
			div.innerHTML = 'TEST';
			div.style = "front-weight:bold; padding: 3px;color:red; position:absolute; top: 10px; right: 30px; background: #3b5998"

		} else {
			//console.log("have feed");
		}
	}

}, 1000);
	
})(document);