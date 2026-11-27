const desktop = document.querySelector("#desktop");
const appWindow = document.querySelector("#app-window");
const appContent = document.querySelector("#app-content");
const startButton = document.querySelector("#start-button");
const startMenu = document.querySelector("#start-menu");
const startSearch = document.querySelector("#start-search");
const startAppGrid = document.querySelector("#start-app-grid");
const taskbarApp = document.querySelector("#taskbar-app");
const taskbarAppTitle = document.querySelector("#taskbar-app-title");
const gameLinks = [
  { name: "2048", category: "Puzzle", description: "Slide, combine, and chase the next number.", url: "https://www.crazygames.com/game/2048" },
  { name: "Eggy Car", category: "Cozy", description: "Take the scenic route and keep your egg safe.", url: "https://www.crazygames.com/game/eggys-car" },
  { name: "Shell Shockers", category: "Action", description: "Egg-shaped action in a lively arena.", url: "https://www.crazygames.com/game/shell-shockers" },
  { name: "Word Wipe", category: "Puzzle", description: "Spot words, clear the board, beat the clock.", url: "https://www.crazygames.com/game/word-wipe" },
  { name: "Little Alchemy 2", category: "Cozy", description: "Mix simple things to discover something new.", url: "https://www.crazygames.com/game/little-alchemy-2" },
  { name: "Tag", category: "Action", description: "Dash around and don't be the one who's it.", url: "https://www.crazygames.com/game/tag" },
  { name: "Subway Surfers: Miami", category: "Action", description: "Dodge obstacles and dash through the Miami streets.", url: "https://browlu27.github.io/gamessite.github.io/projects/subway-surfers-unity/miami.html" }
];

const appCatalog = [
  { id: "explorer", name: "File Explorer", glyph: "▰", icon: "icon-folder", keywords: "files folders documents" },
  { id: "edge", name: "Microsoft Edge", glyph: "e", icon: "icon-edge", url: "https://www.microsoft.com/edge", keywords: "internet browser web" },
  { id: "store", name: "Store", glyph: "▣", icon: "icon-store", keywords: "games sites marketplace" },
  { id: "notepad", name: "Notepad", glyph: "▤", icon: "icon-notepad", keywords: "notes text write" },
  { id: "calculator", name: "Calculator", glyph: "＋", icon: "icon-calculator", keywords: "math numbers" },
  { id: "settings", name: "Settings", glyph: "⚙", icon: "icon-settings", keywords: "personalize wallpaper" },
  { id: "games", name: "Games", glyph: "✦", icon: "icon-games", keywords: "arcade play puzzle action" },
  { id: "tubi", name: "Tubi", glyph: "▶", icon: "icon-tubi", keywords: "movies films streaming tv shows google play" },
  { id: "guide", name: "AI Assistant", glyph: "✳", icon: "icon-guide", keywords: "vision camera photo image paste chat" },
  { id: "cine", name: "Cine-OS", glyph: "C", icon: "icon-cine", url: "https://cineosweb.github.io/", keywords: "cinema movies video streaming" },
  { id: "opera", name: "Opera GX", glyph: "O", icon: "icon-opera", url: "https://www.opera.com/gx", keywords: "browser web gaming" },
  { id: "google", name: "Google Search", glyph: "G", icon: "icon-google", url: "https://www.google.com/", keywords: "search web internet" },
  { id: "gmail", name: "Gmail", glyph: "M", icon: "icon-gmail", url: "https://mail.google.com/mail/u/0/#inbox", keywords: "email inbox mail messages" }
];

const templates = {
  explorer: `<div class="app-toolbar"><span>Home</span><span>›</span><strong>Quick access</strong></div>
    <div class="explorer-layout"><aside class="explorer-sidebar"><strong>Home</strong><span>★ &nbsp; Favorites</span><span>▣ &nbsp; Desktop</span><span>▤ &nbsp; Documents</span><span>↓ &nbsp; Downloads</span></aside>
    <div class="explorer-content"><h2>Quick access</h2><p class="app-muted">A few handy places to start.</p>
    <button class="folder-card" data-app="games"><span>✦</span><strong>Games</strong><small>6 browser games</small></button>
    <button class="folder-card" data-app="store"><span>▣</span><strong>Game sites</strong><small>Browse available sites</small></button>
    <button class="folder-card" data-app="notepad"><span>▤</span><strong>Notes</strong><small>Open a local notepad</small></button>
    <p class="privacy-note">This is a visual demo. It does not access your device files.</p></div></div>`,
  store: `<div class="app-toolbar"><strong>Store</strong><span class="app-muted">Places to discover browser games</span></div>
    <div class="app-page"><div class="app-hero"><span class="mini-label">BROWSE THE WEB</span><h2>Pick a place to play</h2><p>These links open their original websites in a new tab. Site access depends on your network.</p></div>
    <div class="site-grid">
      <a href="https://www.crazygames.com/" target="_blank" rel="noopener noreferrer"><span class="site-icon site-purple">◈</span><strong>CrazyGames</strong><small>Big collection of browser games</small><span class="row-arrow">↗</span></a>
      <a href="https://itch.io/games/html5" target="_blank" rel="noopener noreferrer"><span class="site-icon site-orange">✿</span><strong>itch.io HTML5</strong><small>Independent games to explore</small><span class="row-arrow">↗</span></a>
      <a href="https://poki.com/" target="_blank" rel="noopener noreferrer"><span class="site-icon site-green">●</span><strong>Poki</strong><small>Quick games for your browser</small><span class="row-arrow">↗</span></a>
      <a href="https://play.google.com/store/apps/details?id=com.tubitv" target="_blank" rel="noopener noreferrer"><span class="site-icon site-green">▶</span><strong>Tubi on Google Play</strong><small>View the Android app listing</small><span class="row-arrow">↗</span></a>
      <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer"><span class="site-icon site-blue">G</span><strong>Google Search</strong><small>Search the web</small><span class="row-arrow">↗</span></a>
    </div>
    <p class="privacy-note">The App Store logo is a trademark of Apple Inc.; this project is not affiliated with Apple. <a href="https://logos-world.net/" target="_blank" rel="noopener noreferrer">Logo source</a>.</p></div>`,
  notepad: `<div class="notepad-toolbar"><span>Untitled — Notepad</span><span>Text stays in this tab only</span></div><textarea class="notepad-area" aria-label="Notepad text" placeholder="Start typing..."></textarea>`,
  calculator: `<div class="calculator-wrap"><div class="calculator-heading"><span>Calculator</span><small>Standard</small></div><output class="calculator-display" id="calculator-display" aria-live="polite">0</output>
    <div class="calculator-keys">
      <button data-calc="clear">C</button><button data-calc="sign">±</button><button data-calc="operator" data-value="÷">÷</button><button data-calc="operator" data-value="×">×</button>
      <button data-calc="digit" data-value="7">7</button><button data-calc="digit" data-value="8">8</button><button data-calc="digit" data-value="9">9</button><button data-calc="operator" data-value="−">−</button>
      <button data-calc="digit" data-value="4">4</button><button data-calc="digit" data-value="5">5</button><button data-calc="digit" data-value="6">6</button><button data-calc="operator" data-value="+">+</button>
      <button data-calc="digit" data-value="1">1</button><button data-calc="digit" data-value="2">2</button><button data-calc="digit" data-value="3">3</button><button class="equals-key" data-calc="equals">=</button>
      <button class="zero-key" data-calc="digit" data-value="0">0</button><button data-calc="decimal">.</button>
    </div></div>`,
  settings: `<div class="app-toolbar"><strong>Settings</strong><span class="app-muted">Make this desktop yours</span></div><div class="settings-content">
    <div class="settings-heading"><span class="settings-big-icon">⚙</span><div><h2>Personalization</h2><p>Choose the feel of your Nino OS iPad.</p></div></div>
    <div class="setting-row"><div><strong>Desktop wallpaper</strong><small>Choose the original theme, blue theme, or Windows wallpaper.</small></div><div class="setting-actions"><button class="toggle-button" id="wallpaper-toggle" type="button" aria-pressed="false">Use blue wallpaper</button><button class="toggle-button" id="windows-wallpaper-toggle" type="button" aria-pressed="false">Use Windows wallpaper</button></div></div>
    <div class="setting-row"><div><strong>Privacy</strong><small>Apps here are demos and external links; this page stores no personal data.</small></div><span class="setting-status">On this device</span></div>
    <p class="privacy-note">Nino OS iPad is an original browser demo and is not affiliated with Apple or Microsoft.</p>
  </div>`,
  games: `<div class="app-toolbar"><strong>Games</strong><span class="app-muted">Your little game library</span></div>
    <div class="games-heading"><div><span class="mini-label">BROWSER ARCADE</span><h2>Pick your next game</h2></div>
      <div class="game-filters"><button class="selected" data-game-filter="all">All</button><button data-game-filter="Puzzle">Puzzle</button><button data-game-filter="Cozy">Cozy</button><button data-game-filter="Action">Action</button></div></div>
    <a class="all-games-shortcut" href="https://browlu27.github.io/gamessite.github.io/" target="_blank" rel="noopener noreferrer"><span class="all-games-icon">✦</span><span><strong>All Games</strong><small>Open the full game collection</small></span><span class="row-arrow">↗</span></a>
    <div class="game-list">${gameLinks.map((game) => `<a class="game-row" data-category="${game.category}" href="${game.url}" target="_blank" rel="noopener noreferrer"><span class="game-row-icon">${game.category === "Puzzle" ? "▦" : game.category === "Cozy" ? "☼" : "✦"}</span><span class="game-row-copy"><strong>${game.name}</strong><small>${game.description}</small></span><span class="game-category">${game.category}</span><span class="row-arrow">↗</span></a>`).join("")}</div>
    <p class="privacy-note">External games only work where permitted. Availability and age ratings vary by site. The PlayStation icon is a trademark of Sony Interactive Entertainment; this project is not affiliated with Sony or PlayStation. <a href="https://commons.wikimedia.org/wiki/File:PlayStation_App_Icon.jpg" target="_blank" rel="noopener noreferrer">Icon source</a>.</p>`,
  tubi: `<div class="app-toolbar"><strong>Tubi</strong><span class="app-muted">Movies &amp; TV</span></div>
    <div class="app-page"><div class="app-hero"><span class="mini-label">TUBI</span><h2>Watch movies and TV</h2><p>Choose Google Play to view the app listing, or open Tubi in your browser.</p></div>
    <div class="site-grid">
      <a href="https://play.google.com/store/apps/details?id=com.tubitv" target="_blank" rel="noopener noreferrer"><span class="site-icon site-green">▶</span><strong>Google Play</strong><small>View the Tubi app listing</small><span class="row-arrow">↗</span></a>
      <a href="https://tubitv.com/" target="_blank" rel="noopener noreferrer"><span class="site-icon site-red">▶</span><strong>Tubi website</strong><small>Watch from your browser</small><span class="row-arrow">↗</span></a>
    </div>
    <p class="privacy-note">These links open in new tabs. App installation and streaming availability depend on your device, region, account, and network permissions.</p></div>`,
  guide: `<div class="guide-wrap"><div class="app-hero"><span class="mini-label">CHATGPT-STYLE AI</span><h2>AI Assistant</h2><p>Ask any question or attach a photo. The assistant can remember this chat and respond with AI.</p></div>
    <div class="guide-chat" id="guide-chat" aria-live="polite"><div class="guide-message">Hi! Ask me anything, or add a photo and tell me what you want to know.</div></div>
    <div class="guide-image-tools">
      <label class="guide-camera-button" for="guide-camera">📷 Take photo</label>
      <input id="guide-camera" type="file" accept="image/*" capture="environment" hidden>
      <label class="guide-camera-button" for="guide-image">🖼 Choose image</label>
      <input id="guide-image" type="file" accept="image/*" hidden>
      <button type="button" class="guide-camera-button" id="guide-paste">Paste image</button>
    </div>
    <form class="guide-form" id="guide-form"><label class="sr-only" for="guide-input">Message the AI assistant</label><input id="guide-input" maxlength="160" placeholder="Ask about the photo..." autocomplete="off"><button type="submit">Send</button></form>
    <p class="privacy-note">Chat and photo prompts are sent to the AI service for processing. No sign-in is required. Your photos are not stored by this app.</p></div>`
};

function buildStartMenu() {
  appCatalog.forEach((app) => {
    const entry = app.url ? document.createElement("a") : document.createElement("button");
    entry.className = "start-app";
    entry.dataset.search = `${app.name} ${app.keywords}`;
    if (app.url) {
      entry.href = app.url;
      entry.target = "_blank";
      entry.rel = "noopener noreferrer";
      entry.addEventListener("click", closeStartMenu);
    } else {
      entry.type = "button";
      entry.dataset.app = app.id;
    }
    const icon = document.createElement("span");
    icon.className = `app-icon ${app.icon}`;
    icon.textContent = app.glyph;
    const title = document.createElement("span");
    title.textContent = app.name;
    entry.append(icon, title);
    startAppGrid.append(entry);
  });
}

function closeStartMenu() {
  startMenu.hidden = true;
  startButton.setAttribute("aria-expanded", "false");
}

function openApp(appId) {
  const app = appCatalog.find((item) => item.id === appId);
  if (!app) return;
  if (app.url) {
    window.open(app.url, "_blank", "noopener,noreferrer");
    closeStartMenu();
    return;
  }
  const appNames = {
    explorer: "File Explorer",
    store: "Store",
    notepad: "Notepad",
    calculator: "Calculator",
    settings: "Settings",
    games: "Games",
    tubi: "Tubi",
    guide: "AI Assistant"
  };
  document.querySelector("#window-title").textContent = appNames[appId];
  document.querySelector("#window-app-icon").textContent = app.glyph;
  document.querySelector("#window-app-icon").className = `window-app-icon ${app.icon}`;
  taskbarAppTitle.textContent = appNames[appId];
  taskbarApp.querySelector(".taskbar-app-icon").textContent = app.glyph;
  taskbarApp.querySelector(".taskbar-app-icon").className = `taskbar-app-icon ${app.icon}`;
  appContent.innerHTML = templates[appId];
  appWindow.hidden = false;
  appWindow.classList.remove("is-maximized");
  document.querySelector("#maximize-window").setAttribute("aria-pressed", "false");
  taskbarApp.hidden = false;
  taskbarApp.setAttribute("aria-pressed", "true");
  closeStartMenu();
  if (appId === "calculator") setupCalculator();
  if (appId === "guide") setupGuide();
  if (appId === "settings") setupSettings();
  if (appId === "games") setupGameFilters();
}

document.addEventListener("click", (event) => {
  const launcher = event.target.closest("[data-app]");
  if (launcher) openApp(launcher.dataset.app);
});

startButton.addEventListener("click", () => {
  startMenu.hidden = !startMenu.hidden;
  startButton.setAttribute("aria-expanded", String(!startMenu.hidden));
  if (!startMenu.hidden) startSearch.focus();
});

startSearch.addEventListener("input", () => {
  const query = startSearch.value.trim().toLowerCase();
  startAppGrid.querySelectorAll(".start-app").forEach((entry) => {
    entry.hidden = query !== "" && !entry.dataset.search.toLowerCase().includes(query);
  });
});

document.addEventListener("click", (event) => {
  const taskbarSearch = document.querySelector("#web-search-form");
  if (!startMenu.hidden && !startMenu.contains(event.target) && !startButton.contains(event.target) && !taskbarSearch.contains(event.target)) closeStartMenu();
});

function hideAppWindow() {
  appWindow.hidden = true;
  taskbarApp.setAttribute("aria-pressed", "false");
}

document.querySelector("#back-to-desktop").addEventListener("click", hideAppWindow);
document.querySelector("#minimize-window").addEventListener("click", hideAppWindow);
document.querySelector("#close-window").addEventListener("click", () => {
  hideAppWindow();
  taskbarApp.hidden = true;
  appWindow.classList.remove("is-maximized");
  document.querySelector("#maximize-window").setAttribute("aria-pressed", "false");
});
document.querySelector("#maximize-window").addEventListener("click", (event) => {
  const maximized = appWindow.classList.toggle("is-maximized");
  event.currentTarget.setAttribute("aria-pressed", String(maximized));
});
taskbarApp.addEventListener("click", () => {
  appWindow.hidden = false;
  taskbarApp.setAttribute("aria-pressed", "true");
  closeStartMenu();
});

document.querySelector("#web-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector("#web-search").value.trim();
  if (query) window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  else {
    startMenu.hidden = false;
    startButton.setAttribute("aria-expanded", "true");
    startSearch.focus();
  }
});

document.querySelector("#web-search").addEventListener("focus", () => {
  startMenu.hidden = false;
  startButton.setAttribute("aria-expanded", "true");
  startSearch.value = document.querySelector("#web-search").value;
  startSearch.dispatchEvent(new Event("input"));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeStartMenu();
});

function setupGameFilters() {
  appContent.querySelectorAll("[data-game-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      appContent.querySelectorAll("[data-game-filter]").forEach((item) => item.classList.toggle("selected", item === button));
      appContent.querySelectorAll(".game-row[data-category]").forEach((game) => {
        game.hidden = button.dataset.gameFilter !== "all" && game.dataset.category !== button.dataset.gameFilter;
      });
    });
  });
}

function setupSettings() {
  const button = document.querySelector("#wallpaper-toggle");
  const windowsButton = document.querySelector("#windows-wallpaper-toggle");
  function applyWallpaper(wallpaper) {
    desktop.classList.toggle("blue-wallpaper", wallpaper === "blue");
    desktop.classList.toggle("windows-wallpaper", wallpaper === "windows");
    localStorage.setItem("playfield-wallpaper", wallpaper);
    button.setAttribute("aria-pressed", String(wallpaper === "blue"));
    button.textContent = wallpaper === "blue" ? "Use dark wallpaper" : "Use blue wallpaper";
    windowsButton.setAttribute("aria-pressed", String(wallpaper === "windows"));
    windowsButton.textContent = wallpaper === "windows" ? "Windows wallpaper selected" : "Use Windows wallpaper";
  }
  const savedWallpaper = localStorage.getItem("playfield-wallpaper");
  applyWallpaper(savedWallpaper === "blue" || savedWallpaper === "windows" ? savedWallpaper : "dark");
  button.addEventListener("click", () => {
    applyWallpaper(button.getAttribute("aria-pressed") === "true" ? "dark" : "blue");
  });
  windowsButton.addEventListener("click", () => {
    applyWallpaper(windowsButton.getAttribute("aria-pressed") === "true" ? "dark" : "windows");
  });
}

function setupCalculator() {
  const display = document.querySelector("#calculator-display");
  let current = "0";
  let stored = null;
  let operator = null;
  let replaceCurrent = false;
  function show(value) {
    current = String(value).slice(0, 14);
    display.textContent = current;
  }
  appContent.querySelector(".calculator-keys").addEventListener("click", (event) => {
    const key = event.target.closest("[data-calc]");
    if (!key) return;
    const action = key.dataset.calc;
    const value = key.dataset.value;
    if (action === "clear") {
      stored = null; operator = null; replaceCurrent = false; show("0");
    } else if (action === "digit") {
      show(replaceCurrent || current === "0" ? value : current + value);
      replaceCurrent = false;
    } else if (action === "decimal") {
      if (replaceCurrent) { show("0."); replaceCurrent = false; }
      else if (!current.includes(".")) show(`${current}.`);
    } else if (action === "sign") {
      show(String(Number(current) * -1));
    } else if (action === "operator") {
      stored = Number(current); operator = value; replaceCurrent = true;
    } else if (action === "equals" && stored !== null && operator) {
      const right = Number(current);
      const result = operator === "+" ? stored + right
        : operator === "−" ? stored - right
          : operator === "×" ? stored * right
            : right === 0 ? "Error" : stored / right;
      stored = null; operator = null; replaceCurrent = true; show(result);
    }
  });
}

function setupGuide() {
  const form = document.querySelector("#guide-form");
  const input = document.querySelector("#guide-input");
  const chat = document.querySelector("#guide-chat");
  const camera = document.querySelector("#guide-camera");
  const imageInput = document.querySelector("#guide-image");
  const pasteButton = document.querySelector("#guide-paste");
  let currentImage = null;
  let currentImageDataUrl = null;
  let visionModel = null;
  let modelLoading = null;
  const messages = [{
    role: "system",
    content: "You are a helpful, accurate AI assistant inside an iPad-style app. Answer any normal question clearly. Do not claim to be a local demo."
  }];

  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error("The vision model could not be downloaded."));
      document.head.append(script);
    });
  }

  async function getVisionModel() {
    if (visionModel) return visionModel;
    if (!modelLoading) {
      modelLoading = Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js"),
        loadScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js")
      ]).then(() => window.cocoSsd.load({ base: "lite_mobilenet_v2" })).then((model) => {
        visionModel = model;
        return model;
      }).catch((error) => {
        modelLoading = null;
        throw error;
      });
    }
    return modelLoading;
  }

  function appendReply(text) {
    const reply = document.createElement("div");
    reply.className = "guide-message";
    reply.textContent = text;
    chat.append(reply);
    chat.scrollTop = chat.scrollHeight;
  }

  async function handleImage(file) {
    if (!file || !file.type.startsWith("image/")) {
      appendReply("Please choose or paste an image file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      appendReply("That image is larger than 20 MB. Please choose a smaller photo.");
      return;
    }

    const url = URL.createObjectURL(file);
    currentImageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("The image could not be read."));
      reader.readAsDataURL(file);
    });
    const image = new Image();
    image.src = url;
    image.alt = "Attached photo";
    image.className = "guide-attached-image";
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error("The image could not be opened."));
    });
    currentImage = image;

    const userMessage = document.createElement("div");
    userMessage.className = "guide-message user-guide-message guide-image-message";
    userMessage.append(image);
    chat.append(userMessage);
    appendReply("Analyzing the photo...");
    chat.scrollTop = chat.scrollHeight;

    try {
      const model = await getVisionModel();
      const predictions = await model.detect(image);
      const useful = predictions
        .filter((item) => item.score >= 0.45)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      let barcodeText = "";
      if ("BarcodeDetector" in window) {
        try {
          const detector = new window.BarcodeDetector();
          const barcodes = await detector.detect(image);
          barcodeText = barcodes.map((item) => item.rawValue).filter(Boolean).join(", ");
        } catch (_) {}
      }

      if (useful.length) {
        const objects = useful.map((item) => `${item.class} (${Math.round(item.score * 100)}%)`).join(", ");
        appendReply(`I found: ${objects}.${barcodeText ? ` I also detected a barcode or QR code containing: ${barcodeText}` : ""}`);
      } else if (barcodeText) {
        appendReply(`I detected a barcode or QR code containing: ${barcodeText}`);
      } else {
        appendReply("I opened the photo, but could not identify a common object with confidence.");
      }
    } catch (error) {
      appendReply("Photo ready, but the vision model could not load. Check your connection and try again.");
    }
  }

  async function readClipboardImage() {
    if (!navigator.clipboard?.read) {
      appendReply("Use Choose image or long-press and paste from your clipboard.");
      return;
    }
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (imageType) {
          await handleImage(await item.getType(imageType));
          return;
        }
      }
      appendReply("The clipboard does not contain an image.");
    } catch (_) {
      appendReply("Paste permission was not granted. Use Choose image or Take photo instead.");
    }
  }

  camera.addEventListener("change", () => handleImage(camera.files[0]));
  imageInput.addEventListener("change", () => handleImage(imageInput.files[0]));
  pasteButton.addEventListener("click", readClipboardImage);
  if (!chat.dataset.pasteReady) {
    document.addEventListener("paste", (event) => {
      if (!appWindow.hidden && event.target.closest && event.target.closest(".guide-wrap")) {
        const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith("image/"));
        if (imageItem) {
          event.preventDefault();
          handleImage(imageItem.getAsFile());
        }
      }
    });
    chat.dataset.pasteReady = "true";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const userMessage = document.createElement("div");
    userMessage.className = "guide-message user-guide-message";
    userMessage.textContent = text;
    const reply = document.createElement("div");
    reply.className = "guide-message";
    reply.textContent = "Thinking...";
    chat.append(userMessage, reply);
    chat.scrollTop = chat.scrollHeight;
    input.value = "";

    try {
      messages.push({ role: "user", content: text });
      let outgoingMessages = [...messages];
      if (currentImageDataUrl) {
        outgoingMessages[outgoingMessages.length - 1] = {
          role: "user",
          content: [
            { type: "text", text },
            { type: "image_url", image_url: { url: currentImageDataUrl } }
          ]
        };
      }

      const response = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai",
          messages: outgoingMessages,
          temperature: 0.7
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `AI service returned ${response.status}`);
      }
      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content
        || "I could not generate a response. Please try again.";
      reply.textContent = answer;
      messages.push({ role: "assistant", content: answer });
      currentImageDataUrl = null;
    } catch (_) {
      reply.textContent = "The AI service is busy or reached its short-term limit. Wait a moment, then try again.";
      messages.pop();
    }
    chat.scrollTop = chat.scrollHeight;
    input.focus();
  });
}

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now);
  document.querySelector("#ipad-time").textContent = time;
  document.querySelector("#desktop-time").textContent = time;
  document.querySelector("#tray-time").textContent = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat(undefined, { month: "numeric", day: "numeric", year: "numeric" }).format(now);
  document.querySelector("#desktop-date").textContent = date;
  document.querySelector("#tray-date").textContent = date;
}

const savedWallpaper = localStorage.getItem("playfield-wallpaper");
if (savedWallpaper === "blue" || savedWallpaper === "windows") {
  desktop.classList.add(savedWallpaper === "blue" ? "blue-wallpaper" : "windows-wallpaper");
}
buildStartMenu();
updateClock();
window.setInterval(updateClock, 30_000);
