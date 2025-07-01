/*! 
 * HOLY LABEL JavaScript - All-in-One Source File
 * BASE専用ECテーマの統合JavaScriptライブラリ
 * Version: 2.0.0
 * Description: 12個のJavaScriptソースファイルを統合し、開発効率を劇的向上
 * Repository: https://github.com/irutomo/holy-label-js-divede
 * License: MIT
 * Build Date: 2024-07-01
 * 
 * Consolidated from:
 * - dom-utils.js (DOM操作基盤)
 * - page-state.js (ページ状態管理)
 * - animation-config.js (アニメーション設定)
 * - animation-manager.js (アニメーション管理)
 * - navigation-manager.js (ナビゲーション管理)
 * - modal-utils.js (モーダル機能)
 * - product-gallery.js (商品ギャラリー)
 * - loadmore-manager.js (Ajax読み込み)
 * - logo-manager.js (ロゴ管理)
 * - initialization-manager.js (初期化管理)
 * - language-manager.js (多言語管理)
 * - scroll-manager.js (スクロール管理)
 * 
 * Global Variables Preserved:
 * - window.HolyLabelDOMUtils, window.HolyLabelPageState
 * - window.HolyLabelAnimationConfig, window.HolyLabelAnimationManager
 * - window.HolyLabelNavigationManager, window.HolyLabelModalUtils
 * - window.HolyLabelProductGallery, window.HolyLabelLoadMoreManager
 * - window.HolyLabelLogoManager, window.HolyLabelInitializationManager
 * - window.HolyLabelLanguageManager, window.HolyLabelScrollManager
 */

/* ========== CORE LAYER - 基盤機能 ========== */
/* DOM操作・ページ状態・アニメーション設定 */

/**
 * HOLY LABEL - DOM Utilities Library
 * Core DOM manipulation and caching functionality
 * @version 1.0.0
 * @namespace window.HolyLabelDOMUtils
 */

(function(window) {
    'use strict';
    
    const DOMUtils = {
        // 効率的なDOM要素取得
        get: (selector) => document.querySelector(selector),
        getAll: (selector) => document.querySelectorAll(selector),
        getId: (id) => document.getElementById(id),
        
        // 共通DOM要素キャッシュ
        cache: {},
        getCached: function(key, selector) {
            if (!this.cache[key]) {
                this.cache[key] = this.get(selector);
            }
            return this.cache[key];
        },
        
        // 基本要素のキャッシュ
        hamburger: () => DOMUtils.getCached('hamburger', '#js-humberger'),
        navArea: () => DOMUtils.getCached('navArea', '.js-nav-area'),
        logo: () => DOMUtils.getCached('logo', '.logo'),
        body: () => document.body,
        
        // キャッシュクリア機能
        clearCache: function() {
            this.cache = {};
        },
        
        // 要素存在チェック
        exists: function(selector) {
            return this.get(selector) !== null;
        },
        
        // クラス操作
        addClass: function(element, className) {
            if (element && className) {
                element.classList.add(className);
            }
        },
        
        removeClass: function(element, className) {
            if (element && className) {
                element.classList.remove(className);
            }
        },
        
        toggleClass: function(element, className) {
            if (element && className) {
                element.classList.toggle(className);
            }
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelDOMUtils = DOMUtils;
    
    // 後方互換性のため
    if (!window.DOMUtils) {
        window.DOMUtils = DOMUtils;
    }
    
})(window); 
/**
 * HOLY LABEL - Page State Management Library
 * Page type detection and state management
 * @version 1.0.0
 * @namespace window.HolyLabelPageState
 * @requires window.HolyLabelDOMUtils
 */

(function(window) {
    'use strict';
    
    const PageState = {
        cache: null,
        
        get() {
            if (!this.cache) {
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                
                this.cache = {
                    hasMainVisual: DOMUtils.get('.main-visual') !== null,
                    hasProductDetail: DOMUtils.get('.product-detail') !== null,
                    hasAboutSection: DOMUtils.get('.about-section') !== null,
                    hasCategoryHeader: DOMUtils.get('.category-header') !== null,
                    hasSearchHeader: DOMUtils.get('.search-header') !== null,
                    hasProductSection: DOMUtils.get('.product-section') !== null,
                    isShopTopPage: document.body.id === 'shopTopPage',
                    isShopDetailPage: document.body.id === 'shopDetailPage',
                    isAboutPage: document.body.id === 'aboutPage',
                    isContactPage: document.body.id === 'contactPage',
                    isBlogPage: document.body.id === 'blogPage'
                };
            }
            return this.cache;
        },
        
        isHomePage() {
            const state = this.get();
            return state.isShopTopPage && 
                   state.hasMainVisual && 
                   !state.hasProductDetail && 
                   !state.hasAboutSection && 
                   !state.hasCategoryHeader && 
                   !state.hasSearchHeader &&
                   !state.hasProductSection;
        },
        
        isShopDetailPage() {
            const state = this.get();
            return state.isShopDetailPage || state.hasProductDetail;
        },
        
        hasMainVisual() {
            return this.get().hasMainVisual;
        },
        
        hasProductDetail() {
            return this.get().hasProductDetail;
        },
        
        getPageType() {
            const state = this.get();
            
            if (this.isHomePage()) return 'home';
            if (state.isShopDetailPage) return 'product';
            if (state.isAboutPage) return 'about';
            if (state.isContactPage) return 'contact';
            if (state.isBlogPage) return 'blog';
            
            return 'unknown';
        },
        
        // キャッシュクリア機能
        clearCache() {
            this.cache = null;
        },
        
        // 再計算
        refresh() {
            this.clearCache();
            return this.get();
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelPageState = PageState;
    
    // 後方互換性のため
    if (!window.PageState) {
        window.PageState = PageState;
    }
    
})(window); 
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

/* ========== EXTENDED LAYER - 拡張機能 ========== */
/* アニメーション管理・ナビゲーション・モーダル */

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
/**
 * HOLY LABEL - Navigation Manager Library
 * Mobile navigation and menu controls
 * @version 1.0.0
 * @namespace window.HolyLabelNavigationManager
 * @requires window.HolyLabelDOMUtils
 */

(function(window) {
    'use strict';
    
    const NavigationManager = {
        elements: {
            get hamburger() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.hamburger();
            },
            get navArea() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.navArea();
            },
            get body() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.body();
            }
        },
        
        isActive() {
            return this.elements.hamburger?.classList.contains('-active') || false;
        },
        
        toggle() {
            const { hamburger, navArea, body } = this.elements;
            if (!hamburger || !navArea) return;
            
            const isActive = this.isActive();
            const action = isActive ? 'remove' : 'add';
            
            // 元の仕様に合わせたクラス制御
            [hamburger, navArea].forEach(el => el.classList[action]('-active'));
            body.classList[action]('body-fixed');
            
            // アクセシビリティ属性の更新
            hamburger.setAttribute('aria-expanded', !isActive);
            
            // LogoManagerの位置更新を呼び出し
            setTimeout(() => {
                const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
                if (LogoManager && typeof LogoManager.updatePosition === 'function') {
                    LogoManager.updatePosition();
                }
            }, 10);
        },
        
        close() {
            const { hamburger, navArea, body } = this.elements;
            if (!hamburger || !navArea) return;
            
            [hamburger, navArea].forEach(el => el.classList.remove('-active'));
            body.classList.remove('body-fixed');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // LogoManagerの位置更新
            setTimeout(() => {
                const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
                if (LogoManager && typeof LogoManager.updatePosition === 'function') {
                    LogoManager.updatePosition();
                }
            }, 10);
        },
        
        open() {
            const { hamburger, navArea, body } = this.elements;
            if (!hamburger || !navArea) return;
            
            [hamburger, navArea].forEach(el => el.classList.add('-active'));
            body.classList.add('body-fixed');
            hamburger.setAttribute('aria-expanded', 'true');
            
            // LogoManagerの位置更新
            setTimeout(() => {
                const LogoManager = window.HolyLabelLogoManager || window.LogoManager;
                if (LogoManager && typeof LogoManager.updatePosition === 'function') {
                    LogoManager.updatePosition();
                }
            }, 10);
        },
        
        // サブメニューの制御（元の仕様準拠）
        initSubMenus() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const expandLinks = DOMUtils.getAll('a.expand');
            
            expandLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const exList = link.nextElementSibling;
                    if (exList && exList.classList.contains('ex-list')) {
                        const isOpen = link.classList.contains('open');
                        link.classList.toggle('open', !isOpen);
                        exList.style.display = isOpen ? 'none' : 'block';
                    }
                });
            });
        },
        
        // イベントリスナー設定
        initEventListeners() {
            const { hamburger, navArea } = this.elements;
            
            // ハンバーガーメニューのクリック
            if (hamburger) {
                hamburger.addEventListener('click', () => this.toggle());
            }
            
            // ナビエリア外クリックで閉じる（元の仕様準拠）
            document.addEventListener('click', (event) => {
                if (this.isActive() && 
                    !navArea?.contains(event.target) && 
                    !hamburger?.contains(event.target)) {
                    this.close();
                }
            });
            
            // ESCキーで閉じる
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isActive()) {
                    this.close();
                }
            });
            
            // リサイズ時にナビを閉じる（デスクトップ表示時）
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && this.isActive()) {
                    this.close();
                }
            });
        },
        
        // 言語切り替え機能
        initLanguageSwitcher() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            
            // 言語切り替えボタンのイベント
            window.switchLanguage = (lang) => {
                const langJa = DOMUtils.getId('lang-ja');
                const langEn = DOMUtils.getId('lang-en');
                
                if (langJa && langEn) {
                    if (lang === 'ja') {
                        langJa.classList.add('active');
                        langEn.classList.remove('active');
                    } else if (lang === 'en') {
                        langEn.classList.add('active');
                        langJa.classList.remove('active');
                    }
                }
                
                // 実際の言語切り替え処理は BASE側で処理
                console.log(`Language switched to: ${lang}`);
            };
        },
        
        // メイン初期化
        init() {
            this.initEventListeners();
            this.initSubMenus();
            this.initLanguageSwitcher();
            
            // 初期状態の設定
            this.close();
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelNavigationManager = NavigationManager;
    
    // 後方互換性のため
    if (!window.NavigationManager) {
        window.NavigationManager = NavigationManager;
    }
    
})(window); 
/**
 * HOLY LABEL - Modal Utilities Library
 * Modal styling and initialization utilities
 * @version 1.0.0
 * @namespace window.HolyLabelModalUtils
 */

(function(window) {
    'use strict';
    
    const ModalUtils = {
        // 再入荷通知モーダルの初期化
        initRestockNotificationModal() {
            const style = document.createElement('style');
            style.textContent = `
                .base-restock-modal {
                    background-color: var(--primary-bg) !important;
                    color: var(--primary-text) !important;
                    border: 1px solid var(--border-color) !important;
                }
                .base-restock-modal .modal-header {
                    border-bottom: 1px solid var(--border-color) !important;
                    color: var(--primary-text) !important;
                }
                .base-restock-modal .modal-title {
                    color: var(--primary-text) !important;
                    font-weight: var(--weight-normal) !important;
                    letter-spacing: 1px !important;
                }
                .base-restock-modal .modal-body {
                    color: var(--secondary-text) !important;
                    font-weight: var(--weight-light) !important;
                }
                .base-restock-modal input[type="email"] {
                    background-color: var(--primary-bg) !important;
                    color: var(--primary-text) !important;
                    border: 1px solid var(--border-color) !important;
                    font-weight: var(--weight-light) !important;
                }
                .base-restock-modal input[type="email"]:focus {
                    border-color: var(--accent-color) !important;
                    box-shadow: 0 0 0 1px var(--accent-color) !important;
                }
                .base-restock-modal .btn-primary {
                    background-color: var(--accent-color) !important;
                    border-color: var(--accent-color) !important;
                    color: var(--primary-text) !important;
                    font-weight: var(--weight-normal) !important;
                    letter-spacing: 1px !important;
                }
                .base-restock-modal .btn-primary:hover {
                    background-color: rgba(212, 56, 131, 0.8) !important;
                    border-color: rgba(212, 56, 131, 0.8) !important;
                }
                .base-restock-modal .btn-close {
                    color: var(--secondary-text) !important;
                }
                .base-restock-modal .btn-close:hover {
                    color: var(--primary-text) !important;
                }
            `;
            document.head.appendChild(style);
        },
        
        // 汎用モーダル作成
        createModal(options = {}) {
            const {
                title = '',
                content = '',
                className = '',
                showClose = true,
                backdrop = true
            } = options;
            
            const modal = document.createElement('div');
            modal.className = `modal fade ${className}`;
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('role', 'dialog');
            
            modal.innerHTML = `
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        ${title ? `
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                ${showClose ? '<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>' : ''}
                            </div>
                        ` : ''}
                        <div class="modal-body">
                            ${content}
                        </div>
                    </div>
                </div>
            `;
            
            if (backdrop) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
            
            if (showClose) {
                const closeBtn = modal.querySelector('.btn-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.closeModal(modal));
                }
            }
            
            return modal;
        },
        
        // モーダルを開く
        openModal(modal) {
            document.body.appendChild(modal);
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
            document.body.classList.add('modal-open');
        },
        
        // モーダルを閉じる
        closeModal(modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                document.body.classList.remove('modal-open');
            }, 300);
        },
        
        // 確認ダイアログ
        confirm(message, callback) {
            const modal = this.createModal({
                title: 'Confirmation',
                content: `
                    <p>${message}</p>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
                        <button type="button" class="btn btn-primary confirm-btn">OK</button>
                    </div>
                `
            });
            
            const cancelBtn = modal.querySelector('.cancel-btn');
            const confirmBtn = modal.querySelector('.confirm-btn');
            
            cancelBtn.addEventListener('click', () => {
                this.closeModal(modal);
                if (callback) callback(false);
            });
            
            confirmBtn.addEventListener('click', () => {
                this.closeModal(modal);
                if (callback) callback(true);
            });
            
            this.openModal(modal);
        },
        
        // アラートダイアログ
        alert(message, callback) {
            const modal = this.createModal({
                title: 'Notice',
                content: `
                    <p>${message}</p>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-primary ok-btn">OK</button>
                    </div>
                `
            });
            
            const okBtn = modal.querySelector('.ok-btn');
            okBtn.addEventListener('click', () => {
                this.closeModal(modal);
                if (callback) callback();
            });
            
            this.openModal(modal);
        },
        
        // 初期化
        init() {
            this.initRestockNotificationModal();
            
            // ESCキーでモーダルを閉じる
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal.show');
                    if (openModal) {
                        this.closeModal(openModal);
                    }
                }
            });
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelModalUtils = ModalUtils;
    
    // 後方互換性のため
    window.initRestockNotificationModal = ModalUtils.initRestockNotificationModal;
    
})(window); 

/* ========== ADVANCED LAYER - 高度機能 ========== */
/* 商品ギャラリー・Ajax読み込み・ロゴ管理 */

/**
 * HOLY LABEL - Product Image Gallery Library
 * Advanced product image gallery with carousel and zoom functionality
 * @version 1.0.0
 * @namespace window.HolyLabelProductGallery
 * @requires window.HolyLabelDOMUtils
 */

(function(window) {
    'use strict';
    
    const ProductImageGallery = {
        // プロパティ
        currentIndex: 0,
        images: [],
        isScrolling: false, // スクロール中フラグを追加
        elements: {
            mainContainer: null,
            thumbnailContainer: null,
            counter: null,
        },

        // 初期化
        init() {
            console.log('HolyLabelProductGallery.init() called');
            
            this.elements.mainContainer = document.getElementById('mainImageContainer');
            this.elements.thumbnailContainer = document.getElementById('thumbnailContainer');
            this.elements.counter = document.getElementById('imageCounter');

            console.log('Found elements:', {
                mainContainer: !!this.elements.mainContainer,
                thumbnailContainer: !!this.elements.thumbnailContainer,
                counter: !!this.elements.counter
            });

            this.collectImages();
            console.log('Collected images:', this.images.length);
            
            if (this.images.length === 0) {
                console.log('No images found, exiting');
                return;
            }

            // デスクトップ版用の画像を先に作成
            this.createDesktopImage();
            
            // モバイル版用の複雑画像システム
            if (this.elements.mainContainer && this.elements.thumbnailContainer) {
                this.renderImages();
                this.addEventListeners();
                this.updateUI();
                console.log('Mobile gallery system initialized');
                
                // 🚨 追加チェック：サムネイル表示状態を確認
                setTimeout(() => {
                    console.log('🔍 5秒後のサムネイル状態チェック:');
                    const container = document.getElementById('thumbnailContainer');
                    if (container) {
                        console.log('サムネイルコンテナ状態:', {
                            display: window.getComputedStyle(container).display,
                            visibility: window.getComputedStyle(container).visibility,
                            opacity: window.getComputedStyle(container).opacity,
                            height: window.getComputedStyle(container).height,
                            childCount: container.children.length,
                            innerHTML: container.innerHTML.length > 0 ? '内容あり' : '内容なし'
                        });
                        
                        // モバイルでサムネイルが表示されていない場合の緊急対応
                        if (window.innerWidth <= 768 && window.getComputedStyle(container).display === 'none') {
                            console.log('🚨 緊急修正: サムネイルが非表示状態です！強制表示します');
                            container.style.setProperty('display', 'flex', 'important');
                            container.style.setProperty('visibility', 'visible', 'important');
                            container.style.setProperty('opacity', '1', 'important');
                            container.style.setProperty('height', 'auto', 'important');
                        }
                    } else {
                        console.error('❌ サムネイルコンテナが見つかりません！');
                    }
                }, 5000);
            }
            
            console.log('ProductGallery initialization completed');
        },

        // デスクトップ版用の画像表示
        createDesktopImage() {
            const productDetailImage = document.querySelector('.product-detail-image');
            if (!productDetailImage || this.images.length === 0) return;
            
            // デスクトップ版の場合、メイン画像表示領域を作成
            if (window.innerWidth > 768) {
                // 既存のデスクトップ画像があれば削除
                const existingImage = productDetailImage.querySelector('.desktop-main-image');
                if (existingImage) {
                    existingImage.remove();
                }
                
                // メイン画像表示コンテナを作成
                const imageContainer = document.createElement('div');
                imageContainer.className = 'desktop-image-container';
                imageContainer.innerHTML = `
                    <img src="${this.images[0].main}" 
                         alt="${document.querySelector('.product-detail-title')?.textContent || '商品画像'}" 
                         class="desktop-main-image"
                         data-index="0">
                    ${this.images.length > 1 ? `
                    <button class="desktop-nav prev" onclick="window.HolyLabelProductGallery.goToImage(${this.currentIndex - 1})">‹</button>
                    <button class="desktop-nav next" onclick="window.HolyLabelProductGallery.goToImage(${this.currentIndex + 1})">›</button>
                    <div class="desktop-indicators">
                        ${this.images.map((_, index) => `
                            <button class="desktop-indicator ${index === 0 ? 'active' : ''}" 
                                    onclick="window.HolyLabelProductGallery.goToImage(${index})"
                                    data-index="${index}"></button>
                        `).join('')}
                    </div>
                    ` : ''}
                `;
                
                productDetailImage.appendChild(imageContainer);
                console.log('Desktop image container created with navigation');
            }
        },

        // デスクトップ版用の画像切り替え
        goToImage(index) {
            if (this.images.length <= 1 || window.innerWidth <= 768) return;
            
            // インデックスの範囲チェック
            if (index < 0) index = this.images.length - 1;
            if (index >= this.images.length) index = 0;
            
            this.currentIndex = index;
            this.updateDesktopImage();
            this.updateDesktopIndicators();
        },

        // デスクトップ版メイン画像を更新
        updateDesktopImage() {
            const desktopImage = document.querySelector('.desktop-main-image');
            if (!desktopImage || window.innerWidth <= 768) return;
            
            const currentImage = this.images[this.currentIndex];
            if (currentImage) {
                desktopImage.src = currentImage.main;
                desktopImage.setAttribute('data-index', this.currentIndex);
                
                // 更新ボタンのイベントハンドラを更新
                const prevBtn = document.querySelector('.desktop-nav.prev');
                const nextBtn = document.querySelector('.desktop-nav.next');
                if (prevBtn) prevBtn.onclick = () => this.goToImage(this.currentIndex - 1);
                if (nextBtn) nextBtn.onclick = () => this.goToImage(this.currentIndex + 1);
            }
        },

        // デスクトップ版インジケータを更新
        updateDesktopIndicators() {
            const indicators = document.querySelectorAll('.desktop-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
                indicator.onclick = () => this.goToImage(index);
            });
        },

        // 画像データの収集
        collectImages() {
            const imageDataElement = document.getElementById('imageData');
            if (!imageDataElement) return;
            
            const imageSpans = imageDataElement.querySelectorAll('span[data-main]');
            this.images = Array.from(imageSpans).map(span => ({
                main: span.getAttribute('data-main'),
                thumb: span.getAttribute('data-thumb')
            })).filter(img => img.main && img.thumb); // 有効な画像のみ
        },

        // 画像とサムネイルの描画
        renderImages() {
            console.log('🎯 renderImages() 開始');
            console.log('画像データ:', this.images);
            console.log('サムネイルコンテナ:', this.elements.thumbnailContainer);
            
            let mainHTML = '';
            let thumbHTML = '';
            const itemTitle = document.querySelector('.product-detail-title')?.textContent || '商品画像';

            this.images.forEach((img, index) => {
                mainHTML += `<div class="main-image-item"><img src="${img.main}" alt="${itemTitle} ${index + 1}"></div>`;
                thumbHTML += `<div class="thumbnail-item" data-index="${index}"><img src="${img.thumb}" alt="${itemTitle} サムネイル ${index + 1}"></div>`;
            });
            
            this.elements.mainContainer.innerHTML = mainHTML;
            this.elements.thumbnailContainer.innerHTML = thumbHTML;
            
            // 🚨 モバイル版でサムネイル表示を強制
            if (window.innerWidth <= 768) {
                console.log('📱 モバイル版検出: サムネイル表示を強制します');
                this.elements.thumbnailContainer.style.display = 'flex !important';
                this.elements.thumbnailContainer.style.visibility = 'visible !important';
                this.elements.thumbnailContainer.style.opacity = '1';
                this.elements.thumbnailContainer.style.height = 'auto';
                this.elements.thumbnailContainer.style.overflow = 'visible';
                
                // 親要素も確認
                const parent = this.elements.thumbnailContainer.parentElement;
                if (parent) {
                    parent.style.display = 'block';
                    parent.style.visibility = 'visible';
                    console.log('親要素も表示設定:', parent.className);
                }
                
                console.log('📱 サムネイル強制表示完了:', {
                    display: this.elements.thumbnailContainer.style.display,
                    childCount: this.elements.thumbnailContainer.children.length,
                    visibility: this.elements.thumbnailContainer.style.visibility
                });
            }
            
            console.log('✅ renderImages() 完了 - サムネイル数:', this.elements.thumbnailContainer.children.length);
        },

        // イベントリスナーの設定
        addEventListeners() {
            // メイン画像のスワイプ（スクロール）を検知（改良版）
            let scrollTimeout;
            this.elements.mainContainer.addEventListener('scroll', () => {
                // 矢印ボタンによるスクロール中は処理をスキップ
                if (this.isScrolling) {
                    return;
                }
                
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                scrollTimeout = setTimeout(() => {
                    const containerWidth = this.elements.mainContainer.offsetWidth;
                    const scrollLeft = this.elements.mainContainer.scrollLeft;
                    const newIndex = Math.round(scrollLeft / containerWidth);
                    
                    // インデックスが範囲内であることを確認
                    const validIndex = Math.max(0, Math.min(newIndex, this.images.length - 1));
                    
                    if (validIndex !== this.currentIndex) {
                        this.currentIndex = validIndex;
                    this.updateUI();
                }
                }, 100); // デバウンス時間を100msに調整
            });

            // サムネイルのクリックを検知
            this.elements.thumbnailContainer.addEventListener('click', (e) => {
                const thumbnail = e.target.closest('.thumbnail-item');
                if (thumbnail) {
                    const index = parseInt(thumbnail.dataset.index, 10);
                    this.scrollToImage(index);
                }
            });

            // 矢印クリック検知（改良版）
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.scrollToImage(this.currentIndex - 1);
                });
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.scrollToImage(this.currentIndex + 1);
                });
            }

            // ズームボタン機能
            const zoomBtn = document.getElementById('zoomBtn');
            if (zoomBtn) {
                zoomBtn.addEventListener('click', () => this.openZoomModal());
            }

            // キーボードナビゲーション
            document.addEventListener('keydown', (e) => {
                if (document.querySelector('.product-detail')) {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.scrollToImage(this.currentIndex - 1);
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.scrollToImage(this.currentIndex + 1);
                    }
                }
            });
        },

        // 特定の画像へスクロール（修正版 - 二重処理防止）
        scrollToImage(index) {
            if (this.images.length === 0 || this.isScrolling) return;
            
            // ループ機能追加
            let newIndex = index;
            if (newIndex < 0) {
                newIndex = this.images.length - 1;
            } else if (newIndex >= this.images.length) {
                newIndex = 0;
            }
            
            // インデックスが変わらない場合は処理しない
            if (newIndex === this.currentIndex) return;
            
            // スクロール中フラグを設定
            this.isScrolling = true;
            this.currentIndex = newIndex;
            
            const containerWidth = this.elements.mainContainer.offsetWidth;
            const scrollPosition = newIndex * containerWidth;
            
            this.elements.mainContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // UIを即座に更新
            this.updateUI();
            
            // スクロール完了後にフラグをリセット（500ms後）
            setTimeout(() => {
                this.isScrolling = false;
            }, 500);
        },

        // ズームモーダルを開く
        openZoomModal() {
            if (this.images.length === 0) return;
            
            const modal = document.createElement('div');
            modal.className = 'zoom-modal';
            modal.innerHTML = `
                <div class="zoom-modal-content">
                    <button class="zoom-close">&times;</button>
                    <img src="${this.images[this.currentIndex].main}" alt="商品画像拡大">
                    <div class="zoom-counter">${this.currentIndex + 1}/${this.images.length}</div>
                    ${this.images.length > 1 ? `
                        <button class="zoom-prev">‹</button>
                        <button class="zoom-next">›</button>
                    ` : ''}
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // ズームモーダルのイベント
            const closeBtn = modal.querySelector('.zoom-close');
            const prevBtn = modal.querySelector('.zoom-prev');
            const nextBtn = modal.querySelector('.zoom-next');
            const img = modal.querySelector('img');
            const counter = modal.querySelector('.zoom-counter');
            
            let zoomIndex = this.currentIndex;
            
            const updateZoomModal = () => {
                img.src = this.images[zoomIndex].main;
                counter.textContent = `${zoomIndex + 1}/${this.images.length}`;
            };
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            });
            
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    zoomIndex = zoomIndex > 0 ? zoomIndex - 1 : this.images.length - 1;
                    updateZoomModal();
                });
                
                nextBtn.addEventListener('click', () => {
                    zoomIndex = zoomIndex < this.images.length - 1 ? zoomIndex + 1 : 0;
                    updateZoomModal();
                });
            }
            
            // ESCキーで閉じる
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeBtn.click();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
            
            // 背景クリックで閉じる
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            });
        },

        // UIの更新
        updateUI() {
            // カウンターの更新
            if (this.elements.counter) {
                if (this.images.length > 1) {
                    this.elements.counter.textContent = `${this.currentIndex + 1}/${this.images.length}`;
                    this.elements.counter.style.display = 'block';
                } else {
                    this.elements.counter.style.display = 'none';
                }
            }
            
            // 矢印ボタンの表示制御
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                if (this.images.length > 1) {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                } else {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }
            }
            
            // サムネイルのアクティブ状態を更新
            const thumbnails = this.elements.thumbnailContainer.querySelectorAll('.thumbnail-item');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === this.currentIndex);
            });

            // アクティブなサムネイルが中央に来るようにスクロール
            const activeThumbnail = thumbnails[this.currentIndex];
            if (activeThumbnail) {
                const container = this.elements.thumbnailContainer;
                const scrollLeft = activeThumbnail.offsetLeft - (container.offsetWidth / 2) + (activeThumbnail.offsetWidth / 2);
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        },

        // レスポンシブ対応
        handleResize() {
            if (this.images.length === 0) return;
            
            // 現在の画像位置を再計算
            const scrollPosition = this.currentIndex * this.elements.mainContainer.offsetWidth;
            this.elements.mainContainer.scrollLeft = scrollPosition;
        },

        // 破棄
        destroy() {
            this.elements = {
                mainContainer: null,
                thumbnailContainer: null,
                counter: null,
            };
            this.images = [];
            this.currentIndex = 0;
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelProductGallery = ProductImageGallery;
    
    // 後方互換性のため
    if (!window.ProductImageGallery) {
        window.ProductImageGallery = ProductImageGallery;
    }
    
    // リサイズ時の対応
    window.addEventListener('resize', () => {
        if (ProductImageGallery.elements.mainContainer) {
            ProductImageGallery.handleResize();
        }
    });
    
})(window); 
/**
 * HOLY LABEL - Load More Manager Library
 * Ajax pagination and load more functionality
 * @version 1.0.0
 * @namespace window.HolyLabelLoadMoreManager
 * @requires window.HolyLabelDOMUtils
 */

(function(window) {
    'use strict';
    
    const LoadMoreManager = {
        elements: {
            get btn() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.getId('load-more-btn');
            },
            get maxPage() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.getId('max_page');
            },
            get nextPage() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.getId('next_page');
            },
            get productGrid() { 
                const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
                return DOMUtils.getId('product-grid');
            }
        },
        
        loading: false,
        
        init() {
            const { btn } = this.elements;
            if (!btn) return;
            
            this.updateButtonVisibility();
            btn.addEventListener('click', () => this.loadMore());
            
            // 無限スクロール機能（オプション）
            this.initInfiniteScroll();
        },
        
        updateButtonVisibility() {
            const { btn, maxPage, nextPage } = this.elements;
            if (!btn || !maxPage || !nextPage) return;
            
            const currentPage = parseInt(nextPage.textContent || '1', 10) - 1;
            const maxPageNum = parseInt(maxPage.textContent || '1', 10);
            
            if (currentPage >= maxPageNum) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'block';
            }
        },
        
        async loadMore() {
            if (this.loading) return;
            
            const { btn, nextPage, productGrid } = this.elements;
            if (!btn || !nextPage || !productGrid) return;
            
            this.loading = true;
            const currentPage = parseInt(nextPage.textContent || '1', 10);
            
            // ローディング状態の表示
            this.setLoadingState(true);
            
            try {
                const response = await this.fetchMoreItems(currentPage);
                if (response.success && response.items) {
                    this.appendItems(response.items);
                    nextPage.textContent = currentPage + 1;
                    this.updateButtonVisibility();
                    
                    // アニメーションを適用
                    this.animateNewItems();
                } else {
                    this.showError('商品の読み込みに失敗しました。');
                }
            } catch (error) {
                console.error('Load more error:', error);
                this.showError('ネットワークエラーが発生しました。');
            } finally {
                this.loading = false;
                this.setLoadingState(false);
            }
        },
        
        async fetchMoreItems(page) {
            // 実際のAPI呼び出し（BASE環境に合わせて調整）
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('page', page);
            
            const response = await fetch(currentUrl.toString(), {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            return this.parseResponse(html);
        },
        
        parseResponse(html) {
            // HTMLレスポンスから商品アイテムを抽出
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.product-item');
            
            return {
                success: items.length > 0,
                items: Array.from(items).map(item => item.outerHTML)
            };
        },
        
        appendItems(itemsHtml) {
            const { productGrid } = this.elements;
            if (!productGrid) return;
            
            const fragment = document.createDocumentFragment();
            
            itemsHtml.forEach(itemHtml => {
                const div = document.createElement('div');
                div.innerHTML = itemHtml;
                const item = div.firstElementChild;
                
                if (item) {
                    // 新しいアイテムにマークを付ける
                    item.classList.add('new-item');
                    fragment.appendChild(item);
                }
            });
            
            productGrid.appendChild(fragment);
        },
        
        animateNewItems() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const AnimationManager = window.HolyLabelAnimationManager || window.AnimationManager;
            
            const newItems = DOMUtils.getAll('.product-item.new-item');
            
            newItems.forEach((item, index) => {
                // 初期状態を設定
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                // 遅延アニメーション
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    
                    // アニメーション完了後にクラスを削除
                    setTimeout(() => {
                        item.classList.remove('new-item');
                        item.style.transition = '';
                    }, 600);
                }, index * 100);
            });
            
            // AnimationManagerのスクロールアニメーション対象に追加
            if (AnimationManager && AnimationManager.animateOnScroll) {
                setTimeout(() => {
                    AnimationManager.animateOnScroll();
                }, 100);
            }
        },
        
        setLoadingState(loading) {
            const { btn } = this.elements;
            if (!btn) return;
            
            if (loading) {
                btn.disabled = true;
                btn.textContent = '読み込み中...';
                btn.classList.add('loading');
            } else {
                btn.disabled = false;
                btn.textContent = 'もっと見る';
                btn.classList.remove('loading');
            }
        },
        
        showError(message) {
            // モーダルライブラリが利用可能な場合は使用
            if (window.HolyLabelModalUtils) {
                window.HolyLabelModalUtils.alert(message);
            } else {
                alert(message);
            }
        },
        
        // 無限スクロール機能
        initInfiniteScroll() {
            if (!this.isInfiniteScrollEnabled()) return;
            
            let ticking = false;
            
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const scrollPosition = window.scrollY + window.innerHeight;
                        const documentHeight = document.documentElement.scrollHeight;
                        
                        // ページ下部から200px以内に来たら自動読み込み
                        if (scrollPosition >= documentHeight - 200) {
                            this.loadMore();
                        }
                        
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
        },
        
        isInfiniteScrollEnabled() {
            // データ属性またはクラスで無限スクロールが有効かチェック
            return document.body.dataset.infiniteScroll === 'true' ||
                   document.body.classList.contains('infinite-scroll');
        },
        
        // 検索フィルター機能
        initSearchFilter() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const searchForm = DOMUtils.get('.search-form');
            
            if (searchForm) {
                searchForm.addEventListener('submit', (e) => {
                    // AJAXでの検索結果読み込み（オプション）
                    if (this.isAjaxSearchEnabled()) {
                        e.preventDefault();
                        this.performAjaxSearch();
                    }
                });
            }
        },
        
        isAjaxSearchEnabled() {
            return document.body.dataset.ajaxSearch === 'true';
        },
        
        async performAjaxSearch() {
            // AJAX検索の実装（必要に応じて）
            console.log('Ajax search functionality would be implemented here');
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelLoadMoreManager = LoadMoreManager;
    
    // 後方互換性のため
    if (!window.LoadMoreManager) {
        window.LoadMoreManager = LoadMoreManager;
    }
    
})(window); 
/**
 * HOLY LABEL - Logo Manager Library
 * Logo positioning and navigation state management
 * @version 1.0.0
 * @namespace window.HolyLabelLogoManager
 * @requires window.HolyLabelDOMUtils, window.HolyLabelPageState, window.HolyLabelNavigationManager
 */

(function(window) {
    'use strict';
    
    const LogoManager = {
        updatePosition() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const PageState = window.HolyLabelPageState || window.PageState;
            const NavigationManager = window.HolyLabelNavigationManager || window.NavigationManager;
            
            const logo = DOMUtils.logo();
            if (!logo) return;
            
            const isMenuOpen = NavigationManager ? NavigationManager.isActive() : false;
            const isTop = PageState ? PageState.isHomePage() : false;
            
            // 既存のクラスを削除
            logo.classList.remove('center-position', 'header-position', 'menu-open-position');
            
            // 適切なクラスを追加
            if (isMenuOpen) {
                logo.classList.add('menu-open-position');
            } else if (isTop) {
                logo.classList.add('center-position');
            } else {
                logo.classList.add('header-position');
            }
        },
        
        // スクロール時のロゴ制御
        handleScroll() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const PageState = window.HolyLabelPageState || window.PageState;
            
            if (!PageState || !PageState.isHomePage()) return;
            
            const logo = DOMUtils.logo();
            if (!logo) return;
            
            const scrollY = window.scrollY;
            const heroSection = DOMUtils.get('.main-visual');
            
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                const isScrolledPastHero = scrollY > heroHeight * 0.8;
                
                logo.classList.toggle('scrolled', isScrolledPastHero);
            }
        },
        
        // ロゴのクリック動作制御
        initLogoClick() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const logo = DOMUtils.logo();
            
            if (!logo) return;
            
            const logoLink = logo.querySelector('a');
            if (!logoLink) return;
            
            logoLink.addEventListener('click', (e) => {
                // ホームページでロゴをクリックした場合のスムーススクロール
                if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                    e.preventDefault();
                    this.scrollToTop();
                }
            });
        },
        
        // スムーススクロール
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        
        // ロゴのフェードイン/アウト効果
        fadeInOut(show = true) {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const logo = DOMUtils.logo();
            
            if (!logo) return;
            
            if (show) {
                logo.style.opacity = '1';
                logo.style.transition = 'opacity 0.3s ease';
            } else {
                logo.style.opacity = '0';
                logo.style.transition = 'opacity 0.3s ease';
            }
        },
        
        // レスポンシブ対応
        handleResize() {
            // モバイル・デスクトップでの表示切り替え
            const isMobile = window.innerWidth <= 768;
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const logo = DOMUtils.logo();
            
            if (!logo) return;
            
            logo.classList.toggle('mobile', isMobile);
            logo.classList.toggle('desktop', !isMobile);
            
            // 位置を再計算
            this.updatePosition();
        },
        
        // 初期化
        init() {
            this.updatePosition();
            this.initLogoClick();
            
            // スクロールイベント（スロットリング付き）
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                }, 10);
            }, { passive: true });
            
            // リサイズイベント
            let resizeTimeout;
            window.addEventListener('resize', () => {
                if (resizeTimeout) {
                    clearTimeout(resizeTimeout);
                }
                resizeTimeout = setTimeout(() => {
                    this.handleResize();
                }, 250);
            });
            
            // 初期設定
            this.handleResize();
        },
        
        // カテゴリ表示制御機能も統合
        initCategoryDisplay() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const itemExpandLink = DOMUtils.get('a.expand[href="#"]');
            
            if (itemExpandLink?.textContent.trim() === 'ITEM') {
                const exList = itemExpandLink.nextElementSibling;
                if (exList) {
                    const categoryItems = exList.querySelectorAll('li:not(.no-category-message)');
                    const noMessage = exList.querySelector('.no-category-message');
                    if (categoryItems.length === 0 && noMessage) {
                        noMessage.style.display = 'block';
                    }
                }
            }
        },
        
        // Instagram固定ボタン制御も統合
        controlInstagramButton() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const PageState = window.HolyLabelPageState || window.PageState;
            
            const instagramBtn = DOMUtils.get('.instagram-fixed-btn');
            if (!instagramBtn) return;
            
            DOMUtils.body().classList.toggle('home-page', PageState ? PageState.isHomePage() : false);
        },
        
        // メイン初期化（統合版）
        initAll() {
            this.init();
            this.initCategoryDisplay();
            this.controlInstagramButton();
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelLogoManager = LogoManager;
    
    // 後方互換性のため
    if (!window.LogoManager) {
        window.LogoManager = LogoManager;
    }
    
    // 統合関数をグローバルに
    window.initCategoryDisplay = LogoManager.initCategoryDisplay.bind(LogoManager);
    window.controlInstagramButton = LogoManager.controlInstagramButton.bind(LogoManager);
    
})(window); 

/* ========== FINAL LAYER - 最終統合 ========== */
/* 初期化管理・多言語管理・スクロール管理 */

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
/**
 * HOLY LABEL - Language Manager Library
 * Multi-language support and language switching functionality
 * @version 1.0.0
 * @namespace window.HolyLabelLanguageManager
 */

(function(window) {
    'use strict';
    
    const LanguageManager = {
        currentLang: 'ja',
        initialized: false,
        
        init() {
            if (this.initialized) return;
            
            setTimeout(() => {
                this.hideAllBaseI18nElements();
                this.setupLanguageDetection();
            }, 1000);
            
            this.initialized = true;
        },
        
        switchLanguage(lang) {
            // BASEの隠れた言語切り替え要素を探して操作
            const baseSelects = document.querySelectorAll('select[name*="language"], select[name*="i18n"]');
            let switched = false;
            
            baseSelects.forEach(select => {
                if (select.style.display === 'none' || !select.offsetParent) {
                    const options = select.querySelectorAll('option');
                    options.forEach(option => {
                        if ((lang === 'ja' && (option.value.includes('ja') || option.value.includes('JP'))) ||
                            (lang === 'en' && (option.value.includes('en') || option.value.includes('EN')))) {
                            select.value = option.value;
                            const event = new Event('change', { bubbles: true });
                            select.dispatchEvent(event);
                            switched = true;
                        }
                    });
                }
            });
            
            // URLベースの言語切り替えも試行
            if (!switched) {
                const currentUrl = window.location.href;
                if (lang === 'en' && !currentUrl.includes('lang=en')) {
                    const separator = currentUrl.includes('?') ? '&' : '?';
                    window.location.href = currentUrl + separator + 'lang=en';
                } else if (lang === 'ja' && currentUrl.includes('lang=en')) {
                    window.location.href = currentUrl.replace(/[?&]lang=en/, '');
                }
            }
            
            // UI状態を更新
            this.updateLanguageUIState(lang);
            this.currentLang = lang;
        },
        
        updateLanguageUIState(activeLang) {
            const jaLink = document.getElementById('lang-ja');
            const enLink = document.getElementById('lang-en');
            
            if (jaLink && enLink) {
                jaLink.classList.toggle('active', activeLang === 'ja');
                enLink.classList.toggle('active', activeLang === 'en');
            }
        },
        
        setupLanguageDetection() {
            // 現在の言語を検出
            this.currentLang = this.detectCurrentLanguage();
            this.updateLanguageUIState(this.currentLang);
        },
        
        detectCurrentLanguage() {
            // URLから言語を検出
            if (window.location.href.includes('lang=en')) {
                return 'en';
            }
            
            // ページコンテンツから検出
            const privacyLink = document.querySelector('a[href*="privacy"]');
            if (privacyLink && privacyLink.textContent.includes('Privacy')) {
                return 'en';
            }
            
            return 'ja'; // デフォルトは日本語
        },
        
        hideAllBaseI18nElements() {
            // BASEが生成するI18N要素を非表示
            const i18nSelectors = [
                '.x_i18nSelectBox',
                '[id*="i18n"]',
                '[class*="i18n"]',
                '[id*="I18n"]',
                '[class*="I18n"]'
            ];
            
            i18nSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (!element.closest('.custom-language-switcher')) {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                });
            });
        },
        
        // 言語に基づくコンテンツの表示切り替え
        toggleContentByLanguage(lang) {
            const elements = document.querySelectorAll('[data-lang]');
            elements.forEach(element => {
                const elementLang = element.dataset.lang;
                element.style.display = elementLang === lang ? '' : 'none';
            });
        },
        
        // 言語切り替えボタンのイベントリスナー設定
        initLanguageSwitcherEvents() {
            const jaLink = document.getElementById('lang-ja');
            const enLink = document.getElementById('lang-en');
            
            if (jaLink) {
                jaLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage('ja');
                });
            }
            
            if (enLink) {
                enLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage('en');
                });
            }
        },
        
        // 現在の言語を取得
        getCurrentLanguage() {
            return this.currentLang;
        },
        
        // 言語リソースの管理（将来の拡張用）
        loadLanguageResources(lang) {
            // 必要に応じて言語固有のリソースを読み込み
            console.log(`Loading resources for language: ${lang}`);
        }
    };
    
    // グローバル名前空間に登録
    window.HolyLabelLanguageManager = LanguageManager;
    
    // 後方互換性のため
    if (!window.LanguageManager) {
        window.LanguageManager = LanguageManager;
    }
    
    // グローバル関数の登録（レガシーサポート）
    window.switchLanguage = LanguageManager.switchLanguage.bind(LanguageManager);
    window.initCustomLanguageSwitcher = LanguageManager.init.bind(LanguageManager);
    
})(window); 
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