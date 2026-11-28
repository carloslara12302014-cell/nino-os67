const desktop = document.querySelector("#desktop");
const appWindow = document.querySelector("#app-window");
const appContent = document.querySelector("#app-content");
const launcherButton = document.querySelector("#launcher-button");
const appMenu = document.querySelector("#app-menu");
const appSearch = document.querySelector("#app-search");
const appGrid = document.querySelector("#menu-app-grid");
const shortcutGrid = document.querySelector("#desktop-icons");
const quickSearchInput = document.querySelector("#quick-search-input");
const profilePhotoPath = "assets/profile-portrait.jpg";
let focusOrigin = null;

const apps = [
  { id: "files", name: "Files", subtitle: "Your quick links", symbol: "▰", style: "files", keywords: "folders documents shortcuts" },
  { id: "browser", name: "Web", subtitle: "Go somewhere new", symbol: "◉", style: "browser", keywords: "internet search websites" },
  { id: "discover", name: "Discover", subtitle: "Good places to start", symbol: "✧", style: "discover", keywords: "explore internet links" },
  { id: "arcade", name: "Arcade", subtitle: "Take a little break", symbol: "✳", style: "arcade", keywords: "games play puzzle" },
  { id: "media", name: "Watch", subtitle: "Find something to watch", symbol: "▶", style: "media", keywords: "movies video streaming" },
  { id: "photos", name: "Photos", subtitle: "Choose a profile picture", symbol: "▣", style: "photos", keywords: "images pictures gallery profile portrait avatar" },
  { id: "notes", name: "Notes", subtitle: "Keep a thought", symbol: "▤", style: "notes", keywords: "write text notebook" },
  { id: "calculator", name: "Calculator", subtitle: "Quick little sums", symbol: "＋", style: "calculator", keywords: "math numbers" },
  { id: "settings", name: "Settings", subtitle: "Make it yours", symbol: "⚙", style: "settings", keywords: "theme appearance color" }
];

const externalLinks = {
  games: [
    { name: "CrazyGames", detail: "A huge collection of browser games", url: "https://www.crazygames.com/", icon: "✦", tone: "purple" },
    { name: "Poki", detail: "Pick-up-and-play favorites", url: "https://poki.com/", icon: "●", tone: "green" },
    { name: "itch.io", detail: "Discover independent games", url: "https://itch.io/games/html5", icon: "✿", tone: "orange" },
    { name: "2048", detail: "A classic number puzzle", url: "https://www.crazygames.com/game/2048", icon: "▦", tone: "blue" }
  ],
  watch: [
    { name: "YouTube", detail: "Videos, creators, and music", url: "https://www.youtube.com/", icon: "▶", tone: "red" },
    { name: "Tubi", detail: "Movies and shows, free with ads", url: "https://tubitv.com/", icon: "T", tone: "green" },
    { name: "Plex", detail: "Movies, shows, and live TV", url: "https://watch.plex.tv/", icon: "▶", tone: "orange" }
  ],
  explore: [
    { name: "Wikipedia", detail: "A starting point for everything", url: "https://www.wikipedia.org/", icon: "W", tone: "blue" },
    { name: "Google", detail: "Search the wider web", url: "https://www.google.com/", icon: "G", tone: "purple" },
    { name: "Internet Archive", detail: "Explore a library of knowledge", url: "https://archive.org/", icon: "▤", tone: "orange" }
  ]
};

function linkCards(items) {
  return items.map((item) => `
    <a class="link-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
      <span class="link-icon tone-${item.tone}">${item.icon}</span>
      <span class="link-copy"><strong>${item.name}</strong><small>${item.detail}</small></span>
      <span class="link-arrow" aria-hidden="true">↗</span>
    </a>`).join("");
}

const templates = {
  files: `<div class="app-page">
    <div class="page-intro"><span class="eyebrow">YOUR SPACE</span><h2>Quick links</h2><p>A few useful places, ready when you are.</p></div>
    <div class="folder-strip"><button class="folder-tile" type="button" data-app="arcade"><span class="folder-symbol">✳</span><strong>Arcade</strong><small>Your next little break</small></button><button class="folder-tile" type="button" data-app="notes"><span class="folder-symbol">▤</span><strong>Notes</strong><small>Ideas live here</small></button><button class="folder-tile" type="button" data-app="discover"><span class="folder-symbol">✧</span><strong>Discover</strong><small>Explore the web</small></button></div>
    <p class="fine-print"><span class="info-dot">i</span> Files is a shortcut hub. Co-NINO never reads your device files.</p>
  </div>`,
  browser: `<div class="app-page browser-page">
    <div class="page-intro"><span class="eyebrow">THE WIDE WORLD</span><h2>Where to next?</h2><p>Search the web or jump to one of your saved starting points.</p></div>
    <form class="web-form" id="web-form"><span aria-hidden="true">⌕</span><label class="sr-only" for="web-query">Search the web</label><input id="web-query" type="search" placeholder="Search or enter a web address..." autocomplete="off" required><button type="submit">Go <span aria-hidden="true">↗</span></button></form>
    <h3 class="section-label">START SOMEWHERE</h3><div class="link-grid">${linkCards(externalLinks.explore)}</div>
    <p class="fine-print"><span class="info-dot">i</span> Web searches open Google in a new tab. External sites have their own content and privacy policies.</p>
  </div>`,
  discover: `<div class="app-page">
    <div class="feature-banner"><span class="eyebrow">A LITTLE INSPIRATION</span><h2>Follow your curiosity.</h2><p>Places to wander, things to find, and ideas to bring back.</p><span class="feature-star" aria-hidden="true">✦</span></div>
    <h3 class="section-label">A FEW PLACES TO BEGIN</h3><div class="link-grid">${linkCards(externalLinks.explore)}</div>
    <div class="feature-footer"><span class="feature-dot"></span> Nothing to install. Just you and a browser.</div>
  </div>`,
  arcade: `<div class="app-page">
    <div class="feature-banner arcade-banner"><span class="eyebrow">PLAY A LITTLE</span><h2>Welcome to the Arcade.</h2><p>Find a quick puzzle, settle in with a cozy game, or see what's new.</p><span class="feature-star" aria-hidden="true">✳</span></div>
    <h3 class="section-label">PICK YOUR PLAYGROUND</h3><div class="link-grid">${linkCards(externalLinks.games)}</div>
    <p class="fine-print"><span class="info-dot">i</span> Games open on their original websites. Availability, content, and age ratings are set by those sites.</p>
  </div>`,
  media: `<div class="app-page">
    <div class="feature-banner media-banner"><span class="eyebrow">MAKE IT A MOVIE NIGHT</span><h2>Something good is on.</h2><p>Browse independent video platforms and find your next watch.</p><span class="feature-star" aria-hidden="true">▶</span></div>
    <h3 class="section-label">OPEN A VIDEO SERVICE</h3><div class="link-grid">${linkCards(externalLinks.watch)}</div>
    <p class="fine-print"><span class="info-dot">i</span> Streaming services have their own accounts, age ratings, and regional availability.</p>
  </div>`,
  photos: `<div class="app-page photos-page">
    <div class="page-intro"><span class="eyebrow">YOUR PHOTOS</span><h2>Choose a profile photo.</h2><p>Start with this sample portrait and make this desktop feel like yours.</p></div>
    <section class="photo-profile-card" aria-label="Sample profile photo">
      <img class="photo-profile-image" src="${profilePhotoPath}" alt="Sample portrait of a man wearing glasses" width="640" height="640">
      <div class="photo-profile-copy">
        <span class="eyebrow">PROFILE PICTURE</span>
        <h3>A friendly face</h3>
        <p>This sample photo is saved as your profile picture only on this device.</p>
        <button class="photo-action" id="set-profile-photo" type="button" aria-pressed="false">Use as profile photo</button>
        <p class="photo-status" id="photo-status" aria-live="polite"></p>
        <a class="photo-credit" href="https://www.pexels.com/photo/man-wearing-black-crew-neck-shirt-220453/" target="_blank" rel="noopener noreferrer">Sample portrait from Pexels <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </div>`,
  notes: `<div class="notes-page"><div class="notes-toolbar"><span class="notes-indicator"><i></i> SAVED ON THIS DEVICE</span><span id="notes-status" aria-live="polite"></span></div><label class="sr-only" for="notes-area">Your notes</label><textarea id="notes-area" placeholder="A thought, a list, a tiny plan...&#10;&#10;This space is yours."></textarea></div>`,
  calculator: `<div class="calculator-page"><div class="calculator-top"><span class="eyebrow">QUICK MATH</span><h2>Calculator</h2></div><output class="calculator-display" id="calculator-display" aria-live="polite">0</output><div class="calculator-keys" id="calculator-keys">
    <button class="key key-soft" data-calc="clear">AC</button><button class="key key-soft" data-calc="sign">+/−</button><button class="key key-soft" data-calc="percent">%</button><button class="key key-operator" data-calc="operator" data-value="÷">÷</button>
    <button class="key" data-calc="digit" data-value="7">7</button><button class="key" data-calc="digit" data-value="8">8</button><button class="key" data-calc="digit" data-value="9">9</button><button class="key key-operator" data-calc="operator" data-value="×">×</button>
    <button class="key" data-calc="digit" data-value="4">4</button><button class="key" data-calc="digit" data-value="5">5</button><button class="key" data-calc="digit" data-value="6">6</button><button class="key key-operator" data-calc="operator" data-value="−">−</button>
    <button class="key" data-calc="digit" data-value="1">1</button><button class="key" data-calc="digit" data-value="2">2</button><button class="key" data-calc="digit" data-value="3">3</button><button class="key key-operator" data-calc="operator" data-value="+">+</button>
    <button class="key key-zero" data-calc="digit" data-value="0">0</button><button class="key" data-calc="decimal">.</button><button class="key key-equals" data-calc="equals">=</button>
  </div></div>`,
  settings: `<div class="app-page settings-page">
    <div class="page-intro"><span class="eyebrow">MAKE IT YOURS</span><h2>Your kind of color.</h2><p>Pick a mood for your desktop. Your choice stays on this device.</p></div>
    <div class="theme-grid" role="group" aria-label="Desktop themes">
      <button class="theme-card" data-theme-choice="violet" aria-pressed="false"><span class="theme-swatch swatch-violet"></span><strong>Afterglow</strong><small>Violet skies &amp; rose light</small></button>
      <button class="theme-card" data-theme-choice="ocean" aria-pressed="false"><span class="theme-swatch swatch-ocean"></span><strong>Daydream</strong><small>Deep water &amp; blue haze</small></button>
      <button class="theme-card" data-theme-choice="sunset" aria-pressed="false"><span class="theme-swatch swatch-sunset"></span><strong>Golden hour</strong><small>Warm amber &amp; soft dusk</small></button>
      <button class="theme-card" data-theme-choice="forest" aria-pressed="false"><span class="theme-swatch swatch-forest"></span><strong>Quiet grove</strong><small>Moss green &amp; midnight</small></button>
    </div>
    <p class="fine-print settings-feedback" id="settings-feedback" aria-live="polite">Your selection is saved in this browser.</p>
    <div class="about-card"><span class="about-mark">C</span><div><strong>Co-NINO</strong><small>A little desktop for the web · Web edition</small></div><span class="about-version">01</span></div>
  </div>`
};

function appIcon(app, compact = false) {
  return `<span class="app-icon icon-${app.style}${compact ? " compact" : ""}" aria-hidden="true">${app.symbol}</span>`;
}

function makeAppButton(app, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.dataset.app = app.id;
  button.dataset.search = `${app.name} ${app.keywords}`;
  button.setAttribute("aria-label", `Open ${app.name}`);
  button.innerHTML = `${appIcon(app)}<span class="app-button-copy"><strong>${app.name}</strong><small>${app.subtitle}</small></span>`;
  return button;
}

function buildAppGrids() {
  for (const app of apps) {
    shortcutGrid.append(makeAppButton(app, "desktop-shortcut"));
    appGrid.append(makeAppButton(app, "menu-app"));
  }
  document.querySelector("#apps-count").textContent = `${apps.length} LITTLE HELPERS`;
}

function closeMenu() {
  appMenu.hidden = true;
  launcherButton.setAttribute("aria-expanded", "false");
}

function openApp(appId) {
  const app = apps.find((item) => item.id === appId);
  if (!app || !templates[appId]) return;

  focusOrigin = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  document.querySelector("#window-title").textContent = app.name;
  const windowIcon = document.querySelector("#window-app-icon");
  windowIcon.className = `window-app-icon icon-${app.style}`;
  windowIcon.textContent = app.symbol;
  appContent.innerHTML = templates[appId];
  appWindow.hidden = false;
  appWindow.classList.remove("is-maximized");
  document.querySelector("#maximize-window").setAttribute("aria-pressed", "false");
  closeMenu();
  if (appId === "notes") setupNotes();
  if (appId === "calculator") setupCalculator();
  if (appId === "settings") setupSettings();
  if (appId === "browser") setupBrowser();
  if (appId === "photos") setupPhotos();
  document.querySelector("#close-window").focus();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const launcher = target.closest("[data-app]");
  if (launcher) openApp(launcher.dataset.app);
});

launcherButton.addEventListener("click", () => {
  appMenu.hidden = !appMenu.hidden;
  launcherButton.setAttribute("aria-expanded", String(!appMenu.hidden));
  if (!appMenu.hidden) (appGrid.querySelector(".menu-app:not([hidden])") || appSearch).focus();
});
document.querySelector("#menu-close").addEventListener("click", closeMenu);
appSearch.addEventListener("input", () => {
  const query = appSearch.value.trim().toLowerCase();
  appGrid.querySelectorAll(".menu-app").forEach((entry) => {
    entry.hidden = query !== "" && !entry.dataset.search.toLowerCase().includes(query);
  });
});
document.addEventListener("click", (event) => {
  if (!appMenu.hidden && !appMenu.contains(event.target) && !launcherButton.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement instanceof HTMLButtonElement) {
    event.preventDefault();
    document.activeElement.click();
    return;
  }
  if (event.key === "Escape") {
    if (!appMenu.hidden) closeMenu();
    else if (!appWindow.hidden) hideWindow();
    return;
  }
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
  const target = event.target;
  if (!(target instanceof Element) || target.closest("input, textarea, select, [contenteditable='true']")) return;

  const group = target.closest(".desktop-icons, .menu-app-grid, .dock, .app-window, .app-menu, .theme-grid, .calculator-keys, .folder-strip, .link-grid");
  const current = target.closest("button:not(:disabled), a[href]");
  if (!group || !current) return;

  const currentRect = current.getBoundingClientRect();
  const currentX = currentRect.left + currentRect.width / 2;
  const currentY = currentRect.top + currentRect.height / 2;
  const horizontal = event.key === "ArrowLeft" || event.key === "ArrowRight";
  const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
  let next = null;
  let nextScore = Infinity;

  group.querySelectorAll("button:not(:disabled), a[href]").forEach((candidate) => {
    if (candidate === current || candidate.hidden || candidate.getClientRects().length === 0) return;
    const rect = candidate.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - currentX;
    const dy = rect.top + rect.height / 2 - currentY;
    const primary = horizontal ? dx : dy;
    if (forward ? primary <= 0 : primary >= 0) return;
    const cross = horizontal ? Math.abs(dy) : Math.abs(dx);
    const score = Math.abs(primary) + cross * 1.5;
    if (score < nextScore) {
      next = candidate;
      nextScore = score;
    }
  });

  if (next) {
    event.preventDefault();
    next.focus();
  }
});

function hideWindow() {
  appWindow.hidden = true;
  if (focusOrigin?.isConnected && focusOrigin.getClientRects().length > 0) focusOrigin.focus();
  else launcherButton.focus();
}
document.querySelector("#minimize-window").addEventListener("click", hideWindow);
document.querySelector("#close-window").addEventListener("click", hideWindow);
document.querySelector("#maximize-window").addEventListener("click", (event) => {
  const maximized = appWindow.classList.toggle("is-maximized");
  event.currentTarget.setAttribute("aria-pressed", String(maximized));
});

function searchWeb(query) {
  const search = query.trim();
  if (!search) return;
  const looksLikeUrl = /^(https?:\/\/|www\.)/i.test(search) || /^[\w-]+\.[a-z]{2,}(\/.*)?$/i.test(search);
  const destination = looksLikeUrl ? (search.startsWith("http") ? search : `https://${search}`) : `https://www.google.com/search?q=${encodeURIComponent(search)}`;
  window.open(destination, "_blank", "noopener,noreferrer");
}

document.querySelector("#quick-search").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = quickSearchInput.value.trim();
  const matchingApp = apps.find((app) => `${app.name} ${app.keywords}`.toLowerCase().includes(query.toLowerCase()));
  if (query && matchingApp) openApp(matchingApp.id);
  else searchWeb(query);
});
document.querySelector("#dock-now").addEventListener("click", () => openApp("settings"));

function setupBrowser() {
  document.querySelector("#web-form").addEventListener("submit", (event) => {
    event.preventDefault();
    searchWeb(document.querySelector("#web-query").value);
  });
}

function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function setupNotes() {
  const field = document.querySelector("#notes-area");
  const status = document.querySelector("#notes-status");
  field.value = storageGet("co-nino-notes") || "";
  field.addEventListener("input", () => {
    status.textContent = storageSet("co-nino-notes", field.value) ? "All changes saved" : "Could not save in this browser";
    status.classList.toggle("status-error", !status.textContent.startsWith("All"));
  });
}

function setupSettings() {
  const feedback = document.querySelector("#settings-feedback");
  const selectedTheme = desktop.dataset.theme;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === selectedTheme));
    button.addEventListener("click", () => {
      const theme = button.dataset.themeChoice;
      desktop.dataset.theme = theme;
      const saved = storageSet("co-nino-theme", theme);
      document.querySelectorAll("[data-theme-choice]").forEach((choice) => {
        choice.setAttribute("aria-pressed", String(choice === button));
      });
      feedback.textContent = saved ? "Your selection is saved in this browser." : "Theme changed, but this browser could not save your choice.";
    });
  });
}

function updateProfileAvatar() {
  const avatar = document.querySelector("#profile-avatar");
  if (storageGet("co-nino-profile-photo") === "sample") {
    const image = document.createElement("img");
    image.src = profilePhotoPath;
    image.alt = "";
    avatar.replaceChildren(image);
    avatar.classList.add("profile-avatar-photo");
    avatar.setAttribute("aria-label", "Co-NINO profile photo");
  } else {
    avatar.textContent = "C";
    avatar.classList.remove("profile-avatar-photo");
    avatar.setAttribute("aria-label", "Co-NINO profile");
  }
}

function setupPhotos() {
  const button = document.querySelector("#set-profile-photo");
  const status = document.querySelector("#photo-status");
  const selected = storageGet("co-nino-profile-photo") === "sample";
  button.setAttribute("aria-pressed", String(selected));
  status.textContent = selected ? "This sample is your profile photo on this device." : "Your profile photo stays on this device.";
  button.addEventListener("click", () => {
    const saved = storageSet("co-nino-profile-photo", "sample");
    if (saved) {
      updateProfileAvatar();
      button.setAttribute("aria-pressed", "true");
      status.textContent = "Profile photo saved on this device.";
    } else {
      status.textContent = "This browser couldn't save your profile photo.";
    }
  });
}

function calculate(left, right, operator) {
  if (operator === "+") return left + right;
  if (operator === "−") return left - right;
  if (operator === "×") return left * right;
  if (operator === "÷") return right === 0 ? "Error" : left / right;
  return right;
}

function setupCalculator() {
  const display = document.querySelector("#calculator-display");
  const keys = document.querySelector("#calculator-keys");
  let current = "0";
  let stored = null;
  let operator = null;
  let replaceCurrent = false;
  const show = (value) => {
    current = String(value).slice(0, 14);
    display.textContent = current;
  };
  keys.addEventListener("click", (event) => {
    const key = event.target.closest("[data-calc]");
    if (!key) return;
    const action = key.dataset.calc;
    const value = key.dataset.value;
    if (action === "clear") {
      current = "0"; stored = null; operator = null; replaceCurrent = false; show(current);
    } else if (action === "digit") {
      show(replaceCurrent || current === "0" || current === "Error" ? value : current + value);
      replaceCurrent = false;
    } else if (action === "decimal") {
      if (replaceCurrent || current === "Error") { show("0."); replaceCurrent = false; }
      else if (!current.includes(".")) show(`${current}.`);
    } else if (action === "sign" && current !== "Error") {
      show(String(Number(current) * -1));
    } else if (action === "percent" && current !== "Error") {
      show(String(Number(current) / 100));
    } else if (action === "operator") {
      if (stored !== null && operator && !replaceCurrent) {
        const result = calculate(stored, Number(current), operator);
        show(result);
        stored = result === "Error" ? null : Number(result);
      } else {
        stored = Number(current);
      }
      operator = value;
      replaceCurrent = true;
    } else if (action === "equals" && stored !== null && operator) {
      show(calculate(stored, Number(current), operator));
      stored = null; operator = null; replaceCurrent = true;
    }
  });
}

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(now);
  document.querySelector("#top-time").textContent = time;
  document.querySelector("#hero-time").textContent = time;
  document.querySelector("#dock-time").textContent = time;
  document.querySelector("#top-date").textContent = date;
  document.querySelector("#hero-date").textContent = date;
}

const savedTheme = storageGet("co-nino-theme");
if (["violet", "ocean", "sunset", "forest"].includes(savedTheme)) desktop.dataset.theme = savedTheme;
buildAppGrids();
updateProfileAvatar();
updateClock();
window.setInterval(updateClock, 30_000);
