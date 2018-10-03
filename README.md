# Subdivision

A CSS flexbox and calc based grid system.

Live demo playground (codepen)

- [scss](https://codepen.io/anon/pen/wYKRYV)
- [styled-components](https://codepen.io/anon/pen/bmEGMM)
- stylus (coming soon)

Inspired by [Jeet](http://jeet.gs/), Subdivision aims to allow for flexible and custom grid layouts as well as being breakpoint agnostic. This means that subdivision never uses non-semantic class names like `medium-up-one-half small-full-width` and doesn't forces you to use a specific breakpoint system, in fact, subdivision doesn't known about breakpoints at all and leaves the implementation up to you.

Subdivision works by creating a grid on a constant gutter size which you specify, and gives you control how to layout content on the grid. By default columns will respect the gutters but you always have control to create columns that bleed into the gutters. Because the grid is based on flexbox if you want equal width columns with gutters you need not specify any additional css, simply wrap the column divs in a grid container and flexbox will take care of the rest. If you need more control like stacking columns, changing order of columns, setting full bleed columns, you can specify via subdivision helpers.

## Install

Pick your flavor. Subdivision currently supports Sass, Stylus, and Styled Components.

```
npm install subdivision-sass
npm install subdivision-stylus
npm install subdivision-styled-components
```

See packages/ for Specific usages

## Helpers

column:

`column(fraction: number, offset: number, gutterLeft: defaultGutterSize, gutterRight: defaultGutterSize)`

center:

`center(fraction: number)`


