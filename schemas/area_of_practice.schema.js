module.exports = (sequelize, type) => {
    return sequelize.define('AreaOfPractice', {
        idAreaOfPractice: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        AreaOfPracticecol:{ type:type.STRING },
        Description:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};