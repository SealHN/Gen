// 游戏状态
let score = 0;
let bananas = [];
let gameActive = true;
const player = {
  x: 50,
  width: 80,
  isThrowing: false
};

// 大根属性
const daikon = {
  element: document.getElementById('daikon'),
  y: 100,
  speed: 2,
  height: 150,
  direction: 1 // 1=向下, -1=向上
};

// 初始化游戏
function initGame() {
  updatePlayer();
  document.addEventListener('click', handleShoot);
  document.getElementById('leftBtn').addEventListener('click', () => movePlayer(-10));
  document.getElementById('rightBtn').addEventListener('click', () => movePlayer(10));
  gameLoop();
}

// 玩家移动
function movePlayer(offset) {
  player.x = Math.max(5, Math.min(95, player.x + offset));
  updatePlayer();
}

// 更新玩家位置和状态
function updatePlayer() {
  const playerElement = document.getElementById('player');
  playerElement.style.left = `${player.x}%`;
  playerElement.innerHTML = drawStickman(player.isThrowing ? 'throw' : 'stand');
}

// 发射香蕉
function handleShoot(e) {
  if (!gameActive || e.target.tagName === 'BUTTON') return;
  
  player.isThrowing = true;
  updatePlayer();
  
  setTimeout(() => {
    player.isThrowing = false;
    updatePlayer();
  }, 300);

  createBanana();
}

// 创建香蕉
function createBanana() {
  const banana = document.createElement('div');
  banana.className = 'banana';
  banana.innerHTML = drawBanana();
  banana.style.left = `${player.x}%`;
  banana.style.bottom = '120px'; // 从手部位置发射
  document.querySelector('.game-container').appendChild(banana);

  bananas.push({
    element: banana,
    x: player.x,
    y: 120,
    speed: 7,
    direction: 1 // 1=向上
  });
}

// 游戏主循环
function gameLoop() {
  if (!gameActive) return;
  
  updateDaikon();
  updateBananas();
  requestAnimationFrame(gameLoop);
}

// 大根运动
function updateDaikon() {
  daikon.y += daikon.speed * daikon.direction;
  
  // 边界检测 (假设游戏区域高度为600px)
  if (daikon.y > 450 || daikon.y < 50) {
    daikon.direction *= -1;
  }
  
  daikon.element.style.top = `${daikon.y}px`;
}

// 香蕉运动
function updateBananas() {
  bananas.forEach((banana, index) => {
    banana.y += banana.speed * banana.direction;
    banana.element.style.bottom = `${banana.y}px`;
    
    // 超出屏幕移除
    if (banana.y > window.innerHeight || banana.y < 0) {
      banana.element.remove();
      bananas.splice(index, 1);
      return;
    }
    
    // 击中检测
    if (checkHit(banana)) {
      handleHit(index);
    }
  });
}

// 碰撞检测
function checkHit(banana) {
  const daikonRect = daikon.element.getBoundingClientRect();
  const bananaRect = banana.element.getBoundingClientRect();
  
  return (
    bananaRect.right > daikonRect.left &&
    bananaRect.left < daikonRect.right &&
    bananaRect.bottom > daikonRect.top &&
    bananaRect.top < daikonRect.bottom
  );
}

// 击中处理
function handleHit(index) {
  score++;
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  
  // 击中特效
  daikon.element.style.backgroundImage = 'url("assets/e.png")';
  bananas[index].element.remove();
  bananas.splice(index, 1);
  
  setTimeout(() => {
    daikon.element.style.backgroundImage = 'url("assets/c.png")';
  }, 300);
  
  // 胜利判断
  if (score >= 13) {
    setTimeout(() => window.location.href = 'victory.html', 500);
  }
}

// 游戏结束
function gameOver() {
  gameActive = false;
  daikon.element.style.backgroundImage = 'url("assets/f.png")';
  document.getElementById('player').innerHTML = drawStickman('fall');
  
  setTimeout(() => {
    if (confirm('游戏结束！再试一次？')) {
      window.location.reload();
    } else {
      window.location.href = 'index.html';
    }
  }, 1000);
    }
