// 绘制香蕉SVG
function drawBanana() {
  return `
    <svg viewBox="0 0 100 50">
      <path d="M10,25 Q30,0 50,25 T90,25" 
            fill="#FFD700" stroke="#8B4513" stroke-width="1"/>
    </svg>`;
}

// 绘制火柴人
function drawStickman(state = 'stand') {
  const poses = {
    stand: `
      <circle cx="50" cy="20" r="10" fill="black"/>
      <line x1="50" y1="30" x2="50" y2="60" stroke="black" stroke-width="2"/>
      <line x1="30" y1="40" x2="70" y2="40" stroke="black" stroke-width="2"/>
      <line x1="50" y1="60" x2="30" y2="90" stroke="black" stroke-width="2"/>
      <line x1="50" y1="60" x2="70" y2="90" stroke="black" stroke-width="2"/>
    `,
    throw: `
      <circle cx="50" cy="20" r="10" fill="black"/>
      <line x1="50" y1="30" x2="50" y2="60" stroke="black" stroke-width="2"/>
      <!-- 投掷动作的手臂 -->
      <line x1="50" y1="40" x2="20" y2="30" stroke="black" stroke-width="2"/>
      <line x1="50" y1="40" x2="70" y2="50" stroke="black" stroke-width="2"/>
      <line x1="50" y1="60" x2="30" y2="90" stroke="black" stroke-width="2"/>
      <line x1="50" y1="60" x2="70" y2="90" stroke="black" stroke-width="2"/>
      <!-- 香蕉发射点 -->
      <circle cx="20" cy="30" r="3" fill="yellow"/>
    `,
    fall: `...` // 保持原有跌倒动画
  };
  return `<svg viewBox="0 0 100 100">${poses[state]}</svg>`;
}
