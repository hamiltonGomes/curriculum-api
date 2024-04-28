const getPersonalInformation = (sequelize, { DataTypes }) => {
    const PersonalInformation = sequelize.define("personal_information", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        full_name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        position: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        city: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        state: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        country: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });

    PersonalInformation.associate = (models) => {
        PersonalInformation.belongsTo(models.Curriculum);
    }
    
    PersonalInformation.findByEmail = async (user) => {
        let personalInformation =  await PersonalInformation.findOne({
            where:  {email: user},
        });

        return personalInformation;
    }
    return PersonalInformation;
}

export default getPersonalInformation;