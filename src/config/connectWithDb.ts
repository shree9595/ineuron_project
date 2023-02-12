const mongoose = require("mongoose");

export default () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log(`DB GOT CONNECTED`))
        .catch((error: any) => {
            console.log(`DB CONNECTION ISSUES`);
            console.log(error);
            process.exit(1);
        });
};


