module.exports = (sequelize, type) => {
    return sequelize.define('Questionaire', {
        idQuestionaire: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        questionDescription:{
            type:type.STRING,
            unique: true,
            allowNull: false
        },
        questionno:{
            type:type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        question:{ type:type.STRING },
        status:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};