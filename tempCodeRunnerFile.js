'use strict';

// Security: Prevent global scope pollution
(function() {
  'use strict';
  
  // Security: Disable eval and Function constructor
  const originalEval = window.eval;
  const originalFunction = window.Function;
  window.eval = function() { throw new Error('eval is disabled for security'); };
  window.Function = function() { throw new Error('Function constructor is disabled for security'); };
  
  // Security: Disable console in production (optional)
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
  }

  // Security: Rate limiting for click events
  let lastClickTime = 0;
  const CLICK_THROTTLE = 300; // ms
  
  // Security: Input validation and sanitization
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
    return input.replace(/[<>'"&]/g, function(match) {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[match];
    });
}

  // Security: Safe DOM manipulation
function safeQuerySelector(selector) {
  try {
      if (typeof selector !== 'string' || selector.length > 100) {
        console.warn('Invalid selector length or type');
        return null;
      }
    return document.querySelector(selector);
  } catch (error) {
    console.warn('Invalid selector:', selector);
    return null;
  }
}

function safeGetElementById(id) {
  try {
      const sanitizedId = sanitizeInput(id);
      if (!sanitizedId || sanitizedId.length > 50) {
        console.warn('Invalid element ID');
        return null;
      }
      return document.getElementById(sanitizedId);
  } catch (error) {
    console.warn('Invalid element ID:', id);
    return null;
  }
}

  // Security: Validate video elements
  function validateVideoElement(video) {
    if (!video || !(video instanceof HTMLVideoElement)) {
      return false;
    }
    return true;
  }

  // Security: Safe time setting with bounds checking
  function setVideoTimeSafely(video, time) {
    if (!validateVideoElement(video)) return;
    
    const maxTime = 480; // Maximum allowed time
    const safeTime = Math.max(0, Math.min(time, maxTime));
    
    try {
      if (video.readyState >= 2) {
        video.currentTime = safeTime;
      } else {
        video.addEventListener('loadedmetadata', function() {
          video.currentTime = safeTime;
        }, { once: true });
      }
    } catch (error) {
      console.warn('Error setting video time:', error);
    }
  }

  // State management with security
  const state = {
    isAnimating: false,
    isWorksMode: false,
    isLoaded: false,
    isTransitioning: false,
    lastClickTime: 0
  };

  // Security: Rate limiting function
  function isRateLimited() {
    const now = Date.now();
    if (now - state.lastClickTime < CLICK_THROTTLE) {
      return true;
    }
    state.lastClickTime = now;
    return false;
  }

function initLoading() {
  const loadingScreen = safeGetElementById('loadingScreen');
  const progressBar = safeGetElementById('progressBar');
  const bgVideo = safeGetElementById('bgVideo');
  const blackOverlay = safeGetElementById('blackOverlay');
  
  if (!loadingScreen || !progressBar || !bgVideo || !blackOverlay) {
    console.error('Required elements not found');
    return;
  }
  
  setRandomVideoTime();
  
  let progress = 0;
  const targetProgress = 100;
  const progressStep = 2;
  
  const progressInterval = setInterval(() => {
    progress += progressStep;
      if (progressBar && progressBar.style) {
    progressBar.style.width = progress + '%';
      }
    
    if (progress >= targetProgress) {
      clearInterval(progressInterval);
      
      setTimeout(() => {
          if (loadingScreen && loadingScreen.classList) {
        loadingScreen.classList.add('hidden');
          }
        
        setTimeout(() => {
          startVideoAnimation();
        }, 500);
      }, 500);
    }
  }, 50);
}

function startVideoAnimation() {
  const bgVideo = safeQuerySelector('.bg-video');
  const button = safeGetElementById('worksButton');
  const blackOverlay = safeGetElementById('blackOverlay');

  if (!bgVideo || !button || !blackOverlay) {
    console.error('Required elements not found for video animation');
    return;
  }

  setTimeout(() => {
      if (bgVideo.classList) bgVideo.classList.add('loaded');
      if (button.classList) button.classList.add('loaded');
      if (blackOverlay.classList) blackOverlay.classList.add('hidden');
      state.isLoaded = true;
  }, 500);
}

function setRandomVideoTime() {
  const videos = document.querySelectorAll('video');
  if (videos.length < 4) {
    console.error('Not enough video elements found');
    return;
  }
  
  const videoDuration = 480;
  const bgTime = Math.random() * (videoDuration - 60);
  const leftTime = Math.random() * (videoDuration - 60);
  const rightTime = Math.random() * (videoDuration - 60);
  
  videos.forEach((video, index) => {
      if (!validateVideoElement(video)) return;
    
      let targetTime;
      if (index === 0 || index === 1) targetTime = bgTime;
      else if (index === 2) targetTime = leftTime;
      else if (index === 3) targetTime = rightTime;
      else return;
      
      setVideoTimeSafely(video, targetTime);
  });
}

function fadeVolume(video, targetVolume, duration) {
  return new Promise((resolve) => {
      if (!validateVideoElement(video) || typeof video.volume !== 'number') {
      resolve();
      return;
    }
    
    const startVolume = video.volume;
    const volumeChange = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = volumeChange / steps;
    
    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
      currentStep++;
        video.volume = Math.max(0, Math.min(1, startVolume + (volumeStep * currentStep)));
      
      if (currentStep >= steps) {
          video.volume = Math.max(0, Math.min(1, targetVolume));
        clearInterval(fadeInterval);
        resolve();
      }
    }, stepDuration);
  });
}

async function toggleWorksMode() {
    if (!state.isLoaded || state.isTransitioning || isRateLimited()) return;
  
    state.isTransitioning = true;
  
  const bgVideo = safeQuerySelector('.bg-video');
  const mainVideo = safeQuerySelector('.main-video');
  const leftVideo = safeQuerySelector('.side-video-left');
  const rightVideo = safeQuerySelector('.side-video-right');
  const content = safeQuerySelector('.content');
  const subtitle = safeQuerySelector('.subtitle');
  const button = safeGetElementById('worksButton');

  if (!bgVideo || !content || !subtitle || !button) {
    console.error('Required elements not found for toggle');
      state.isTransitioning = false;
    return;
  }

  try {
      if (!state.isWorksMode) {
      if (window.innerWidth > 768) {
          if (bgVideo.classList) bgVideo.classList.add('works-mode-desktop');
          if (mainVideo && mainVideo.classList) mainVideo.classList.add('show');
          if (leftVideo && leftVideo.classList) leftVideo.classList.add('show');
          if (rightVideo && rightVideo.classList) rightVideo.classList.add('show');
        
        const videoDuration = 480;
        const leftTime = Math.random() * (videoDuration - 60);
        const rightTime = Math.random() * (videoDuration - 60);
        
          setVideoTimeSafely(mainVideo, bgVideo.currentTime);
          setVideoTimeSafely(leftVideo, leftTime);
          setVideoTimeSafely(rightVideo, rightTime);
      } else {
          if (bgVideo.classList) bgVideo.classList.add('works-mode');
      }
      
        if (content.classList) content.classList.add('hidden');
        if (subtitle.classList) subtitle.classList.add('hidden');
        if (button.classList) button.classList.add('active');
      bgVideo.muted = false;
      await fadeVolume(bgVideo, 0.7, 1);
        state.isWorksMode = true;
    } else {
        if (bgVideo.classList) bgVideo.classList.remove('works-mode', 'works-mode-desktop');
        if (mainVideo && mainVideo.classList) mainVideo.classList.remove('show');
        if (leftVideo && leftVideo.classList) leftVideo.classList.remove('show');
        if (rightVideo && rightVideo.classList) rightVideo.classList.remove('show');
        if (content.classList) content.classList.remove('hidden');
        if (subtitle.classList) subtitle.classList.remove('hidden');
        if (button.classList) button.classList.remove('active');
      await fadeVolume(bgVideo, 0, 1);
      bgVideo.muted = true;
        state.isWorksMode = false;
    }
  } catch (error) {
    console.error('Error in toggleWorksMode:', error);
  }
  
  setTimeout(() => {
      state.isTransitioning = false;
  }, 500);
}

function handleClick(e) {
    if (!state.isLoaded || state.isAnimating || isRateLimited()) return;
  
  const target = e.target;
  if (!target || target.id === 'worksButton') return;
  
  if (target.tagName === 'A') return;
  
    state.isAnimating = true;
  
  const video = safeQuerySelector('.bg-video');
  const heart = safeQuerySelector('.heart');
  const content = safeQuerySelector('.content');
  const subtitle = safeQuerySelector('.subtitle');
  const thankYou = safeQuerySelector('.thank-you');
  const button = safeGetElementById('worksButton');
  
  if (!video || !heart || !content || !subtitle || !thankYou || !button) {
    console.error('Required elements not found for click animation');
      state.isAnimating = false;
    return;
  }
  
    if (button.classList) button.classList.add('hidden');
  
    if (state.isWorksMode && video.classList) {
    video.classList.add('clicked');
  }
    if (content.classList) content.classList.add('hidden');
    if (subtitle.classList) subtitle.classList.add('hidden');
    
    setTimeout(() => {
      if (heart.classList) heart.classList.add('show');
      
      setTimeout(() => {
        if (heart.classList) heart.classList.add('move-up');
        if (thankYou.classList) thankYou.classList.add('show');
    }, 500);
  }, 300);
    
    setTimeout(() => {
      if (thankYou.classList) thankYou.classList.remove('show');
      if (heart.classList) heart.classList.remove('show', 'move-up');
      
      setTimeout(() => {
        if (state.isWorksMode) {
          if (video.classList) video.classList.remove('clicked');
          if (content.classList) content.classList.add('hidden');
          if (subtitle.classList) subtitle.classList.add('hidden');
        } else {
          if (content.classList) content.classList.remove('hidden');
          if (subtitle.classList) subtitle.classList.remove('hidden');
        }
        if (button.classList) button.classList.remove('hidden');
        
        setTimeout(() => {
          state.isAnimating = false;
      }, 500);
    }, 500);
  }, 2500);
}

  // Security: Event listener with error handling
  function addSecureEventListener(element, event, handler) {
    if (!element || !handler) return;
    
    try {
      element.addEventListener(event, handler, { passive: true });
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
  initLoading();
  
  const worksButton = safeGetElementById('worksButton');
  if (worksButton) {
        addSecureEventListener(worksButton, 'click', toggleWorksMode);
  }
  
      addSecureEventListener(document, 'click', handleClick);
});
  } else {
    initLoading();
    
    const worksButton = safeGetElementById('worksButton');
    if (worksButton) {
      addSecureEventListener(worksButton, 'click', toggleWorksMode);
    }
    
    addSecureEventListener(document, 'click', handleClick);
  }

  // Security: Global error handling
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
    // Prevent error propagation
    e.preventDefault();
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
    // Prevent rejection propagation
    e.preventDefault();
  });

  // Security: Prevent right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Security: Prevent keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Prevent F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')) {
      e.preventDefault();
    }
  });

})(); 