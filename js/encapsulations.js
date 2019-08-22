/*自己封装的一些比较小的一些方法*/
$.fn.extend({
    // 设置元素高宽
    genWidthAndHeight: function (width, height) {
        this.css({
            width: width,
            height: height
        });
    },
});

$(function () {
    // 获取全局 DOM
    var audioDOM = document.getElementById('audioPayer');

    // 默认情况下动态设置 main-progree 的高宽
    $('.main-progress').genWidthAndHeight($(window).width(), $(window).height());
    // 默认情况下动态设置 first-mask 的高宽
    $('.first-mask').genWidthAndHeight($(window).width(), $(window).height());
    // 默认情况下动态设置 music-control-panel 的宽度
    $('#music-control-panel').width($(window).width() - $('#music-control-imas').outerWidth() - 40);
    // 即使在高宽变化的情况下也自动设置
    $(window).on('resize',function () {
        // console.log("Windows.width = " + $(window).width() + "Windows.height = " + $(window).height());
        // 动态设置 main-progree 的高宽
        $('.main-progress').genWidthAndHeight($(window).width(), $(window).height());
        // 动态设置 first-mask 的高宽
        $('.first-mask').genWidthAndHeight($(window).width(), $(window).height());
        // 动态设置 music-control-panel 的宽度
        $('#music-control-panel').width($(window).width() - $('#music-control-imas').outerWidth() - 40);
    });

    // vue for Top-banner > logo
    new Vue({
        el: '.logo',
        data: {
            logo: {
                linkURL: 'javascript: void(0)', // 点击 Logo 的跳转链接
                picURL: 'https://www.comnod.cn/wp-content/uploads/2019/07/logo.png', // Logo 图片链接
                picALT: $('title').html(), // Logo alt 增强 SEO -- 直接获取网站的 title
                poster: '用心<br>才更爱Ta'
            }
        }
    });

    // vue for search
    new Vue({
        el: '.search',
        data: {
            searchIcon: true,
            removeIcon: false,
            seaDis: false
        },
        methods: {
            setIcon: function () {
                this.seaDis =! this.seaDis;
                this.searchIcon =! this.searchIcon;
                this.removeIcon =! this.removeIcon;
            }
        }
    });

    // vue for Banner
    new Vue({
        el: '.banner',
        data: {
            mList: [{
                iTitle: '首页',
                iURL: 'index.html'
            },{
                iTitle: '小故事',
                iURL: 'str.html'
            },{
                iTitle: '排行榜',
                iURL: 'high.html'
            },{
                iTitle: '用户',
                iURL: 'user.html'
            }]
        },
        methods: {}
    });

    // vue for sidebar
    new Vue({
        el: '.sidebar',
        data: {
            loginURL: 'login.html #form',
            regURL: 'reg.html #form'
        },
        methods: {
            loadLogin: function () {
                $('#usermain').load(this.loginURL);
                return false;
            },
            loadReg: function () {
                $('#usermain').load(this.regURL);
                return false;
            }
        }
    });

    // vue for music
    new Vue({
        el: '.musicAU',
        data: {
            musicSrc: {
                img: 'resource/img/多远都要在一起.jpg',msrc: 'resource/music/多远都要在一起 - 邓紫棋.m4a',mtitle: '多远都要在一起 - 邓紫棋'
            },
            MusicCount: true,
            thisWidth: $(window).width() - $('#music-control-imas').outerWidth() - 40,
        },
        methods: {
            // 获取音乐
            getMusicSrc: function () {
                // 先获取音乐，然后把参数传给musicSrc
            },
            // 播放和暂停音乐
            parseAndPlay: function () {
                if (audioDOM !== null) {
                    if ( audioDOM.paused ) {
                        audioDOM.play();
                        $('#audio_parse').css({
                            'backgroundPosition': "1px 0px",
                        });
                    } else {
                        audioDOM.pause();
                        $('#audio_parse').css({
                            'backgroundPosition': "-40px 0px",
                        });
                    }
                }
                // 判断当前的播放状态，并调用一次css样式更换
                console.log('this is player btn dom')
            },
            // 上一首歌
            prevMusic: function () {
                // 先将getMusicSrc() 调用一遍，以获取一些数据
                // 然后重新加载音乐
                // 获取当前播放状态
                // 如果在播放，则播放，如果没有播放，则不播放，等待用户操作
            },
            // 下一首歌
            nextMusic: function () {
                //主要原理同prevMusic
            },
            // 停止播放
            stopMusic: function () {
                // 先停止音乐播放器
                // 然后冲加载音乐
                // 暂停播放
                audioDOM.load();
                audioDOM.pause();
                console.log('music stoped');
            },
            // 设置隐藏
            autoIndentSet: function () {
                this.MusicCount =! this.MusicCount;
                if (this.MusicCount == true) {
                    // 对宽度进行设置
                    $('#music-control-panel').fadeIn(10).animate({
                        width: this.thisWidth,
                    });
                    $('.musicAU').animate({
                        // 'background': 'rgba(232, 23, 255, 0.25)',
                        width: '100%'
                    });
                    // 对部分元器件的大小进行还原
                    if ($(window).width() > 1024) {
                        $('.musicAU').animate({
                            height: 130,
                        });
                        $('#music-control-imas').animate({
                            width: 110,
                            height: 110
                        });
                    }
                } else if (this.MusicCount == false) {
                    $('#music-control-panel').animate({
                        width: 0,
                    },100).fadeOut(10);
                    $('.musicAU').animate({
                        // 'background': 'rgba(0, 0, 0, 0)',
                        width: 0
                    });
                    // 对部分元器件的大小进行规划
                    if($(window).width() > 1024) {
                        $('.musicAU').animate({
                            height: 80,
                        });
                        $('#music-control-imas').animate({
                            width: 80,
                            height: 80
                        });
                    }
                }
            }
        }
    });
    // NProgress.done();
});