const fs = require('fs');
const css = `
/* ============================
   BREADCRUMB NAVIGATION
   ============================ */
.breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 20px;
    font-size: 0.875rem;
    color: #6b7280;
}
.breadcrumb a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;
}
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb-sep { color: #9ca3af; user-select: none; }
.breadcrumb-current { color: #6b7280; }

/* ============================
   CALCULATOR DIRECTORY PAGE
   ============================ */
.calc-dir-section { margin-bottom: 48px; }
.calc-dir-heading {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e5e7eb;
}
.calc-dir-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}
.calc-dir-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 20px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.calc-dir-card:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37,99,235,0.12);
    transform: translateY(-2px);
}
.calc-dir-name {
    font-size: 1rem;
    font-weight: 600;
    color: #2563eb;
}
.calc-dir-desc {
    font-size: 0.82rem;
    color: #6b7280;
    line-height: 1.4;
}
`;
fs.appendFileSync('public/css/style.css', css);
console.log('CSS appended successfully.');
