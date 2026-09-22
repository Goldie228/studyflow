document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const onb = document.getElementById('onbScreen');
    const auth = document.getElementById('authScreen');
    const app = document.getElementById('app');
    const onbSlides = document.querySelectorAll('.onb-slide');
    const dots = document.querySelectorAll('.dot');
    const onbNext = document.getElementById('onbNext');
    let onbIdx = 0;

    function showOnbSlide(i) {
        onbSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
        dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
        onb.dataset.bg = i;
        if (onbNext) onbNext.textContent = i === onbSlides.length - 1 ? 'Начать' : 'Далее';
    }

    // Splash → Onboarding
    setTimeout(() => {
        splash.classList.add('out');
        setTimeout(() => { splash.classList.add('hidden'); onb.classList.remove('hidden'); }, 400);
    }, 1800);

    // Onboarding navigation
    document.getElementById('onbNext').addEventListener('click', () => {
        if (onbIdx < 2) {
            onbIdx++;
            showOnbSlide(onbIdx);
        } else {
            onb.classList.add('hidden');
            auth.classList.remove('hidden');
        }
    });
    document.getElementById('onbSkip').addEventListener('click', () => {
        onb.classList.add('hidden');
        auth.classList.remove('hidden');
    });

    // Auth tabs
    document.getElementById('showReg').addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('regForm').classList.add('active');
    });
    document.getElementById('showLogin').addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('regForm').classList.remove('active');
        document.getElementById('loginForm').classList.add('active');
    });

    // Enter app
    function enterApp() { auth.classList.add('hidden'); app.classList.remove('hidden'); updateDate(); }
    document.getElementById('loginBtn').addEventListener('click', enterApp);
    document.getElementById('regBtn').addEventListener('click', enterApp);

    // Navigation
    const pages = document.querySelectorAll('.page');
    const sbItems = document.querySelectorAll('.sb-item');
    const mtItems = document.querySelectorAll('.mt');
    const links = document.querySelectorAll('[data-goto]');

    function go(page) {
        pages.forEach(p => p.classList.toggle('active', p.id === 'p-' + page));
        sbItems.forEach(n => n.classList.toggle('active', n.dataset.page === page));
        mtItems.forEach(t => t.classList.toggle('active', t.dataset.page === page));
        document.getElementById('main').scrollTop = 0;
    }
    sbItems.forEach(i => i.addEventListener('click', () => go(i.dataset.page)));
    mtItems.forEach(t => t.addEventListener('click', () => go(t.dataset.page)));
    links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.dataset.goto); }));

    // Tabs
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tab.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Toggles
    document.querySelectorAll('.tgl').forEach(t => t.addEventListener('click', () => t.classList.toggle('on')));

    // On mobile show native-style empty fields (placeholders)
    if (window.matchMedia('(max-width: 900px)').matches) {
        document.querySelectorAll('.auth-form input').forEach(i => { i.value = ''; });
    }

    // Date
    function updateDate() {
        const el = document.getElementById('dateEl');
        if (!el) return;
        const now = new Date();
        const m = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        const d = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
        el.textContent = now.getDate() + ' ' + m[now.getMonth()] + ', ' + d[now.getDay()];
    }
});