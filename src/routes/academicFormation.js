import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const academicFormation =
      await req.context.models.AcademicFormation.findAll();

    academicFormation.length > 0
      ? res.send(academicFormation)
      : res
          .status(404)
          .send({ status: 404, message: "No data was found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const academicFormation = await req.context.models.AcademicFormation.create(
      {
        course_name: req.body.course_name,
        institution: req.body.institution,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        curriculumId: req.params.id,
      }
    );

    return res.send(academicFormation);
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const academicFormation =
      await req.context.models.AcademicFormation.findByPk(req.params.id);
    academicFormation.update({
      course_name: req.body.course_name,
      institution: req.body.institution,
      start_year: req.body.start_year,
      end_year: req.body.end_year,
    });

    return res.send(academicFormation);
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const academicFormation =
      await req.context.models.AcademicFormation.findByPk(req.params.id);
    academicFormation.destroy();

    res.sendStatus(204);
  } catch (err) {
    return res.status(404).send({
      status: 404,
      message: `The resource with ID: ${req.params.id} could not be found in our database. Please verify the ID is correct and try again.`,
    });
  }
});

export default router;
