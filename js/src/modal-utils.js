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