/* ================================================================
   1) SỬA LINK CỦA BẠN TẠI ĐÂY
   Thay dấu # bằng đường dẫn Google Sheet / Docs thật của bạn.
   ================================================================ */
const quickLinks = [
  { label: "Google Sheet Flashcards", icon: "🗂️", url: "https://docs.google.com/spreadsheets/d/1YFaJsXJTqSx6uHM-JiE21w3QQ0O2eGNzHn74Jk4L0ME/edit?usp=sharing" },
  { label: "Sheet Lịch học Giai đoạn 1", icon: "📊", url: "https://docs.google.com/spreadsheets/d/1KFVTP8zV9FAFRkUrh48wrpxUcCPZRQulX10UdlEmTHU/edit?usp=sharing" },
  { label: "Google Docs Giai đoạn 1", icon: "📘", url: "https://docs.google.com/document/d/18igkNty6WdO6Z8UUO8qoeBnyPqJFdoi9eyw1UTBWqDI/edit?usp=sharing" },
  { label: "Google Calendar", icon: "📅", url: "https://calendar.google.com" },
  { label: "TV5MONDE", icon: "▶️", url: "https://apprendre.tv5monde.com/fr" },
  { label: "RFI Savoirs", icon: "🎧", url: "https://francaisfacile.rfi.fr/fr/" },
  { label: "Giáo trình Édito B1 + Audio", icon: "🎓", url: "https://drive.google.com/drive/folders/1L15H8Phk2cKcB4aWWLAHW2PuDBRDLZXw?usp=sharing" }
];

/* Google Sheet nguồn từ vựng. Mỗi tháng dùng tab T6, T7, T8... */
const vocabularySheet = {
  spreadsheetId: "1YFaJsXJTqSx6uHM-JiE21w3QQ0O2eGNzHn74Jk4L0ME",
  tabPrefix: "T",
  range: "A3:J1000"
};

/* Tab Google Docs theo ngày của Giai đoạn 1. */
const dailyDoc = {
  documentId: "18igkNty6WdO6Z8UUO8qoeBnyPqJFdoi9eyw1UTBWqDI",
  tabs: {
    "21/06/2026": "t.5l2k92de6u88",
    "22/06/2026": "t.9l4nkmynj36q",
    "23/06/2026": "t.y3iwbdhsrgn2",
    "24/06/2026": "t.t3iie37ku3ev",
    "25/06/2026": "t.v1cgtpe81f60",
    "26/06/2026": "t.fvrsl199evg4",
    "27/06/2026": "t.3gdhd7jjst2n",
    "28/06/2026": "t.5ggynn4chn9b",
    "29/06/2026": "t.ki4jnmfbc680",
    "30/06/2026": "t.6kdtf3gid49g",
    "01/07/2026": "t.poy8i8p5r0o1",
    "02/07/2026": "t.c9ao826wjk46",
    "03/07/2026": "t.rr51xnpzfhis",
    "04/07/2026": "t.u2g5f55nx0gm",
    "05/07/2026": "t.ry2dwmaup206",
    "06/07/2026": "t.q29cjwwm8brs",
    "07/07/2026": "t.2azjpiu9y",
    "08/07/2026": "t.v6vmylspugk3",
    "09/07/2026": "t.r251hsro5kt0",
    "10/07/2026": "t.w0svhp92zyro",
    "11/07/2026": "t.n638ku6y8mci",
    "12/07/2026": "t.5n2d1vrp2svz",
    "13/07/2026": "t.o52lp5zggi3b",
    "14/07/2026": "t.31aatn6g8ikr",
    "15/07/2026": "t.z2hpgclf2ole",
    "16/07/2026": "t.sgg2mu13w46c",
    "17/07/2026": "t.7xc06fl5ukcx",
    "18/07/2026": "t.u2hozazexaza",
    "19/07/2026": "t.a2wzlgsg1qng",
    "20/07/2026": "t.bngxhxd4fp4z",
    "21/07/2026": "t.m53dad1ugpu5",
    "22/07/2026": "t.jflr0x85rv6l",
    "23/07/2026": "t.oillwzdd53m3",
    "24/07/2026": "t.e5i3hpjmrm5b",
    "25/07/2026": "t.cbyftwknmx3d",
    "26/07/2026": "t.feod21vqx3c1",
    "27/07/2026": "t.bbzd4y6hjhjn",
    "28/07/2026": "t.i6t6hrd5grwv",
    "29/07/2026": "t.suuvjjjvd1im",
    "30/07/2026": "t.diolf1i9znai",
    "31/07/2026": "t.g74znl1noopz"
  }
};

/* ================================================================
   2) LỊCH HỌC — chỉnh nội dung trong mảng scheduleData này.
   Định dạng ngày: YYYY-MM-DD. Chủ đề sẽ luân phiên theo từng ngày.
   ================================================================ */
const priorityThemes = [
  "L’expatriation", "L’apprentissage des langues", "Télétravail",
  "Réseaux sociaux", "Bien-être professionnel", "Harcèlement scolaire",
  "Pollution", "Réchauffement climatique", "Sport", "Santé mentale",
  "Tourisme", "Diversité culturelle", "Intelligence artificielle",
  "Mobilité internationale", "Éducation numérique"
];

/* Nội dung Édito B1 theo 43 ngày của Giai đoạn 1: 19/06 → 31/07. */
const editoB1Daily = [
  "Édito B1 · Unité 5 – Le français dans le monde · p.77–80 – Une Belge au Canada · audio 29",
  "Édito B1 · Unité 5 – Le français dans le monde · p.81–82 – Une Belge au Canada (2) · écouter et relever le vocabulaire",
  "Édito B1 · Unité 5 – Le français dans le monde · p.83–84 – Habiter ailleurs · écouter et relever le vocabulaire",
  "Édito B1 · Unité 5 – Le français dans le monde · p.85–86 – Francophonie · écouter et relever le vocabulaire",
  "Édito B1 · Unité 5 – Le français dans le monde · p.87–88 – Vanuatu · écouter et relever le vocabulaire",
  "Édito B1 · Unité 5 – Le français dans le monde · p.89–90 – La parole des sables · écouter et relever le vocabulaire",
  "Édito B1 · Unité 5 – Le français dans le monde · p.91–92 – Révision · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.157–160 – Wikipédia · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.161–162 – Wikipédia (2) · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.163–164 – BELC · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.165–166 – Suisse: apprentissage · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.167–168 – Débats · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.169–170 – Synthèse · écouter et relever le vocabulaire",
  "Édito B1 · Unité 10 – Soif d’apprendre · p.171–172 – Bilan · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.109–110 – Tourisme 1 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.111–112 – Tourisme 2 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.113–114 – Tourisme 3 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.115–116 – Tourisme 4 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.117–118 – Tourisme 5 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.119–121 – Tourisme 6 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 7 – Et si on partait ? · p.122–124 – Bilan · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.45–46 – Travail 1 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.47–48 – Travail 2 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.49–50 – Travail 3 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.51–52 – Travail 4 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.53–54 – Travail 5 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.55–57 – Travail 6 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 3 – Travailler autrement · p.58–60 – Bilan · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.93–94 – Médias 1 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.95–96 – Médias 2 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.97–98 – Médias 3 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.99–100 – Médias 4 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.101–102 – Médias 5 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.103–105 – Médias 6 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 6 – Médias en masse · p.106–108 – Bilan · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.125–126 – Environnement 1 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.127–128 – Environnement 2 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.129–130 – Environnement 3 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.131–132 – Environnement 4 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.133–134 – Environnement 5 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.135–136 – Environnement 6 · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.137–138 – Révision · écouter et relever le vocabulaire",
  "Édito B1 · Unité 8 – La planète en héritage · p.139–140 – Bilan final · écouter et relever le vocabulaire"
];

const scheduleData = [
  {
    phase: "Giai đoạn 1 · Xây nền B1",
    start: "2026-06-19", end: "2026-07-31",
    goal: "Consolider les bases du niveau B1 et instaurer un rythme d’apprentissage régulier chaque jour",
    tasks: {
      morning: ["Học 15 từ theo chủ đề", "Nghe 20 phút và ghi 5 ý chính", "Nội dung Édito B1 theo ngày"],
      afternoon: ["Ôn 1 điểm ngữ pháp B1", "Đọc 1 bài ngắn và trả lời câu hỏi", "Ghi 3 cấu trúc hay"],
      evening: ["Viết 120–160 từ theo chủ đề", "Tự sửa bằng checklist B1"],
      night: ["Nói 3–5 phút và tự ghi âm", "Ôn flashcards SRS", "Tóm tắt ngày bằng 3 câu tiếng Pháp"]
    }
  },
  {
    phase: "Giai đoạn 2 · Production intensive",
    start: "2026-08-01", end: "2026-08-31",
    goal: "Tăng tốc: 30 essais, 30 lettres và 20 exposés oraux",
    tasks: {
      morning: ["Ôn 20 từ/collocations theo chủ đề", "Nghe 1 bản tin và lập dàn ý", "Shadowing 8 phút"],
      afternoon: ["Ôn ngữ pháp qua lỗi viết hôm trước", "Đọc và phân tích 1 bài mẫu", "Thu thập 5 connecteurs"],
      evening: ["Viết 1 essai hoặc 1 lettre", "Chấm bài theo tiêu chí DELF"],
      night: ["Luyện 1 exposé oral (theo lịch)", "Trả lời 3 câu phản biện", "Ôn flashcards SRS"]
    }
  },
  {
    phase: "Giai đoạn 3 · Luyện đề",
    start: "2026-09-01", end: "2026-09-30",
    goal: "Luyện từng kỹ năng theo điều kiện và thời gian thi thật",
    tasks: {
      morning: ["Làm 1 phần compréhension orale có bấm giờ", "Phân tích transcript", "Ôn 15 từ từ bài nghe"],
      afternoon: ["Làm 1 phần compréhension écrite có bấm giờ", "Rà đáp án và ghi nguyên nhân sai", "Ôn điểm ngữ pháp yếu"],
      evening: ["Viết production écrite có bấm giờ", "Tự chấm theo grille DELF"],
      night: ["Mô phỏng production orale", "Ghi âm và tự nhận xét", "Ôn sổ lỗi + SRS"]
    }
  },
  {
    phase: "Giai đoạn 4 · Thi thử toàn phần",
    start: "2026-10-01", end: "2026-10-31",
    goal: "Hoàn thiện chiến thuật và sức bền bằng các bài thi thử toàn phần",
    tasks: {
      morning: ["Thi thử compréhension orale", "Chấm điểm và phân loại lỗi"],
      afternoon: ["Thi thử compréhension écrite", "Ôn nhanh lỗi ngữ pháp trọng điểm"],
      evening: ["Thi thử production écrite đúng giờ", "Chấm theo grille và viết lại đoạn yếu"],
      night: ["Thi thử production orale", "Tổng kết điểm 4 kỹ năng", "Lập ưu tiên sửa lỗi ngày mai"]
    }
  }
];

const sessionInfo = {
  morning: { title: "Sáng", subtitle: "Từ vựng + Nghe", time: "06:30–07:30", icon: "☀️" },
  afternoon: { title: "Chiều", subtitle: "Ngữ pháp + Đọc", time: "14:00–15:00", icon: "📖" },
  evening: { title: "Tối", subtitle: "Viết", time: "20:00–21:00", icon: "✍️" },
  night: { title: "Đêm", subtitle: "Nói + Ôn tập", time: "22:00–22:30", icon: "🌙" }
};

const states = [
  { id: "todo", label: "Chưa làm", mark: "" },
  { id: "doing", label: "Đang làm", mark: "•" },
  { id: "done", label: "Hoàn thành", mark: "✓" }
];

const $ = (selector) => document.querySelector(selector);
const dateKey = getLocalDateKey(new Date());
const storageKey = `delf-command-center:${dateKey}`;
let dayData = loadDayData();
let currentSchedule = findSchedule(dateKey);
let saveTimer;
let vocabularyRows = [];
let vocabularySheetName = "";

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function findSchedule(key) {
  const matched = scheduleData.find(item => key >= item.start && key <= item.end);
  if (matched) return matched;
  if (key < scheduleData[0].start) return { ...scheduleData[0], phase: "Chuẩn bị lộ trình", goal: "Chuẩn bị tài liệu và làm quen nhịp học DELF B1" };
  return { ...scheduleData[scheduleData.length - 1], phase: "Duy trì sau lộ trình", goal: "Duy trì tiếng Pháp bằng ôn tập, đọc và luyện nói mỗi ngày" };
}

function loadDayData() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || defaultDayData();
  } catch (error) {
    console.warn("Không thể đọc dữ liệu đã lưu", error);
    return defaultDayData();
  }
}

function defaultDayData() {
  return { tasks: {}, priority: "", srs: { new: 0, review: 0, mastered: 0 }, journal: { learned: "", mistakes: "", vocabulary: "" } };
}

function saveDayData(showIndicator = true) {
  localStorage.setItem(storageKey, JSON.stringify(dayData));
  const saveStatus = $("#saveStatus");
  if (showIndicator && saveStatus) {
    saveStatus.textContent = "Đang lưu…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { saveStatus.textContent = "Đã lưu"; }, 450);
  }
}

function renderHeader() {
  const now = new Date();
  $("#dateLine").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(now);
  configureDailyDocButton(now);
  $("#phaseBadge").textContent = currentSchedule.phase;
  $("#phaseDates").textContent = `${formatShortDate(currentSchedule.start)} → ${formatShortDate(currentSchedule.end)}`;
  renderPhaseOneProgress(now);
  const dayNumber = Math.max(0, Math.floor((parseLocalDate(dateKey) - parseLocalDate("2026-06-19")) / 86400000));
  const daysLeft = Math.ceil((parseLocalDate("2026-10-31") - parseLocalDate(dateKey)) / 86400000);
  $("#daysLeft").textContent = daysLeft >= 0 ? daysLeft : "✓";
}

function configureDailyDocButton(date) {
  const button = $("#dailyDocButton");
  const label = formatSheetDate(date);
  const tabId = dailyDoc.tabs[label];
  button.textContent = String(date.getDate()).padStart(2, "0");
  button.href = tabId
    ? `https://docs.google.com/document/d/${dailyDoc.documentId}/edit?tab=${tabId}`
    : `https://docs.google.com/document/d/${dailyDoc.documentId}/edit`;
  button.title = tabId
    ? `Mở trang ${label} trong Google Docs Giai đoạn 1`
    : `Mở Google Docs Giai đoạn 1 — chưa có trang ${label}`;
  button.setAttribute("aria-label", button.title);
}

function renderPhaseOneProgress(now) {
  const start = parseLocalDate("2026-06-19");
  const end = parseLocalDate("2026-07-31");
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const totalDays = Math.round((end - start) / 86400000) + 1;
  const elapsedDays = Math.min(totalDays, Math.max(0, Math.round((current - start) / 86400000) + 1));
  const percent = Math.round(elapsedDays / totalDays * 100);
  const rawWeek = Math.floor(Math.max(0, current - start) / (7 * 86400000)) + 1;
  const maxWeek = Math.ceil(totalDays / 7);
  const week = Math.min(maxWeek, Math.max(1, rawWeek));
  const weekStart = new Date(start);
  weekStart.setDate(start.getDate() + (week - 1) * 7);
  const weekEnd = new Date(Math.min(end.getTime(), weekStart.getTime() + 6 * 86400000));

  $("#weekBadge").textContent = current < start ? "Tuần chuẩn bị" : current > end ? "Đã xong GĐ1" : `Tuần ${week}/${maxWeek}`;
  $("#weekBadge").title = `${formatDateObject(weekStart)} → ${formatDateObject(weekEnd)}`;
  $("#phaseProgressText").textContent = `${percent}%`;
  $("#phaseProgressBar").style.width = `${percent}%`;
  $("#phaseProgressDetail").textContent = `${elapsedDays}/${totalDays} ngày · Tuần ${week}: ${formatDateObject(weekStart)} → ${formatDateObject(weekEnd)}`;
}

function formatDateObject(date) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(date);
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(parseLocalDate(value));
}

function renderSessions() {
  const grid = $("#sessionGrid");
  grid.innerHTML = "";
  Object.entries(getDailyTasks()).forEach(([sessionKey, tasks]) => {
    const info = sessionInfo[sessionKey];
    const article = document.createElement("article");
    article.className = "session";
    article.innerHTML = `<div class="session-head"><span class="session-icon">${info.icon}</span><div><h3>${info.title}</h3><p>${info.subtitle} · ${info.time}</p></div></div><ul class="task-list"></ul>`;
    const list = article.querySelector("ul");
    tasks.forEach((task, index) => {
      const id = `${sessionKey}-${index}`;
      const status = dayData.tasks[id] || "todo";
      const item = document.createElement("li");
      item.innerHTML = taskButtonHTML(id, task, status);
      list.appendChild(item);
    });
    grid.appendChild(article);
  });
  updateProgress();
}

function getDailyTasks() {
  const tasks = Object.fromEntries(
    Object.entries(currentSchedule.tasks).map(([session, items]) => [session, [...items]])
  );
  const phaseOneStart = parseLocalDate("2026-06-19");
  const currentDate = parseLocalDate(dateKey);
  const dayIndex = Math.round((currentDate - phaseOneStart) / 86400000);
  if (dayIndex >= 0 && dayIndex < editoB1Daily.length && tasks.morning?.length >= 3) {
    tasks.morning[2] = editoB1Daily[dayIndex];
  }
  return tasks;
}

function taskButtonHTML(id, task, status) {
  const state = states.find(item => item.id === status) || states[0];
  return `<button class="task-button" type="button" data-task-id="${id}" data-status="${state.id}" aria-label="${task}: ${state.label}"><span class="task-check">${state.mark}</span><span class="task-text">${task}</span><span class="task-state">${state.label}</span></button>`;
}

function cycleTask(button) {
  const currentIndex = states.findIndex(state => state.id === button.dataset.status);
  const next = states[(currentIndex + 1) % states.length];
  const id = button.dataset.taskId;
  dayData.tasks[id] = next.id;
  button.dataset.status = next.id;
  button.querySelector(".task-check").textContent = next.mark;
  button.querySelector(".task-state").textContent = next.label;
  button.setAttribute("aria-label", `${button.querySelector(".task-text").textContent}: ${next.label}`);
  saveDayData(false);
  updateProgress();
}

function updateProgress() {
  const buttons = [...document.querySelectorAll(".task-button")];
  const done = buttons.filter(button => button.dataset.status === "done").length;
  const percent = buttons.length ? Math.round(done / buttons.length * 100) : 0;
  $("#progressText").textContent = `${percent}%`;
  $("#progressBar").style.width = `${percent}%`;
  $("#progressDetail").textContent = `${done}/${buttons.length} nhiệm vụ hoàn thành`;
}

function renderLinks() {
  $("#quickLinksGrid").innerHTML = quickLinks.map(link => `<a class="quick-link" href="${link.url}" target="_blank" rel="noopener noreferrer"><span>${link.icon}</span>${link.label}</a>`).join("");
}

async function loadTodayVocabulary() {
  const status = $("#vocabularyStatus");
  const container = $("#todayVocabulary");
  const month = new Date().getMonth() + 1;
  const sheetName = `${vocabularySheet.tabPrefix}${month}`;
  const url = `https://docs.google.com/spreadsheets/d/${vocabularySheet.spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&range=${vocabularySheet.range}`;

  try {
    const payload = await loadGoogleVisualizationData(url);
    if (payload.status === "error") throw new Error(payload.errors?.[0]?.message || "Google Sheet từ chối truy cập");

    const today = formatSheetDate(new Date());
    vocabularyRows = (payload.table?.rows || []).map(row => {
      const cells = row.c || [];
      return {
        word: cellText(cells[1]),
        meaning: cellText(cells[3]),
        example: cellText(cells[4]),
        level: cellText(cells[8]),
        addedDate: cellText(cells[9])
      };
    }).filter(item => item.word && normalizeSheetDate(item.addedDate));
    vocabularySheetName = sheetName;
    const todayWords = vocabularyRows.filter(item => normalizeSheetDate(item.addedDate) === today);

    renderVocabularyDateFilter(today);
    renderTodayVocabulary(todayWords, sheetName, today);
    dayData.srs.new = todayWords.length;
    $("#srsNew").value = todayWords.length;
    $("#srsNew").readOnly = true;
    saveDayData(false);
    updateSrs();
  } catch (error) {
    console.warn("Không thể đồng bộ từ vựng", error);
    status.textContent = "Chưa thể đồng bộ · kiểm tra quyền chia sẻ Sheet";
    container.innerHTML = `<div class="vocabulary-empty"><strong>Không đọc được Google Sheet</strong>Hãy đặt quyền chia sẻ thành “Bất kỳ ai có đường liên kết đều có thể xem”, rồi tải lại trang.</div>`;
  }
}

function renderVocabularyDateFilter(today) {
  const select = $("#vocabularyDateFilter");
  const dates = [...new Set(vocabularyRows.map(item => normalizeSheetDate(item.addedDate)))];
  if (!dates.includes(today)) dates.push(today);
  dates.sort((a, b) => sheetDateToTime(b) - sheetDateToTime(a));
  select.innerHTML = dates.map(date => `<option value="${date}"${date === today ? " selected" : ""}>${vocabularySheetName} · ${date}${date === today ? " · Hôm nay" : ""}</option>`).join("");
  select.disabled = false;
  select.onchange = event => {
    const selectedDate = event.target.value;
    const selectedWords = vocabularyRows.filter(item => normalizeSheetDate(item.addedDate) === selectedDate);
    renderTodayVocabulary(selectedWords, vocabularySheetName, selectedDate);
  };
}

function sheetDateToTime(value) {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function loadGoogleVisualizationData(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let settled = false;
    const timeout = setTimeout(() => finish(new Error("Google Sheet phản hồi quá lâu")), 12000);
    window.google = window.google || {};
    window.google.visualization = window.google.visualization || {};
    window.google.visualization.Query = window.google.visualization.Query || {};
    const previousHandler = window.google.visualization.Query.setResponse;

    function finish(error, payload) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      script.remove();
      if (previousHandler) window.google.visualization.Query.setResponse = previousHandler;
      else delete window.google.visualization.Query.setResponse;
      if (error) reject(error);
      else resolve(payload);
    }

    window.google.visualization.Query.setResponse = payload => finish(null, payload);
    script.onerror = () => finish(new Error("Không tải được dữ liệu Google Sheet"));
    script.src = `${url}&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

function cellText(cell) {
  if (!cell) return "";
  if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
  if (cell.v === undefined || cell.v === null) return "";
  const dateMatch = String(cell.v).match(/^Date\((\d+),(\d+),(\d+)\)$/);
  if (dateMatch) return `${dateMatch[3].padStart(2, "0")}/${String(Number(dateMatch[2]) + 1).padStart(2, "0")}/${dateMatch[1]}`;
  return String(cell.v).trim();
}

function normalizeSheetDate(value) {
  const parts = String(value).match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/);
  if (!parts) return "";
  return `${parts[1].padStart(2, "0")}/${parts[2].padStart(2, "0")}/${parts[3]}`;
}

function formatSheetDate(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value || "";
  return element.innerHTML;
}

function renderTodayVocabulary(words, sheetName, today) {
  const status = $("#vocabularyStatus");
  const container = $("#todayVocabulary");
  status.textContent = `${words.length} từ · ${sheetName} · ${today}`;
  if (!words.length) {
    container.innerHTML = `<div class="vocabulary-empty"><strong>Chưa có từ vựng trong ngày này</strong>Khi cột J có ngày ${today}, từ vựng sẽ tự xuất hiện tại đây.</div>`;
    return;
  }
  container.innerHTML = words.map(item => `<article class="vocabulary-card"><div class="vocabulary-card__top"><h3>${escapeHtml(item.word)}</h3>${item.level ? `<span class="level">${escapeHtml(item.level)}</span>` : ""}</div>${item.meaning ? `<p class="vocabulary-meaning">${escapeHtml(item.meaning)}</p>` : ""}${item.example ? `<p class="vocabulary-example">${escapeHtml(item.example)}</p>` : ""}</article>`).join("");
}

function bindFields() {
  const srsMap = { srsNew: "new", srsReview: "review", srsMastered: "mastered" };
  Object.entries(srsMap).forEach(([elementId, dataKey]) => {
    const input = $(`#${elementId}`);
    input.value = dayData.srs?.[dataKey] || 0;
    input.addEventListener("input", event => {
      dayData.srs[dataKey] = Math.max(0, Number(event.target.value) || 0);
      saveDayData(false);
      updateSrs();
    });
  });

  updateSrs();
}

function updateSrs() {
  const srs = dayData.srs || { new: 0, review: 0, mastered: 0 };
  const total = srs.new + srs.review + srs.mastered;
  const processed = srs.review + srs.mastered;
  const percent = total ? Math.round(processed / total * 100) : 0;
  $("#srsTotal").textContent = `${total} từ`;
  $("#srsRing").textContent = `${percent}%`;
  $("#srsRing").style.background = `conic-gradient(var(--green) ${percent * 3.6}deg, #e5ede8 0deg)`;
}

function bindReset() {
  const dialog = $("#resetDialog");
  $("#resetButton").addEventListener("click", () => {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else if (confirm("Reset checklist và SRS hôm nay?")) resetToday();
  });
  $("#confirmReset").addEventListener("click", event => {
    event.preventDefault();
    resetToday();
    dialog.close();
  });
}

function resetToday() {
  const journalBackup = { ...dayData.journal };
  dayData = defaultDayData();
  dayData.journal = journalBackup;
  saveDayData(false);
  renderSessions();
  bindValuesAfterReset();
}

function bindValuesAfterReset() {
  $("#srsNew").value = dayData.srs.new;
  $("#srsReview").value = dayData.srs.review;
  $("#srsMastered").value = dayData.srs.mastered;
  updateSrs();
}

document.addEventListener("click", event => {
  const taskButton = event.target.closest(".task-button");
  if (taskButton) cycleTask(taskButton);
});

renderHeader();
renderSessions();
renderLinks();
bindFields();
bindReset();
