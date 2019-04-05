module.exports = (sequelize, type) => {
    return sequelize.define('Specialty', {
        idSpecialty: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        specialty:{ type:type.STRING },
        dateissued:{ type:type.DATE },
        dateexpired:{ type:type.DATE },
        createdby: { type:type.INTEGER }
    });
};