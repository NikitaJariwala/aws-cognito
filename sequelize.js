const Sequelize = require('sequelize');
const { host, database, username, password } = require('./configs/database.js');
const ApplicationModel = require('./schemas/application.schema');
const ApplicantModel=require('./schemas/applicant.schema');
const ApplicantQuestionaireModel=require('./schemas/applicant_questionaire.schema');
const ApplicationFormModel=require('./schemas/application_form.schema');
const ApplicationReviewModel=require('./schemas/application_review.schema');
const AreaOfPracticeModel=require('./schemas/area_of_practice.schema');
const AttachmentModel=require('./schemas/attachment.schema');
const AttachmentRequirementsModel=require('./schemas/attachment_requirement.schema');
const ContinuingEducationModel=require('./schemas/continuing_education.schema');
const EducationModel=require('./schemas/education.schema');
const EducationCategoryModel=require('./schemas/education_category.schema');
const QuestionaireModel=require('./schemas/questionaire.schema');
const ReviewRequirementModel=require('./schemas/review_requirement.schema');
const SpecialtyModel=require('./schemas/specialty.schema');
const WorkHistoryModel=require('./schemas/work_history.schema');
const Op = Sequelize.Op;

// connect to db
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: Op,
});

const Application = ApplicationModel(sequelize, Sequelize);
const Applicant = ApplicantModel(sequelize, Sequelize);
const ApplicantQuestionaire=ApplicantQuestionaireModel(sequelize, Sequelize);
const ApplicationForm=ApplicationFormModel(sequelize, Sequelize);
const ApplicationReview=ApplicationReviewModel(sequelize, Sequelize);
const AreaOfPractice=AreaOfPracticeModel(sequelize, Sequelize);
const Attachment=AttachmentModel(sequelize, Sequelize);
const AttachmentRequirements=AttachmentRequirementsModel(sequelize, Sequelize);
const ContinuingEducation=ContinuingEducationModel(sequelize, Sequelize);
const Education=EducationModel(sequelize, Sequelize);
const EducationCategory=EducationCategoryModel(sequelize, Sequelize);
const Questionaire=QuestionaireModel(sequelize, Sequelize);
const ReviewRequirement=ReviewRequirementModel(sequelize, Sequelize);
const Specialty=SpecialtyModel(sequelize, Sequelize);
const WorkHistory=WorkHistoryModel(sequelize, Sequelize);


Attachment.belongsTo(Application, {foreignKey: 'Application_idApplication'});
Application.hasMany(Attachment, {foreignKey: 'Application_idApplication'});
ApplicationReview.belongsTo(Application, {foreignKey: 'Application_idApplication'});
Application.hasMany(ApplicationReview, {foreignKey: 'Application_idApplication'});
Application.belongsTo(ApplicationForm, {foreignKey: 'ApplicationForm_type'});
ApplicationForm.hasMany(Application, {foreignKey: 'ApplicationForm_type'});

Application.belongsTo(Applicant,{foreignKey: 'Applicant_id'});
Applicant.hasMany(Application,{ foreignKey: 'Applicant_id' });
ContinuingEducation.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasMany(ContinuingEducation,{ foreignKey: 'Applicant_userid' });
AreaOfPractice.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasMany(AreaOfPractice,{ foreignKey: 'Applicant_userid' });
ApplicantQuestionaire.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasOne(ApplicantQuestionaire,{ foreignKey: 'Applicant_userid' });
Education.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasMany(Education,{ foreignKey: 'Applicant_userid' });
Specialty.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasMany(Specialty,{ foreignKey: 'Applicant_userid' });
WorkHistory.belongsTo(Applicant,{foreignKey: 'Applicant_userid'});
Applicant.hasMany(WorkHistory,{ foreignKey: 'Applicant_userid' });


ApplicantQuestionaire.belongsTo(Questionaire,{foreignKey: 'Questionaire_questionno'});
Questionaire.hasOne(ApplicantQuestionaire,{ foreignKey: 'Questionaire_questionno' });

ReviewRequirement.belongsTo(ApplicationForm,{foreignKey: 'ApplicationForm_type'});
ApplicationForm.hasMany(ReviewRequirement,{ foreignKey: 'ApplicationForm_type' });
AttachmentRequirements.belongsTo(ApplicationForm,{foreignKey: 'ApplicationForm_type'});
ApplicationForm.hasMany(AttachmentRequirements,{ foreignKey: 'ApplicationForm_type' });
AttachmentRequirements.belongsTo(ApplicationForm,{foreignKey: 'ApplicationForm_type'});
ApplicationForm.hasMany(AttachmentRequirements,{ foreignKey: 'ApplicationForm_type' });


ApplicationReview.belongsTo(ReviewRequirement,{foreignKey: 'ReviewRequirement_idReviewRequirement'});
ReviewRequirement.hasMany(ApplicationReview,{ foreignKey: 'ReviewRequirement_idReviewRequirement' });

ContinuingEducation.belongsTo(EducationCategory,{foreignKey: 'idEducationCategory'});
EducationCategory.hasMany(ContinuingEducation,{ foreignKey: 'idEducationCategory' });

sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Mysql connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

module.exports = {Application,Applicant,ApplicantQuestionaire,ApplicationForm,ApplicationReview,AreaOfPractice,Attachment,AttachmentRequirements,ContinuingEducation,Education,EducationCategory,Questionaire,ReviewRequirement,Specialty,WorkHistory};