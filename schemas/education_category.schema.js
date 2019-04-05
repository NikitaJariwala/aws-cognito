module.exports = (sequelize, type) => {
    return sequelize.define('EducationCategory', {
        idEducationCategory: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        Description:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};