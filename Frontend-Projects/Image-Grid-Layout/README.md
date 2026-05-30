# Image Grid Layout

A photo gallery built with CSS Grid.

## Live Layout

```
┌─────────────┬─────────────┬─────────────┐
│             │   top-mid   │             │
│  tall-left  ├─────────────┤  tall-right │
│             │             │             │
├─────────────┤  tall-mid   ├─────────────┤
│ small-left  │             │ small-right │
└─────────────┴─────────────┴─────────────┘
```

Six images fill a 3x3 grid, but four of them span two rows, creating a varied composition.

## Starting Point: CSS Grid Generator

The layout was first prototyped using [CSS Grid Generator](https://cssgrid-generator.netlify.app/), which outputs numeric `grid-area` coordinates in `row-start / col-start / row-end / col-end` format:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.div1 { grid-area: 1 / 1 / 3 / 2; }
.div2 { grid-area: 3 / 1 / 4 / 2; }
.div3 { grid-area: 1 / 2 / 2 / 3; }
.div4 { grid-area: 2 / 2 / 4 / 3; }
.div5 { grid-area: 1 / 3 / 3 / 4; }
.div6 { grid-area: 3 / 3 / 4 / 4; }
```

Each value is a line number, not a cell number. A 3x3 grid has 4 row lines and 4 column lines. So `.div1 { grid-area: 1 / 1 / 3 / 2 }` spans two rows because row line 3 minus row line 1 equals 2, and one column because column line 2 minus column line 1 equals 1.

This works, but the numbers are hard to read at a glance. To make the intent clearer, this was refactored to use named template areas instead.

## How CSS Grid Was Used

### 1. Defining the Grid Container

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 600px;
  height: 600px;
}
```

`display: grid` activates grid layout. `repeat(3, 1fr)` creates three equal columns and three equal rows, each taking one fraction of the available space. `gap` adds uniform spacing between all cells.

### 2. Named Template Areas

```css
grid-template-areas:
  "tall-left  top-mid   tall-right"
  "tall-left  tall-mid  tall-right"
  "small-left tall-mid  small-right";
```

Each string represents one row. Each word is a named area occupying one cell. When the same name appears in adjacent cells, the browser merges them into a single spanning area. No manual `grid-row` or `grid-column` span values are needed.

### 3. Placing Items into Areas

```css
.img-tall-left   { grid-area: tall-left; }
.img-small-left  { grid-area: small-left; }
.img-top-mid     { grid-area: top-mid; }
.img-tall-mid    { grid-area: tall-mid; }
.img-tall-right  { grid-area: tall-right; }
.img-small-right { grid-area: small-right; }
```

Each image is assigned to its named area with `grid-area`. Regardless of DOM order, the browser places and sizes it to fill that area automatically.

### 4. Filling Each Cell Without Distortion

```css
.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`object-fit: cover` crops each image to fill its grid area while preserving its aspect ratio, preventing any squishing or stretching.

## Project Source

[roadmap.sh - Image Grid Layout](https://roadmap.sh/projects/image-grid)
