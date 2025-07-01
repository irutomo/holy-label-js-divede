/**
 * HOLY LABEL - Animation Manager Library
 * Advanced animation and intersection observer management
 * @version 1.0.0
 * @namespace window.HolyLabelAnimationManager
 * @requires window.HolyLabelDOMUtils, window.HolyLabelAnimationConfig
 */

(function(window) {
    'use strict';
    
    const AnimationManager = {
        // インターセクションオブザーバーのインスタンス管理
        observers: new Map(),
        
        createObserver(callback, options = {}) {
            const defaultOptions = {
                threshold: 0.1,
                rootMargin: '50px'
            };
            return new IntersectionObserver(callback, { ...defaultOptions, ...options });
        },
        
        initRelatedProducts() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const AnimationConfig = window.HolyLabelAnimationConfig || window.AnimationConfig;
            
            const relatedItems = DOMUtils.getAll('.related-product-item');
            if (relatedItems.length === 0) return;
            
            const observer = this.createObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            relatedItems.forEach((item, index) => {
                Object.assign(item.style, {
                    opacity: '0',
                    transform: 'translateY(30px)',
                    transition: `opacity ${AnimationConfig.TRANSITION_DURATION} ease ${index * AnimationConfig.STAGGER_DELAY}s, transform ${AnimationConfig.TRANSITION_DURATION} ease ${index * AnimationConfig.STAGGER_DELAY}s`
                });
                observer.observe(item);
            });
            
            this.observers.set('relatedProducts', observer);
        },
        
        animateOnScroll() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const AnimationConfig = window.HolyLabelAnimationConfig || window.AnimationConfig;
            
            const items = DOMUtils.getAll('.product-item:not(.scroll-animated)');
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - AnimationConfig.SCROLL_THRESHOLD && rect.bottom > 0;
                if (isVisible) item.classList.add('scroll-animated');
            });
        },
        
        initHomepageAnimation() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const PageState = window.HolyLabelPageState || window.PageState;
            const AnimationConfig = window.HolyLabelAnimationConfig || window.AnimationConfig;
            
            if (!PageState.isHomePage()) return;
            
            const heroImage = DOMUtils.get('.hero-image');
            if (heroImage) {
                setTimeout(() => heroImage.classList.add('fade-in'), AnimationConfig.FADE_DELAY);
            }
        },
        
        // プロダクトアイテムのフェードイン
        initProductItems() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const AnimationConfig = window.HolyLabelAnimationConfig || window.AnimationConfig;
            
            const productItems = DOMUtils.getAll('.product-item');
            if (productItems.length === 0) return;
            
            const observer = this.createObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            productItems.forEach((item, index) => {
                item.style.animationDelay = `${index * AnimationConfig.STAGGER_DELAY}s`;
                observer.observe(item);
            });
            
            this.observers.set('productItems', observer);
        },
        
        // メイン初期化
        init() {
            this.initHomepageAnimation();
            this.initRelatedProducts();
            this.initProductItems();
            
            // スクロールアニメーション
            window.addEventListener('scroll', this.throttle(() => {
                this.animateOnScroll();
            }, 100));
        },
        
        // スロットリング関数
        throttle(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
                const context = this;
                const args = arguments;
                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        },
        
        // クリーンアップ
        destroy() {
            this.observers.forEach(observer => observer.disconnect());
            this.observers.clear();
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelAnimationManager = AnimationManager;
    
    // 後方互換性のため
    if (!window.AnimationManager) {
        window.AnimationManager = AnimationManager;
    }
    
})(window);