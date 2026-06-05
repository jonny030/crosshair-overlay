const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCrosshair();
}
window.addEventListener('resize', resize);

let currentSettings = null;

function drawCrosshair() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!currentSettings || !currentSettings.visible) return;

    const { style, size, color, thickness, gap, opacity, offsetX = 0, offsetY = 0 } = currentSettings;
    const cx = Math.floor(canvas.width / 2) + offsetX;
    const cy = Math.floor(canvas.height / 2) + offsetY;

    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'square';

    const adjust = (thickness % 2 === 0) ? 0 : 0.5;

    ctx.beginPath();

    if (style === 'dot' || style === 'cross-dot') {
        ctx.arc(cx, cy, thickness, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
    }

    if (style === 'cross' || style === 'cross-dot' || style === 't-shape') {
        // Left
        ctx.moveTo(cx - gap, cy + adjust);
        ctx.lineTo(cx - gap - size, cy + adjust);
        // Right
        ctx.moveTo(cx + gap, cy + adjust);
        ctx.lineTo(cx + gap + size, cy + adjust);
        // Bottom
        ctx.moveTo(cx + adjust, cy + gap);
        ctx.lineTo(cx + adjust, cy + gap + size);
        
        if (style !== 't-shape') {
            // Top
            ctx.moveTo(cx + adjust, cy - gap);
            ctx.lineTo(cx + adjust, cy - gap - size);
        }
        ctx.stroke();
    }

    if (style === 'circle') {
        ctx.arc(cx, cy, size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

resize();
window.api.onUpdateCrosshair((settings) => { currentSettings = settings; drawCrosshair(); });