/*
 * @Author: yyl 
 * @Date: 2018-05-04 20:37:02 
 * @Last Modified by: yyl
 * @Last Modified time: 2018-05-17 19:01:08
 */

//  动画效果执行一次
// $.fn.extend({
//   animateCss: function (animationName, callback) {
//     var animationEnd = (function (el) {
//       var animations = {
//         animation: 'animationend',
//         OAnimation: 'oAnimationEnd',
//         MozAnimation: 'mozAnimationEnd',
//         WebkitAnimation: 'webkitAnimationEnd',
//       };
//       for (var t in animations) {
//         if (el.style[t] !== undefined) {
//           return animations[t];
//         }
//       }
//     })(document.createElement('div'));
//     this.addClass('animated ' + animationName).one(animationEnd, function () {
//       $(this).removeClass('animated ' + animationName);
//       if (typeof callback === 'function') callback();
//     });
//     return this;
//   }
// });
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
    { id: 'page3_bg', src: 'page3_bg.jpg' },
    { id: 'page3_dnp', src: 'page3_dpn.png' },
    { id: 'page3_mby', src: 'page3_mby.png'},
    { id: 'page3_wsl', src: 'page3_wsl.png' },
    { id: 'page3_gd', src: 'page3_gd.png' },
    { id: 'page3_chy', src: 'page3_chy.png' },
    { id: 'page4_bird', src: 'page4_bird.png' },
    { id: 'page4_lamp', src: 'page4_lamp.png' },
    { id: 'page4_box', src: 'page4_box.gif'},
    { id: 'page6_box', src: 'page6_box.png' },
    { id: 'page6_boxred', src: 'page6_boxred.png' },
    { id: 'page6_boxorange', src: 'page6_boxorange.png' },
    { id: 'page6_boxblue', src: 'page6_boxblue.png' },
    { id: 'page6_box2', src: 'page6_box2.png' },
    { id: 'page6_bird', src: 'page6_bird.png' },
    { id: 'page6_text', src: 'page6_text.gif' },
    { id: 'page7_bg', src: 'page7_bg.png' },
    { id: 'page8_bird', src: 'page8_bird.png' },
    { id: 'page8_lamp', src: 'page8_lamp.png' },
    { id: 'page8_text', src: 'page8_text.gif' }
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
  $(el).siblings().css('display', 'none').end().css('display', 'block');
}
$('body').height($(window).height())
$('.page1 .go').on('click', function () {
  let user = $('.page1 input').val()
  if (user) pageplay('.page2')
  $('.user').text(user)
})
$('.page2 .go').on('click', function () {
  pageplay('.page3')
})
$('.page3 .go').on('click', function () {
  pageplay('.page4')
})
$('.page4 .go').on('click', function () {
  pageplay('.page6')
})
$('.page6 .go').on('click', function () {
  pageplay('.page7')
})
$('.page7 .go').on('click', function () {
  pageplay('.page8')
})
$('.take_gift .next').on('click', function () {
  // $('.take_gift').css('display', 'none')
  // $('.make').css('display', 'block')
  $('.take_gift').addClass('active')
  setTimeout(() => {
    $('.take_gift').css('display', 'none')
    $('.make').css('display', 'block')
  }, 500);
})
$('.page8 .share').on('click', function () {
  pageplay('.page9')
})
var actorNo = 0;
$('.actor').on('click', function () {
  let flag = $(this).hasClass('active');
  // if (actorNo == 3) {
    // pageplay('.page4')
  // } else {
    if (flag) {
      $(this).removeClass('active');
      actorNo--
    } else {
      $(this).addClass('active');
      actorNo == 2 ? pageplay('.page4') : actorNo++
      // actorNo++
    }
    console.log(actorNo)
  // }
});
$('.page7 .diy_element li').on('click', function () {
  let index = $(this).index()
  $(this).addClass('active').siblings().removeClass('active');
  $('.diy_element .labels > div').eq(index).addClass('active').siblings().removeClass('active');
})
$('.page7 .diy_right li').on('click', function () {
  if ($(this).hasClass('active')) return
  let index = $(this).index() + 1;
  let src = $('.diy_bg img').attr('src').split('.png')[0].slice(0, -1);
  $(this).addClass('active').siblings().removeClass('active')
  $('.diy_bg img').attr('src', src + index + '.png')
})