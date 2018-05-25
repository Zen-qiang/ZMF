/*
 * @Author: yyl 
 * @Date: 2018-05-04 20:37:02 
 * @Last Modified by: yyl
 * @Last Modified time: 2018-05-25 17:59:14
 */
var ZMF = (function (doc) {
  const $arr = (function () {
    var array = [0, 1, 2, 3, 6, 7];
    var finalArray = [];
    var strArray = [];
    for (var i in array) {
      var v1 = array[i];
      for (var j in array) {
        var v2 = array[j];
        for (var k in array) {
          var v3 = array[k];
          if (v1 != v2 && v2 != v3 && v1 != v3) {
            var tempArray = [v1, v2, v3];
            tempArray.sort();
            var value = tempArray[0] + '' + tempArray[1] + '' + tempArray[2];
            if (strArray.indexOf(value) == -1) {
              strArray.push(value);
              finalArray.push(tempArray);
            }
          }
        }
      }
    }
    return finalArray
  })()
  const $textArr = [
    { 'name': '吃货桶', 'des': '没错，你就是那个万众挑一的饭桶！面对美食你向来是来着不拒，毫无抵抗力！有你在的饭局，垃圾桶的参与感为零。' },
    { 'name': '巨星桶', 'des': '如果生活是一个垃圾桶，你就是那个被所有回收站争抢的那个矿泉水瓶。如果生活是一场热波音乐节，你就是万人宠爱的毛不易；拥有强大气场的你走到哪都是人群中最出挑的那一个巨星。' },
    { 'name': 'IQ桶', 'des': '小机灵鬼儿，你是团队内的智慧担当，没有你想不明白的问题，门萨俱乐部的入会测试对你来说也只是小菜一碟。真想掀起你的头盖骨…啊不是，掀起你的盖子，看看里面都装了些什么。' },
    { 'name': '摇滚桶', 'des': '谁说垃圾桶只能安安静静地待在角落？内心如你般热血而愤怒，任何东西都能用来表达自我！你的生活不能没有音乐，哪怕身边没有吉他，敲打敲打自己的的盖子你也能立马高歌一曲！' },
    { 'name': '逗笔筒', 'des': '你是所有朋友口中的小逗笔，有你的地方就有笑声！派对由你来活跃气氛准没错，你的字典里压根没有“冷场”这两个字！我们打算派你的朋友去和戴佩妮PK掐大腿了…' },
    { 'name': '桃花桶', 'des': '有一个神奇的传说，和你做朋友的人都会在3个月内脱单。你简直就是红娘本娘！有心无心的一直在促成朋友圈共同好友之间的一段段姻缘。截图给你的那些单身狗朋友们看吧，3个月后他们会回来感谢你的。' },
    { 'name': '飒蜜桶', 'des': '天啦噜~可爱滴你设计出了一个更加可爱滴垃圾桶哦！我猜你一定是个萌妹纸吧！你的可爱和那些装腔作势的绿茶们不同。不娇柔做作恰恰就是你最可爱的品质。' },
    { 'name': '颜值桶', 'des': '“沉鱼落雁，闭月羞花”说的就是你了！作为朋友圈中的颜值top3，你随时都在吸引异性甚至同性热情的瞩目。招蜂引蝶不是你的错，你只是将自己天生的优势发挥的游刃有余而已，果然桶如其人啊！' },
    { 'name': '魔鬼桶', 'des': '你拥有小恶魔般的性格，总是有些邪恶但不失可爱的小想法，比如在别人坐下的瞬间把凳子抽掉；比如偷偷的把别人的SKII换成卸妆水；比如看到这里，你想问候一下这个游戏的设计者。' },
    { 'name': '感性桶', 'des': '看似坚强能干的你其实拥有着柔软的内心，你总能被这个世界上一些看似不起眼的小事情和小人物打动。由于心地很善良，所以总不愿伤害别人。有时会觉得自己与其他人不一样、喜欢沉醉于自己的想象世界。' }
  ];
  const isIphoneX = (function () {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
  })()
  return {
    queue: null,
    copyDom: null,
    actorArr: [],
    actor_timer: null,
    maskTimer: null,
    marqueeTimer: null,
    animationEnd: (function (el) {
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
    })(document.createElement('div')),
    preLoad: function () {
      this.queue = new createjs.LoadQueue(false);
      // this.queue.installPlugin(createjs.Sound);
      // createjs.Sound.alternateExtensions = ["mp3,wav"];
      // this.queue.loadFile({ id: "sound", src: "css/Feel-Like-Smiling.mp3" });
      this.queue.loadManifest([
        // page1
        { id: 'bird_purple', src: 'bird_purple.png' },
        { id: 'dialog_left', src: 'dialog_left.gif' },
        { id: 'dialog_right', src: 'dialog_right.gif' },
        { id: 'lamp_light', src: 'lamp_light.png' },
        // page2
        { id: 'lamp_light1', src: 'lamp_light1.png' },
        { id: 'bird_red', src: 'bird_red.png' },
        // page3
        { id: 'page3_bg', src: 'page3_bg.jpg' },
        { id: 'page3_as', src: 'page3_as.png' },
        { id: 'page3_dnp', src: 'page3_dpn.png' },
        { id: 'page3_mby', src: 'page3_mby.png'},
        { id: 'page3_wsl', src: 'page3_wsl.png' },
        { id: 'page3_gd', src: 'page3_gd.png' },
        { id: 'page3_chy', src: 'page3_chy.png' },
        { id: 'page3_wz1', src: 'page3_wz2.svg' },
        // page5
        { id: 'page5_bg', src: 'page5_bg.png' },
        { id: 'page5_bg_active', src: 'page5_bg_active.png' },
        { id: 'page5_bg_x', src: 'page5_bg_x.png' },
        { id: 'page5_bg_active_x', src: 'page5_bg_active_x.jpg' },
        // page6
        { id: 'page6_box', src: 'page6_box.png' },
        // page8
        { id: 'page8_bird', src: 'page8_bird.png' },
        { id: 'page8_lamp', src: 'page8_lamp.png' },
        // page9
        { id: 'page9_mask', src: 'page9_mask.png' },
        { id: 'page9_bg', src: 'page9_bg.jpg'}
      ], true, "image/");
      this.queue.on("progress", this.loadFileProgress);
      this.queue.on("complete", this.bgAnimate);
    },
    loadFileProgress: function (event) {
      console.log("已加载 " + (this.progress * 100 | 0) + "%");
      $('.loading_text').text((this.progress * 100 | 0) + "%");
    },
    bgAnimate: function () {
      let _this = ZMF;
      console.log('资源全部加载完毕');
      let bg_box = $('.h_bg');
      $('.h_loading').css('display', 'none');
      $('.page1 img').each(function () {
        $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
      });
      bg_box.addClass('box_enter');
      $('#audioBg').attr('src', $('#audioBg').attr('data-src')).removeAttr('data-src');
      setTimeout(() => {
        bg_box.removeClass('box_enter').addClass('box_shake');
      }, 600);
      setTimeout(() => {
        _this.pageplay('.page1')
      }, 800);
    },
    pagestart: function (el) {
      $(el).each(function () {
        $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
      });
    },
    pageplay: function (el) {
      $(el).siblings().css('display', 'none').end().css('display', 'block');
    },
    marquee: function () {
      let _this = ZMF,
          num = 0;
      _this.marqueeTimer = setInterval(function () {
        num++
        $('.page5 .bg').toggleClass('active');
        if (num == 6) {
          clearInterval(_this.marqueeTimer);
          _this.pagestart('.page6 img');
          setTimeout(() => {
            _this.pageplay('.page6');
            if (isIphoneX) {
              $('.h_foot').css('z-index', '');
            }
          }, 600);
        }
      }, 100)
    },
    mask_square: function () {
      let _this = ZMF,
          num = 0,
          cont = 0;
      _this.maskTimer = setInterval(function () {
        if (num == 29) {
          num = 0;
          cont++;
        } else {
          num++;
        };
        if (cont == 2) {
          if (num - 1 == _this.actorArr[0].index || num - 1 == _this.actorArr[1].index || num - 1 == _this.actorArr[2].index) {
            $('.page5 .mask_square span').eq(num).addClass('active');
          } else {
            $('.page5 .mask_square span').eq(num).addClass('active').end().eq(num - 1).removeClass('active');
          };
        } else if (cont == 3) {
          clearInterval(_this.maskTimer);
          _this.marquee();
        } else {
          $('.page5 .mask_square span').eq(num).addClass('active').end().eq(num - 1).removeClass('active')
        };
      }, 60);
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
    },
    diyMove: function (e) {
      e.preventDefault();
      e.stopPropagation();
      let _this = ZMF;
      let _touch = e.originalEvent.targetTouches[0],
          offsetX = parseInt(_this.copyDom.css('width')) / 2,
          offsetY = parseInt(_this.copyDom.css('height')) / 2,
          _x = _touch.pageX - offsetX + 'px',
          _y = _touch.pageY - offsetY + 'px';
      _this.copyDom.css({ 'left': _x, 'top': _y });
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
        _this.copyDom.prependTo($('.page7 .diy_content')).css({'left': _left, 'top': _top});
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
      });
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
        } else if (_touch.length == 1 && _touch[0].target.tagName == 'IMG' && !$(_touch[0].target).hasClass('static')) {
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
      });
    },
    drawCanvas: function (from, to) {
      let cntElem = $(from)[0],
        width = $(from).width(),
        height = $(from).height(),
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
        // console.log(canvas.toDataURL())
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        $(to).append(canvas);
      });
    },
    convert2canvas: function (from, to) {
      // '.page9 .container'
      let cntElem = $(from)[0],
          width = $(from).width(),
          height = $(from).height(),
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
        // console.log(canvas.toDataURL())
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // 【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);
        // .page9
        $(to).append(img);
        // $(img).addClass('f-full');
        if (to == '.page9') {
          $(img).css({
            "width": canvas.width / 2 + "px",
            "height": canvas.height / 2 + "px",
          }).addClass('f-full');
        } else {
          $(img).addClass('f-full');
        }
        // -----------------------------------
        // var img = new Image();
        // var base64 = '';
        // img.setAttribute("crossOrigin", 'Anonymous');
        // // img.src = 'http://zmf.dingliantech.com/';
        // // context.drawImage(img, 0, 0);
        // base64 = canvas.toDataURL("image/png")
        // img.src = base64;
        // $(to).append(img);
        // if (to == '.page9') {
        //   $(img).css({
        //     "width": canvas.width / 2 + "px",
        //     "height": canvas.height / 2 + "px",
        //   }).addClass('f-full');
        // } else {
        //   $(img).addClass('f-full');
        // }
        // -----------------------------------
      });
    },
    createRandom: function (arr) {
      // console.log($arr)
      let _index,
          newArr = [];
      arr.forEach(item => {
        newArr.push(item.index);
      });
      arr.sort(function (a, b) {
        return a - b;
      });
      $arr.forEach((item, index) => {
        if (item.toString() == newArr.toString()) {
          _index = Math.floor(index / 2);
        };
      });
      return _index;
    },
    events: function () {
      let _this = this;
      for(let i = 1; i <= 9; i++) {
        if (i == 1) {
          $(".page1 input[type='text']").on('change', function () {
            $(this).val() ? $('.page1 .input_box').addClass('active') : $('.page1 .input_box').removeClass('active');
            let audioBg = $('#audioBg')[0];
            audioBg.load();
            if (audioBg) {
              console.log('play');
              audioBg.volume = 0.2;
              audioBg.play();
              document.addEventListener('WeixinJSBridgeReady', () => {
                audioBg.load();
                audioBg.play();
              }, false)
              $('.page2 img').each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
            }
            if ($('.page1 .input_box').hasClass('active')) {
              $('.page1 .go').on({
                'touchstart': function () {
                  $('.page2 img').each(function () {
                    $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
                  });
                }, 'click': function () {
                  _this.pageplay('.page2');
                  let user = $('.page1 input').val()
                  $('.user').text(user)
                }
              });
            } else {
              $('.page1 .go').off();
            }
          });
        } else if (i == 3) {
          $('.page3 .actor').on('click', function () {
            if ($('.page3 .actor.active').length >= 3) return
            let flag = $(this).hasClass('active');
            flag ? $(this).removeClass('active') : $(this).addClass('active');
            let length = $('.page3 .actor.active').length
            if (length == 3) {
              $('.page3 .actor.active').each(function () {
                _this.actorArr.push({ 'index': $(this).data('index'), 'text': $(this).data('text')});
              });
              $('.page3 .logo').addClass('active');
              $('.page4 img').each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
              setTimeout(() => {
                _this.pageplay('.page4');
                $('.page3 .logo').removeClass('active');
                $('.page3 .actor').removeClass('active');
              }, 1200);
              _this.actorArr.sort(function (a, b) {
                var value1 = a['index'];
                var value2 = b['index'];
                return value1 - value2;
              })
              console.log(_this.actorArr);
              // page6页面 礼物文字
              $('.page6 .gift_text').each(function (index) {
                $(this).text(_this.actorArr[index].text);
              });
              let no = 0;
              let judge = function () {
                let index = $(this).data('index')
                if (index == _this.actorArr[0].index || index == _this.actorArr[1].index || index == _this.actorArr[2].index) {
                  no < 3 ? no++ : no = 1;
                  $(this).addClass('visible' + no)
                  if (no == 1) {
                    $(this).addClass('active');
                  }
                }
              }
              $('.page7 .diy_element li').each(judge).on('click', function () {
                let index = $(this).index()
                if ($(this).hasClass('active')) return;
                $(this).addClass('active').siblings().removeClass('active');
                $('.diy_element .labels > div').eq(index).addClass('active').siblings().removeClass('active');
                $('.diy_element .labels > div:eq('+ index +') img').each(function () {
                  $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
                })
              });
              $('.page7 .diy_element .labels > div').each(judge);
              // console.log(_this.createRandom(_this.actorArr));
              let bucketIndex = _this.createRandom(_this.actorArr);
              $('.page9 .bucket').text($textArr[bucketIndex].name);
              $('.page9 .bucketDes').text($textArr[bucketIndex].des);
            } else {
              _this.actorArr = [];
            };
          });
        } else if (i == 4) {
          $('.page4 .go').on({
            'touchstart': function () {
              $('.page5 img').each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
            }, 'click': function () {
              $('.page5').siblings().css('display', 'none').end().css('display', 'block');
              _this.mask_square();
              if (isIphoneX) {
                $('.page5').addClass('iphoneX');
                $('.h_foot').css('z-index', '2');
              }
            }
          });
        } else if (i == 6) {
          $('.page6 .go').on({
            'touchstart': function () {
              $('.page7 .diy_container img').each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
              $(".page7 .diy_element .labels .active img").each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
              // $(".page7 .diy_element .labels > div:last img").each(function () {
              //   $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              // });
              $(".page7 .go img").each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
              });
            }, 'click': function () {
              $('.page7').siblings().css('display', 'none').end().css('display', 'block');
              $('.h_foot').css('display', 'none');
              if (isIphoneX) {
                $('.page7 .diy_container').addClass('iphoneX');
                $('.page7 .diy_element').addClass('iphoneX');
              } else {
                $('.page7 .diy_element').removeClass('iphoneX');
              }
            }
          });
        } else if (i == 7) {
          $('.page7 .diy_right li').on({'touchstart': function () {
            if ($(this).hasClass('active')) return
            let index = $(this).index() + 1;
            let src = $('.diy_bg img').attr('src').split('.png')[0].slice(0, -1);
            $('.diy_bg img').attr('src', src + index + '.png');
          }, 'click': function () {
            $(this).addClass('active').siblings().removeClass('active');
          }});
          $('.page7 .go').on({'touchstart': function () {
            _this.convert2canvas('.page7 .diy_box', '.page9 .bucket_container');
            // _this.drawCanvas('.page7 .diy_box', '.page9 .bucket_container');
            $('.page8 img').each(function () {
              $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
            });
            $('.page9 img').each(function () {
              $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
            });
          }, 'click': function () {
            $('.page8').siblings().css('display', 'none').end().css('display', 'block');
            $('.h_foot').css('display', '');
          }});
        } else if (i == 8) {
          $('.page8').on('touchstart', function (e) {
            console.log(e.touches[0].target.className)
            $('.page9').siblings().css('display', 'none').end().css('display', 'block');
            if (isIphoneX) $('.page9').addClass('iphoneX');
            if (e.touches[0].target.className == 'go') {
              $('.page9 .share_mask').addClass('active');
              setTimeout(() => {
                _this.convert2canvas('.page9 .container', '.page9');
              }, 3000);
            } else {
              $('.page9 .share_mask').removeClass('active');
              setTimeout(() => {
                _this.convert2canvas('.page9 .container', '.page9');
              }, 2000);
            }
          })
          // $('.page8 .go').on({
          //   'touchstart': function () {
          //     $('.page9 img').each(function () {
          //       $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
          //     });
          //   }, 'click': function () {
          //     $('.page9').siblings().css('display', 'none').end().css('display', 'block');
          //     setTimeout(() => {
          //       _this.convert2canvas('.page9 .container', '.page9');
          //     }, 4000);
          //   }
          // });
        } else {
          let next = i + 1;
          $('.page' + i + ' .go').on({'touchstart': function () {
            $('.page' + next + ' img').each(function () {
              $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
            });
          }, 'click': function () {
            $('.page' + next).siblings().css('display', 'none').end().css('display', 'block');
          }});
        }
      };
      $('.page6 .take_gift .next').on('click', function () {
        $('.page6 .take_gift').addClass('active');
        setTimeout(() => {
          $('.page6 .take_gift').css('display', 'none');
          $('.page6 .make').css('display', 'block');
        }, 500);
      });
      $('.page7 .labels img').on({ touchstart: this.diyStart, touchmove: this.diyMove, touchend: this.diyEnd });
      $('.page9 .reset').on('click', function () {
        $('.page1').siblings().css('display', 'none').end().css('display', 'block');
        $('.page7 .diy_element .labels > div').removeAttr('class');
        $('.page7 .diy_element li').removeAttr('class');
        $('.page7 .diy_content .static').siblings().remove();
        $('.page6 .take_gift').removeClass('active');
        $('.page6 .take_gift').css('display', '');
        $('.page6 .make').css('display', '');
        $('.page5 .mask_square span').removeAttr('class');
        $('.page9 > img').remove();
        $('.page9 .bucket_container .f-full').remove();
      });
    },
    load: function () {
      let _this = ZMF;
      $(function () {
        $('body').height($(window).height());
        $('section').on('touchmove', false);
        _this.preLoad();
        $('section > div').on('touchstart', function () {
          if ($(this).find('img').attr('data-src') != 'undefined') {
            $(this).find('img').each(function () {
              $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
            })
          }
        })
      });
      return _this;
    },
    init: function () {
      this.load().events();
    }
  }
})(document)