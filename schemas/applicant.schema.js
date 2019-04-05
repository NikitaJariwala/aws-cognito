module.exports = (sequelize, type) => {
    return sequelize.define('Applicant', {
        userid: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        seq:{
            type: type.INTEGER,
            allowNull: false
        },
        status:{ type:type.STRING },
        firstname:{type:type.STRING, allowNull: false},
        lastname:{type:type.STRING, allowNull: false},
        middlename:{type:type.STRING},
        email:{type:type.STRING},
        ssnid:{type:type.STRING},
        gender:{type:type.STRING},
        dob: { type:type.DATE },//birthdate
        placeofbirth:{type:type.STRING},
        permenentAddress:{type:type.STRING},
        permenentAddressCity:{type:type.STRING},
        permenentAddressState:{type:type.STRING},
        permenentAddressZip:{type:type.STRING},
        mailAddress:{type:type.STRING},
        mailAddressCity:{type:type.STRING},
        mailAddressZip:{type:type.STRING},
        mailAddressState:{type:type.STRING},
        contactHome:{type:type.STRING},
        contactCell:{type:type.STRING},
        contactWork:{type:type.STRING},
        ECFMG:{type:type.STRING},
        FLEX1:{type:type.STRING},
        FLEX2:{type:type.STRING},
        NBME1:{type:type.STRING},
        NBME2:{type:type.STRING},
        NBME3:{type:type.STRING},
        USMLE1:{type:type.STRING},
        USMLE2:{type:type.STRING},
        USMLE3:{type:type.STRING},
        createdby: { type:type.INTEGER },
        previousfirstname:{type:type.STRING},
        previouslastname:{type:type.STRING}
    });
};