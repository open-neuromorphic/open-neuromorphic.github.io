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
    'is-mobile-nav-open', // Add this class to prevent it from being purged
    'contribution-bubble', // Ensure bubble styles are not purged
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
