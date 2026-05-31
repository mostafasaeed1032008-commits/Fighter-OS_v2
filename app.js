/**
 * app.js
 * ─────────────────────────────────────────────────────────────
 * Fighter OS — Application Bootstrap & Router
 *
 * JSON data is embedded directly here for GitHub Pages /
 * file:// compatibility. To add exercises, edit data/exercises.json
 * and re-embed, OR use the Add Exercise form (saves to localStorage).
 *
 * Module load order (index.html script tags):
 *   storage.js → banks.js → stats.js → media.js →
 *   workouts.js → tracker.js → builder.js → app.js → ui.js
 */

// ── Embedded JSON Data ────────────────────────────────────────
// Source of truth: data/exercises.json, data/banks.json, data/workouts.json
// These are embedded so the app works on GitHub Pages and file:// without a server.

const EXERCISES_DATA = [{"id":"ex001","name":"Push-Up","bank":"Strength","category":"Push","description":"Classic upper body push movement. Develops chest, triceps and anterior deltoids. Foundational for all striking sports. Progress from knee push-ups to archer push-ups as strength improves.","difficulty":2,"basePoints":3,"muscles":{"chest":8,"back":1,"shoulders":5,"triceps":7,"biceps":1,"core":4,"glutes":0,"quads":0,"hamstrings":0,"calves":0,"grip":0},"sports":["Boxing","Kickboxing","Kung Fu","Sanda"],"tags":["bodyweight","beginner","push","foundational"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex002","name":"Pull-Up","bank":"Strength","category":"Pull","description":"Vertical pulling movement. Builds a powerful back and biceps. Essential for clinch strength in wrestling and grappling. Use controlled tempo \u2014 2 seconds up, 3 seconds down.","difficulty":3,"basePoints":5,"muscles":{"chest":1,"back":9,"shoulders":4,"triceps":0,"biceps":8,"core":3,"glutes":0,"quads":0,"hamstrings":0,"calves":0,"grip":7},"sports":["Wrestling","Kung Fu"],"tags":["bodyweight","strength","vertical pull","grip"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex003","name":"Back Squat","bank":"Strength","category":"Legs","description":"King of lower body movements. Builds massive leg power essential for all striking and grappling. Develops hip drive for powerful kicks. Keep chest up and knees tracking over toes.","difficulty":3,"basePoints":6,"muscles":{"chest":0,"back":4,"shoulders":2,"triceps":0,"biceps":0,"core":6,"glutes":8,"quads":9,"hamstrings":6,"calves":3,"grip":0},"sports":["Kickboxing","Sanda","Boxing","Wrestling"],"tags":["compound","legs","foundational","barbell"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex004","name":"Plank","bank":"Strength","category":"Core","description":"Isometric core stability exercise. Builds the iron core needed to transfer power through all striking and grappling movements. Posterior pelvic tilt \u2014 no sagging hips.","difficulty":1,"basePoints":2,"muscles":{"chest":2,"back":3,"shoulders":4,"triceps":2,"biceps":0,"core":9,"glutes":4,"quads":2,"hamstrings":0,"calves":0,"grip":0},"sports":["Boxing","Kickboxing","Sanda","Kung Fu","Wrestling"],"tags":["isometric","core","stability","beginner"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex005","name":"Deadlift","bank":"Strength","category":"Pull","description":"The ultimate full body strength movement. Builds pulling strength, posterior chain, and grip. Directly transfers to takedowns and clinch work. Hip hinge pattern is non-negotiable.","difficulty":4,"basePoints":8,"muscles":{"chest":0,"back":9,"shoulders":2,"triceps":0,"biceps":2,"core":7,"glutes":9,"quads":6,"hamstrings":9,"calves":2,"grip":9},"sports":["Wrestling","Sanda"],"tags":["compound","posterior chain","heavy","barbell"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex006","name":"Medicine Ball Slam","bank":"Power","category":"Full Body","description":"Explosive total body power exercise. Develops rotational power and the ability to generate force from the ground up \u2014 essential for hard punching. Full extension on every rep.","difficulty":2,"basePoints":5,"muscles":{"chest":3,"back":5,"shoulders":6,"triceps":4,"biceps":2,"core":8,"glutes":4,"quads":3,"hamstrings":2,"calves":1,"grip":5},"sports":["Boxing","Kickboxing","Sanda"],"tags":["explosive","power","med ball","conditioning"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex007","name":"Rotational Med Ball Throw","bank":"Power","category":"Rotational","description":"Develops rotational power that directly translates to hook and cross power. Stand sideways to a wall, rotate through the hips and drive the ball into the wall.","difficulty":2,"basePoints":5,"muscles":{"chest":4,"back":4,"shoulders":5,"triceps":3,"biceps":3,"core":9,"glutes":5,"quads":3,"hamstrings":2,"calves":1,"grip":5},"sports":["Boxing","Kickboxing","Sanda","Kung Fu"],"tags":["rotational","power","sport-specific","med ball"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex008","name":"Box Jump","bank":"Power","category":"Lower Body","description":"Plyometric lower body power exercise. Develops fast-twitch muscle fibers in the legs for explosive movement, footwork and kicks. Land softly \u2014 absorb force through the full foot.","difficulty":3,"basePoints":6,"muscles":{"chest":0,"back":1,"shoulders":0,"triceps":0,"biceps":0,"core":4,"glutes":8,"quads":9,"hamstrings":6,"calves":7,"grip":0},"sports":["Kickboxing","Sanda","Kung Fu","Wrestling"],"tags":["plyometric","explosive","legs","fast-twitch"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex009","name":"Burpee","bank":"Conditioning","category":"Full Body","description":"Total body conditioning exercise. Builds cardiovascular endurance while maintaining strength. Simulates the demands of a fight with explosive transitions from floor to standing.","difficulty":3,"basePoints":5,"muscles":{"chest":5,"back":3,"shoulders":4,"triceps":4,"biceps":1,"core":6,"glutes":5,"quads":6,"hamstrings":4,"calves":4,"grip":0},"sports":["Boxing","Kickboxing","Sanda","Kung Fu"],"tags":["conditioning","full body","cardio","fight prep"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex010","name":"Farmer's Carry","bank":"Strength","category":"Grip","description":"Loaded carry for grip, forearms, and full body stability. Builds crushing grip needed for clinch work, takedowns, and weapon control. Walk with purpose \u2014 no swaying.","difficulty":2,"basePoints":4,"muscles":{"chest":1,"back":5,"shoulders":4,"triceps":1,"biceps":3,"core":7,"glutes":3,"quads":2,"hamstrings":2,"calves":3,"grip":10},"sports":["Wrestling","Sanda","Kung Fu"],"tags":["grip","carry","functional","loaded carry"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex011","name":"Shadow Boxing","bank":"Skill","category":"Striking","description":"Fundamental skill development drill. Practice combinations, footwork and timing without resistance. The foundation of all striking arts. Visualize an opponent \u2014 move with intention.","difficulty":1,"basePoints":3,"muscles":{"chest":4,"back":3,"shoulders":6,"triceps":4,"biceps":3,"core":6,"glutes":3,"quads":4,"hamstrings":2,"calves":4,"grip":2},"sports":["Boxing","Kickboxing","Sanda","Kung Fu"],"tags":["skill","technical","striking","beginner"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex012","name":"Romanian Deadlift","bank":"Strength","category":"Legs","description":"Hip hinge pattern isolating the hamstrings and glutes. Teaches proper posterior chain loading for all pulling movements and kick generation from the hip. Maintain a neutral spine throughout.","difficulty":2,"basePoints":4,"muscles":{"chest":0,"back":6,"shoulders":1,"triceps":0,"biceps":0,"core":5,"glutes":8,"quads":2,"hamstrings":9,"calves":1,"grip":4},"sports":["Wrestling","Kickboxing","Sanda"],"tags":["pattern","foundational","hinge","posterior chain"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex013","name":"Overhead Press","bank":"Strength","category":"Push","description":"Vertical pressing strength. Builds overhead power and shoulder stability essential for uppercuts, overhand punches, and takedown defense. Brace the core tight \u2014 no lumbar hyperextension.","difficulty":3,"basePoints":5,"muscles":{"chest":3,"back":2,"shoulders":9,"triceps":6,"biceps":0,"core":5,"glutes":2,"quads":2,"hamstrings":0,"calves":0,"grip":3},"sports":["Boxing","Kickboxing","Kung Fu"],"tags":["barbell","overhead","shoulders","push"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex014","name":"Ab Wheel Rollout","bank":"Strength","category":"Core","description":"Advanced core anti-extension exercise. Builds incredible anterior core strength that protects the spine during heavy lifting and transfers directly to punching power.","difficulty":4,"basePoints":6,"muscles":{"chest":2,"back":3,"shoulders":5,"triceps":3,"biceps":0,"core":10,"glutes":3,"quads":0,"hamstrings":0,"calves":0,"grip":2},"sports":["Boxing","Kickboxing","Sanda","Kung Fu"],"tags":["core","advanced","anti-extension","ab wheel"],"media":{"thumbnail":"","images":[],"videos":[]}},{"id":"ex015","name":"Single Leg Romanian Deadlift","bank":"Strength","category":"Legs","description":"Unilateral balance and posterior chain strength. Develops the single-leg stability required for powerful kicks and directional movement. Challenges proprioception under load.","difficulty":4,"basePoints":6,"muscles":{"chest":0,"back":5,"shoulders":0,"triceps":0,"biceps":0,"core":7,"glutes":9,"quads":3,"hamstrings":9,"calves":4,"grip":3},"sports":["Kickboxing","Sanda","Kung Fu"],"tags":["unilateral","balance","posterior chain","legs"],"media":{"thumbnail":"","images":[],"videos":[]}}];

const BANKS_DATA = {"banks":[{"id":"strength","name":"Strength","icon":"\u25c8","description":"Maximal force production. Barbell, dumbbell and bodyweight movements.","categories":["Push","Pull","Legs","Core","Grip"]},{"id":"power","name":"Power","icon":"\u26a1","description":"Explosive force production. Plyometrics, med ball and Olympic lifts.","categories":["Upper Body","Lower Body","Rotational","Full Body"]},{"id":"conditioning","name":"Conditioning","icon":"\u25c9","description":"Cardiovascular and work capacity training.","categories":["Full Body","Circuits","Cardio","HIIT"]},{"id":"skill","name":"Skill","icon":"\u25cd","description":"Sport-specific technical drills and movement patterns.","categories":["Striking","Grappling","Footwork","Defense","Combinations"]},{"id":"mobility","name":"Mobility","icon":"\u25ef","description":"Flexibility, joint health and movement quality.","categories":["Upper Body","Lower Body","Full Body","Hip Flexors","Thoracic"]},{"id":"recovery","name":"Recovery","icon":"\u25cc","description":"Active recovery, breathwork and regeneration.","categories":["Breathing","Stretching","Cold Exposure","Foam Roll"]}],"sports":[{"id":"boxing","name":"Boxing","color":"#e8443a"},{"id":"kickboxing","name":"Kickboxing","color":"#f0b429"},{"id":"sanda","name":"Sanda","color":"#2ec4b6"},{"id":"kungfu","name":"Kung Fu","color":"#4a9eff"},{"id":"wrestling","name":"Wrestling","color":"#a78bfa"}],"muscles":["chest","back","shoulders","triceps","biceps","core","glutes","quads","hamstrings","calves","grip"]};

const WORKOUTS_DATA = {"presets":[{"id":"wt001","name":"Boxer Fundamentals","description":"Upper body strength and conditioning for boxing. Push, pull and core.","sports":["Boxing"],"slots":[{"exId":"ex001","sets":4,"reps":15,"rest":60},{"exId":"ex002","sets":3,"reps":8,"rest":90},{"exId":"ex004","sets":3,"reps":1,"rest":60},{"exId":"ex006","sets":3,"reps":10,"rest":60},{"exId":"ex011","sets":3,"reps":1,"rest":30}]},{"id":"wt002","name":"Leg Day \u2014 Kicker","description":"Lower body power and strength optimised for kicking sports.","sports":["Kickboxing","Sanda","Kung Fu"],"slots":[{"exId":"ex003","sets":4,"reps":5,"rest":180},{"exId":"ex008","sets":4,"reps":6,"rest":120},{"exId":"ex012","sets":3,"reps":10,"rest":90},{"exId":"ex015","sets":3,"reps":8,"rest":90}]},{"id":"wt003","name":"Wrestler Power","description":"Full body strength and grip for wrestling and clinch work.","sports":["Wrestling"],"slots":[{"exId":"ex005","sets":4,"reps":4,"rest":180},{"exId":"ex002","sets":4,"reps":6,"rest":120},{"exId":"ex010","sets":3,"reps":1,"rest":90},{"exId":"ex004","sets":3,"reps":1,"rest":60}]}]};

const App = (() => {

  // ── Global State ───────────────────────────────────────────

  const state = {
    page      : 'dashboard',
    exercises : [],       // ALL exercises (default JSON + custom localStorage)
    presets   : [],       // workout presets from workouts.json
    filters   : {
      bank    : 'all',
      sport   : 'all',
      category: 'all',
      query   : '',
    },
  };

  // ── Boot ───────────────────────────────────────────────────
  // Uses embedded EXERCISES_DATA / BANKS_DATA / WORKOUTS_DATA constants
  // defined at the top of this file. No fetch() needed — works on
  // GitHub Pages, file://, and any static host with zero configuration.

  function boot() {
    try {
      // 1. Initialise Banks from embedded data
      Banks.init(BANKS_DATA);

      // 2. Merge default exercises + any custom ones from localStorage
      const customExercises = Storage.getCustomExercises();
      state.exercises = [...EXERCISES_DATA, ...customExercises];

      // 3. Store presets
      state.presets = WORKOUTS_DATA.presets || [];

      // 4. Initialise Workouts module (builds exercise id map)
      Workouts.init(state.exercises);

      // 5. Init UI bindings and render first page
      UI.init();
      navigate('dashboard');

    } catch (err) {
      console.error('[App] Boot failed:', err);
      document.getElementById('content').innerHTML = `
        <div class="empty">
          <div class="empty-icon">⚠</div>
          <div class="empty-text">
            Fighter OS failed to start.<br>
            <small style="color:var(--text3);font-size:11px">${err.message}</small>
          </div>
        </div>`;
    }
  }

  // ── Routing ────────────────────────────────────────────────

  const PAGE_TITLES = {
    dashboard : 'DASHBOARD',
    exercises : 'EXERCISE DATABASE',
    workout   : 'WORKOUT BUILDER',
    muscles   : 'MUSCLE ANALYSIS',
    history   : 'TRAINING HISTORY',
    add       : 'ADD EXERCISE',
  };

  function navigate(page) {
    state.page = page;

    // Update nav highlight
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Update topbar title
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = PAGE_TITLES[page] || page.toUpperCase();

    // Render page into content area
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '';
    _renderPage(page, content);

    // Update points badge
    UI.updateBadge();

    // Close mobile sidebar
    document.getElementById('sidebar')?.classList.remove('open');
  }

  function _renderPage(page, container) {
    switch (page) {
      case 'dashboard':
        container.innerHTML = Builder.renderDashboard(state.exercises);
        break;

      case 'exercises':
        container.innerHTML = Builder.renderExercises(state.exercises, state.filters);
        break;

      case 'workout':
        container.innerHTML = Builder.renderWorkoutPage(state.exercises, state.presets);
        break;

      case 'muscles':
        container.innerHTML = Builder.renderMuscleAnalysis();
        break;

      case 'history':
        container.innerHTML = Builder.renderHistory();
        break;

      case 'add':
        container.innerHTML = Tracker.renderAddForm();
        break;

      default:
        container.innerHTML = `<div class="empty">
          <div class="empty-icon">🔧</div>
          <div class="empty-text">Page not found: ${page}</div>
        </div>`;
    }
  }

  // ── Filter Management ──────────────────────────────────────

  /**
   * Set a filter value and re-render the exercises page.
   * Called from inline onclick handlers in filter chips.
   */
  function setFilter(key, value) {
    state.filters[key] = value;
    // If bank changes, reset category
    if (key === 'bank') state.filters.category = 'all';
    if (state.page === 'exercises') {
      navigate('exercises');
    }
  }

  function getFilters() { return { ...state.filters }; }

  // ── Exercise Runtime Management ────────────────────────────

  /**
   * Called by Tracker after saving a new custom exercise.
   * Adds to the runtime array immediately — no page reload needed.
   */
  function addExerciseToRuntime(exercise) {
    state.exercises.push(exercise);
    Workouts.init(state.exercises); // rebuild exercise map
  }

  /**
   * Called by Tracker after deleting a custom exercise.
   */
  function removeExerciseFromRuntime(id) {
    state.exercises = state.exercises.filter(e => e.id !== id);
    Workouts.init(state.exercises);
  }

  /**
   * Get all exercises (for modules that need the full list).
   */
  function getExercises() { return state.exercises; }

  /**
   * Get a single exercise by id.
   */
  function getExerciseById(id) {
    return state.exercises.find(e => e.id === id) || null;
  }

  /**
   * Get workout presets.
   */
  function getPresets() { return state.presets; }

  // ── Public API ────────────────────────────────────────────

  return {
    boot,
    navigate,
    setFilter,
    getFilters,
    addExerciseToRuntime,
    removeExerciseFromRuntime,
    getExercises,
    getExerciseById,
    getPresets,
  };

})();
