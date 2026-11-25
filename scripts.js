/*!
 * MN6K - UEU Studios
 * Site scripts. Loaded on every page via <script src="js/scripts.js"></script>
 * Needs Bootstrap's JS bundle to be loaded first (already the case in index.html and citi-basketball.html).
 */
(function () {
    'use strict';

    var TOAST_DELAY = 2500;

    // Show a small message in the bottom-right corner.
    function showToast(message) {
        var container = document.getElementById('site-toasts');
        if (!container) {
            container = document.createElement('div');
            container.id = 'site-toasts';
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(container);
        }

        var toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-dark border-0';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('aria-atomic', 'true');

        var row = document.createElement('div');
        row.className = 'd-flex';

        var body = document.createElement('div');
        body.className = 'toast-body';
        body.textContent = message;

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'btn-close btn-close-white me-2 m-auto';
        close.setAttribute('data-bs-dismiss', 'toast');
        close.setAttribute('aria-label', 'Close');

        row.appendChild(body);
        row.appendChild(close);
        toast.appendChild(row);
        container.appendChild(toast);

        toast.addEventListener('hidden.bs.toast', function () {
            toast.remove();
        });

        if (window.bootstrap && window.bootstrap.Toast) {
            new window.bootstrap.Toast(toast, { delay: TOAST_DELAY }).show();
        } else {
            // Fallback if Bootstrap's JS failed to load
            toast.classList.add('show');
            setTimeout(function () { toast.remove(); }, TOAST_DELAY);
        }
    }

    // Placeholder links (href="#" or "#!") should not jump to the top of the page.
    // Unfinished "Дэлгэрэнгүй" buttons tell the visitor the content is coming soon.
    document.addEventListener('click', function (event) {
        var link = event.target.closest('a[href="#"], a[href="#!"]');
        if (!link || link.hasAttribute('data-bs-toggle')) {
            return; // dropdown toggles etc. are handled by Bootstrap
        }
        event.preventDefault();
        if (link.classList.contains('btn')) {
            showToast('Тун удахгүй');
        }
    });

    // The cart button is a form submit with no backend: stop the page reloading.
    var cartForm = document.querySelector('nav form');
    if (cartForm) {
        cartForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showToast('Сагс хоосон байна');
        });
    }

    // Deployment helper: log images that failed to load (e.g. wrong file name or letter case on GitHub Pages).
    document.querySelectorAll('img').forEach(function (img) {
        function report() {
            console.warn('[MN6K] Image failed to load:', img.getAttribute('src'));
        }
        if (img.complete && img.naturalWidth === 0) {
            report();
        } else {
            img.addEventListener('error', report);
        }
    });
})();
