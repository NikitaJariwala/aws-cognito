module.exports = (sequelize, type) => {
    return sequelize.define('ApplicantQuestionaire', {
        applicant_questionaire_id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        Questionaire_questionno:{
            type: type.INTEGER,
            allowNull: false
        },
        answer:{ type:type.STRING },
        answerdescription:{ type:type.STRING },
        digitalsignature:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};