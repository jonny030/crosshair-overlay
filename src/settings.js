const inputs = {
    visible: document.getElementById('visible'),
    style: document.getElementById('style'),
    color: document.getElementById('color'),
    size: document.getElementById('size'),
    thickness: document.getElementById('thickness'),
    gap: document.getElementById('gap'),
    opacity: document.getElementById('opacity'),
    offsetX: document.getElementById('offsetX'),
    offsetY: document.getElementById('offsetY')
};

const displays = {
    size: document.getElementById('size-val'),
    thickness: document.getElementById('thickness-val'),
    gap: document.getElementById('gap-val'),
    opacity: document.getElementById('opacity-val'),
    offsetX: document.getElementById('offsetX-val'),
    offsetY: document.getElementById('offsetY-val')
};

const i18n = {
    'en': {
        title: "⚙️ Settings",
        showCrosshair: "Show Crosshair",
        style: "Style",
        color: "Color",
        size: "Size",
        thickness: "Thickness",
        gap: "Gap",
        opacity: "Opacity",
        offsetX: "Offset X",
        offsetY: "Offset Y"
    },
    'zh-TW': {
        title: "⚙️ 設定",
        showCrosshair: "顯示準星",
        style: "準星風格",
        color: "顏色",
        size: "大小",
        thickness: "粗細",
        gap: "間距",
        opacity: "透明度",
        offsetX: "水平偏移 (X)",
        offsetY: "垂直偏移 (Y)"
    }
};

let currentLang = 'en';

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });
}

let isUpdating = false;

function updateDisplays() {
    displays.size.textContent = inputs.size.value;
    displays.thickness.textContent = inputs.thickness.value;
    displays.gap.textContent = inputs.gap.value;
    displays.opacity.textContent = inputs.opacity.value + '%';
    displays.offsetX.textContent = inputs.offsetX.value + 'px';
    displays.offsetY.textContent = inputs.offsetY.value + 'px';
}

function emitChanges() {
    if (isUpdating) return;
    const settings = {
        visible: inputs.visible.checked,
        style: inputs.style.value,
        color: inputs.color.value,
        size: parseInt(inputs.size.value, 10),
        thickness: parseInt(inputs.thickness.value, 10),
        gap: parseInt(inputs.gap.value, 10),
        opacity: parseInt(inputs.opacity.value, 10),
        offsetX: parseInt(inputs.offsetX.value, 10) || 0,
        offsetY: parseInt(inputs.offsetY.value, 10) || 0,
        language: currentLang
    };
    window.api.settingsChanged(settings);
    updateDisplays();
}

Object.values(inputs).forEach(input => {
    input.addEventListener('input', emitChanges);
    input.addEventListener('change', emitChanges);
});

const styleButtons = document.querySelectorAll('.style-btn');
styleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        inputs.style.value = btn.dataset.value;
        emitChanges();
    });
});

const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.getAttribute('data-lang');
        applyTranslations();
        emitChanges(); // 儲存語系設定
    });
});

window.api.onInitSettings((settings) => {
    isUpdating = true;
    Object.keys(settings).forEach(key => {
        if (inputs[key]) {
            if (key === 'visible') inputs[key].checked = settings[key];
            else inputs[key].value = settings[key];
        }
    });
    
    // 初始化時，根據設定將對應的按鈕加上 active 樣式
    styleButtons.forEach(b => {
        if (b.dataset.value === settings.style) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    // 初始化時套用語系設定
    if (settings.language) {
        currentLang = settings.language;
        langButtons.forEach(b => {
            if (b.getAttribute('data-lang') === currentLang) b.classList.add('active');
            else b.classList.remove('active');
        });
        applyTranslations();
    }

    updateDisplays();
    isUpdating = false;
});