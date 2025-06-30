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
        elements: {
            mainContainer: null,
            thumbnailContainer: null,
            counter: null,
        },

        // 初期化
        init() {
            this.elements.mainContainer = document.getElementById('mainImageContainer');
            this.elements.thumbnailContainer = document.getElementById('thumbnailContainer');
            this.elements.counter = document.getElementById('imageCounter');

            if (!this.elements.mainContainer || !this.elements.thumbnailContainer) return;

            this.collectImages();
            if (this.images.length === 0) return;

            this.renderImages();
            this.addEventListeners();
            this.updateUI();
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
            let mainHTML = '';
            let thumbHTML = '';
            const itemTitle = document.querySelector('.product-detail-title')?.textContent || '商品画像';

            this.images.forEach((img, index) => {
                mainHTML += `<div class="main-image-item"><img src="${img.main}" alt="${itemTitle} ${index + 1}"></div>`;
                thumbHTML += `<div class="thumbnail-item" data-index="${index}"><img src="${img.thumb}" alt="${itemTitle} サムネイル ${index + 1}"></div>`;
            });
            
            this.elements.mainContainer.innerHTML = mainHTML;
            this.elements.thumbnailContainer.innerHTML = thumbHTML;
        },

        // イベントリスナーの設定
        addEventListeners() {
            // メイン画像のスワイプ（スクロール）を検知（デバウンス処理付き）
            let scrollTimeout;
            this.elements.mainContainer.addEventListener('scroll', () => {
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
                }, 50); // 50msのデバウンス
            });

            // サムネイルのクリックを検知
            this.elements.thumbnailContainer.addEventListener('click', (e) => {
                const thumbnail = e.target.closest('.thumbnail-item');
                if (thumbnail) {
                    const index = parseInt(thumbnail.dataset.index, 10);
                    this.scrollToImage(index);
                }
            });

            // 矢印クリック検知（イベント重複防止）
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToImage(this.currentIndex - 1);
                });
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
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

        // 特定の画像へスクロール（修正版）
        scrollToImage(index) {
            if (this.images.length === 0) return;
            
            // ループ機能追加
            let newIndex = index;
            if (newIndex < 0) {
                newIndex = this.images.length - 1;
            } else if (newIndex >= this.images.length) {
                newIndex = 0;
            }
            
            // インデックスが変わらない場合は処理しない
            if (newIndex === this.currentIndex) return;
            
            this.currentIndex = newIndex;
            const containerWidth = this.elements.mainContainer.offsetWidth;
            const scrollPosition = newIndex * containerWidth;
            
            this.elements.mainContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // UIを即座に更新
            this.updateUI();
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