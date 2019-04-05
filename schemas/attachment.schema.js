module.exports = (sequelize, type) => {
    return sequelize.define('Attachment', {
        idAttachment: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Application_idApplication: { type: type.BIGINT, allowNull: false },
        attachmentType:{ type:type.STRING },
        status:{ type:type.STRING },
        attachmentfilename:{ type:type.STRING },
        createdby: { type:type.INTEGER }
    });
};