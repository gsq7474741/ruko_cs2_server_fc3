/** @type {import('next').NextConfig} */

const validateEnv = () => {
    const requiredVars = [
        'ALICLOUD_ACCESS_KEY_ID',
        'ALICLOUD_ACCESS_KEY_SECRET',
    ];

    const missing = requiredVars.filter(
        (name) => !(name in process.env)
    );

    if (missing.length > 0) {
        throw new Error(
            `Missing required build-time environment variables: ${missing.join(', ')}`
        );
    }
};

// Validate environment variables immediately
validateEnv();

const nextConfig = {
    output: "standalone",
    serverRuntimeConfig: {
        // 只在服务端可用的配置
        ALICLOUD_ACCESS_KEY_ID: process.env.ALICLOUD_ACCESS_KEY_ID,
        ALICLOUD_ACCESS_KEY_SECRET: process.env.ALICLOUD_ACCESS_KEY_SECRET,
    },
    // 如果有需要在客户端暴露的配置,可以放在 publicRuntimeConfig 中
    publicRuntimeConfig: {
        // 这里放置可以在客户端访问的配置
    }
};

export default nextConfig;
