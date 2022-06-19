import { MailAdapter } from "../../adapters/mail.adapter";
import { FeedbackRepository } from "../feedbacksRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;
    if (!type) {
      throw new Error("Type required");
    }
    if (!comment) {
      throw new Error("Comment required");
    }
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot invalid");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `${screenshot && `<img src='${screenshot}' alt='imagem feedback'/>`}`,
      ].join("\n"),
    });
  }
}
