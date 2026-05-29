# Datepicker UI

A static datepicker UI built with HTML and CSS only. No JavaScript.

## How it's built

The layout has two main parts: an input row and a calendar popup below it.

### Input row

The input row uses **flexbox**. The text input takes up all available space with `flex: 1`, and the calendar icon button sits to its right at a fixed width.

```css
.input-row {
  display: flex;
}

.date-input {
  flex: 1;
}

.cal-btn {
  width: 44px;
  flex-shrink: 0;
}
```

### Calendar popup

The calendar is positioned directly below the input using **absolute positioning**. The `.datepicker` wrapper has `position: relative`, so the calendar anchors to it.

```css
.datepicker {
  position: relative;
}

.calendar {
  position: absolute;
  top: 100%;   /* sits flush below the input row */
  left: 0;
  width: 100%;
}
```

`top: 100%` means "start at the bottom edge of the nearest positioned ancestor", which is the `.datepicker` wrapper.

### Day grid

This is where CSS Grid does the heavy lifting. The calendar grid is a single flat list of 42 elements (7 day-name headers + 35 day cells) placed into a 7-column grid.

```css
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
```

`repeat(7, 1fr)` creates 7 equal-width columns. CSS Grid then auto-places each child element left to right, wrapping to the next row after every 7 items. This means there's no need for `<tr>` or `<ul>` row wrappers like in a table layout.

To start December on the correct day (Thursday), four empty `.day` cells are placed before day 1 to push it into the Thursday column:

```html
<span class="day empty"></span> <!-- Sun -->
<span class="day empty"></span> <!-- Mon -->
<span class="day empty"></span> <!-- Tue -->
<span class="day empty"></span> <!-- Wed -->
<span class="day">1</span>      <!-- Thu -->
```

The grid handles the rest automatically, wrapping each row without any extra markup.
