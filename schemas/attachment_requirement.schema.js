module.exports = (sequelize, type) => {
    return sequelize.define('AttachmentRequirements', {
        idAttachment: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        ApplicationForm_type:{ type:type.INTEGER , allowNull: false},
        attachmentType:{ type:type.STRING },
        status:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};