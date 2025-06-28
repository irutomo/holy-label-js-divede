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
            
            // トグル状態を切り替え
            hamburger.classList.toggle('-active', !isActive);
            navArea.classList.toggle('-active', !isActive);
            body.classList.toggle('nav-open', !isActive);
            
            // アクセシビリティ属性の更新
            hamburger.setAttribute('aria-expanded', !isActive);
            
            // スクロール制御
            if (!isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        },
        
        close() {
            const { hamburger, navArea, body } = this.elements;
            if (!hamburger || !navArea) return;
            
            hamburger.classList.remove('-active');
            navArea.classList.remove('-active');
            body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        },
        
        open() {
            const { hamburger, navArea, body } = this.elements;
            if (!hamburger || !navArea) return;
            
            hamburger.classList.add('-active');
            navArea.classList.add('-active');
            body.classList.add('nav-open');
            hamburger.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden';
        },
        
        // サブメニューの制御
        initSubMenus() {
            const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
            const expandLinks = DOMUtils.getAll('.expand');
            
            expandLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const subList = link.nextElementSibling;
                    if (subList && subList.classList.contains('ex-list')) {
                        const isVisible = subList.style.display !== 'none';
                        subList.style.display = isVisible ? 'none' : 'block';
                        link.classList.toggle('active', !isVisible);
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
            
            // ナビエリア外クリックで閉じる
            document.addEventListener('click', (e) => {
                if (this.isActive() && 
                    !navArea?.contains(e.target) && 
                    !hamburger?.contains(e.target)) {
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