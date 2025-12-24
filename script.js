// ============================================
// UI MANAGEMENT
// ============================================
function showScreen(screenNumber) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    document.getElementById(`screen${screenNumber}`).classList.add('active');
}

function setStyleMode(mode) {
    document.body.classList.remove('normal-mode', 'digital-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);
    
    normalModeBtn.classList.remove('active');
    digitalModeBtn.classList.remove('active');
    darkModeBtn.classList.remove('active');
    
    if (mode === 'normal') {
        normalModeBtn.classList.add('active');
        document.querySelector('.digital-bg').style.display = 'none';
        document.querySelector('.digital-grid').style.display = 'none';
        document.querySelector('.digital-particles').style.display = 'none';
    } else if (mode === 'digital') {
        digitalModeBtn.classList.add('active');
        document.querySelector('.digital-bg').style.display = 'block';
        document.querySelector('.digital-grid').style.display = 'block';
        document.querySelector('.digital-particles').style.display = 'block';
        createEnhancedParticles();
    } else if (mode === 'dark') {
        darkModeBtn.classList.add('active');
        document.querySelector('.digital-bg').style.display = 'none';
        document.querySelector('.digital-grid').style.display = 'none';
        document.querySelector('.digital-particles').style.display = 'none';
    }
    
    localStorage.setItem('preferredStyleMode', mode);
}

function initStyleSelector() {
    setStyleMode(CONFIG.defaultStyleMode);
    
    normalModeBtn.addEventListener('click', () => setStyleMode('normal'));
    digitalModeBtn.addEventListener('click', () => setStyleMode('digital'));
    darkModeBtn.addEventListener('click', () => setStyleMode('dark'));
}

function initDigitalEffects() {
    createEnhancedParticles();
    
    digitalModeBtn.addEventListener('click', () => {
        setTimeout(createEnhancedParticles, 100);
    });
}

function createEnhancedParticles() {
    if (!document.body.classList.contains('digital-mode')) {
        return;
    }
    
    const particlesContainer = document.querySelector('.digital-particles');
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const sunParticle = document.createElement('div');
        sunParticle.className = 'particle sun';
        sunParticle.style.width = `${Math.random() * 40 + 20}px`;
        sunParticle.style.height = sunParticle.style.width;
        sunParticle.style.left = `${Math.random() * 100}%`;
        sunParticle.style.top = `${Math.random() * 100}%`;
        sunParticle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        sunParticle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(sunParticle);
    }
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 15 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particlesContainer.appendChild(particle);
    }
}

function updateConnectionStatus() {
    if (navigator.onLine) {
        connectionStatus.className = 'connection-status online-status-badge';
        connectionStatus.innerHTML = '<i class="fas fa-wifi"></i> Online';
        connectionStatus.style.display = 'flex';
        isOfflineMode = false;
        
        const offlineIndicator = document.querySelector('.offline-indicator');
        if (offlineIndicator) {
            offlineIndicator.remove();
        }
    } else {
        connectionStatus.className = 'connection-status offline-status-badge';
        connectionStatus.innerHTML = '<i class="fas fa-wifi-slash"></i> Offline';
        connectionStatus.style.display = 'flex';
        isOfflineMode = true;
        
        if (!document.querySelector('.offline-indicator')) {
            const offlineIndicator = document.createElement('div');
            offlineIndicator.className = 'offline-indicator';
            offlineIndicator.innerHTML = '<i class="fas fa-wifi-slash"></i> You are currently offline';
            document.body.appendChild(offlineIndicator);
        }
        
        const hasDownloadedVideos = checkOfflineVideos();
        if (!hasDownloadedVideos) {
            setTimeout(() => {
                noInternetModal.style.display = 'flex';
            }, 1000);
        }
    }
    
    renderVideoLibraryWithDownloads();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showScreen,
        setStyleMode,
        initStyleSelector,
        initDigitalEffects,
        updateConnectionStatus
    };
}