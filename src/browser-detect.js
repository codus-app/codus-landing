function bool(val) { return !!val; }

// Chrome or most other Chrome-like browsers (like Opera and Brave). Edge defines window.chrome
// but is missing loadTimes
export const isChrome = bool(window.chrome && window.chrome.loadTimes);
// Firefox
export const isFirefox = bool(window.InstallTrigger);

export const isSupported = isChrome || isFirefox;
