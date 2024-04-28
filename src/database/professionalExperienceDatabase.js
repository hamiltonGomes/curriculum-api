const getProfessionalExperience = (sequelize, { DataTypes }) => {
    const ProfessionalExperience = sequelize.define("professional_experiences", {
        description: {
            type: DataTypes.STRING,
        }
    });

    ProfessionalExperience.associate = (models) => {
        ProfessionalExperience.belongsTo(models.Curriculum);
    }

    return ProfessionalExperience;
}

export default getProfessionalExperience;