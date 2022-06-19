import { SubmitFeedbackService } from "./submitFeedback.service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Está tudo travado!",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "sdasdsada",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a feedback with an screenshot invalid", async () => {
    await expect(
      submitFeedback.execute({
        type: "saddas",
        comment: "ta tudo bugado",
        screenshot: "123",
      })
    ).rejects.toThrow();
  });
});
