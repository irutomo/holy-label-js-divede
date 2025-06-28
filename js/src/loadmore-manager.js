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