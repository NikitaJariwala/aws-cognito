module.exports = (sequelize, type) => {
    return sequelize.define('WorkHistory', {
        idWorkHistory: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Applicant_userid: {
            type: type.UUID,
            allowNull: false
        },
        fromdate:{ type:type.DATE },
        todate:{ type:type.DATE },
        location:{ type:type.STRING },
        typeofpractive:{ type:type.STRING },
        reasonfordiscontinuing:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};