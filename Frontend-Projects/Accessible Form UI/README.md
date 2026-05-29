# Accessible Form UI

A static registration form built with HTML and CSS, designed around WCAG 2.1 AA accessibility guidelines.

Project from [roadmap.sh](https://roadmap.sh/projects/accessible-form-ui) — Beginner Frontend.

![Form preview](preview.png)

---

## Project Goals

Build a static form UI using only HTML and CSS that demonstrates accessible form design as a foundation for future JavaScript enhancement. Fields include full name, email, password, and confirm password, along with a password visibility toggle, a completeness progress indicator, and a requirements checklist.

---

## Accessibility Guidelines Followed

### 1. Labelling with `<label>` and `for`

Every input has a dedicated `<label>` element whose `for` attribute matches the input's `id`. This creates a programmatic association so screen readers announce the field name when the input receives focus, and clicking the label also focuses the input.

```html
<label class="field-label" for="email">Email Address</label>
<input id="email" type="email" ... />
```

---

### 2. Required Field Indicators

Required fields use two signals — a visible asterisk (`*`) and an `aria-required="true"` attribute on the input. The asterisk is wrapped in `aria-hidden="true"` so screen readers do not read out "star"; the ARIA attribute carries that meaning instead.

```html
<label for="full-name">
  Full Name
  <span aria-hidden="true">*</span>
</label>
<input aria-required="true" ... />
```

---

### 3. Error Messages and `aria-describedby`

A reserved `<p>` element sits beneath each input to hold error text. Each input points to its error element via `aria-describedby`, so when an error is injected by JavaScript the screen reader reads it alongside the field label. The `role="alert"` and `aria-live="polite"` attributes ensure the message is announced automatically without requiring the user to move focus.

A fixed `min-height` is set on error containers so the layout does not shift when messages appear or disappear.

```html
<input aria-describedby="email-error" aria-invalid="false" ... />
<p id="email-error" role="alert" aria-live="polite"></p>
```

When a field fails validation, `aria-invalid` is flipped to `"true"`, which also applies an error visual style via the CSS attribute selector `[aria-invalid="true"]`.

---

### 4. Password Hint Text

The password field links to both its error element and a hint paragraph using `aria-describedby` with two IDs. This means screen readers read the hint ("Use 8+ characters...") as part of the field description, giving users context before they start typing.

```html
<input aria-describedby="password-error password-hint" ... />
<p id="password-hint">Use 8+ characters with a mix of letters, numbers and symbols.</p>
```

---

### 5. Accessible Password Toggle Button

The show/hide password button uses:

- `type="button"` — prevents accidental form submission.
- `aria-pressed` — communicates the toggle state (`"false"` = password hidden, `"true"` = password visible) to screen readers as a toggle button.
- `aria-label` — provides a clear name ("Show password") independent of visible icon content.
- `aria-controls` — points to the input it affects.
- `focusable="false"` on SVG icons — prevents the icons from appearing as focusable elements in some browsers.

Icon visibility is driven entirely by the `aria-pressed` value via CSS, keeping visual state and ARIA state in sync with a single attribute change.

```html
<button type="button" aria-pressed="false" aria-label="Show password" aria-controls="password">
  ...
</button>
```

---

### 6. Focus State Styling

All interactive elements — inputs, the toggle buttons, and the submit button — have explicit `:focus` or `:focus-visible` styles that override the browser default. A `3–4px` blue ring (`#93c5fd`) is applied so keyboard users always have a clear visual indicator of where focus is.

The `:focus-visible` pseudo-class is used for buttons so the ring only appears during keyboard navigation, not on mouse click.

```css
.field-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px #93c5fd;
}
```

---

### 7. Circular Progress Widget

The completeness indicator is a semantic `progressbar`:

- `role="progressbar"` on the container.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` carry the numeric state for assistive technology.
- `aria-live="polite"` on the visible percentage text announces changes without interrupting the user.
- The SVG is `aria-hidden="true"` since all meaning is expressed through the ARIA attributes on the wrapper.

```html
<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Form completeness: 0 percent">
  <svg aria-hidden="true">...</svg>
  <span aria-live="polite">0%</span>
</div>
```

---

### 8. Requirements Checklist

The checklist is a `<fieldset>` with a `<legend>`, grouping it semantically and giving it an accessible name. The list itself uses `role="list"` (required when CSS removes native list semantics) and each item communicates state visually via a CSS circle/checkmark icon.

When JavaScript marks an item as met (by adding the `checklist-item-met` class), the colour and icon change. This visual change should be paired with an `aria-live` region or updated text content so screen reader users receive the same feedback.

---

### 9. Color Contrast

All text and interactive elements meet WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text and UI components):

| Element | Foreground | Background | Ratio |
|---|---|---|---|
| Body text | `#1a202c` | `#ffffff` | 16.1:1 |
| Label text | `#2d3748` | `#ffffff` | 10.7:1 |
| Muted text | `#4a5568` | `#ffffff` | 7.0:1 |
| Primary blue | `#2563eb` | `#ffffff` | 5.9:1 |
| Button text | `#ffffff` | `#2563eb` | 5.9:1 |
| Error red | `#b91c1c` | `#ffffff` | 7.0:1 |

---

### 10. Reduced Motion

A `prefers-reduced-motion` media query disables all CSS transitions and the progress fill animation for users who have requested reduced motion in their OS settings.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
  }
}
```

---

### 11. Responsive and Mobile Friendly

The two-column layout collapses to a single column on viewports narrower than 640px, keeping touch targets and text readable without horizontal scrolling. The `<meta name="viewport">` tag prevents mobile browsers from scaling down the page.

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
