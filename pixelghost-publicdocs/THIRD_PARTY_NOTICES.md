# Third-Party Notices

PixelGhost includes software developed by third parties. This document covers
the production packages and build-generated runtime/CSS included in the
distributed browser extension built from the committed lockfile. Build-time
and test-only tools that emit no distributed code are not listed.

## Build-generated runtime and CSS

The following packages contribute runtime templates or generated CSS to the
distributed extension and are provided under the MIT License:

| Package | Version | Distributed contribution | Source |
| --- | --- | --- | --- |
| Vite | 5.4.21 | Module-preload runtime | https://github.com/vitejs/vite/tree/v5.4.21/packages/vite |
| @crxjs/vite-plugin | 2.7.1 | Extension/content loader runtime | https://github.com/crxjs/chrome-extension-tools/tree/v2.7.1/packages/vite-plugin |
| Tailwind CSS | 3.4.19 | Preflight and generated utility CSS | https://github.com/tailwindlabs/tailwindcss/tree/v3.4.19 |
| tailwindcss-animate | 1.0.7 | Generated animation CSS | https://github.com/jamiebuilds/tailwindcss-animate/tree/v1.0.7 |

Copyright (c) 2019-present, VoidZero Inc. and Vite contributors

Copyright (c) 2019 jacksteamdev

Copyright (c) Tailwind Labs, Inc.

Copyright (c) 2020 Jamie Kyle

MIT License

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

## React and Preact runtimes

The following packages are distributed under the MIT License:

| Package | Version | Source |
| --- | --- | --- |
| React | 18.3.1 | https://github.com/facebook/react/tree/v18.3.1/packages/react |
| React DOM | 18.3.1 | https://github.com/facebook/react/tree/v18.3.1/packages/react-dom |
| Scheduler | 0.23.2 | https://github.com/facebook/react/tree/v18.3.1/packages/scheduler |
| Preact | 10.29.8 | https://github.com/preactjs/preact/tree/10.29.8 |

Copyright (c) Facebook, Inc. and its affiliates.

Copyright (c) 2015-present Jason Miller

MIT License

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

## Zustand

- Package: Zustand
- Version: 5.0.14
- License: MIT
- Source: https://github.com/pmndrs/zustand/tree/v5.0.14

Copyright (c) 2019 Paul Henschel

MIT License

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

## idb

- Package: idb
- Version: 8.0.3
- License: ISC
- Source: https://github.com/jakearchibald/idb/tree/v8.0.3

Copyright (c) 2016, Jake Archibald <jaffathecake@gmail.com>

ISC License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

## Lucide React

- Package: lucide-react
- Version: 0.462.0
- License: ISC
- Source: https://github.com/lucide-icons/lucide/tree/0.462.0/packages/lucide-react

ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part
of Feather (MIT). All other copyright (c) for Lucide are held by Lucide
Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

## thinking-orbs

- Package: thinking-orbs
- Version: 0.3.2
- License: MIT
- Source: https://github.com/Jakubantalik/Libraries.dev

PixelGhost's busy indicator (in the on-page widget and the DevTools side
panel) ports one animation (the "working" orb at its 20px preset) from this
package into `src/lib/vendor/thinking-orbs/`; the React wrapper and the rest
of the package are not included.

MIT License

Copyright (c) 2026 Jakub Antalik

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

The PixelGhost source code itself is provided under the Apache License 2.0;
see `LICENSE`. The third-party licenses above apply to their respective
components and are not replaced by PixelGhost's project license.
