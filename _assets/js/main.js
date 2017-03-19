const istouch = ( !!('ontouchstart' in window)) ? 'touchstart' : 'click';

// https://github.com/christian-fei/Simple-Jekyll-Search
// !function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function fuzzysearch(needle,haystack){var tlen=haystack.length,qlen=needle.length;if(qlen>tlen)return!1;if(qlen===tlen)return needle===haystack;outer:for(var i=0,j=0;i<qlen;i++){for(var nch=needle.charCodeAt(i);j<tlen;)if(haystack.charCodeAt(j++)===nch)continue outer;return!1}return!0}module.exports=fuzzysearch},{}],2:[function(require,module,exports){"use strict";function load(location,callback){var xhr=getXHR();xhr.open("GET",location,!0),xhr.onreadystatechange=createStateChangeListener(xhr,callback),xhr.send()}function createStateChangeListener(xhr,callback){return function(){if(4===xhr.readyState&&200===xhr.status)try{callback(null,JSON.parse(xhr.responseText))}catch(err){callback(err,null)}}}function getXHR(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}module.exports={load:load}},{}],3:[function(require,module,exports){"use strict";module.exports=function OptionsValidator(params){function validateParams(params){return!!params&&(void 0!==params.required&&params.required instanceof Array)}if(!validateParams(params))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof OptionsValidator))return new OptionsValidator(params);var requiredOptions=params.required;this.getRequiredOptions=function(){return requiredOptions},this.validate=function(parameters){var errors=[];return requiredOptions.forEach(function(requiredOptionName){void 0===parameters[requiredOptionName]&&errors.push(requiredOptionName)}),errors}}},{}],4:[function(require,module,exports){"use strict";function put(data){return isObject(data)?addObject(data):isArray(data)?addArray(data):void 0}function clear(){return data.length=0,data}function get(){return data}function isObject(obj){return!!obj&&"[object Object]"===Object.prototype.toString.call(obj)}function isArray(obj){return!!obj&&"[object Array]"===Object.prototype.toString.call(obj)}function addObject(_data){return data.push(_data),data}function addArray(_data){for(var added=[],i=0;i<_data.length;i++)isObject(_data[i])&&added.push(addObject(_data[i]));return added}function search(crit){return crit?findMatches(data,crit,opt.searchStrategy,opt):[]}function setOptions(_opt){opt=_opt||{},opt.fuzzy=_opt.fuzzy||!1,opt.limit=_opt.limit||10,opt.searchStrategy=_opt.fuzzy?FuzzySearchStrategy:LiteralSearchStrategy}function findMatches(data,crit,strategy,opt){for(var matches=[],i=0;i<data.length&&matches.length<opt.limit;i++){var match=findMatchesInObject(data[i],crit,strategy,opt);match&&matches.push(match)}return matches}function findMatchesInObject(obj,crit,strategy,opt){for(var key in obj)if(!isExcluded(obj[key],opt.exclude)&&strategy.matches(obj[key],crit))return obj}function isExcluded(term,excludedTerms){var excluded=!1;excludedTerms=excludedTerms||[];for(var i=0;i<excludedTerms.length;i++){var excludedTerm=excludedTerms[i];!excluded&&new RegExp(term).test(excludedTerm)&&(excluded=!0)}return excluded}module.exports={put:put,clear:clear,get:get,search:search,setOptions:setOptions};var FuzzySearchStrategy=require("./SearchStrategies/FuzzySearchStrategy"),LiteralSearchStrategy=require("./SearchStrategies/LiteralSearchStrategy"),data=[],opt={};opt.fuzzy=!1,opt.limit=10,opt.searchStrategy=opt.fuzzy?FuzzySearchStrategy:LiteralSearchStrategy},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(require,module,exports){"use strict";function FuzzySearchStrategy(){this.matches=function(string,crit){return fuzzysearch(crit,string)}}var fuzzysearch=require("fuzzysearch");module.exports=new FuzzySearchStrategy},{fuzzysearch:1}],6:[function(require,module,exports){"use strict";function LiteralSearchStrategy(){this.matches=function(string,crit){return"string"==typeof string&&(string=string.trim(),string.toLowerCase().indexOf(crit.toLowerCase())>=0)}}module.exports=new LiteralSearchStrategy},{}],7:[function(require,module,exports){"use strict";function setOptions(_options){options.pattern=_options.pattern||options.pattern,options.template=_options.template||options.template,"function"==typeof _options.middleware&&(options.middleware=_options.middleware)}function compile(data){return options.template.replace(options.pattern,function(match,prop){var value=options.middleware(prop,data[prop],options.template);return void 0!==value?value:data[prop]||match})}module.exports={compile:compile,setOptions:setOptions};var options={};options.pattern=/\{(.*?)\}/g,options.template="",options.middleware=function(){}},{}],8:[function(require,module,exports){!function(window,document,undefined){"use strict";function initWithJSON(json){repository.put(json),registerInput()}function initWithURL(url){jsonLoader.load(url,function(err,json){err&&throwError("failed to get JSON ("+url+")"),initWithJSON(json)})}function emptyResultsContainer(){options.resultsContainer.innerHTML=""}function appendToResultsContainer(text){options.resultsContainer.innerHTML+=text}function registerInput(){options.searchInput.addEventListener("keyup",function(e){emptyResultsContainer();var key=e.which,query=e.target.value;isWhitelistedKey(key)&&isValidQuery(query)&&render(repository.search(query))})}function render(results){if(0===results.length)return appendToResultsContainer(options.noResultsText);for(var i=0;i<results.length;i++)appendToResultsContainer(templater.compile(results[i]))}function isValidQuery(query){return query&&query.length>0}function isWhitelistedKey(key){return[13,16,20,37,38,39,40,91].indexOf(key)===-1}function throwError(message){throw new Error("SimpleJekyllSearch --- "+message)}var options={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},requiredOptions=["searchInput","resultsContainer","json"],templater=require("./Templater"),repository=require("./Repository"),jsonLoader=require("./JSONLoader"),optionsValidator=require("./OptionsValidator")({required:requiredOptions}),utils=require("./utils");window.SimpleJekyllSearch=function(_options){var errors=optionsValidator.validate(_options);errors.length>0&&throwError("You must specify the following required options: "+requiredOptions),options=utils.merge(options,_options),templater.setOptions({template:options.searchResultTemplate,middleware:options.templateMiddleware}),repository.setOptions({fuzzy:options.fuzzy,limit:options.limit}),utils.isJSON(options.json)?initWithJSON(options.json):initWithURL(options.json)},window.SimpleJekyllSearch.init=window.SimpleJekyllSearch,"function"==typeof window.SimpleJekyllSearchInit&&window.SimpleJekyllSearchInit.call(this,window.SimpleJekyllSearch)}(window,document)},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(require,module,exports){"use strict";function merge(defaultParams,mergeParams){var mergedOptions={};for(var option in defaultParams)mergedOptions[option]=defaultParams[option],void 0!==mergeParams[option]&&(mergedOptions[option]=mergeParams[option]);return mergedOptions}function isJSON(json){try{return!!(json instanceof Object&&JSON.parse(JSON.stringify(json)))}catch(e){return!1}}module.exports={merge:merge,isJSON:isJSON}},{}]},{},[8]);

// SimpleJekyllSearch({
//   searchInput: document.getElementById('search-input'),
//   resultsContainer: document.getElementById('results-container'),
//   json: '/search.json',
//   noResultsText: "<p class='search-no-result-text'>По вашему запросу не найденно результатов</p>"
// })

// document.getElementById("search-open").onclick = function() {
//     document.getElementById("search-overlay").style.display = "block";
// }

// document.getElementById("search-overlay").onclick = function() {
//     document.getElementById("search-overlay").style.display = "none";
// }

// document.getElementById("search-wrapper").onclick = function(e) {
//     e.stopPropagation()
// }

// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     var isEscape = false;
//     if ("key" in evt) {
//         isEscape = evt.key == "Escape";
//     } else {
//         isEscape = evt.keyCode == 27;
//     }
//     if (isEscape) {
//         document.getElementById("search-overlay").style.display = "none";
//     }
// };

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

//подстраиваем кнопку "наверх" под размер окна
function modern_upbutton_resize(){
  var ourwidth_screen = $(window).width(); // взяли ширину окна
  if(ourwidth_screen >= 1007) { // здесь и ниже число пикселей будет вашим, так как зависит от ширины сайта
    $('.modern-upbutton').css('width', (ourwidth_screen-1000)/2); // окно большое, подогнали под размер
    smallscreen = false;
  } else if (ourwidth_screen >= 955) {
    $('.modern-upbutton').addClass('its-a-mobile-modern-upbutton'); // маленькое окно или планшет
    smallscreen = false;
  } else {
    smallscreen = true; // окно настолько мало, что места для кнопки просто нет, прячем её
    $('.modern-upbutton').hide();
  }
}

//при изменении юзером размеров окна подстраиваем кнопку под новый масштаб
$(window).resize(function(){
  modern_upbutton_resize();
});

//обработка клика по кнопке наверх - прокрутка вверх
function modern_upbutton_click_scrollup() {
  $('.modern-upbutton').attr('data-pos',$(window).scrollTop()); // запоминаем место, от которого проматываем наверх
  $("body,html").animate({scrollTop: 0}, 500); // прокрутка к началу
  setTimeout(function(){
    // меняем значение флажка "направление стрелки", теперь по следующему клику прокрутка пойдёт вниз
    $('.modern-upbutton').attr('data-scroll', 'down');
  }, 501);
  return false;
}

//обработка клика по кнопке наверх - прокрутка вниз
function modern_upbutton_click_scrolldown() {
  pos_to_scroll = $('.modern-upbutton').attr('data-pos'); // читаем позицию, до которой проматываем
  $('.modern-upbutton').attr('data-pos',0); // обнуляем её
  $("body,html").animate({scrollTop: pos_to_scroll}, 500); // скроллим вниз
  setTimeout(function(){
    $('.modern-upbutton').attr('data-scroll', 'up'); // меняем направление стрелочки на "вверх"
  }, 501);
  return false;
}

//управление показом и скрытием стрелки
$(window).scroll(function() {
  if(smallscreen == false && window.modern_upbutton_was_killed != true) {
    if($(window).scrollTop() >= 300) {  // если прокрутили уже 300 пикселей...
      $('.modern-upbutton').attr('data-scroll', 'up');
      $('.modern-upbutton').fadeIn(300); // показываем кнопку
    } else if ($('.modern-upbutton').attr('data-pos') == "0") {  // если верх страницы...
      if ($('.modern-upbutton').attr('data-scroll') == 'up') {
        $('.modern-upbutton').fadeOut(300); // скрываем её
      }
    }
  }
});

//функция удаления кнопки пользователем
function modern_upbutton_disable(){
  // берём сутки от текущего времени и даты
  var date = new Date(new Date().getTime() + 60*1000*60*24);

  // устанавливаем куку на сутки. По истечении этого времени кнопка появится снова.
  document.cookie="modern_upbutton_disable_by_user=1; path=/; expires="+date.toUTCString();
  $('.modern-upbutton').addClass('modern-upbutton-was-disabled'); // ставим класс "выключено"
}

//функция проверки куки по её имени
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//проверяем, не удалял ли юзер кнопку
function modern_upbutton_check_for_disable(){
  var cookcheck = getCookie('modern_upbutton_disable_by_user');  // ищем куку
  if (cookcheck != undefined) { // если нашли...
    $('.modern-upbutton').addClass('modern-upbutton-was-disabled'); // убиваем её
    window.modern_upbutton_was_killed = true;
  }
}

$(function() {

  //проверяем, не удалена ли кнопка
  modern_upbutton_check_for_disable();

  //подгоняем её под окно
  modern_upbutton_resize();

  //вешаем следилку на событие "клик по кнопке"
  $('.modern-upbutton').bind("click touch ontouchstart", function(e){
    if ($(event.target).closest(".modern-upbutton-disable").length) return;
      if ($(this).attr('data-scroll') == 'up') {
      modern_upbutton_click_scrollup();  // крутим вверх
    } else {
      modern_upbutton_click_scrolldown(); // крутим вниз
    }
    event.stopPropagation();
  });

  //вешаем следилку на событие "клик по кнопке Удалить"
  $('.modern-upbutton-disable').click(function(){
    modern_upbutton_disable(); // убиваем кнопку
  });
});

function goToByScroll(id){
  $('html,body').animate({
    scrollTop: $(id).offset().top - 80,
  }, 'slow');
}

$(function() {
  if ($('#markdown-toc').length) {
    $("#markdown-toc a").on("click", function(e){
    	e.preventDefault();
    	goToByScroll($(this).attr("href"));
    })
  }
});

$(() => {
  function clearMobileClasses() {
    $('.off-canvas-wrapper-inner')
      .removeClass('is-off-canvas-open')
      .removeClass('is-open-right')
      .removeClass('is-open-left');

    $('.off-canvas.position-left')
      .removeClass('is-open');

    $('.off-canvas.position-right')
      .removeClass('is-open');
  }

  $('.header-hamburger').on(istouch, function hamburgerClickCallback() {
    clearMobileClasses();

    const targetAction = $(this).data('show');
    const offCanvasWrapperInner = $('.off-canvas-wrapper-inner');

    if (targetAction === 'left') {
      offCanvasWrapperInner
        .addClass('is-off-canvas-open')
        .addClass('is-open-left');

      $('.off-canvas.position-left')
        .addClass('is-open');
    } else {
      offCanvasWrapperInner
        .addClass('is-off-canvas-open')
        .addClass('is-open-right');

      $('.off-canvas.position-right')
        .addClass('is-open');
    }
  });

  $('.js-off-canvas-exit').on(istouch, function offCanvasExitClickCallback() {
    clearMobileClasses();
  });

  $(window).resize(() => {
    if ($(window).width() > 768) {
      clearMobileClasses();
    }
  });
});
