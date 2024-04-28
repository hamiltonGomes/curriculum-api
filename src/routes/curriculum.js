import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const curriculum = await req.context.models.Curriculum.findAll({
      include: [
        req.context.models.PersonalInformation,
        req.context.models.ProfessionalExperience,
        req.context.models.AcademicFormation,
      ],
    });

    curriculum.length > 0
      ? res.send(curriculum)
      : res.status(404).send({ status: 404, message: "No curriculum found!" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const curriculum = await req.context.models.Curriculum.findOne({
      where: { id: req.params.id },
      include: [
        req.context.models.PersonalInformation,
        req.context.models.ProfessionalExperience,
        req.context.models.AcademicFormation,
      ],
    });

    curriculum !== null
      ? res.send(curriculum)
      : res.status(404).send({ status: 404, message: "No curriculum found!" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const curriculum = await req.context.models.Curriculum.create();

    const personalInformation =
      await req.context.models.PersonalInformation.create({
        email: req.body.personalInformation.email,
        full_name: req.body.personalInformation.full_name,
        position: req.body.personalInformation.position,
        city: req.body.personalInformation.city,
        state: req.body.personalInformation.state,
        country: req.body.personalInformation.country,
        curriculumId: curriculum.id,
      });

    req.body.professionalExperience.forEach(async (experience) => {
      await req.context.models.ProfessionalExperience.create({
        description: experience.description,
        curriculumId: curriculum.id,
      });
    });

    req.body.academicFormation.forEach(async (academicFormation) => {
      await req.context.models.AcademicFormation.create({
        course_name: academicFormation.course_name,
        institution: academicFormation.institution,
        start_year: academicFormation.start_year,
        end_year: academicFormation.end_year,
        curriculumId: curriculum.id,
      });
    });

    res.send(curriculum);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const curriculum = await req.context.models.Curriculum.findByPk(
      req.params.id
    );
    curriculum.destroy();

    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
