module.exports = client => {
    process.removeAllListeners();

    process.on("unhandledRejection", (reason, p) => {
        console.log('[ANTICRASH] - ERROR ENCONTRDO');
        console.log(reason, p);
    });

    process.on("unhandledException", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRDO');
        console.log(err, origin);
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRDO');
        console.log(err, origin);
    });

    process.on("multipleResolves", () => {});
}