import { Router } from "express";

import { SubmitFeedbackService } from "./repositories/services/submitFeedback.service";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMail.adapter";

export const routes = Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedBackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );
  await submitFeedBackService.execute({
    type,
    comment,
    screenshot,
  });
  console.log("ok");
  return res.status(201).send();
});
