console.log('Main Scripts loaded');

// --- Google Translate Integration ---
function loadGoogleTranslate() {
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    document.body.appendChild(gtDiv);

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'es',
            includedLanguages: 'en,es',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
}

// --- Modal Consulta Gratuita ---
function setupConsultaModal() {
    const modal = document.getElementById('consulta-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const submitBtn = document.getElementById('submit-consulta-btn');
    const successMsg = document.getElementById('consulta-success-msg');
    const openBtns = document.querySelectorAll('.js-consulta-btn');
    const modalInner = modal ? modal.firstElementChild : null;

    if (!modal || !closeBtn || !openBtns.length) return;

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // Small delay to allow display:flex to apply before animating opacity
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalInner) {
                modalInner.classList.remove('scale-95');
                modalInner.classList.add('scale-100');
            }
        }, 10);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        if (modalInner) {
            modalInner.classList.remove('scale-100');
            modalInner.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            // Reset form and message when closing
            if (successMsg) successMsg.classList.add('hidden');
            const form = modal.querySelector('form');
            if (form) form.reset();
        }, 300);
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle submit simulation
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = modal.querySelector('form');
            if (form && form.checkValidity()) {
                if (successMsg) successMsg.classList.remove('hidden');
                setTimeout(closeModal, 2000);
            } else {
                if (form) form.reportValidity();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGoogleTranslate();
    setupConsultaModal();

    // Give GT a moment to render its select
    setTimeout(bindTranslateButtons, 1500);
});

function bindTranslateButtons() {
    const enBtn = document.getElementById('translate-en-btn');
    const esBtn = document.getElementById('translate-es-btn');
    if (!enBtn || !esBtn) return;

    // Check if it's already translated based on cookie
    const isTranslated = document.cookie.includes('googtrans=/es/en');
    if (isTranslated) {
        enBtn.classList.add('hidden');
        enBtn.classList.remove('flex');
        esBtn.classList.remove('hidden');
        esBtn.classList.add('flex');
    }

    enBtn.addEventListener('click', () => triggerTranslation('en'));
    esBtn.addEventListener('click', () => triggerTranslation('es'));
}

function triggerTranslation(lang) {
    const selectWrap = document.querySelector('select.goog-te-combo');
    if (selectWrap) {
        selectWrap.value = lang;
        selectWrap.dispatchEvent(new Event('change'));
        
        const enBtn = document.getElementById('translate-en-btn');
        const esBtn = document.getElementById('translate-es-btn');
        
        if (lang === 'en') {
            enBtn.classList.add('hidden');
            enBtn.classList.remove('flex');
            esBtn.classList.remove('hidden');
            esBtn.classList.add('flex');
        } else {
            esBtn.classList.add('hidden');
            esBtn.classList.remove('flex');
            enBtn.classList.remove('hidden');
            enBtn.classList.add('flex');
        }
    } else {
        // If not rendered yet, retry after a short delay
        setTimeout(() => triggerTranslation(lang), 500);
    }
}
// -------------------------------------
