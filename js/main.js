const SITE_CONFIG = {
    brand: "SERCUS",
    email: "info@sercus.com.ar",
    phoneDisplay: "11 6032 4750",
    phoneHref: "tel:+541160324750",
    secondaryPhoneDisplay: "11 4435 0607",
    secondaryPhoneHref: "tel:+541144350607",
    whatsappHref: "https://wa.me/541160324750?text=Hola%20Sercus%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20servicios.",
    addressPrimary: "Montevideo 527 7° B, CABA",
    addressSecondary: "Av. Brigadier Juan Manuel de Rosas 182 1° B, Lomas del Mirador",
    navItems: [
        { key: "home", label: "Inicio", href: "index.html" },
        { key: "consorcios", label: "Consorcios", href: "consorcios.html" },
        { key: "vip", label: "Custodias VIP", href: "custodias-vip.html" },
        { key: "jobs", label: "Trabajá con nosotros", href: "trabaja-con-nosotros.html" }
    ]
};

function getPageKey() {
    return document.body.dataset.page || "home";
}

function getContactHref() {
    return getPageKey() === "home" ? "#contacto" : "index.html#contacto";
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function getNavLinkClasses(isActive) {
    const baseClasses = "rounded-full px-3 py-2 text-sm font-semibold tracking-tight transition-colors duration-200";
    return isActive
        ? `${baseClasses} bg-primary/10 text-primary`
        : `${baseClasses} text-gray-400 hover:text-white`;
}

function getMobileNavLinkClasses(isActive) {
    const baseClasses = "rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors duration-200";
    return isActive
        ? `${baseClasses} border-primary/30 bg-primary/10 text-primary`
        : `${baseClasses} border-white/5 bg-surface-container-low text-on-surface-variant hover:border-primary/20 hover:text-white`;
}

function renderHeader() {
    const pageKey = getPageKey();
    const contactHref = getContactHref();

    const desktopLinks = SITE_CONFIG.navItems
        .map((item) => {
            const active = item.key === pageKey;
            const ariaCurrent = active ? ' aria-current="page"' : "";
            return `<a class="${getNavLinkClasses(active)}" href="${item.href}"${ariaCurrent}>${item.label}</a>`;
        })
        .join("");

    const mobileLinks = SITE_CONFIG.navItems
        .map((item) => {
            const active = item.key === pageKey;
            const ariaCurrent = active ? ' aria-current="page"' : "";
            return `<a class="${getMobileNavLinkClasses(active)}" href="${item.href}"${ariaCurrent}>${item.label}</a>`;
        })
        .join("");

    return `
        <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#111111]/92 backdrop-blur-xl">
            <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
            <nav aria-label="Principal" class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
                <a class="font-headline text-2xl font-black tracking-[0.18em] text-primary" href="index.html" aria-label="Ir al inicio de Sercus">
                    SERCUS
                </a>
                <div class="hidden items-center gap-2 md:flex">
                    ${desktopLinks}
                    <a class="${getNavLinkClasses(false)}" href="${contactHref}">Contacto</a>
                </div>
                <div class="hidden items-center gap-2 md:flex">
                    <button
                        id="translate-en-btn"
                        type="button"
                        class="flex items-center gap-1 rounded-full px-3 py-2 text-xs font-bold tracking-[0.2em] text-gray-400 transition-colors hover:text-white"
                    >
                        <span class="material-symbols-outlined text-base">language</span>
                        EN
                    </button>
                    <button
                        id="translate-es-btn"
                        type="button"
                        class="hidden items-center gap-1 rounded-full px-3 py-2 text-xs font-bold tracking-[0.2em] text-primary transition-colors hover:text-white"
                    >
                        <span class="material-symbols-outlined text-base">language</span>
                        ES
                    </button>
                    <button
                        type="button"
                        class="js-consulta-btn gilded-gradient rounded-full px-5 py-3 text-sm font-extrabold tracking-tight text-on-primary shadow-lg shadow-primary/10 transition-transform duration-150 hover:brightness-110 active:scale-95"
                    >
                        Contacto rápido
                    </button>
                </div>
                <div class="flex items-center gap-2 md:hidden">
                    <button
                        id="translate-en-btn-mobile"
                        type="button"
                        class="flex items-center gap-1 rounded-full px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-gray-400 transition-colors hover:text-white"
                    >
                        <span class="material-symbols-outlined text-base">language</span>
                        EN
                    </button>
                    <button
                        id="translate-es-btn-mobile"
                        type="button"
                        class="hidden items-center gap-1 rounded-full px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-primary transition-colors hover:text-white"
                    >
                        <span class="material-symbols-outlined text-base">language</span>
                        ES
                    </button>
                    <button
                        id="mobile-menu-toggle"
                        type="button"
                        aria-expanded="false"
                        aria-controls="mobile-menu"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface-container text-on-surface transition-colors hover:border-primary/30 hover:text-primary"
                    >
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
            <div id="mobile-menu" class="mobile-menu-panel hidden border-t border-white/5 px-5 py-5 md:hidden">
                <div class="mx-auto flex max-w-7xl flex-col gap-3">
                    ${mobileLinks}
                    <a class="${getMobileNavLinkClasses(false)}" href="${contactHref}">Contacto</a>
                    <button
                        type="button"
                        class="js-consulta-btn gilded-gradient mt-2 rounded-2xl px-4 py-3 text-sm font-extrabold tracking-tight text-on-primary shadow-lg shadow-primary/10"
                    >
                        Contacto rápido
                    </button>
                </div>
            </div>
        </header>
    `;
}

function renderFooter() {
    const contactHref = getContactHref();

    return `
        <footer class="border-t border-white/5 bg-surface-container-lowest px-5 py-16 md:px-8">
            <div class="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
                <div class="max-w-md">
                    <p class="font-headline text-xl font-black tracking-[0.18em] text-primary">SERCUS</p>
                    <p class="mt-4 text-sm leading-relaxed text-on-surface-variant">
                        Seguridad integral para edificios, custodias sensibles y operaciones corporativas en CABA y GBA.
                    </p>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a class="contact-option" href="${SITE_CONFIG.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
                        <a class="contact-option" href="mailto:${SITE_CONFIG.email}">Email</a>
                        <a class="contact-option" href="${SITE_CONFIG.phoneHref}">Llamar</a>
                    </div>
                </div>
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-[0.24em] text-white">Navegación</h2>
                    <ul class="mt-5 space-y-3 text-sm text-on-surface-variant">
                        <li><a class="site-link" href="index.html">Inicio</a></li>
                        <li><a class="site-link" href="consorcios.html">Consorcios</a></li>
                        <li><a class="site-link" href="custodias-vip.html">Custodias VIP</a></li>
                        <li><a class="site-link" href="trabaja-con-nosotros.html">Trabajá con nosotros</a></li>
                        <li><a class="site-link" href="${contactHref}">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-[0.24em] text-white">Contacto</h2>
                    <ul class="mt-5 space-y-3 text-sm text-on-surface-variant">
                        <li><a class="site-link" href="${SITE_CONFIG.phoneHref}">${SITE_CONFIG.phoneDisplay}</a></li>
                        <li><a class="site-link" href="${SITE_CONFIG.secondaryPhoneHref}">${SITE_CONFIG.secondaryPhoneDisplay}</a></li>
                        <li><a class="site-link" href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></li>
                        <li>${SITE_CONFIG.addressPrimary}</li>
                        <li>${SITE_CONFIG.addressSecondary}</li>
                    </ul>
                </div>
            </div>
            <div class="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/5 pt-6 text-xs uppercase tracking-[0.18em] text-gray-500 md:flex-row md:items-center md:justify-between">
                <p>© ${getCurrentYear()} Sercus Seguridad Integral.</p>
                <p>Respuesta comercial por WhatsApp, email o llamada.</p>
            </div>
        </footer>
    `;
}

function renderConsultaModal() {
    const contactHref = getContactHref();

    return `
        <div
            id="consulta-modal"
            class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 px-4 opacity-0 backdrop-blur-sm transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consulta-modal-title"
        >
            <div class="w-full max-w-xl transform rounded-[1.5rem] border border-white/10 bg-surface-container-high p-8 shadow-2xl transition-transform duration-300 scale-95">
                <div class="flex items-start justify-between gap-6">
                    <div>
                        <p class="section-eyebrow">Contacto inmediato</p>
                        <h2 id="consulta-modal-title" class="mt-3 font-headline text-3xl font-black text-white">Elegí cómo querés hablar con nosotros</h2>
                        <p class="mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant">
                            Te dejamos canales reales y directos. Si preferís dejar contexto antes, podés ir al formulario principal del sitio.
                        </p>
                    </div>
                    <button
                        id="close-modal-btn"
                        type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-container text-gray-400 transition-colors hover:border-primary/30 hover:text-white"
                        aria-label="Cerrar diálogo de contacto"
                    >
                        <span class="material-symbols-outlined text-base">close</span>
                    </button>
                </div>
                <div class="mt-8 grid gap-4 sm:grid-cols-2">
                    <a class="surface-card group" href="${SITE_CONFIG.whatsappHref}" target="_blank" rel="noreferrer">
                        <p class="text-xs font-bold uppercase tracking-[0.24em] text-primary">WhatsApp</p>
                        <p class="mt-2 text-lg font-bold text-white">Iniciar chat</p>
                        <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Canal rápido para coordinar una llamada o pedir una propuesta.</p>
                        <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Abrir WhatsApp <span class="material-symbols-outlined text-base">arrow_forward</span></span>
                    </a>
                    <a class="surface-card group" href="mailto:${SITE_CONFIG.email}">
                        <p class="text-xs font-bold uppercase tracking-[0.24em] text-primary">Email</p>
                        <p class="mt-2 text-lg font-bold text-white">${SITE_CONFIG.email}</p>
                        <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Ideal para consultas con más detalle o envío de documentación.</p>
                        <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Preparar correo <span class="material-symbols-outlined text-base">arrow_forward</span></span>
                    </a>
                    <a class="surface-card group" href="${SITE_CONFIG.phoneHref}">
                        <p class="text-xs font-bold uppercase tracking-[0.24em] text-primary">Llamada</p>
                        <p class="mt-2 text-lg font-bold text-white">${SITE_CONFIG.phoneDisplay}</p>
                        <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Para avanzar directo con disponibilidad, cobertura y tiempos de respuesta.</p>
                        <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Llamar ahora <span class="material-symbols-outlined text-base">call</span></span>
                    </a>
                    <a class="surface-card group" href="${contactHref}">
                        <p class="text-xs font-bold uppercase tracking-[0.24em] text-primary">Formulario</p>
                        <p class="mt-2 text-lg font-bold text-white">Ir al contacto principal</p>
                        <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Si preferís dejar toda la información ordenada antes de hablar.</p>
                        <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver formulario <span class="material-symbols-outlined text-base">south</span></span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderSiteShell() {
    const headerRoot = document.getElementById("site-header");
    const footerRoot = document.getElementById("site-footer");
    const modalRoot = document.getElementById("site-modal-root");

    if (headerRoot) {
        headerRoot.innerHTML = renderHeader();
    }

    if (footerRoot) {
        footerRoot.innerHTML = renderFooter();
    }

    if (modalRoot) {
        modalRoot.innerHTML = renderConsultaModal();
    }
}

function loadGoogleTranslate() {
    if (document.getElementById("google_translate_element")) {
        return;
    }

    const gtDiv = document.createElement("div");
    gtDiv.id = "google_translate_element";
    gtDiv.style.display = "none";
    document.body.appendChild(gtDiv);

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
            {
                pageLanguage: "es",
                includedLanguages: "en,es",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
}

function setTranslateButtonsState(isEnglish) {
    const ids = [
        ["translate-en-btn", "translate-es-btn"],
        ["translate-en-btn-mobile", "translate-es-btn-mobile"]
    ];

    ids.forEach(([enId, esId]) => {
        const enBtn = document.getElementById(enId);
        const esBtn = document.getElementById(esId);

        if (!enBtn || !esBtn) {
            return;
        }

        if (isEnglish) {
            enBtn.classList.add("hidden");
            enBtn.classList.remove("flex");
            esBtn.classList.remove("hidden");
            esBtn.classList.add("flex");
        } else {
            esBtn.classList.add("hidden");
            esBtn.classList.remove("flex");
            enBtn.classList.remove("hidden");
            enBtn.classList.add("flex");
        }
    });
}

function bindTranslateButtons() {
    const buttonPairs = [
        ["translate-en-btn", "translate-es-btn"],
        ["translate-en-btn-mobile", "translate-es-btn-mobile"]
    ];

    const isTranslated = document.cookie.includes("googtrans=/es/en");
    setTranslateButtonsState(isTranslated);

    buttonPairs.forEach(([enId, esId]) => {
        const enBtn = document.getElementById(enId);
        const esBtn = document.getElementById(esId);

        if (!enBtn || !esBtn || enBtn.dataset.bound === "true") {
            return;
        }

        enBtn.dataset.bound = "true";
        esBtn.dataset.bound = "true";

        enBtn.addEventListener("click", () => triggerTranslation("en"));
        esBtn.addEventListener("click", () => triggerTranslation("es"));
    });
}

function triggerTranslation(lang, attempt = 0) {
    const select = document.querySelector("select.goog-te-combo");

    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        setTranslateButtonsState(lang === "en");
        return;
    }

    if (attempt < 12) {
        setTimeout(() => triggerTranslation(lang, attempt + 1), 500);
    }
}

function setupConsultaModal() {
    const modal = document.getElementById("consulta-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    const openBtns = document.querySelectorAll(".js-consulta-btn");
    const modalInner = modal ? modal.firstElementChild : null;

    if (!modal || !closeBtn || !modalInner || !openBtns.length) {
        return;
    }

    function openModal() {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.classList.add("overflow-hidden");

        requestAnimationFrame(() => {
            modal.classList.remove("opacity-0");
            modalInner.classList.remove("scale-95");
            modalInner.classList.add("scale-100");
        });
    }

    function closeModal() {
        modal.classList.add("opacity-0");
        modalInner.classList.remove("scale-100");
        modalInner.classList.add("scale-95");
        document.body.classList.remove("overflow-hidden");

        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }, 300);
    }

    openBtns.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

function setupMobileMenu() {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("mobile-menu");

    if (!toggle || !menu) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("hidden", isOpen);
    });

    menu.querySelectorAll("a, button").forEach((item) => {
        item.addEventListener("click", () => {
            toggle.setAttribute("aria-expanded", "false");
            menu.classList.add("hidden");
        });
    });
}

function setupMailtoForms() {
    document.querySelectorAll("[data-mailto-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const subject = form.dataset.mailtoSubject || "Consulta desde el sitio web";
            const recipient = form.dataset.mailtoRecipient || SITE_CONFIG.email;
            const bodyLines = [];

            form.querySelectorAll("input[name], textarea[name], select[name]").forEach((field) => {
                const value = field.value.trim();

                if (!value) {
                    return;
                }

                const label =
                    field.dataset.label ||
                    field.getAttribute("aria-label") ||
                    (field.labels && field.labels[0] ? field.labels[0].textContent.trim() : field.name);

                bodyLines.push(`${label}: ${value}`);
            });

            bodyLines.push(`Página: ${window.location.href}`);
            const mailtoHref = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
            window.location.href = mailtoHref;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderSiteShell();
    setupConsultaModal();
    setupMobileMenu();
    setupMailtoForms();
    loadGoogleTranslate();
    bindTranslateButtons();
    setTimeout(bindTranslateButtons, 1500);
});
