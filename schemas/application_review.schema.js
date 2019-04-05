module.exports = (sequelize, type) => {
    return sequelize.define('ApplicationReview', {
        application_review_id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        reviewresult: { type:type.INTEGER },
        Application_idApplication: {
            type: type.BIGINT,
            allowNull: false
        },
        ReviewRequirement_idReviewRequirement: {
            type: type.INTEGER,
            allowNull: false
        },
        ReviewRequirement_applicationtype: {
            type: type.STRING,
            allowNull: false
        }
    });
};