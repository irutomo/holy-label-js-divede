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