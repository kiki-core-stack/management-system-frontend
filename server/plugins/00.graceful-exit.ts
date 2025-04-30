function gracefulExit() {
    process.exit(0);
}

export default defineNitroPlugin(() => {
    process.once('SIGINT', gracefulExit);
    process.once('SIGTERM', gracefulExit);
});
