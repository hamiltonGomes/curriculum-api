import "dotenv/config";
import { Sequelize } from "sequelize";
import getPersonalInformation from "./personalInformationDatabase";
import getCurriculum from "./curriculumDatabase";
import getProfessionalExperience from "./professionalExperienceDatabase";
import getAcademicFormation from "./academicFormationDatabase";

const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(name, user, password, {
  dialect: "postgres",
  host: host,
});

const models = {
  PersonalInformation: getPersonalInformation(sequelize, Sequelize),
  Curriculum: getCurriculum(sequelize, Sequelize),
  ProfessionalExperience: getProfessionalExperience(sequelize, Sequelize),
  AcademicFormation: getAcademicFormation(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export default models;
export { sequelize };
