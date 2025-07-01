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