# Tooltip UI

A navbar with three CSS-animated tooltips, each using a different entrance animation. Built with plain HTML, CSS, and a small JavaScript reset trick.

## How it works

### Structure

Each nav link wraps a `<span class="tooltip tooltip--{variant}">` as a child element. The tooltip sits inside the anchor so `:hover` on the parent can target it directly via CSS.

```html
<a href="#home">
  Home
  <span class="tooltip tooltip--fade-up">Go to homepage</span>
</a>
```

### Positioning

The tooltip is `position: absolute` and the anchor is `position: relative`, so the tooltip is positioned relative to its link. `top: calc(100% + 12px)` places it just below the link, and `transform: translateX(-50%)` with `left: 50%` centers it horizontally.

### Hiding the tooltip by default

```css
.tooltip {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
```

- `opacity: 0` hides it visually.
- `visibility: hidden` removes it from hit-testing so it cannot accidentally capture hover events.
- `pointer-events: none` is an extra guard against mouse interaction.

### Triggering on hover

CSS handles the show logic entirely. Each variant modifier owns its animation rule:

```css
nav a:hover .tooltip--fade-up {
  visibility: visible;
  animation: fadeUp 0.5s ease forwards;
}
```

`forwards` keeps the tooltip at full opacity after the animation ends so it stays visible while the cursor is on the link.

### Animation variants

| Class | Effect |
|---|---|
| `tooltip--fade-up` | Slides up from below while fading in |
| `tooltip--scale` | Scales up from zero with a slight rotation |
| `tooltip--bounce` | Slides up, overshoots, then settles into place |

Each is a standard `@keyframes` block that manipulates `opacity` and `transform`. All three keep `translateX(-50%)` in every keyframe to preserve horizontal centering throughout the animation.

### Replaying the animation on re-hover

CSS animations only play once per element unless the animation is reset. Without intervention, moving the cursor away and back would not replay the entrance animation.

The JavaScript fix:

```js
link.addEventListener('mouseleave', () => {
  tooltip.style.animation = 'none'; // detach the animation
  tooltip.offsetHeight;             // force a reflow to flush the change
  tooltip.style.animation = '';     // restore, letting CSS re-apply it next hover
});
```

Reading `offsetHeight` forces the browser to reflow, which commits the `animation: none` state before the property is cleared. Without this reflow the browser may batch both changes and skip the reset.
