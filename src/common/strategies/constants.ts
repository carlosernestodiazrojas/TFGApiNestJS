export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'secretKey',
    refresh_secret: process.env.REFRESH_JWT_SECRET || 'refreshSecretKey',
};
