const getAcademicFormation = (sequelize, {DataTypes}) => {
    const AcademicFormation = sequelize.define("academic_formations", {
        course_name: {
            type: DataTypes.STRING,
        },
        institution: {
            type: DataTypes.STRING,
        },
        start_year: {
            type: DataTypes.STRING,
        },
        end_year: {
            type: DataTypes.STRING,
        },
    });

    AcademicFormation.associate = (models) => {
        AcademicFormation.belongsTo(models.Curriculum);
    }

    return AcademicFormation;
}

export default getAcademicFormation;