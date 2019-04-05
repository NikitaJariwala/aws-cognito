module.exports = (sequelize, type) => {
    return sequelize.define('ContinuingEducation', {
        idContinuingEducation: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        idEducationCategory:{ type:type.UUID, allowNull: false},
        coursetitle:{ type:type.STRING },
        sponsoredby:{ type:type.STRING },
        datesattended:{ type:type.STRING },
        accrededapprovedby:{ type:type.STRING },
        credithours:{type:type.INTEGER},
        createdby: { type:type.INTEGER }
    });
};