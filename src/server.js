const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT;

const main = async () => {
    try {
        sequelize.sync({alter: false});
        console.log("DB connected");
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
