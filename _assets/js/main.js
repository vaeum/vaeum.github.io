// https://github.com/christian-fei/Simple-Jekyll-Search
!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function fuzzysearch(needle,haystack){var tlen=haystack.length,qlen=needle.length;if(qlen>tlen)return!1;if(qlen===tlen)return needle===haystack;outer:for(var i=0,j=0;i<qlen;i++){for(var nch=needle.charCodeAt(i);j<tlen;)if(haystack.charCodeAt(j++)===nch)continue outer;return!1}return!0}module.exports=fuzzysearch},{}],2:[function(require,module,exports){"use strict";function load(location,callback){var xhr=getXHR();xhr.open("GET",location,!0),xhr.onreadystatechange=createStateChangeListener(xhr,callback),xhr.send()}function createStateChangeListener(xhr,callback){return function(){if(4===xhr.readyState&&200===xhr.status)try{callback(null,JSON.parse(xhr.responseText))}catch(err){callback(err,null)}}}function getXHR(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}module.exports={load:load}},{}],3:[function(require,module,exports){"use strict";module.exports=function OptionsValidator(params){function validateParams(params){return!!params&&(void 0!==params.required&&params.required instanceof Array)}if(!validateParams(params))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof OptionsValidator))return new OptionsValidator(params);var requiredOptions=params.required;this.getRequiredOptions=function(){return requiredOptions},this.validate=function(parameters){var errors=[];return requiredOptions.forEach(function(requiredOptionName){void 0===parameters[requiredOptionName]&&errors.push(requiredOptionName)}),errors}}},{}],4:[function(require,module,exports){"use strict";function put(data){return isObject(data)?addObject(data):isArray(data)?addArray(data):void 0}function clear(){return data.length=0,data}function get(){return data}function isObject(obj){return!!obj&&"[object Object]"===Object.prototype.toString.call(obj)}function isArray(obj){return!!obj&&"[object Array]"===Object.prototype.toString.call(obj)}function addObject(_data){return data.push(_data),data}function addArray(_data){for(var added=[],i=0;i<_data.length;i++)isObject(_data[i])&&added.push(addObject(_data[i]));return added}function search(crit){return crit?findMatches(data,crit,opt.searchStrategy,opt):[]}function setOptions(_opt){opt=_opt||{},opt.fuzzy=_opt.fuzzy||!1,opt.limit=_opt.limit||10,opt.searchStrategy=_opt.fuzzy?FuzzySearchStrategy:LiteralSearchStrategy}function findMatches(data,crit,strategy,opt){for(var matches=[],i=0;i<data.length&&matches.length<opt.limit;i++){var match=findMatchesInObject(data[i],crit,strategy,opt);match&&matches.push(match)}return matches}function findMatchesInObject(obj,crit,strategy,opt){for(var key in obj)if(!isExcluded(obj[key],opt.exclude)&&strategy.matches(obj[key],crit))return obj}function isExcluded(term,excludedTerms){var excluded=!1;excludedTerms=excludedTerms||[];for(var i=0;i<excludedTerms.length;i++){var excludedTerm=excludedTerms[i];!excluded&&new RegExp(term).test(excludedTerm)&&(excluded=!0)}return excluded}module.exports={put:put,clear:clear,get:get,search:search,setOptions:setOptions};var FuzzySearchStrategy=require("./SearchStrategies/FuzzySearchStrategy"),LiteralSearchStrategy=require("./SearchStrategies/LiteralSearchStrategy"),data=[],opt={};opt.fuzzy=!1,opt.limit=10,opt.searchStrategy=opt.fuzzy?FuzzySearchStrategy:LiteralSearchStrategy},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(require,module,exports){"use strict";function FuzzySearchStrategy(){this.matches=function(string,crit){return fuzzysearch(crit,string)}}var fuzzysearch=require("fuzzysearch");module.exports=new FuzzySearchStrategy},{fuzzysearch:1}],6:[function(require,module,exports){"use strict";function LiteralSearchStrategy(){this.matches=function(string,crit){return"string"==typeof string&&(string=string.trim(),string.toLowerCase().indexOf(crit.toLowerCase())>=0)}}module.exports=new LiteralSearchStrategy},{}],7:[function(require,module,exports){"use strict";function setOptions(_options){options.pattern=_options.pattern||options.pattern,options.template=_options.template||options.template,"function"==typeof _options.middleware&&(options.middleware=_options.middleware)}function compile(data){return options.template.replace(options.pattern,function(match,prop){var value=options.middleware(prop,data[prop],options.template);return void 0!==value?value:data[prop]||match})}module.exports={compile:compile,setOptions:setOptions};var options={};options.pattern=/\{(.*?)\}/g,options.template="",options.middleware=function(){}},{}],8:[function(require,module,exports){!function(window,document,undefined){"use strict";function initWithJSON(json){repository.put(json),registerInput()}function initWithURL(url){jsonLoader.load(url,function(err,json){err&&throwError("failed to get JSON ("+url+")"),initWithJSON(json)})}function emptyResultsContainer(){options.resultsContainer.innerHTML=""}function appendToResultsContainer(text){options.resultsContainer.innerHTML+=text}function registerInput(){options.searchInput.addEventListener("keyup",function(e){emptyResultsContainer();var key=e.which,query=e.target.value;isWhitelistedKey(key)&&isValidQuery(query)&&render(repository.search(query))})}function render(results){if(0===results.length)return appendToResultsContainer(options.noResultsText);for(var i=0;i<results.length;i++)appendToResultsContainer(templater.compile(results[i]))}function isValidQuery(query){return query&&query.length>0}function isWhitelistedKey(key){return[13,16,20,37,38,39,40,91].indexOf(key)===-1}function throwError(message){throw new Error("SimpleJekyllSearch --- "+message)}var options={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},requiredOptions=["searchInput","resultsContainer","json"],templater=require("./Templater"),repository=require("./Repository"),jsonLoader=require("./JSONLoader"),optionsValidator=require("./OptionsValidator")({required:requiredOptions}),utils=require("./utils");window.SimpleJekyllSearch=function(_options){var errors=optionsValidator.validate(_options);errors.length>0&&throwError("You must specify the following required options: "+requiredOptions),options=utils.merge(options,_options),templater.setOptions({template:options.searchResultTemplate,middleware:options.templateMiddleware}),repository.setOptions({fuzzy:options.fuzzy,limit:options.limit}),utils.isJSON(options.json)?initWithJSON(options.json):initWithURL(options.json)},window.SimpleJekyllSearch.init=window.SimpleJekyllSearch,"function"==typeof window.SimpleJekyllSearchInit&&window.SimpleJekyllSearchInit.call(this,window.SimpleJekyllSearch)}(window,document)},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(require,module,exports){"use strict";function merge(defaultParams,mergeParams){var mergedOptions={};for(var option in defaultParams)mergedOptions[option]=defaultParams[option],void 0!==mergeParams[option]&&(mergedOptions[option]=mergeParams[option]);return mergedOptions}function isJSON(json){try{return!!(json instanceof Object&&JSON.parse(JSON.stringify(json)))}catch(e){return!1}}module.exports={merge:merge,isJSON:isJSON}},{}]},{},[8]);

SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  noResultsText: "<p class='search-no-result-text'>По вашему запросу не найденно результатов</p>"
})

document.getElementById("search-open").onclick = function() {
    document.getElementById("search-overlay").style.display = "block";
}

document.getElementById("search-overlay").onclick = function() {
    document.getElementById("search-overlay").style.display = "none";
}

document.getElementById("search-wrapper").onclick = function(e) {
    e.stopPropagation()
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = evt.key == "Escape";
    } else {
        isEscape = evt.keyCode == 27;
    }
    if (isEscape) {
        document.getElementById("search-overlay").style.display = "none";
    }
};

document.getElementById('footer-date').innerHTML = new Date().getFullYear();

var Share = {
  vk: function(purl, ptitle, pimg, text) {
    url  = 'http://vkontakte.ru/share.php?';
    url += 'url='          + encodeURIComponent(purl);
    url += '&title='       + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&image='       + encodeURIComponent(pimg);
    url += '&noparse=true';
    Share.popup(url);
  },
  ok: function(purl, text) {
    url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
    url += '&st.comments=' + encodeURIComponent(text);
    url += '&st._surl='    + encodeURIComponent(purl);
    Share.popup(url);
  },
  fb: function(purl, ptitle, pimg, text) {
    url  = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]='     + encodeURIComponent(ptitle);
    url += '&p[summary]='   + encodeURIComponent(text);
    url += '&p[url]='       + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    Share.popup(url);
  },
  tw: function(purl, ptitle) {
    url  = 'http://twitter.com/share?';
    url += 'text='      + encodeURIComponent(ptitle);
    url += '&url='      + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    Share.popup(url);
  },
  mailru: function(purl, ptitle, pimg, text) {
    url  = 'http://connect.mail.ru/share?';
    url += 'url='          + encodeURIComponent(purl);
    url += '&title='       + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&imageurl='    + encodeURIComponent(pimg);
    Share.popup(url)
  },
  li: function(purl, ptitle, psummary) {
    url =  'http://www.linkedin.com/shareArticle?mini=true';
    url += '&url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&summary=' + encodeURIComponent(psummary);
    Share.popup(url)
  },

  popup: function(url) {
    window.open(url,'','toolbar=0,status=0,width=626,height=436');
  }
};

$(function() {
  var elements = document.querySelectorAll("img");
  Array.prototype.forEach.call(elements, function(el, i){
    el.setAttribute("onerror", "this.src='/images/notfound.jpg'")
  });
});

