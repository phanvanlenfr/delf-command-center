(function () {
  let deferredPrompt = null;
  const banner = document.getElementById("mobileAppBanner");
  const installButton = document.getElementById("installAppButton");
  const copyButton = document.getElementById("copyMobileLinkButton");

  function showBanner() {
    if (!banner) return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (!isStandalone) banner.hidden = false;
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    showBanner();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if (banner) banner.hidden = true;
  });

  installButton?.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      return;
    }
    alert("Trên điện thoại: mở menu trình duyệt ⋮ hoặc Chia sẻ, rồi chọn “Thêm vào màn hình chính”.");
  });

  copyButton?.addEventListener("click", async () => {
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      copyButton.textContent = "Đã copy ✓";
      setTimeout(() => (copyButton.textContent = "Copy link"), 1600);
    } catch {
      prompt("Copy link này để mở trên điện thoại:", url);
    }
  });

  showBanner();
})();
