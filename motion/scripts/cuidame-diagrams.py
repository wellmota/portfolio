#!/usr/bin/env python3
"""Gera os diagramas do case CuidaMe (problema + método) em PT e EN, no estilo do portfólio.
Uso: python3 motion/scripts/cuidame-diagrams.py  (escreve em public/cases/cuidame/)."""
import math, pathlib
INK='#0a0a0a'; SURF='#101010'; LINE='#232323'; LINE2='#3a3a3a'; CREAM='#ededed'; MIST='#8c8c92'; FAINT='#5a5a60'; LIME='#cff24a'
SANS="-apple-system, 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, sans-serif"
MONO="ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace"
ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'public' / 'cases' / 'cuidame'

def head(w, h, label):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{label}">
<style>
  .mono{{font-family:{MONO};letter-spacing:.18em;text-transform:uppercase}}
  .cap{{font-family:{MONO};letter-spacing:.04em;text-transform:uppercase}}
  .sans{{font-family:{SANS}}}
  .b{{font-weight:700;letter-spacing:-.02em}}
</style>
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{MIST}"/></marker>
  <marker id="arrl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{LIME}"/></marker>
</defs>
<rect width="{w}" height="{h}" fill="{INK}"/>
'''
def cross(x, y): return f'<path d="M{x-7},{y} H{x+7} M{x},{y-7} V{y+7}" stroke="{LINE2}" stroke-width="1"/>'
def frame(w, h, tl, tr):
    s = ''.join(cross(x, y) for x in (40, w-40) for y in (40, h-40))
    s += f'<text x="40" y="52" class="mono" font-size="14" fill="{MIST}">{tl}</text>'
    s += f'<text x="{w-40}" y="52" class="mono" font-size="14" fill="{MIST}" text-anchor="end">{tr}</text>'
    return s + f'<path d="M40,78 H{w-40}" stroke="{LINE}" stroke-width="1"/>'
def lines(x, y, items, cls, size, fill, lh, anchor='start'):
    out = f'<text x="{x}" y="{y}" class="{cls}" font-size="{size}" fill="{fill}" text-anchor="{anchor}">'
    for i, t in enumerate(items): out += f'<tspan x="{x}" dy="{0 if i==0 else lh}">{t}</tspan>'
    return out + '</text>'

def problema(t):
    w, h = 1200, 760; s = head(w, h, t['aria']) + frame(w, h, t['tl'], t['tr'])
    cx, cy, r = 330, 430, 190
    s += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{LINE}" stroke-width="1"/>'
    def pt(a): a = math.radians(a); return cx + r*math.cos(a), cy + r*math.sin(a)
    for a1, a2 in ((-70, 10), (50, 130), (170, 250)):
        x1, y1 = pt(a1); x2, y2 = pt(a2)
        s += f'<path d="M{x1:.0f},{y1:.0f} A{r},{r} 0 0 1 {x2:.0f},{y2:.0f}" fill="none" stroke="{MIST}" stroke-width="1.5" marker-end="url(#arr)"/>'
    for i, (a, name, cap, dy) in enumerate(((-90, t['n1'], t['c1'], -92), (30, t['n2'], t['c2'], 92), (150, t['n3'], t['c3'], 92))):
        x, y = pt(a)
        s += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="58" fill="{SURF}" stroke="{LINE2}" stroke-width="1"/>'
        s += f'<text x="{x:.0f}" y="{y-12:.0f}" class="mono" font-size="12" fill="{LIME}" text-anchor="middle">0{i+1}</text>'
        s += f'<text x="{x:.0f}" y="{y+16:.0f}" class="sans b" font-size="19" fill="{CREAM}" text-anchor="middle">{name}</text>'
        s += f'<text x="{x:.0f}" y="{y+dy:.0f}" class="cap" font-size="12" fill="{FAINT}" text-anchor="middle">{cap}</text>'
    s += f'<text x="{cx}" y="{cy+6}" class="sans b" font-size="54" fill="{CREAM}" text-anchor="middle">{t["center"]}</text>'
    s += lines(cx, cy+40, t['center2'], 'cap', 13, MIST, 20, 'middle')
    s += lines(660, 176, t['head'], 'sans b', 34, CREAM, 42)
    for i, (y, row) in enumerate(zip((292, 372, 452), t['rows'])):
        s += f'<path d="M660,{y-34} H1160" stroke="{LINE}" stroke-width="1"/>'
        s += f'<text x="660" y="{y}" class="mono" font-size="12" fill="{LIME}">0{i+1}</text>'
        s += f'<text x="716" y="{y+2}" class="sans" font-size="22" fill="{CREAM}">{row}</text>'
    s += f'<path d="M660,560 H1160" stroke="{LIME}" stroke-width="1" opacity=".6"/>'
    s += f'<path d="M{pt(-90)[0]+60:.0f},{pt(-90)[1]:.0f} C 560,240 600,590 660,590" fill="none" stroke="{LIME}" stroke-width="1.5" stroke-dasharray="6 6" marker-end="url(#arrl)"/>'
    s += lines(680, 596, t['reset'], 'mono', 13, LIME, 22)
    return s + '</svg>'

def metodo(t):
    w, h = 1200, 820; s = head(w, h, t['aria']) + frame(w, h, t['tl'], t['tr'])
    xs = (150, 375, 600, 825, 1050); ty = 340
    s += f'<path d="M{xs[0]},{ty} H{xs[-1]}" stroke="{LINE2}" stroke-width="1"/>'
    for i, x in enumerate(xs):
        last = i == len(xs) - 1
        s += f'<circle cx="{x}" cy="{ty}" r="26" fill="{INK}" stroke="{LIME if last else LINE2}" stroke-width="{1.5 if last else 1}"/>'
        s += f'<text x="{x}" y="{ty+5}" class="mono" font-size="13" fill="{LIME if last else CREAM}" text-anchor="middle">0{i+1}</text>'
        s += lines(x, 196, t['titles'][i], 'sans b', 24, CREAM, 28, 'middle')
        s += lines(x, 400, t['caps'][i], 'cap', 12, MIST, 20, 'middle')
    s += f'<path d="M{xs[4]-14},{ty-24} C {xs[4]-70},{ty-78} {xs[3]+70},{ty-78} {xs[3]+16},{ty-24}" fill="none" stroke="{MIST}" stroke-width="1.5" marker-end="url(#arr)"/>'
    s += f'<text x="{(xs[3]+xs[4])//2}" y="{ty-84}" class="cap" font-size="11" fill="{FAINT}" text-anchor="middle">{t["loop"]}</text>'
    s += f'<path d="M{xs[4]},{ty+30} V372" stroke="{LIME}" stroke-width="1.5" opacity=".5"/>'
    s += f'<path d="M{xs[4]},462 V560" stroke="{LIME}" stroke-width="1.5" marker-end="url(#arrl)"/>'
    s += f'<rect x="100" y="560" width="1000" height="160" fill="{SURF}" stroke="{LINE}" stroke-width="1"/>'
    s += f'<text x="140" y="608" class="mono" font-size="13" fill="{LIME}">{t["band1"]}</text>'
    s += f'<text x="140" y="668" class="sans b" font-size="40" fill="{CREAM}">{t["band2"]}</text>'
    s += lines(1060, 610, t['band3'], 'cap', 12, MIST, 24, 'end')
    return s + '</svg>'

PT1 = dict(aria='O problema: dois anos no mesmo ciclo de retrabalho, antes da minha entrada', tl='02 — O problema', tr='2024 → 2026 · antes da minha entrada',
    n1='Pedido', c1='briefing vago', n2='Entrega', c2='fora do esperado', n3='Retrabalho', c3='refaz do zero',
    center='2 anos', center2=['no mesmo ciclo,', 'com outro time'], head=['Pedia-se uma coisa,', 'entregava-se outra.'],
    rows=['Escopo sem detalhe', 'Expectativa divergente a cada entrega', 'Retrabalho sem critério de pronto'],
    reset=['Minha entrada: empatia primeiro,', 'mapear tudo, só então prometer prazo'])
EN1 = dict(aria='The problem: two years in the same rework loop, before I came in', tl='02 — The problem', tr='2024 → 2026 · before I came in',
    n1='Request', c1='vague brief', n2='Delivery', c2='not what was expected', n3='Rework', c3='rebuilt from scratch',
    center='2 years', center2=['in the same loop,', 'with another team'], head=['One thing was asked for,', 'another was delivered.'],
    rows=['Scope without detail', 'Expectations diverging on every delivery', 'Rework with no definition of done'],
    reset=['My entry: empathy first,', 'map everything, only then promise a date'])
PT2 = dict(aria='O método: do workshop ao protótipo aprovado, que vira produção', tl='03 — O método', tr='Workshop → beta em 1 semana · 0 handoff',
    titles=[['Workshop de', 'mapeamento'], ['Heurísticas', 'antes do teste'], ['Protótipo', 'na stack'], ['Teste com', 'a cliente'], ['Refino visual', 'direto']],
    caps=[['tela a tela, fluxo a fluxo,', 'com as duas stakeholders,', 'antes de qualquer prazo'],
          ['boas práticas e heurísticas', 'aplicadas no desenho,', 'não no bug'],
          ['navegável, em Expo,', 'com dados reais:', 'mão na massa'],
          ['elas usam no celular;', 'crítica, ajuste,', 'ciclos até 100%'],
          ['ajuste e re-teste', 'no mesmo dia,', 'sem burocracia']],
    loop='ciclos', band1='Protótipo aprovado', band2='= pronto para produção', band3=['1 semana: workshop, redesign', 'e 100% do front-end', 'pronto para beta testers'])
EN2 = dict(aria='The method: from workshop to an approved prototype that becomes production', tl='03 — The method', tr='Workshop → beta in 1 week · 0 handoff',
    titles=[['Mapping', 'workshop'], ['Heuristics', 'before testing'], ['Prototype', 'in the stack'], ['Testing with', 'the client'], ['Visual polish,', 'no red tape']],
    caps=[['screen by screen, flow by flow,', 'with both stakeholders,', 'before any deadline'],
          ['best practices and heuristics', 'applied in the design,', 'not in the bug'],
          ['navigable, in Expo,', 'with real data:', 'hands-on'],
          ['they use it on the phone;', 'critique, adjust,', 'cycles until 100%'],
          ['adjust and re-test', 'the same day,', 'no bureaucracy']],
    loop='cycles', band1='Approved prototype', band2='= ready for production', band3=['1 week: workshop, redesign', 'and 100% of the front end', 'ready for beta testers'])

if __name__ == '__main__':
    (OUT/'problema.svg').write_text(problema(PT1)); (OUT/'problema-en.svg').write_text(problema(EN1))
    (OUT/'mapeamento.svg').write_text(metodo(PT2)); (OUT/'mapeamento-en.svg').write_text(metodo(EN2))
    print('written to', OUT)
