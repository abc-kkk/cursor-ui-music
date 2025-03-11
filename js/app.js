/**
 * 音乐App主应用JavaScript
 * 负责界面交互和基本功能
 */

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 初始化底部导航栏点击
    initNavigation();
    
    // 初始化迷你播放器
    initMiniPlayer();
});

/**
 * 更新状态栏时间
 */
function updateStatusBarTime() {
    const timeElements = document.querySelectorAll('.status-time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

/**
 * 初始化底部导航栏
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加当前项目的活动状态
            this.classList.add('active');
            
            // 在实际应用中，这里会导航到相应页面
            // 但在原型中，我们使用iframe展示，所以不需要真正的导航
            console.log('导航到:', this.getAttribute('data-page'));
        });
    });
}

/**
 * 初始化迷你播放器
 */
function initMiniPlayer() {
    const miniPlayer = document.querySelector('.mini-player');
    
    if (miniPlayer) {
        miniPlayer.addEventListener('click', function() {
            // 在实际应用中，这会打开完整播放器
            console.log('打开完整播放器');
        });
        
        // 播放控制按钮事件
        const playButton = miniPlayer.querySelector('.play-btn');
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                
                const isPlaying = this.classList.contains('playing');
                if (isPlaying) {
                    this.classList.remove('playing');
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    console.log('暂停音乐');
                } else {
                    this.classList.add('playing');
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    console.log('播放音乐');
                }
            });
        }
    }
}

/**
 * 切换喜欢状态
 * @param {HTMLElement} element - 喜欢按钮元素
 */
function toggleLike(element) {
    element.classList.toggle('text-red-500');
    if (element.classList.contains('text-red-500')) {
        element.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        element.innerHTML = '<i class="far fa-heart"></i>';
    }
}

/**
 * 模拟加载更多内容
 * @param {string} containerId - 内容容器ID
 * @param {string} loaderId - 加载指示器ID
 */
function loadMore(containerId, loaderId) {
    const loader = document.getElementById(loaderId);
    if (loader) {
        loader.classList.remove('hidden');
        
        // 模拟加载延迟
        setTimeout(() => {
            loader.classList.add('hidden');
            console.log(`为 ${containerId} 加载更多内容`);
        }, 1500);
    }
} 