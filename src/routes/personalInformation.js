import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const personalInformation =
      await req.context.models.PersonalInformation.findAll();
    personalInformation.length > 0
      ? res.send(personalInformation)
      : res.status(404).send({ status: 404, message: "No data was found." });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const personalInformation =
      await req.context.models.PersonalInformation.create({
        email: req.body.email,
        full_name: req.body.full_name,
        position: req.body.position,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        curriculumId: req.params.id,
      });

    return res.send(personalInformation);
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personalInformation =
      await req.context.models.PersonalInformation.findByPk(req.params.id);
    personalInformation.update({
      email: req.body.email,
      full_name: req.body.full_name,
      position: req.body.position,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    });

    return res.send(personalInformation);
  } catch (err) {
    return res.status(404).send({
      status: 404,
      message: `The resource with ID: ${req.params.id} could not be found in our database. Please verify the ID is correct and try again.`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personalInformation =
      await req.context.models.PersonalInformation.findByPk(req.params.id);
    personalInformation.destroy();

    res.sendStatus(204);
  } catch (err) {
    return res.status(404).send({
      status: 404,
      message: `The resource with ID: ${req.params.id} could not be found in our database. Please verify the ID is correct and try again.`,
    });
  }
});

export default router;
