/**
 * HOLY LABEL - Initialization Manager Library
 * Application initialization and startup management
 * @version 1.0.0
 * @namespace window.HolyLabelInitializationManager
 */

(function(window) {
    'use strict';
    
    const InitializationManager = {
        initialized: false,
        
        init() {
            if (this.initialized) return;
            
            // メイン初期化
            this.initializeCore();
            
            // 基本機能初期化
            this.initializeBasicFeatures();
            
            // アニメーション初期化
            this.initializeAnimations();
            
            // 機能初期化
            this.initializeFeatures();
            
            // DOM変更監視
            this.initializeDOMObserver();
            
            // スクロールアニメーション初期化
            this.initializeScrollAnimations();
            
            // カスタム言語切り替えUIの初期化
            this.initializeLanguageSwitcher();
            
            this.initialized = true;
        },
        
        initializeCore() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            if (DOMUtils && DOMUtils.body) {
                DOMUtils.body().classList.add('loaded');
            }
        },
        
        initializeBasicFeatures() {
            const NavigationManager = window.HolyLabelNavigationManager || window.NavigationManager;
            const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
            
            if (NavigationManager) {
                NavigationManager.close();
                NavigationManager.init();
            }
            
            if (LogoManager) {
                LogoManager.updatePosition();
                if (LogoManager.initCategoryDisplay) {
                    LogoManager.initCategoryDisplay();
                }
                if (LogoManager.controlInstagramButton) {
                    LogoManager.controlInstagramButton();
                }
            }
            
            // レガシー関数のサポート
            if (window.initCategoryDisplay) {
                window.initCategoryDisplay();
            }
            if (window.controlInstagramButton) {
                window.controlInstagramButton();
            }
        },
        
        initializeAnimations() {
            const AnimationManager = window.HolyLabelAnimationManager || window.AnimationManager;
            
            if (AnimationManager) {
                if (AnimationManager.initRelatedProducts) {
                    AnimationManager.initRelatedProducts();
                }
                if (AnimationManager.initHomepageAnimation) {
                    AnimationManager.initHomepageAnimation();
                }
            }
        },
        
        initializeFeatures() {
            const LoadMoreManager = window.HolyLabelLoadMoreManager || window.LoadMoreManager;
            const ProductGallery = window.HolyLabelProductGallery || window.ProductImageGallery;
            const ModalUtils = window.HolyLabelModalUtils;
            
            if (LoadMoreManager && LoadMoreManager.init) {
                LoadMoreManager.init();
            }
            
            if (ProductGallery && ProductGallery.init) {
                ProductGallery.init();
            }
            
            if (ModalUtils && ModalUtils.init) {
                ModalUtils.init();
            }
            
            // レガシー関数のサポート
            if (window.initRestockNotificationModal) {
                window.initRestockNotificationModal();
            }
        },
        
        initializeDOMObserver() {
            if (!window.MutationObserver) return;
            
            const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
            
            const observer = new MutationObserver((mutations) => {
                let shouldRecheck = false;
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') shouldRecheck = true;
                });
                
                if (shouldRecheck && LogoManager && LogoManager.updatePosition) {
                    setTimeout(() => LogoManager.updatePosition(), 100);
                }
            });
            
            observer.observe(document.body, { 
                childList: true, 
                subtree: true 
            });
        },
        
        initializeScrollAnimations() {
            const AnimationManager = window.HolyLabelAnimationManager || window.AnimationManager;
            
            if (AnimationManager && AnimationManager.animateOnScroll) {
                setTimeout(() => AnimationManager.animateOnScroll(), 500);
            }
        },
        
        initializeLanguageSwitcher() {
            const LanguageManager = window.HolyLabelLanguageManager;
            if (LanguageManager && LanguageManager.init) {
                LanguageManager.init();
            } else {
                // フォールバック：基本的な言語切り替え初期化
                setTimeout(() => {
                    if (window.initCustomLanguageSwitcher) {
                        window.initCustomLanguageSwitcher();
                    }
                }, 100);
            }
        },
        
        // デバッグ用
        getStatus() {
            return {
                initialized: this.initialized,
                availableManagers: {
                    dom: !!(window.HolyLabelDOMUtils || window.DOMUtils),
                    navigation: !!(window.HolyLabelNavigationManager || window.NavigationManager),
                    logo: !!(window.HolyLabelLogoManager || window.LogoManager),
                    animation: !!(window.HolyLabelAnimationManager || window.AnimationManager),
                    loadMore: !!(window.HolyLabelLoadMoreManager || window.LoadMoreManager),
                    gallery: !!(window.HolyLabelProductGallery || window.ProductImageGallery),
                    modal: !!window.HolyLabelModalUtils,
                    language: !!window.HolyLabelLanguageManager
                }
            };
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelInitializationManager = InitializationManager;
    
    // 後方互換性のため
    if (!window.InitializationManager) {
        window.InitializationManager = InitializationManager;
    }
    
    // DOMContentLoaded時の自動初期化
    const initializeOnReady = () => {
        InitializationManager.init();
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeOnReady);
    } else {
        // すでにDOMが読み込まれている場合は即座に実行
        setTimeout(initializeOnReady, 0);
    }
    
})(window); 