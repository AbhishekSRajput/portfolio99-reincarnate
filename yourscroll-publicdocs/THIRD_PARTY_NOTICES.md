# Third-Party Notices

YouScroll includes software developed by third parties. This document covers
the production packages and build-generated runtime/CSS included in the
distributed browser extension built from the committed lockfile. Build-time
and test-only tools that emit no distributed code — TypeScript, ESLint,
Prettier, Vitest, PostCSS, and their dependencies — are not listed.

Everything below is bundled into the settings popup. **YouScroll's content
script, the part that runs on the YouTube page itself, bundles none of it**:
it is framework-free and depends only on code in this project.

## Bundled runtime packages

| Package                | Version | Distributed contribution       | License | Source                                                            |
| ---------------------- | ------- | ------------------------------ | ------- | ----------------------------------------------------------------- |
| React                  | 18.3.1  | Settings popup UI              | MIT     | https://github.com/facebook/react/tree/v18.3.1/packages/react     |
| React DOM              | 18.3.1  | Settings popup rendering       | MIT     | https://github.com/facebook/react/tree/v18.3.1/packages/react-dom |
| @radix-ui/react-switch | 1.3.7   | Accessible toggle in the popup | MIT     | https://github.com/radix-ui/primitives                            |
| clsx                   | 2.1.1   | Conditional class names        | MIT     | https://github.com/lukeed/clsx/tree/v2.1.1                        |
| tailwind-merge         | 2.6.1   | Tailwind class deduplication   | MIT     | https://github.com/dcastil/tailwind-merge/tree/v2.6.1             |
| lucide-react           | 0.462.0 | Popup icon                     | ISC     | https://github.com/lucide-icons/lucide                            |

`@radix-ui/react-switch` brings with it the Radix primitives it is built from
— `@radix-ui/primitive`, `react-compose-refs`, `react-context`,
`react-primitive`, `react-use-controllable-state`, `react-use-effect-event`,
`react-use-layout-effect`, and `react-use-size`. All are published by the same
project under the MIT License and the same copyright notice reproduced below.

## Build-generated runtime and CSS

The following packages contribute generated runtime code or CSS to the
distributed extension and are provided under the MIT License:

| Package             | Version | Distributed contribution            | Source                                                                           |
| ------------------- | ------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| Vite                | 8.1.5   | Module-preload runtime              | https://github.com/vitejs/vite/tree/v8.1.5/packages/vite                         |
| @crxjs/vite-plugin  | 2.7.1   | Content-script loader runtime       | https://github.com/crxjs/chrome-extension-tools/tree/v2.7.1/packages/vite-plugin |
| Tailwind CSS        | 3.4.19  | Preflight and generated utility CSS | https://github.com/tailwindlabs/tailwindcss/tree/v3.4.19                         |
| tailwindcss-animate | 1.0.7   | Generated animation CSS             | https://github.com/jamiebuilds/tailwindcss-animate/tree/v1.0.7                   |

## MIT License

Applies to React, React DOM, the Radix UI primitives, clsx, tailwind-merge,
Vite, @crxjs/vite-plugin, Tailwind CSS, and tailwindcss-animate, each under
its own copyright notice:

Copyright (c) Facebook, Inc. and its affiliates.

Copyright (c) 2022 WorkOS

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Copyright (c) 2021 Dany Castillo

Copyright (c) 2019-present, VoidZero Inc. and Vite contributors

Copyright (c) 2019 jacksteamdev

Copyright (c) Tailwind Labs, Inc.

Copyright (c) 2020 Jamie Kyle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## ISC License

Applies to lucide-react:

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part
of Feather (MIT). All other copyright (c) for Lucide are held by Lucide
Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## YouScroll's own license

YouScroll is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
