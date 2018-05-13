/*
 * @Author: yyl 
 * @Date: 2018-05-04 20:37:02 
 * @Last Modified by:   yiyulong
 * @Last Modified time: 2018-05-11 22:55:47
 */

//  动画效果执行一次
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };
      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));
    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
      if (typeof callback === 'function') callback();
    });
    return this;
  }
});
!(function (win, doc) {
  function setFontSize() {
    // 获取window 宽度
    var winWidth = window.innerWidth;
    let bgW = $(window).width();
    let bgH = $(window).height();
    $('body').css({ "width": bgW, "height": bgH })
    // 640宽度以上进行限制 需要css进行配合
    var size = (winWidth / 640) * 100;
    doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
  }
  var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
  var timer = null;
  win.addEventListener(evt, function () {
    clearTimeout(timer);
    timer = setTimeout(setFontSize, 60);
  }, false);
  win.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      clearTimeout(timer);
      timer = setTimeout(setFontSize, 60);
    }
  }, false);
  // 初始化
  setFontSize();
}(window, document));
var queue;
// 动画结束
var animationEnd = (function (el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };
  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));
// loading加载图片资源
var preLoad = function () {
  queue = new createjs.LoadQueue(false);
  queue.loadManifest([
    // 背景图片
    { id: 'box1', src: 'box_green.svg' },
    { id: 'box2', src: 'x_box.svg' },
    { id: 'box3', src: 'box_orange.svg' },
    { id: 'box4', src: 'box_pink.svg' },
    // 页面素材
    { id: 'bird_purple', src: 'bird_purple.png' },
    { id: 'dialog_box', src: 'dialog_box.gif' },
    { id: 'person1', src: 'person1.png' },
    { id: 'person2', src: 'person2.png' },
    { id: 'person3', src: 'person3.png' },
    { id: 'person4', src: 'person4.png' },
    { id: 'person5', src: 'person5.png' },
    { id: 'person6', src: 'person6.png' },
    { id: 'person7', src: 'person7.png' },
    { id: 'person8', src: 'person8.png' },
    { id: 'person9', src: 'person9.png' },
    { id: 'inputBox1', src: 'draw.svg' },
    { id: 'inputBox2', src: 'lamp_dark.png' },
    { id: 'inputBox3', src: 'lamp_light.png' },
    { id: 'mouse', src: 'mouse.svg' },
    { id: 'text1', src: 'message1.svg' },
    { id: 'text2', src: 'message2.svg' },
    { id: 'text3', src: 'message3.svg' },
    { id: 'dialog_box1', src: 'dialog_box1.gif' },
    { id: 'bird_red', src: 'bird_red.png' },
    { id: 'guitar', src: 'guitar.png' },
    { id: 'sunglasses', src: 'sunglasses.png' },
    { id: 'lamp_light1', src: 'lamp_light1.png' },
  ], true, "image/");
  queue.on("progress", loadFileProgress);
  queue.on("complete", loadComplete);
}
//全度资源加载完毕
function loadComplete(event) {
  console.log("已加载完毕全部资源");
  bgAnimate()
}
//已加进度
function loadFileProgress (event) {
  console.log("已加载 " + (queue.progress * 100 | 0) + "%");
  $('.loading_text').text((queue.progress * 100 | 0) + "%");
}
// 背景动画执行
function bgAnimate () {
  // 背景立方体容器
  let bg_box = $('.h_bg');
  // 移除加载页面
  $('.h_loading').remove();
  $('.h_head').remove();
  // 图片路径替换
  $('img').each(function () {
    $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
  });
  // 立方体进入效果
  bg_box.addClass('box_enter');
  setTimeout(() => {
    bg_box.removeClass('box_enter').addClass('box_shake');
  }, 600);
  setTimeout(() => {
    pageplay('.page1')
  }, 800);
}
// pageplay
function pageplay (el) {
  $(el).siblings().attr('style', 'display: none;').end().attr('style', 'display: block;')
}
$('.page1 .go').on('click', function () {
  pageplay('.page2')
})
$('.page2 .go').on('click', function () {
  pageplay('.page3')
})
console.log('gulp')