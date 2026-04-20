const fs = require("fs");
const path = require("path");

function svgPlaceholder(width, height, label, bgColor = "#e5e5e5") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">${label}</text>
</svg>`;
}

// Hero cover (dark bg for overlay text readability)
fs.writeFileSync("public/images/hero-cover.svg", svgPlaceholder(1440, 860, "Hero Cover 1440x860", "#333"));

// Products
for (let i = 1; i <= 5; i++) {
  fs.writeFileSync(`public/images/products/product-${i}.svg`, svgPlaceholder(340, 396, `Product ${i}`));
}

// Advantages
for (let i = 1; i <= 4; i++) {
  fs.writeFileSync(`public/images/advantages/image-${i}.svg`, svgPlaceholder(210, 252, `Advantage ${i}`));
}

// Contact
fs.writeFileSync("public/images/contact-product.svg", svgPlaceholder(272, 340, "Contact Product"));

// Info background
fs.writeFileSync("public/images/info-bg.svg", svgPlaceholder(1440, 728, "Info Background", "#333"));

console.log("Placeholder SVGs generated.");
