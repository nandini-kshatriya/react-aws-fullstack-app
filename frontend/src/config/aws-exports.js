const config = {
    // Amazon Cognito Configuration
    cognito: {
        region: process.env.REACT_APP_REGION || 'YOUR_AWS_REGION', // e.g., 'us-east-1'
        userPoolId: process.env.REACT_APP_USER_POOL_ID || 'YOUR_USER_POOL_ID',
        userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID || 'YOUR_APP_CLIENT_ID',
    },

    // API Gateway Configuration
    api: {
        baseUrl: process.env.REACT_APP_API_URL || 'YOUR_API_GATEWAY_URL', // e.g., 'https://api.example.com'
    }
};

export default config;
