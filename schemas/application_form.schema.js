module.exports = (sequelize, type) => {
    return sequelize.define('ApplicationForm', {
        type: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        formName:{ type:type.STRING },
        formOrganization:{ type:type.STRING }
    });
};