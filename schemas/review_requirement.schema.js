module.exports = (sequelize, type) => {
    return sequelize.define('ReviewRequirement', {
        idReviewRequirement: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        ApplicationForm_type: {
            type: type.INTEGER,
            allowNull: false
        },
        review: {
            type: type.STRING,
            allowNull: false
        },
        description:{ type:type.STRING },
        acceptableresult: { type:type.INTEGER }
    });
};