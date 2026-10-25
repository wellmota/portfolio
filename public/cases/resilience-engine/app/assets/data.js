/* Resilience Dynamic — mock data for the web prototype.
   Everything here is fictional and deterministic, so screenshots are stable. */
(function () {
  const RD = (window.RD = window.RD || {});

  RD.user = { name: 'Calum', fullName: 'Calum Reid', org: 'Northbank Health', initials: 'CR' };

  /* The seven key areas, in the order of the check-in.
     Every question is phrased so 6 is always the better end — no reversed scales. */
  RD.AREAS = [
    { key: 'demand', name: 'Demand', group: 'productivity', icon: 'chart-plus', sub: 'Challenges and Pressure',
      q: 'How manageable do the demands on you feel right now?', low: 'Overwhelming', high: 'Very manageable' },
    { key: 'capacity', name: 'Capacity', group: 'productivity', icon: 'gauge', sub: 'Room to Respond',
      q: 'How much capacity do you have to meet them?', low: 'Running on empty', high: 'Plenty in reserve' },
    { key: 'energy', name: 'Energy', group: 'productivity', icon: 'battery-bolt', sub: 'Vitality and Renewal',
      q: 'How energised do you feel today?', low: 'Drained', high: 'Full of energy' },
    { key: 'sleep', name: 'Sleep', group: 'wellbeing', icon: 'moon', sub: 'Rest and Renewal',
      q: 'How restful has your sleep been?', low: 'Broken', high: 'Deeply restful' },
    { key: 'stress', name: 'Stress', group: 'wellbeing', icon: 'bolt', sub: 'Calm and Resilience',
      q: 'How calm do you feel under pressure?', low: 'Very stressed', high: 'Calm and steady' },
    { key: 'wellbeing', name: 'Wellbeing', group: 'wellbeing', icon: 'heart', sub: 'Balance and Serenity',
      q: 'How balanced do you feel overall?', low: 'Out of balance', high: 'In balance' },
    { key: 'content', name: 'Contentedness', group: 'wellbeing', icon: 'smile', sub: 'Satisfaction and Peace',
      q: 'How satisfied are you with how things are going?', low: 'Not at all', high: 'Very satisfied' },
  ];
  RD.area = (key) => RD.AREAS.find((a) => a.key === key);
  RD.GROUPS = { productivity: 'Productivity', wellbeing: 'Wellbeing' };

  /* The six key areas the reports show (Your Data, Red Flags): Demand and Capacity read as one pair */
  RD.KEY_AREAS = [
    { key: 'dvc', name: 'Demand vs Capacity', group: 'productivity', icon: 'chart-plus', sub: 'Challenges and Pressure', of: ['demand', 'capacity'] },
    { key: 'energy', name: 'Energy', group: 'productivity', icon: 'battery-bolt', sub: 'Vitality and Renewal', of: ['energy'] },
    { key: 'sleep', name: 'Sleep', group: 'wellbeing', icon: 'moon', sub: 'Rest and Renewal', of: ['sleep'] },
    { key: 'stress', name: 'Stress', group: 'wellbeing', icon: 'bolt', sub: 'Calm and Resilience', of: ['stress'] },
    { key: 'wellbeing', name: 'Wellbeing', group: 'wellbeing', icon: 'heart', sub: 'Balance and Serenity', of: ['wellbeing'] },
    { key: 'content', name: 'Contentedness', group: 'wellbeing', icon: 'smile', sub: 'Satisfaction and Peace', of: ['content'] },
  ];
  RD.keyArea = (key) => RD.KEY_AREAS.find((a) => a.key === key);
  /* score of a key area for one day's answers (mean of its questions) */
  RD.keyScore = (ka, scores) => ka.of.reduce((s, k) => s + scores[k], 0) / ka.of.length;

  /* Red · Amber · Green — the Resilience Engine's RAG method, with plain-language names */
  RD.ZONES = {
    green: { label: 'Sweet spot', short: 'Green', desc: 'No concern. Keep doing what is working.' },
    amber: { label: 'Stretching', short: 'Amber', desc: 'An early warning: risk of overstretch. A good moment to adjust.' },
    red: { label: 'Act now', short: 'Red', desc: 'Resilience is at risk. Take one small action today.' },
  };
  RD.zone = (score) => (score >= 4.5 ? 'green' : score >= 3 ? 'amber' : 'red');

  /* Today's answers (Calum is having a stretched fortnight: sleep and energy are flagged) */
  RD.DEFAULT_TODAY = { demand: 4, capacity: 4, energy: 2, sleep: 2, stress: 3, wellbeing: 4, content: 5 };
  const TYPICAL = { demand: 4.2, capacity: 4.6, energy: 4.4, sleep: 4.3, stress: 3.8, wellbeing: 4.6, content: 4.9 };

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const seedOf = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* history(days) → [{ date, scores: {key: 1..6}, level }] oldest → newest, newest = today */
  RD.history = function (days = 28) {
    const today = RD.todayScores();
    const out = [];
    const now = new Date();
    now.setHours(12, 0, 0, 0);
    for (let ago = days - 1; ago >= 0; ago--) {
      const date = new Date(now);
      date.setDate(now.getDate() - ago);
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      const scores = {};
      for (const a of RD.AREAS) {
        if (ago === 0) {
          scores[a.key] = today[a.key];
          continue;
        }
        const rng = mulberry32(seedOf(a.key) + ago * 101);
        const drift = 1 - Math.exp(-ago / 9); // recent days drift toward today's values
        let v = today[a.key] + (TYPICAL[a.key] - today[a.key]) * drift;
        if (weekend && (a.key === 'sleep' || a.key === 'stress' || a.key === 'energy')) v += 0.6;
        v += (rng() - 0.5) * 1.6;
        scores[a.key] = clamp(Math.round(v), 1, 6);
      }
      out.push({ date, scores, level: RD.level(scores) });
    }
    return out;
  };

  /* Share of days in each zone for a key area: { red, amber, green } in whole percent, summing to 100 */
  RD.distribution = function (keyAreaKey, days = 7) {
    const ka = RD.keyArea(keyAreaKey);
    const hist = RD.history(days);
    const n = { red: 0, amber: 0, green: 0 };
    hist.forEach((d) => (n[RD.zone(RD.keyScore(ka, d.scores))] += 1));
    const pct = { red: Math.round((n.red / hist.length) * 100), amber: Math.round((n.amber / hist.length) * 100) };
    pct.green = 100 - pct.red - pct.amber;
    return pct;
  };
  RD.PERIODS = { weekly: 7, monthly: 30, yearly: 365, all: 540 };

  RD.level = (scores) => {
    const vals = RD.AREAS.map((a) => scores[a.key]);
    return Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10;
  };

  /* Library: practices, tools and reads. `art` keys map to art.js scenes. */
  RD.TOOLS = [
    { id: 'walking-mindfully', title: 'Walking Mindfully', kind: 'audio', mins: 5, area: 'content', collection: 'Being Present', art: 'walk', tagline: 'Mindful Steps',
      summary: 'Turn a walk you are already taking into a few minutes of attention.' },
    { id: 'body-scan', title: 'Body Scan', kind: 'audio', mins: 8, area: 'stress', collection: 'Being Present', art: 'body', tagline: 'Awareness Journey',
      summary: 'Move your attention slowly from toes to crown, and let tension go.' },
    { id: 'resilience-river', title: 'Resilience River', kind: 'video', mins: 5, area: 'wellbeing', collection: 'Resilience River', art: 'river', tagline: 'Navigate life’s currents with resilience',
      summary: 'Picture your resilience as a river. What is its level today?' },
    { id: 'mapping-energy', title: 'Mapping Your Energy', kind: 'exercise', mins: 10, area: 'energy', collection: 'Energy', art: 'energy',
      summary: 'Plot your energy across a day and spot what fills and drains it.' },
    { id: 'energy-battery', title: 'Energy Battery', kind: 'exercise', mins: 6, area: 'energy', collection: 'Energy', art: 'battery',
      summary: 'Find ways to create surplus energy, not just spend it.' },
    { id: 'good-sleep', title: 'What is Good Sleep?', kind: 'video', mins: 4, area: 'sleep', collection: 'Sleep', art: 'sleep',
      summary: 'Do your natural rhythm and your actual sleep pattern match up?' },
    { id: 'improve-sleep', title: 'How to Improve Your Sleep', kind: 'read', mins: 5, area: 'sleep', collection: 'Sleep', art: 'moonrise',
      summary: 'Six small changes that compound into better nights.' },
    { id: 'resilience-enablers', title: 'Resilience Enablers', kind: 'video', mins: 5, area: 'wellbeing', collection: 'Develop', art: 'sunrise', tagline: 'What helps you bounce forward',
      summary: 'The people, habits and places that make it easier to recover.' },
    { id: 'find-autonomy', title: 'Find Your Autonomy', kind: 'read', mins: 4, area: 'content', collection: 'Develop', art: 'balance', tagline: 'Choose where you have control',
      summary: 'Separate what you can change from what you can only influence.' },
    { id: 'taking-responsibility', title: 'Taking Responsibility', kind: 'read', mins: 4, area: 'content', collection: 'Develop', art: 'stones',
      summary: 'The difference between taking and giving responsibility.' },
    { id: 'resilience-resources', title: 'Your Resilience Resources', kind: 'exercise', mins: 7, area: 'capacity', collection: 'Develop', art: 'battery',
      summary: 'List the resources you can draw on, and the ones you have forgotten.' },
    { id: 'resilience-dynamic', title: 'Your Resilience Dynamic®', kind: 'read', mins: 6, area: 'wellbeing', collection: 'Develop', art: 'dynamic',
      summary: 'Understand the levels of your resilience and how they can change.' },
    { id: 'top-barriers', title: 'Top Barriers', kind: 'read', mins: 5, area: 'demand', collection: 'Develop', art: 'barrier',
      summary: 'Find out what gets in the way of your resilience.' },
    { id: 'prioritisation', title: 'Prioritisation', kind: 'exercise', mins: 8, area: 'demand', collection: 'Demand vs Capacity', art: 'balance',
      summary: 'Match what is asked of you with what you have to give.' },
  ];
  RD.tool = (id) => RD.TOOLS.find((t) => t.id === id);
  RD.KINDS = {
    audio: { label: 'Audio', icon: 'headphones' },
    video: { label: 'Video', icon: 'video' },
    exercise: { label: 'Exercise', icon: 'target' },
    read: { label: 'Read', icon: 'file' },
  };

  RD.PATHWAYS = {
    sleep: {
      title: 'Sleep pathway',
      sub: 'Six short steps toward more restful nights.',
      area: 'sleep',
      art: 'sleep',
      steps: ['good-sleep', 'improve-sleep', 'taking-responsibility', 'resilience-resources', 'resilience-dynamic', 'top-barriers'],
    },
    energy: {
      title: 'Energy pathway',
      sub: 'Learn what fills your battery, and what drains it.',
      area: 'energy',
      art: 'energy',
      steps: ['mapping-energy', 'energy-battery', 'walking-mindfully', 'resilience-resources'],
    },
  };
  /* Suggested Tools → Quick Tools: one card per key area (Figma "Red Flags - Suggested Tools") */
  RD.QUICK_TOOLS = [
    { area: 'sleep', title: 'Sleep', sub: 'What is a good sleep?', tool: 'good-sleep', tone: 'cream' },
    { area: 'content', title: 'Contentedness', sub: 'Walking mindfulness', tool: 'walking-mindfully', tone: 'mint' },
    { area: 'dvc', title: 'Demand vs Capacity', sub: 'Prioritisation', tool: 'prioritisation', tone: 'violet' },
    { area: 'energy', title: 'Energy', sub: 'Mapping your energy', tool: 'mapping-energy', tone: 'sky' },
  ];

  /* Resources → collections (Figma "Being Present · Cultivate Presence") */
  RD.COLLECTIONS = [
    { id: 'being-present', title: 'Being Present', sub: 'Cultivate Presence', tone: 'water', art: 'walk', tools: ['walking-mindfully', 'body-scan'] },
    { id: 'resilience-river', title: 'Resilience River', sub: 'Check your level', tone: 'violet', art: 'river', tools: ['resilience-river', 'resilience-enablers'] },
    { id: 'energy', title: 'Energy', sub: 'Fill your battery', tone: 'sun', art: 'energy', tools: ['mapping-energy', 'energy-battery'] },
    { id: 'sleep', title: 'Sleep', sub: 'Rest and renewal', tone: 'blue', art: 'sleep', tools: ['good-sleep', 'improve-sleep'] },
    { id: 'develop', title: 'Develop your Resilience', sub: 'Know how it works', tone: 'pink', art: 'dynamic', tools: ['resilience-dynamic', 'top-barriers', 'taking-responsibility', 'resilience-resources', 'find-autonomy', 'prioritisation'] },
  ];
  RD.collection = (id) => RD.COLLECTIONS.find((c) => c.id === id);

  /* Daily Resilience Practices → "How's your day going?" (DS to-do list) */
  RD.PRACTICES = [
    { id: 'breathing', title: 'Breathing training', sub: '49% left for today', kind: 'ring', progress: 51, cta: 'Continue exercise' },
    { id: 'steps', title: 'Step goal', sub: 'Goal achieved today', kind: 'bar', value: 10240, goal: 10000 },
    { id: 'vitamin-d', title: 'Vitamin D', sub: 'Your daily dose, with lunch', kind: 'check', done: false },
    { id: 'walk', title: 'Walking Mindfully', sub: '5 min audio · Being Present', kind: 'check', done: true, tool: 'walking-mindfully' },
    { id: 'report', title: 'Your weekly report is ready', sub: 'See it in Reports', kind: 'link', href: 'overview.html' },
  ];

  /* Track Settings defaults */
  RD.DEFAULT_SETTINGS = { frequency: 'daily', days: 'weekdays', time: '09:00', reminders: true };
  RD.settings = () => ({ ...RD.DEFAULT_SETTINGS, ...((RD.store && RD.store.get('settings')) || {}) });

  /* Which pathway a flagged area points to */
  RD.pathwayFor = (areaKey) => (areaKey === 'energy' || areaKey === 'capacity' || areaKey === 'demand' ? 'energy' : 'sleep');

  RD.JOURNAL = [
    { date: '2 days ago', tool: 'walking-mindfully', prompt: 'How might you bring awareness to each moment when you walk?',
      text: 'Noticed the frost on the railings by the canal. First time all week I was not rehearsing a meeting in my head.' },
    { date: 'Last week', tool: 'mapping-energy', prompt: 'What drains your energy?',
      text: 'Back-to-back calls after 3pm. Moving the 1:1s to mornings next week.' },
    { date: 'Last week', tool: 'resilience-river', prompt: 'What one thing could you do to raise the river’s level?',
      text: 'Phone out of the bedroom. Try it for five nights.' },
  ];

  /* Persisted state (see RD.store in app.js) */
  RD.todayScores = function () {
    const saved = RD.store && RD.store.get('checkin');
    if (saved && saved.day === new Date().toDateString()) return saved.scores;
    return { ...RD.DEFAULT_TODAY };
  };
  RD.checkedInToday = function () {
    const saved = RD.store && RD.store.get('checkin');
    return !!(saved && saved.day === new Date().toDateString());
  };
  RD.flags = (scores) => RD.AREAS.filter((a) => RD.zone(scores[a.key]) === 'red');
})();
