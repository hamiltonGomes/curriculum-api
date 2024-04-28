import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const professionalExperience =
      await req.context.models.ProfessionalExperience.findAll();

    professionalExperience.length > 0
      ? res.send(professionalExperience)
      : res.status(404).send({
          status: 404,
          message: "No professional experience found.",
        });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const professionalExperience =
      await req.context.models.ProfessionalExperience.create({
        description: req.body.description,
        curriculumId: req.params.id,
      });

    return res.send(professionalExperience);
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const professionalExperience =
      await req.context.models.ProfessionalExperience.findByPk(req.params.id);
    professionalExperience.update({
      description: req.body.description,
    });

    res.send(professionalExperience);
  } catch (err) {
    return res.status(404).send({
      status: 404,
      message: `The resource with ID: ${req.params.id} could not be found in our database. Please verify the ID is correct and try again.`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const professionalExperience =
      await req.context.models.ProfessionalExperience.findByPk(req.params.id);

    professionalExperience.destroy();

    return res.status(204).send(professionalExperience);
  } catch (err) {
    return res.status(404).send({
      status: 404,
      message: `The resource with ID: ${req.params.id} could not be found in our database. Please verify the ID is correct and try again.`,
    });
  }
});

export default router;
