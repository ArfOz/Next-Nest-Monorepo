const { join } = require('path');

// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
    mode: 'jit',
    purge: [
        join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'),
        ...createGlobPatternsForDependencies(__dirname)
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                '2xl': { max: '1535px' },
                // => @media (max-width: 1535px) { ... }

                xl: { max: '1279px' },
                // => @media (max-width: 1279px) { ... }

                lg: { max: '1023px' },
                // => @media (max-width: 1023px) { ... }

                md: { max: '767px' },
                // => @media (max-width: 767px) { ... }

                sm: { max: '639px' }
                // => @media (max-width: 639px) { ... }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
