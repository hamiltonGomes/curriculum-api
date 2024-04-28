import express from "express";
import "dotenv/config";
import models, { sequelize } from "./database/config";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use("/personalInformation", routes.personalInformation);
app.use("/curriculum", routes.curriculum);
app.use("/professionalExperience", routes.professionalExperience);
app.use("/academicFormation", routes.academicFormation);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC;

sequelize.sync({ force: eraseDatabaseOnSync });

app.get("/", (req, res) => {
  res.send("Curriculum API is working!");
});

app.listen(port, () => {
  console.log(`Curriculum API listen on port ${port}`);
});
