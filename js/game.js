// 游戏状态
let score = 0;
let bananaBounces = 0;
let bananas = [];
let gameActive = true;

// 初始化游戏
function initGame() {
  // 加载火柴人
  document.getElementById('player').innerHTML = drawStickman('stand');
  
  // 控制按钮
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');
  const player = document.getElementById('player');
  
  let playerX = 50;
  
  leftBtn.onclick = () => {
    playerX = Math.max(10, playerX - 10);
    player.style.left = `${playerX}%`;
  };
  
  rightBtn.onclick = () => {
    playerX = Math.min(90, playerX + 10);
    player.style.left = `${playerX}%`;
  };
  
  // 发射香蕉
  document.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON' && gameActive) {
      shootBanana(playerX);
    }
  };
  
  // 游戏循环
  setInterval(gameLoop, 20);
}

// 发射香蕉
function shootBanana(xPos) {
  const banana = document.createElement('div');
  banana.className = 'banana';
  banana.innerHTML = drawBanana();
  banana.style.left = `${xPos}%`;
  banana.style.bottom = '100px';
  document.querySelector('.game-container').appendChild(banana);
  
  bananas.push({
    element: banana,
    x: xPos,
    y: 100,
    speed: 5,
    direction: 1,
    bounces: 0
  });
}

// 游戏主循环
function gameLoop() {
  if (!gameActive) return;
  
  // 移动大根
  const daikon = document.getElementById('daikon');
  let currentTop = parseInt(daikon.style.top || '100');
  daikon.style.top = `${currentTop + 2}px`;
  
  if (currentTop > 300 || currentTop < 50) {
    daikon.style.transition = 'top 0.3s';
    setTimeout(() => daikon.style.transition = '', 300);
  }
  
  // 移动香蕉
  bananas.forEach((banana, index) => {
    banana.y += banana.speed * banana.direction;
    banana.element.style.bottom = `${banana.y}px`;
    
    // 碰撞检测
    if (banana.y > window.innerHeight - 50) {
      banana.direction *= -1;
      banana.bounces++;
      if (banana.bounces > 5) {
        banana.element.remove();
        bananas.splice(index, 1);
        bananaBounces++;
        if (bananaBounces >= 3) gameOver();
      }
    }
    
    // 击中检测
    if (checkHit(banana)) {
      score++;
      document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
      daikon.style.backgroundImage = 'url("../assets/e.png")';
      setTimeout(() => {
        daikon.style.backgroundImage = 'url("../assets/c.png")';
      }, 1000);
      banana.element.remove();
      bananas.splice(index, 1);
      
      if (score >= 13) {
        setTimeout(() => window.location.href = 'victory.html', 1500);
      }
    }
  });
}

// 碰撞检测
function checkHit(banana) {
  const daikonRect = document.getElementById('daikon').getBoundingClientRect();
  const bananaRect = banana.element.getBoundingClientRect();
  
  return (
    bananaRect.right > daikonRect.left &&
    bananaRect.left < daikonRect.right &&
    bananaRect.bottom > daikonRect.top &&
    bananaRect.top < daikonRect.bottom
  );
}

// 游戏结束
function gameOver() {
  gameActive = false;
  document.getElementById('daikon').style.backgroundImage = 'url("../assets/f.png")';
  document.getElementById('player').innerHTML = drawStickman('fall');
  
  setTimeout(() => {
    if (confirm('游戏结束！再试一次？')) {
      window.location.reload();
    } else {
      window.location.href = 'index.html';
    }
  }, 1000);
    }
