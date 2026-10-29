/* Golfhaus — landing: topo ao rolar, entrada das seções, trilho da vida no clube, abas do painel
   e o formulário de contato (planilha, com o WhatsApp como alternativa). */

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- topo ---------- */
const bar = $("[data-top]");
const onScroll = () => bar.classList.toggle("is-scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- entrada ao rolar ---------- */
const rvs = $$(".rv");
if (reduce || !("IntersectionObserver" in window)) {
  rvs.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  rvs.forEach((el) => io.observe(el));
}

/* ---------- trilho da vida de clube ---------- */
const rail = $("[data-rail-list]");
if (rail) {
  const [prev, next] = $$("[data-rail]");
  const step = () => (rail.querySelector(".life__item")?.offsetWidth ?? 236) + 20;
  const sync = () => {
    prev.disabled = rail.scrollLeft < 8;
    next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
  };
  $$("[data-rail]").forEach((b) =>
    b.addEventListener("click", () =>
      rail.scrollBy({ left: +b.dataset.rail * step() * 2, behavior: reduce ? "auto" : "smooth" }),
    ),
  );
  rail.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  sync();
}

/* ---------- abas do painel ---------- */
const tabs = $$("[data-tabs] [role=tab]");
if (tabs.length) {
  const img = $("[data-erp-img]");
  const title = $("[data-erp-title]");
  const text = $("[data-erp-text]");
  const panel = $("#erp-panel");
  // pré-carrega as quatro telas depois que a página assenta
  addEventListener("load", () => tabs.forEach((t) => (new Image().src = t.dataset.src)), { once: true });
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    title.textContent = tab.dataset.title;
    text.textContent = tab.dataset.text;
    if (focus) tab.focus();
    if (img.getAttribute("src") === tab.dataset.src) return;
    const swap = () => {
      img.src = tab.dataset.src;
      img.alt = tab.dataset.alt;
      img.classList.remove("is-swapping");
    };
    if (reduce) return swap();
    img.classList.add("is-swapping");
    setTimeout(swap, 180);
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (e.key === "Home") return (e.preventDefault(), select(tabs[0], true));
      if (e.key === "End") return (e.preventDefault(), select(tabs.at(-1), true));
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
}

/* ---------- contato: o formulário grava uma linha na planilha de contatos ---------- */
const WHATSAPP = "5561981043296";
// Web app do Apps Script ligado à planilha "Golfhaus · Contatos da landing" (doPost acrescenta uma linha).
// Vazio: o envio abre o WhatsApp com a mensagem pronta.
const LEADS_URL = "";
const form = $("[data-form]");
if (form) {
  const need = { nome: "Diga o seu nome.", clube: "Diga o nome do clube." };
  const err = (name, msg) => {
    const input = form.elements[name];
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    $(`#e-${name}`).textContent = msg || "";
  };
  const value = (name) => (form.elements[name]?.value || "").trim();
  const message = () =>
    [
      "Olá! Quero conhecer o Golfhaus para o meu clube.",
      "",
      `Nome: ${value("nome")}`,
      `Clube: ${value("clube")}`,
      value("cidade") && `Cidade: ${value("cidade")}`,
      value("socios") && `Sócios: ${value("socios")}`,
      value("cargo") && `Papel no clube: ${value("cargo")}`,
      value("msg") && `\n${value("msg")}`,
    ]
      .filter((l) => l !== false && l !== "")
      .join("\n");
  const waLink = () =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      value("nome") || value("clube") ? message() : "Olá! Quero conhecer o Golfhaus para o meu clube.",
    )}`;
  // os links de WhatsApp do contato levam o que já foi digitado
  $$("[data-wa-form]").forEach((a) => a.addEventListener("click", () => (a.href = waLink())));

  const submit = $("[data-submit]", form);
  const submitLabel = $("[data-submit-label]", form);
  const status = $("[data-status]", form);
  const done = $("[data-done]");
  const busy = (on) => {
    submit.setAttribute("aria-busy", on ? "true" : "false");
    submit.disabled = on;
    submitLabel.textContent = on ? "Enviando…" : "Agendar demonstração";
  };
  const finish = () => {
    form.hidden = true;
    done.hidden = false;
    done.focus();
  };

  Object.keys(need).forEach((n) => form.elements[n].addEventListener("input", () => value(n) && err(n, "")));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    let first = null;
    for (const [n, msg] of Object.entries(need)) {
      const bad = !value(n);
      err(n, bad ? msg : "");
      if (bad && !first) first = form.elements[n];
    }
    if (first) return first.focus();
    if (value("site")) return finish(); // robô: finge que deu certo e não grava
    if (!LEADS_URL) return window.open(waLink(), "_blank", "noopener");

    busy(true);
    try {
      // text/plain evita o preflight de CORS; o Apps Script lê o corpo em e.postData.contents
      const res = await fetch(LEADS_URL, {
        method: "POST",
        body: JSON.stringify({
          nome: value("nome"),
          clube: value("clube"),
          cidade: value("cidade"),
          socios: value("socios"),
          cargo: value("cargo"),
          mensagem: value("msg"),
          pagina: location.href,
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.ok === false) throw new Error(out.message || `HTTP ${res.status}`);
      finish();
    } catch (error) {
      console.warn("contato:", error);
      status.textContent = "Não deu para enviar agora. Tente de novo em instantes ou chame no WhatsApp.";
    } finally {
      busy(false);
    }
  });
}
