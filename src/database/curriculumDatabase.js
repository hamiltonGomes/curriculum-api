const getCurriculum = (sequelize, { DataTypes }) => {
  const Curriculum = sequelize.define("curriculums");

  Curriculum.associate = (models) => {
    Curriculum.hasMany(models.ProfessionalExperience, { onDelete: "CASCADE" });
    Curriculum.hasOne(models.PersonalInformation, { onDelete: "CASCADE" });
    Curriculum.hasMany(models.AcademicFormation, { onDelete: "CASCADE" });
  };

  return Curriculum;
};

export default getCurriculum;
