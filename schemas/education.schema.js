module.exports = (sequelize, type) => {
    return sequelize.define('Education', {
        idEducation: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        schoolName:{ type:type.STRING },
        address:{ type:type.STRING },
        addressCity:{ type:type.STRING },
        addressState:{ type:type.STRING },
        addressZip:{ type:type.STRING },
        dategraduated:{ type:type.DATE },
        degree:{ type:type.STRING },
        type:{ type:type.STRING },
        photo:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};