import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedbacks.create({
      data: { type, comment, screenshot },
    });
  }
}
