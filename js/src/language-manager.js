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