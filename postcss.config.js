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

    // btn-* — defined in _buttons.scss with complex SCSS nesting; not detectable from hugo_stats.json
    /^btn-/,

    // mission-board-filters.js dynamically adds these classes for active filter state
    'bg-indigo-600',
    'text-white',
    /^dark:bg-indigo-/,
    /^hover:bg-indigo-/,
    /^dark:hover:bg-indigo-/,
  ],
};

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPurgecss = require('@fullhuman/postcss-purgecss');

const plugins = [
  tailwindcss,
];

if (process.env.HUGO_ENVIRONMENT === "production") {
  plugins.push(postcssPurgecss(purgecssOptions));
  plugins.push(autoprefixer);
}

module.exports = {
  plugins: plugins,
};
