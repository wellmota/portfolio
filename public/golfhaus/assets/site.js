/* Golfhaus — landing: topo ao rolar, entrada das seções, trilho da vida no clube, o campo em 3D
   (carregado só perto da tela), abas do painel e o formulário de contato (por e-mail, com o WhatsApp
   como alternativa). */

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

/* ---------- o campo em 3D ---------- */
const h3d = $("[data-h3d]");
if (h3d) {
  const mountEl = $("[data-h3d-mount]", h3d);
  const label = $("[data-h3d-label]", h3d);
  const meta = $("[data-h3d-meta]", h3d);
  const chips = $("[data-h3d-holes]", h3d);
  let view = null;
  let holes = [];
  let current = 2;
  const describe = (h) => {
    label.textContent = `Buraco ${h.n}`;
    meta.textContent = `Par ${h.par} · ${h.m} m · Hcp ${h.idx}`;
  };
  const press = (n) => $$("button", chips).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.n === n));
  const insets = () => ({ top: 72, right: 16, bottom: 88, left: 16 });
  const fallback = () => {
    mountEl.innerHTML = `<img src="assets/3d/figma/perf-holemap.png" alt="Mapa do buraco 2 do Campo A" />`;
  };
  const start = async () => {
    try {
      const [{ mount }, data] = await Promise.all([import("./3d/hole3d.js"), import("./3d/holes.js")]);
      holes = data.holes;
      chips.innerHTML = holes
        .map((h) => `<button type="button" data-n="${h.n}" aria-label="Buraco ${h.n}, par ${h.par}">${h.n}</button>`)
        .join("");
      press(current);
      describe(holes[current - 1]);
      view = mount(mountEl, {
        hole: holes[current - 1],
        course: "a",
        tee: "branco",
        ball: null,
        mode: "preview",
        insets,
        intro: !reduce,
      });
      chips.addEventListener("click", (e) => {
        const b = e.target.closest("button[data-n]");
        if (!b || !view) return;
        const n = +b.dataset.n;
        if (n === current) return view.reset();
        current = n;
        press(n);
        describe(holes[n - 1]);
        view.setHole(holes[n - 1], { instant: reduce });
      });
      addEventListener("resize", () => view && view.refit(), { passive: true });
    } catch (err) {
      console.warn("3D indisponível:", err);
      fallback();
    }
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(h3d);
  } else start();
}

/* ---------- contato: o formulário chega por e-mail ---------- */
const WHATSAPP = "5561981043296";
// Chave pública do Web3Forms (formulário "Golfhaus · Contato da landing"): só serve para mandar o contato
// para o e-mail da conta, que não aparece na página. Vazia: o envio abre o WhatsApp com a mensagem pronta.
const FORM_KEY = "af6b7460-954a-4a42-9992-a7cd608fa6fa";
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
    if (!FORM_KEY) return window.open(waLink(), "_blank", "noopener");

    // cada campo vira uma linha do e-mail, com o rótulo como nome; os vazios ficam de fora
    const fields = {
      Nome: value("nome"),
      Clube: value("clube"),
      Cidade: value("cidade"),
      Sócios: value("socios"),
      "Papel no clube": value("cargo"),
      Mensagem: value("msg"),
      Página: location.href,
    };
    busy(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `Golfhaus · contato de ${value("clube")}`,
          from_name: "Landing do Golfhaus",
          botcheck: false,
          ...Object.fromEntries(Object.entries(fields).filter(([, v]) => v)),
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.success) throw new Error(out.message || out.body?.message || `HTTP ${res.status}`);
      finish();
    } catch (error) {
      console.warn("contato:", error);
      status.textContent = "Não deu para enviar agora. Tente de novo em instantes ou chame no WhatsApp.";
    } finally {
      busy(false);
    }
  });
}
