module.exports = {
    devServer: {
        proxy: {
            ["/dev-api"]: {
                target: 'http://localhost:20011',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + "/dev-ap"]: ''
                }
            }
        }

    }
}