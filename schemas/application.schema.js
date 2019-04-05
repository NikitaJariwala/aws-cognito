module.exports = (sequelize, type) => {
    return sequelize.define('Application', {
        idApplication: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_id: { type: type.UUID, allowNull: false },
        ApplicationForm_type:{ type:type.INTEGER , allowNull: false},
        createdby: { type:type.INTEGER },
        status:{ type:type.STRING }
    });
};