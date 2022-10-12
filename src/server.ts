import app from './app'

const port = process.env.SERVER_PORT || 3003;
app.listen(port, () => {
    console.info(`Server ON PORT=${port}`);
});