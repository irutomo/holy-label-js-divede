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