const sequelize = require("sequelize");

module.exports = function(sequelize1, DataTypes) {
    return sequelize1.define("chat", {
        name: sequelize.STRING,
        message: sequelize.STRING,
        room: sequelize.STRING
    });
};

