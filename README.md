# Hypnotoad 🐸

You can't say no.

---

## 🚀 Setup & Run

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### 1. Clone the repository

```bash
git clone https://github.com/tjllis/hypnotoad.git
cd hypnotoad
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run in development mode

```bash
pnpm run dev
```

### 4. Build for production

```bash
pnpm build
```

---

## 🔄 How CSS is Transformed

The styles are written using SCSS and CSS Modules. Since browsers can't read SCSS files directly, Vite transforms them into standard CSS:

1. **Compiling**: Vite turns SCSS (with nesting and variables) into plain CSS.

2. **Scoping (CSS Modules)**: To prevent styles from "clashing," class names are renamed to unique IDs.
   - Example: `.btn` becomes `._btn_y81id_35`.

3. **JS Wrapping (Dev Mode)**: In development, Vite serves each SCSS file as a JavaScript module. The CSS is stored as a string inside a JS variable, which Vite then "injects" into the page.

4. **Bundling (Production)**: All styles are collected and optimized into a single file: `dist/assets/index-[hash].css`.

### Example of transformation:

```scss
/* What I wrote (SCSS) */
.btn {
  &:hover {
    filter: brightness(1.5);
  }
}
```

```css
/* What the browser gets (CSS) */
._btn_y81id_35:hover {
  filter: brightness(1.5);
}
```

---

## 📂 CSS & Source Maps

### Where is the final CSS?

After you run `pnpm build`, you can find the final styles here:

```
dist/assets/index-[hash].css
```

### Where are the Source Maps?

Source Maps act as a "bridge" that connects the final hashed CSS back to my original SCSS code.

**How they work**: During development, the source map is "hidden" inside the JavaScript variable as a long string of encoded data.

**How to check them**:

1. Open Chrome **DevTools**.
2. Go to the **Elements** tab and click on any part of the toad.
3. In the **Styles** panel (on the right), you will see a link like `App.module.scss:15` next to the CSS rules.
4. Clicking that link will take you to the original line in my SCSS file, even though the browser is actually running transformed CSS.

### 🔍 Technical Note: CSS References

You might still see references like `index.css:1` in the DevTools Styles tab.

- **What it is:** This is just the browser pointing to the final, generated CSS file.
- **The Difference:** Without Source Maps, you only see this final "minified" file. With Source Maps, the browser would instead point you to the original `App.module.scss` file and its exact line of code.

### 🔧 Configuration

In the `vite.config.js`, source maps are explicitly enabled:

- `css: { devSourcemap: true }` — enables mapping during development.
- `build.sourcemap: true` — enables mapping for the production build.

#### What happens WITHOUT source maps?

If these settings were turned off, your experience in the browser's **Styles** tab would change:

- **With Source Maps:** You see `App.module.scss:15` (Direct link to my source code).
- **Without Source Maps:** You would only see `index.css` or `<style>`. All properties would appear as a flat list, and you wouldn't know which SCSS file or nested rule they came from.

---

**Wait, are there other map types?**

## 📦 JS Source Maps

### Why do we need .js.map files?

When you build the project, Vite turns your React/JSX code into a single, compressed JavaScript file. The `.js.map` file acts like a "translator":

- **Without it:** If there's an error, the browser points to a messy, unreadable line in `index-BdtXSwle.js`.
- **With it:** DevTools can tell you exactly which line in your original `App.tsx` caused the issue.

It’s the same logic for both:

- **.js.map** → connects generated JS back to your **.tsx** files.
- **.css.map** → connects generated CSS back to your **.scss** files.

### 🕵️ Note on 'Hidden' Maps

For production, `sourcemap: 'hidden'` is used.

- **Why?** It generates map files for error tracking (like Sentry) but doesn't link them inside the JS.
- **Result:** It keeps the source code private from regular users while still allowing developers to debug if needed.
