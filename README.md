# Broject UI - Tailwind-styled Headless UI Components for Vue

## Overview

Broject UI is a Vue library that encapsulates the functionality of [Headless UI](https://headlessui.com/) while providing pre-styled components using Tailwind CSS. This library aims to simplify the integration of Headless UI components into your Vue projects by offering a set of components with Tailwind styling out of the box.

## Features

Ready-to-use Components: Broject UI includes a set of pre-styled Vue components based on Headless UI, allowing you to quickly integrate them into your project.

Tailwind CSS Integration: All components come with Tailwind CSS styling, ensuring a seamless fit into your project's design.

Full Customizability: Despite the pre-styling, you have complete control over the appearance and behavior of each component through the use of Headless UI's extensive set of props.

Some of the components are built using [floating-ui](https://floating-ui.com/) to ensure a good positioning.


## Installation

```bash
npm install broject_ui
```

Don't forget to import the corresponding style

```bash
import "node_modules/broject_ui/dist/style.css"
```

## Components

Available components

```ts
import { BCheckbox, BDialog, BMenu, BMenuItem, BSwitch, BListbox, BPopover, BFileInput, BInput, BButton, BTextarea, BRadio, BAvatar, BTooltip } from "broject_ui";
```

## Documentation

For detailed documentation on available components and their props, refer to the [Headless UI](https://headlessui.com/) documentation as Broject UI components closely follow the same API.

## Configuration

#### Default colors

If you want to change the default colors of the application, you simply have to change your `tailwind.config.js` and extend the colors `primary` and `secondary` like so :

```js
theme: {
    extend: {
      colors: {
        primary: {
          50: '#edeeff',
          100: '#dee0ff',
          200: '#c4c5ff',
          300: '#a1a0ff',
          400: '#7e70ff',
          500: '#765bf9',
          600: '#693dee',
          700: '#5b2fd3',
          800: '#4a29aa',
          900: '#3e2986',
          950: '#26184e',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
    },
  },
```

You can use this website to generate the desired color pallet [tailwind palette generator](https://uicolors.app/create)

## Contributing

If you'd like to contribute to Broject UI or report issues, please check out our contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
