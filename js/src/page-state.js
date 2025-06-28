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