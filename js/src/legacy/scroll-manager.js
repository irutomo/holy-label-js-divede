/**
 * HOLY LABEL - Scroll Manager Library
 * Optimized scroll event handling and performance management
 * @version 1.0.0
 * @namespace window.HolyLabelScrollManager
 */

(function(window) {
    'use strict';
    
    const ScrollManager = {
        scrollTimeout: null,
        lastScrollY: 0,
        isScrolling: false,
        fps: 60,
        frameDelay: 1000 / 60, // ~16ms for 60fps
        
        init() {
            this.initScrollListener();
            this.initPerformanceOptimization();
        },
        
        initScrollListener() {
            let ticking = false;
            
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.onScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            // パッシブリスナーでパフォーマンス向上
            window.addEventListener('scroll', handleScroll, { passive: true });
        },
        
        onScroll() {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
            
            // アニメーション処理
            this.handleScrollAnimations();
            
            // ロゴ位置制御
            this.handleLogoPosition();
            
            // カスタムスクロールイベント発火
            this.dispatchCustomScrollEvent(scrollDirection, currentScrollY);
            
            this.lastScrollY = currentScrollY;
        },
        
        handleScrollAnimations() {
            const AnimationManager = window.HolyLabelAnimationManager || window.AnimationManager;
            
            if (AnimationManager && AnimationManager.animateOnScroll) {
                AnimationManager.animateOnScroll();
            }
        },
        
        handleLogoPosition() {
            const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
            
            if (LogoManager && LogoManager.handleScroll) {
                LogoManager.handleScroll();
            }
        },
        
        // デバウンス処理付きスクロールハンドラー
        debounceScroll(callback, delay = this.frameDelay) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            
            this.scrollTimeout = setTimeout(() => {
                callback();
                this.scrollTimeout = null;
            }, delay);
        },
        
        // スロットル処理付きスクロールハンドラー
        throttleScroll(callback, limit = this.frameDelay) {
            if (this.isScrolling) return;
            
            this.isScrolling = true;
            setTimeout(() => {
                callback();
                this.isScrolling = false;
            }, limit);
        },
        
        // カスタムスクロールイベントの発火
        dispatchCustomScrollEvent(direction, scrollY) {
            const event = new CustomEvent('holyLabelScroll', {
                detail: {
                    direction,
                    scrollY,
                    scrollProgress: this.getScrollProgress()
                }
            });
            document.dispatchEvent(event);
        },
        
        // スクロール進捗を取得（0-1の値）
        getScrollProgress() {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = documentHeight - windowHeight;
            
            return maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        },
        
        // パフォーマンス最適化設定
        initPerformanceOptimization() {
            // IntersectionObserver for visible elements
            this.setupVisibilityObserver();
            
            // Passive scroll listeners
            this.optimizeScrollListeners();
        },
        
        setupVisibilityObserver() {
            if (!window.IntersectionObserver) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-viewport');
                    } else {
                        entry.target.classList.remove('in-viewport');
                    }
                });
            }, {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '50px'
            });
            
            // 監視対象要素の自動追加
            const observeElements = document.querySelectorAll(
                '.product-item, .hero-image, .main-visual, section'
            );
            observeElements.forEach(el => observer.observe(el));
        },
        
        optimizeScrollListeners() {
            // 既存のスクロールリスナーを最適化
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            EventTarget.prototype.addEventListener = function(type, listener, options) {
                if (type === 'scroll' && this === window) {
                    // スクロールイベントを自動でパッシブ化
                    const newOptions = typeof options === 'object' ? 
                        { ...options, passive: true } : 
                        { passive: true };
                    return originalAddEventListener.call(this, type, listener, newOptions);
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
        },
        
        // スムーススクロール機能
        smoothScrollTo(target, duration = 1000) {
            const targetElement = typeof target === 'string' ? 
                document.querySelector(target) : target;
            
            if (!targetElement) return;
            
            const startPosition = window.scrollY;
            const targetPosition = targetElement.offsetTop;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // イージング関数（ease-out-cubic）
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                window.scrollTo(0, startPosition + distance * easeProgress);
                
                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };
            
            requestAnimationFrame(animation);
        },
        
        // 現在のスクロール位置情報を取得
        getScrollInfo() {
            return {
                scrollY: window.scrollY,
                scrollX: window.scrollX,
                progress: this.getScrollProgress(),
                direction: this.lastScrollY < window.scrollY ? 'down' : 'up',
                isAtTop: window.scrollY === 0,
                isAtBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
            };
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelScrollManager = ScrollManager;
    
    // 後方互換性のため
    if (!window.ScrollManager) {
        window.ScrollManager = ScrollManager;
    }
    
    // 自動初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ScrollManager.init());
    } else {
        ScrollManager.init();
    }
    
})(window);