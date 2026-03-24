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

document.addEventListener('DOMContentLoaded', () => {
    loadGoogleTranslate();

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
