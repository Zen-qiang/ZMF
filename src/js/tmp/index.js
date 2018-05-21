/*
 * @Author: yyl 
 * @Date: 2018-05-04 20:37:02 
 * @Last Modified by: yyl
 * @Last Modified time: 2018-05-21 23:39:19
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
    // { id: 'box2', src: 'x_box.svg' },
    // { id: 'box3', src: 'box_orange.svg' },
    // { id: 'box4', src: 'box_pink.svg' },
    // 页面素材
    // { id: 'bird_purple', src: 'bird_purple.png' },
    // { id: 'dialog_box', src: 'dialog_box.gif' },
    // { id: 'person1', src: 'person1.png' },
    // { id: 'person2', src: 'person2.png' },
    // { id: 'person3', src: 'person3.png' },
    // { id: 'person4', src: 'person4.png' },
    // { id: 'person5', src: 'person5.png' },
    // { id: 'person6', src: 'person6.png' },
    // { id: 'person7', src: 'person7.png' },
    // { id: 'person8', src: 'person8.png' },
    // { id: 'person9', src: 'person9.png' },
    // { id: 'inputBox1', src: 'draw.svg' },
    // { id: 'inputBox2', src: 'lamp_dark.png' },
    // { id: 'inputBox3', src: 'lamp_light.png' },
    // { id: 'mouse', src: 'mouse.svg' },
    // { id: 'text1', src: 'message1.svg' },
    // { id: 'text2', src: 'message2.svg' },
    // { id: 'text3', src: 'message3.svg' },
    // { id: 'dialog_box1', src: 'dialog_box1.gif' },
    // { id: 'bird_red', src: 'bird_red.png' },
    // { id: 'guitar', src: 'guitar.png' },
    // { id: 'sunglasses', src: 'sunglasses.png' },
    // { id: 'lamp_light1', src: 'lamp_light1.png' },
    // { id: 'page3_bg', src: 'page3_bg.jpg' },
    // { id: 'page3_dnp', src: 'page3_dpn.png' },
    // { id: 'page3_mby', src: 'page3_mby.png'},
    // { id: 'page3_wsl', src: 'page3_wsl.png' },
    // { id: 'page3_gd', src: 'page3_gd.png' },
    // { id: 'page3_chy', src: 'page3_chy.png' },
    // { id: 'page4_bird', src: 'page4_bird.png' },
    // { id: 'page4_lamp', src: 'page4_lamp.png' },
    // { id: 'page4_box', src: 'page4_box.gif'},
    // { id: 'page6_box', src: 'page6_box.png' },
    // { id: 'page6_boxred', src: 'page6_boxred.png' },
    // { id: 'page6_boxorange', src: 'page6_boxorange.png' },
    // { id: 'page6_boxblue', src: 'page6_boxblue.png' },
    // { id: 'page6_box2', src: 'page6_box2.png' },
    // { id: 'page6_bird', src: 'page6_bird.png' },
    // { id: 'page6_text', src: 'page6_text.gif' },
    // { id: 'page7_bg', src: 'page7_bg.png' },
    // { id: 'page8_bird', src: 'page8_bird.png' },
    // { id: 'page8_lamp', src: 'page8_lamp.png' },
    // { id: 'page8_text', src: 'page8_text.gif' }
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
    pageplay('.page7')
  }, 800);
}
// pageplay
function pageplay (el) {
  $(el).siblings().css('display', 'none').end().css('display', 'block');
}
$('body').height($(window).height())
$('.page1 .go').on('touchstart', function () {
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
  pageplay('.page5')
  // marquee()
  mask_square()
})
$('.page6 .go').on('click', function () {
  pageplay('.page7')
})
$('.page7 .go').on('click', function () {
  pageplay('.page8')
  // ZMF.convert2canvas('.page7 .diy_left', '.page7')
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
  // ZMF.convert2canvas()
})
var actorNo = 0;
var actor_timer = null
$('.page3 .actor').on('click', function () {
  if ($('.page3 .actor.active').length >= 3) return
  let flag = $(this).hasClass('active');
  flag ? $(this).removeClass('active') : $(this).addClass('active');
  let length = $('.page3 .actor.active').length
  if (length == 3) {
    $('.page3 .logo').addClass('active');
    setTimeout(() => {
      pageplay('.page4');
      $('.page3 .logo').removeClass('active')
      $('.page3 .actor').removeClass('active')
    }, 1000);
  };
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
function marquee () {
  let num = 0;
  let timer = setInterval(function() {
    num++
    // console.log(num)
    $('.page5 .bg').toggleClass('active')
    if (num == 9) {
      clearInterval(timer)
      pageplay('.page6')
    }
  }, 160)
}
function mask_square () {
  let num = 0
  let cont = 0
  var timer = setInterval(function() {
    if (num == 29) {
      num = 0
      cont++
    } else {
      num++
    }
    if (cont == 2) {
      // clearInterval(timer)
      // speed = 1000
      // timer
      if (num == 3 || num == 6 || num == 20) {
        $('.page5 .mask_square span').eq(num).addClass('active')
      } else {
        $('.page5 .mask_square span').eq(num).addClass('active').end().eq(num - 1).removeClass('active')
      }
    } else if(cont == 3) {
      clearInterval(timer)
      marquee()
    } else {
      $('.page5 .mask_square span').eq(num).addClass('active').end().eq(num - 1).removeClass('active')
    }
  }, 70)
}
var ZMF = (function (doc) {
  return {
    copyDom: null,
    // tStart: [],
    // isScale: false,
    events: function () {
      $('.page7 .labels img').on({touchstart: this.diyStart, touchmove: this.diyMove, touchend: this.diyEnd});
      this.createRandom()
    },
    diyStart: function (e) {
      e.preventDefault();
      e.stopPropagation();
      let _this = ZMF,
          domRect = $(this)[0].getBoundingClientRect(),
          css = {
            'width': domRect.width + 'px',
            'height': domRect.height + 'px',
            'left': domRect.left + 'px',
            'top': domRect.top + 'px'
          };
      _this.copyDom = $(this).clone().css(css).appendTo('.page7');
      // if (e.originalEvent.touches.length >= 2) {
      //   _this.tStart = e.originalEvent.touches;
      //   _this.isScale = true;
      // }
    },
    diyMove: function (e) {
      e.preventDefault();
      e.stopPropagation();
      let _this = ZMF;
      // if (_this.isScale) {
      //   let now = e.originalEvent.touches,
      //     scale = (_this.getDistance(now[0], now[1]) / _this.getDistance(start[0], start[1])).toFixed(2);
      //   _this.copyDom.css('transform', 'scale(' + scale + ')');
      // } else {
      let _touch = e.originalEvent.targetTouches[0],
          offsetX = parseInt(_this.copyDom.css('width')) / 2,
          offsetY = parseInt(_this.copyDom.css('height')) / 2,
          _x = _touch.pageX - offsetX + 'px',
          _y = _touch.pageY - offsetY + 'px';
      _this.copyDom.css({ 'left': _x, 'top': _y });
      // }
    },
    diyEnd: function (e) {
      e.preventDefault();
      e.stopPropagation();
      let _this = ZMF,
          diyContainer = $('.page7 .diy_left .diy_content')[0],
          rect = diyContainer.getBoundingClientRect(),
          domRect = _this.copyDom[0].getBoundingClientRect(),
          domClass = _this.copyDom.attr('class'),
          _offsetTop = rect.top <= domRect.top ? true : false,
          _offsetLeft = rect.left <= domRect.left ? true : false,
          _offsetRight = rect.right >= domRect.right ? true : false,
          _offsetBottom = rect.bottom >= domRect.bottom ? true : false,
          _left = (parseInt(_this.copyDom.css('left')) - rect.left) + 'px',
          _top = (parseInt(_this.copyDom.css('top')) - rect.top) + 'px';
      _this.isScale = false;
      if (_offsetTop && _offsetLeft && _offsetRight && _offsetBottom) {
        $('.page7 .diy_content').children('.' + domClass).remove();
        _this.copyDom.appendTo($('.page7 .diy_content')).css({'left': _left, 'top': _top});
        _this.setScale()
      } else {
        _this.copyDom.remove();
      }
    },
    getDistance: function (p1, p2) {
      let x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
      return Math.sqrt((x * x) + (y * y));
    },
    setScale: function () {
      let _this = ZMF,
          ele = $('.page7 .diy_left .diy_content'),
          start = [],
          canRun = true;
      ele.on('touchstart', function (e) {
        if (e.originalEvent.touches.length >= 2) {
          start = e.originalEvent.touches;
        } else {
          e.preventDefault();
        }
      })
      ele.on('touchmove', function (e) {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
          canRun = true;
        }, 60);
        let _touch = e.originalEvent.touches;
        if (_touch.length >= 2) {
          let now = _touch,
            scale = (_this.getDistance(now[0], now[1]) / _this.getDistance(start[0], start[1])).toFixed(2);
          _this.copyDom.css('transform', 'scale(' + scale + ')');
        } else if (_touch.length == 1 && _touch[0].target.tagName == 'IMG') {
          let currentDom = $(_touch[0].target),
              rect = $(this)[0].getBoundingClientRect(),
              offsetX = parseInt(currentDom.css('width')) / 2,
              offsetY = parseInt(currentDom.css('height')) / 2,
              _x = _touch[0].pageX - offsetX - rect.left + 'px',
              _y = _touch[0].pageY - offsetY - rect.top + 'px';
          currentDom.css({'left': _x, 'top': _y});
        } else {
          e.preventDefault();
        }
      })
    },
    convert2canvas: function () {
      // .page9.container
      let cntElem = $('.page9 .container')[0],
          // shareContent = cntElem,//需要截图的包裹的（原生的）DOM 对象
          // width = shareContent.offsetWidth,//获取dom 宽度
          // height = shareContent.offsetHeight,//获取dom 高度
          width = $('.page9 .container').width(),
          height = $('.page9 .container').height(),
          canvas = document.createElement("canvas"),//创建一个canvas节点
          scale = 2; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
      }
      console.log(opts)
      html2canvas(cntElem, opts).then(function (canvas) {
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // 【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);
        // .page9
        $('.page9').append(img);
        $(img).css({
          "width": canvas.width / 2 + "px",
          "height": canvas.height / 2 + "px",
        }).addClass('f-full');
      });
    },
    // Math.floor(Math.random() * 10)
    createRandom: function () {
      // let index = Math.floor(Math.random() * 10);
      const textArr = [
        {'name': '吃货桶','des': '没错，你就是那个万众挑一的饭桶！面对美食你向来是来着不拒，毫无抵抗力！有你在的饭局，垃圾桶的参与感为零。'},
        {'name': '巨星桶','des': '如果生活是一个垃圾桶，你就是那个被所有回收站争抢的那个矿泉水瓶。如果生活是一场热波音乐节，你就是万人宠爱的毛不易；拥有强大气场的你走到哪都是人群中最出挑的那一个巨星。'},
        {'name': 'IQ桶','des': '小机灵鬼儿，你是团队内的智慧担当，没有你想不明白的问题，门萨俱乐部的入会测试对你来说也只是小菜一碟。真想掀起你的头盖骨…啊不是，掀起你的盖子，看看里面都装了些什么。'},
        {'name': '摇滚桶','des': '谁说垃圾桶只能安安静静地待在角落？内心如你般热血而愤怒，任何东西都能用来表达自我！你的生活不能没有音乐，哪怕身边没有吉他，敲打敲打自己的的盖子你也能立马高歌一曲！'},
        {'name': '逗笔筒','des': '你是所有朋友口中的小逗笔，有你的地方就有笑声！派对由你来活跃气氛准没错，你的字典里压根没有“冷场”这两个字！我们打算派你的朋友去和戴佩妮PK掐大腿了…'},
        {'name': '桃花桶','des': '有一个神奇的传说，和你做朋友的人都会在3个月内脱单。你简直就是红娘本娘！有心无心的一直在促成朋友圈共同好友之间的一段段姻缘。截图给你的那些单身狗朋友们看吧，3个月后他们会回来感谢你的。'},
        {'name': '飒蜜桶','des': '天啦噜~可爱滴你设计出了一个更加可爱滴垃圾桶哦！我猜你一定是个萌妹纸吧！你的可爱和那些装腔作势的绿茶们不同。不娇柔做作恰恰就是你最可爱的品质。'},
        {'name': '颜值桶','des': '“沉鱼落雁，闭月羞花”说的就是你了！作为朋友圈中的颜值top3，你随时都在吸引异性甚至同性热情的瞩目。招蜂引蝶不是你的错，你只是将自己天生的优势发挥的游刃有余而已，果然桶如其人啊！'},
        {'name': '魔鬼桶','des': '你拥有小恶魔般的性格，总是有些邪恶但不失可爱的小想法，比如在别人坐下的瞬间把凳子抽掉；比如偷偷的把别人的SKII换成卸妆水；比如看到这里，你想问候一下这个游戏的设计者。'},
        {'name': '感性桶','des': '看似坚强能干的你其实拥有着柔软的内心，你总能被这个世界上一些看似不起眼的小事情和小人物打动。由于心地很善良，所以总不愿伤害别人。有时会觉得自己与其他人不一样、喜欢沉醉于自己的想象世界。'}
      ]
    }
  }
})(document)
ZMF.events()