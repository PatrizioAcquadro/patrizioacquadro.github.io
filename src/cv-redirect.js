const base = import.meta.env.BASE_URL || '/';
const normalizedBase = base.endsWith('/') ? base : `${base}/`;

window.location.replace(`${normalizedBase}#home`);
