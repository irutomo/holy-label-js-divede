/**
 * HOLY LABEL - Animation Configuration Library
 * Animation timing and configuration management
 * @version 1.0.0
 * @namespace window.HolyLabelAnimationConfig
 */

(function(window) {
    'use strict';
    
    const AnimationConfig = {
        // 基本設定
        FADE_DELAY: 2000,
        STAGGER_DELAY: 0.1,
        SCROLL_THRESHOLD: 100,
        TRANSITION_DURATION: '0.8s',
        
        // デバイス検出
        isMobile: () => window.innerWidth <= 768,
        isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: () => window.innerWidth > 1024,
        
        // レスポンシブ対応の設定
        getResponsiveConfig() {
            if (this.isMobile()) {
                return {
                    staggerDelay: 0.08,
                    fadeDelay: 1500,
                    transitionDuration: '0.6s',
                    scrollThreshold: 50
                };
            } else if (this.isTablet()) {
                return {
                    staggerDelay: 0.09,
                    fadeDelay: 1800,
                    transitionDuration: '0.7s',
                    scrollThreshold: 75
                };
            } else {
                return {
                    staggerDelay: this.STAGGER_DELAY,
                    fadeDelay: this.FADE_DELAY,
                    transitionDuration: this.TRANSITION_DURATION,
                    scrollThreshold: this.SCROLL_THRESHOLD
                };
            }
        },
        
        // CSS変数設定
        applyCSSVariables() {
            const config = this.getResponsiveConfig();
            const root = document.documentElement;
            
            root.style.setProperty('--animation-duration', config.transitionDuration);
            root.style.setProperty('--stagger-delay', `${config.staggerDelay}s`);
            root.style.setProperty('--fade-delay', `${config.fadeDelay}ms`);
        },
        
        // イージング関数
        easing: {
            easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
            easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
            easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        
        // 初期化
        init() {
            this.applyCSSVariables();
            
            // リサイズ時の再設定
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.applyCSSVariables();
                }, 250);
            });
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelAnimationConfig = AnimationConfig;
    
    // 後方互換性のため
    if (!window.AnimationConfig) {
        window.AnimationConfig = AnimationConfig;
    }
    
})(window); 