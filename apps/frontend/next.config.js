//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    },
    env: {
        NX_REACT_APP_GOOGLE_API_KEY:
            process.env.NX_REACT_APP_GOOGLE_API_KEY || '',
        NX_BACKEND_URL: process.env.BACKEND_URL || ''
    }
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx
];

module.exports = composePlugins(...plugins)(nextConfig);
