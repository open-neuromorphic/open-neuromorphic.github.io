const purgecssOptions = {
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const elements = JSON.parse(content).htmlElements;
    return [
      ...(elements.tags || []),
      ...(elements.classes || []),
      ...(elements.ids || []),
    ];
  },
  safelist: [
    /^lb-/, /^gl/, /^go/, /^gc/, /^gs/, /^gi/, /^gz/,
    /^gprev/, /^gnext/, /^desc/, /^zoom/, /^search/, /^:is/,
    /dark/, /show/, /dragging/, /fullscreen/, /loaded/, /visible/,
    'contributor-socials',
    'is-mobile-nav-open',
    'contribution-bubble',
    'bubble-title',
    'bubble-description',
    'bubble-separator',
    'bubble-contributions',
    'is-highlighted',
    // --- ADDITIONS START HERE ---
    // Safelist all button classes (e.g., btn-outline-primary) and their variants (dark, hover)
    // to prevent their complex SCSS-defined states from being purged.
    /^btn-/,
    // Safelist classes that are dynamically added by JavaScript for the active filter tags.
    // PurgeCSS cannot find these by scanning the source files.
    'bg-indigo-600',
    'text-white',
    // Note: dark: and hover: variants of the above classes are typically kept
    // by PurgeCSS if the base class is safelisted, but we add the regexes below
    // to be absolutely certain.
    /^dark:bg-indigo-/,
    /^hover:bg-indigo-/,
    /^dark:hover:bg-indigo-/,
  ],
};

// Require plugins at the top
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPurgecss = require('@fullhuman/postcss-purgecss');

// Base plugins (e.g., TailwindCSS)
const plugins = [
  tailwindcss, // Pass the plugin itself
];

// Add plugins conditionally for production
if (process.env.HUGO_ENVIRONMENT === "production") {
  plugins.push(postcssPurgecss(purgecssOptions)); // Call with options
  plugins.push(autoprefixer); // Pass the plugin itself (uses default options or browserslist)
} else {
  // For development, you might still want autoprefixer.
  // If you had it in your previous "production-only" block and want it for dev too:
  // plugins.push(autoprefixer);
  // If not, this block can be empty or removed.
}

module.exports = {
  plugins: plugins,
};
