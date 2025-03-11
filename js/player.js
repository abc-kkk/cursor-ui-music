/**
 * 音乐播放器JavaScript
 * 负责音乐播放和控制相关功能
 */

// 播放器状态
const playerState = {
    isPlaying: false,
    currentSong: null,
    progress: 0,
    volume: 80,
    isRepeat: false,
    isShuffle: false,
    playlist: []
};

// 在页面加载后初始化播放器
document.addEventListener('DOMContentLoaded', function() {
    initPlayer();
    initProgressUpdate();
});

/**
 * 初始化播放器
 */
function initPlayer() {
    const playBtn = document.querySelector('.player-play-btn');
    const prevBtn = document.querySelector('.player-prev-btn');
    const nextBtn = document.querySelector('.player-next-btn');
    const repeatBtn = document.querySelector('.player-repeat-btn');
    const shuffleBtn = document.querySelector('.player-shuffle-btn');
    const likeBtn = document.querySelector('.player-like-btn');
    
    // 播放/暂停按钮事件
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            togglePlayState();
        });
    }
    
    // 上一首按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            playPreviousSong();
        });
    }
    
    // 下一首按钮事件
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            playNextSong();
        });
    }
    
    // 重复播放按钮事件
    if (repeatBtn) {
        repeatBtn.addEventListener('click', function() {
            toggleRepeat(this);
        });
    }
    
    // 随机播放按钮事件
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            toggleShuffle(this);
        });
    }
    
    // 喜欢按钮事件
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            toggleLike(this);
        });
    }
    
    // 进度条点击事件
    const progressBar = document.querySelector('.player-progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const percentage = x / width;
            
            // 更新进度
            updateProgress(percentage * 100);
        });
    }
}

/**
 * 模拟进度更新
 */
function initProgressUpdate() {
    // 仅在播放页面进行更新
    if (document.querySelector('.player-container')) {
        setInterval(() => {
            if (playerState.isPlaying) {
                playerState.progress += 0.5;
                if (playerState.progress >= 100) {
                    playerState.progress = 0;
                    
                    // 根据播放设置决定下一步操作
                    if (playerState.isRepeat) {
                        // 重新播放当前歌曲
                        console.log('重复播放当前歌曲');
                    } else {
                        // 播放下一首
                        playNextSong();
                    }
                }
                
                updateProgress(playerState.progress);
            }
        }, 1000);
    }
}

/**
 * 切换播放状态
 */
function togglePlayState() {
    playerState.isPlaying = !playerState.isPlaying;
    
    const playBtn = document.querySelector('.player-play-btn');
    const miniPlayBtn = document.querySelector('.mini-play-btn');
    
    if (playerState.isPlaying) {
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (miniPlayBtn) miniPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        console.log('播放音乐');
    } else {
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (miniPlayBtn) miniPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        console.log('暂停音乐');
    }
}

/**
 * 播放下一首歌曲
 */
function playNextSong() {
    console.log('播放下一首');
    // 模拟歌曲切换效果
    const songTitle = document.querySelector('.song-title');
    const artistName = document.querySelector('.artist-name');
    
    if (songTitle && artistName) {
        // 随机选择一个歌曲名（仅用于原型）
        const songs = [
            { title: '繁星闪烁', artist: '陈奕迅' },
            { title: '爱的故事', artist: '孙燕姿' },
            { title: '海阔天空', artist: 'Beyond' },
            { title: '夜曲', artist: '周杰伦' },
            { title: '浮夸', artist: '陈奕迅' }
        ];
        
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        songTitle.textContent = randomSong.title;
        artistName.textContent = randomSong.artist;
        
        // 重置进度
        playerState.progress = 0;
        updateProgress(0);
        
        // 确保在播放状态
        if (!playerState.isPlaying) {
            togglePlayState();
        }
    }
}

/**
 * 播放上一首歌曲
 */
function playPreviousSong() {
    console.log('播放上一首');
    // 模拟歌曲切换效果（简化，与播放下一首实现类似）
    playNextSong();
}

/**
 * 切换重复播放状态
 * @param {HTMLElement} button - 重复按钮元素
 */
function toggleRepeat(button) {
    playerState.isRepeat = !playerState.isRepeat;
    button.classList.toggle('text-purple-600');
    console.log('重复播放:', playerState.isRepeat);
}

/**
 * 切换随机播放状态
 * @param {HTMLElement} button - 随机播放按钮元素
 */
function toggleShuffle(button) {
    playerState.isShuffle = !playerState.isShuffle;
    button.classList.toggle('text-purple-600');
    console.log('随机播放:', playerState.isShuffle);
}

/**
 * 更新进度条显示
 * @param {number} percentage - 进度百分比 (0-100)
 */
function updateProgress(percentage) {
    const progressIndicator = document.querySelector('.player-progress');
    const timeDisplay = document.querySelector('.time-elapsed');
    
    if (progressIndicator) {
        progressIndicator.style.width = `${percentage}%`;
    }
    
    if (timeDisplay) {
        // 假设歌曲总长3:30，计算当前时间
        const totalSeconds = 3 * 60 + 30;
        const currentSeconds = Math.floor(totalSeconds * (percentage / 100));
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
} 