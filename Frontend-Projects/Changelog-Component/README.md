# Changelog Component

A clean, minimal changelog timeline component built with vanilla HTML, CSS, and JavaScript.

## Design Overview

### Layout

The component is centered on the page inside a white card with rounded corners and a light border. The card uses a vertical flexbox layout to stack the title, subtitle, timeline, and button.

### Timeline

The timeline is built on a CSS grid with three columns — date on the left, a dot in the center, and the update text on the right. A vertical line runs through the center using a `::before` pseudo-element positioned absolutely behind the dots.

### Progressive Disclosure

Only the first 3 entries are visible on load. The remaining entries are hidden and revealed when the user clicks the button. Each hidden entry appears with a staggered fade-and-slide animation (100ms delay between entries), giving the reveal a natural, sequential feel. The button hides itself once all entries are shown.

### Animation

The reveal animation (`fadeSlideIn`) fades the entry in while sliding it down from a slight upward offset, making the appearance feel smooth rather than abrupt.

### Data

Changelog entries are stored in a JavaScript array of `{ date, update }` objects. The timeline is generated dynamically from this array, so adding or removing entries only requires updating the array — no HTML changes needed. The number of initially visible entries is controlled by a single `VISIBLE` constant.

## Files

- `index.html` — markup and JavaScript logic
- `style.css` — all styling and animations
