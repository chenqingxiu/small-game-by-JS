// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 实例包含坐标及速度,
    // XY坐标及速度speed在一定范围内随机取值,实现敌人个体的唯一性
    this.x = parseInt(Math.random()*5)*101;;
    this.y = parseInt(Math.random()*3)*83+55;
    this.speed = Math.random()*150+100;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed*dt;
    //一旦越出右边界，就在左边界重新出现
    if(this.x >= 101*5){
        this.x = -101;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数，render() 函数和一个 handleInput()函数
var Player = function () {
    this.x = 101*2;
    this.y = 83*4+55;
    this.sprite = 'images/char-boy.png';
};

//update() 函数用于成功过河后做出反馈,并重置玩家的位置
Player.prototype.update = function (dt) {
    if(this.y<55){
        this.x = 101*2;
        this.y = 83*4+55;
        alert("YOU WON !");
    }
};

// 用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput()函数,使用方向键控制玩家在屏幕内移动
Player.prototype.handleInput = function (movement) {
    switch (movement) {
       case 'left':
         if (this.x >= 101) {
            this.x -= 101;
            } break;
      case 'right':
         if (this.x <= 101*3) {
            this.x += 101;
            } break;
      case 'up':
         if (this.y >=55 ) {
            this.y -= 83;
            } break;
      case 'down':
         if (this.y <= 83*3+55) {
            this.y += 83;
            } break;
     }
};

// checkCollisions()碰撞检测函数,玩家和敌人相碰后出现提示,并重置玩家的位置
//此函数代码参考了论坛原有代码
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
        if(this.y === allEnemies[i].y){
            if((Math.abs(this.x - allEnemies[i].x))<70){
                this.x = 101*2;
                this.y = 83*4+55;
                alert("GAME OVER !");
            }
       }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];

// change()函数,用于选择游戏难度:变更敌人数量
function change() {
    var myselect=document.getElementById("level");
    var index=myselect.selectedIndex ;
    var level=myselect.options[index].value;
    //清空敌人
    allEnemies = [];
    //根据选择的难度产生不同数量的敌人
    for (var i = 0; i < level; i++){
        var new_enemy = new Enemy();
        allEnemies.push(new_enemy);
    }
    //使下拉框失去焦点,避免直接按方向键再次选择下拉菜单
    myselect.blur();
}
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
