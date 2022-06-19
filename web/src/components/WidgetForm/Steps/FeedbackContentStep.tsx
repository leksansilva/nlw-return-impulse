import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    api
      .post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot,
      })
      .then((response) => {
        if (response.status === 201) {
          setLoadingFeedback(false);
          onFeedbackSent();
        }
      })

      .catch((error) => {
        console.log(error);
        setLoadingFeedback(false);
      });
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackRestartRequested}
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          <span>{feedbackTypeInfo.title}</span>
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            screenshot={screenshot}
            onScreenShotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0 || loadingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center  text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {loadingFeedback ? <Loading /> : " Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
