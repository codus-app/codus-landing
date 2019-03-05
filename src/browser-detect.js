function bool(val) { return !!val; }

// Chrome or most other Chrome-like browsers (like Opera and Brave)
export const isChrome = bool(window.chrome);
// Firefox
export const isFirefox = bool(window.InstallTrigger);

export const isSupported = isChrome || isFirefox;
