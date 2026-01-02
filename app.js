const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");

function show(screenId){
  screens.forEach(s => s.classList.toggle("active", s.id === screenId));
  tabs.forEach(t => t.classList.toggle("active", t.dataset.screen === screenId));
  window.scrollTo({ top: 0, behavior: "instant" });
}

tabs.forEach(t => t.addEventListener("click", () => show(t.dataset.screen)));

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => show(btn.dataset.go));
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openModal(title, body){
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => { if(e.target === modal) hideModal(); });

document.getElementById("helpBtn").addEventListener("click", () => {
  openModal("Help", "Tap any tab to switch screens. Tap a warning card to see what to fix next (demo).");
});

document.querySelectorAll("[data-help]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.help;
    const map = {
      home: "Home shows fast status. If anything is ⚠️ or 🚩, go to that screen.",
      risk: "🚩 items are the ones that usually create fines/audit pain. Fix those first.",
      compliance: "Compliance flags mean a document is missing or needs review (demo).",
      next: "Next: upload docs/receipts so the red cards turn green.",
      dot: "DOT Stop Mode keeps you calm: do less talking, show requested docs, follow checklist.",
      incident: "Incident Mode: safety first, document everything, don’t speculate.",
      docs: "Docs: keep insurance/registration ready; store receipts for audits.",
      audit: "Audits usually go bad when receipts/docs are missing or disorganized."
    };
    openModal("FreightMate", map[key] || "Help not found.");
  });
});

document.getElementById("fixGuideBtn").addEventListener("click", () => {
  openModal("Fix Guide (Demo)", "1) Upload missing Inspection PDF. 2) Add IFTA receipts. 3) Recheck logs if you had a gap.");
});
document.getElementById("stopTimerBtn").addEventListener("click", () => {
  openModal("Stop Timer (Demo)", "Timer started (demo). Next version will track duration and save notes.");
});
document.getElementById("photoBtn").addEventListener("click", () => {
  openModal("Photo Notes (Demo)", "Next version will let you attach photos and label them (scene, vehicle, signage).");
});
document.getElementById("incidentLogBtn").addEventListener("click", () => {
  openModal("Incident Log (Demo)", "Next version will create a time-stamped incident note you can export.");
});
document.getElementById("uploadBtn").addEventListener("click", () => {
  openModal("Upload (Demo)", "Next version: real uploads to storage. This demo proves the UI flow.");
});
document.getElementById("snapBtn").addEventListener("click", () => {
  openModal("Snap Receipt (Demo)", "Next version: camera receipt capture + simple tagging.");
});
// Force onboarding on first load if profile missing
document.addEventListener("DOMContentLoaded", () => {
  const profile = loadProfile();
  if (!profile.driverName || !profile.company) {
    const ob = document.getElementById("onboard");
    if (ob) {
      ob.classList.add("show");
      ob.setAttribute("aria-hidden", "false");
    }
  }
  renderVault();
});
