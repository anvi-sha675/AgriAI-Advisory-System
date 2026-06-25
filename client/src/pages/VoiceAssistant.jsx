import { useState } from "react";
import { Mic, Volume2, VolumeX, Sparkles, Square } from "lucide-react";
import { transcribeVoice, sendChatMessage } from "../services/aiService";
import { cn } from "../utils/helpers";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useToast } from "../context/ToastContext";

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState(null);
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const { addToast } = useToast();

  const handleRecordToggle = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      const text = await transcribeVoice();
      setTranscript(text);
      const aiResponse = await sendChatMessage(text);
      setResponse(aiResponse);
      setIsProcessing(false);
    } else {
      setIsRecording(true);
      setResponse(null);
      setTranscript("");
    }
  };

  const handlePlayResponse = () => {
    if (!isSupported) {
      addToast("Read-aloud isn't supported in this browser.", "error");
      return;
    }
    if (isSpeaking) {
      stop();
      return;
    }
    const parts = [
      response.reply,
      ...(response.treatment?.length ? response.treatment : []),
    ];
    speak(parts.filter(Boolean).join(". "));
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center text-center py-6">
      <span className="section-eyebrow mb-3">Voice Assistant</span>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
        Speak your farming question
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        Tap the microphone and ask in your own language. No typing needed.
      </p>

      <div className="relative my-12">
        {isRecording && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary-400/40 animate-ping" />
            <span className="absolute -inset-4 rounded-full bg-primary-400/20 animate-pulseSoft" />
          </>
        )}
        <button
          onClick={handleRecordToggle}
          disabled={isProcessing}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
          className={cn(
            "relative h-28 w-28 rounded-full flex items-center justify-center shadow-lift transition-all duration-300",
            isRecording
              ? "bg-red-500 scale-105"
              : "bg-primary-700 hover:bg-primary-800",
          )}
        >
          {isRecording ? (
            <Square className="h-9 w-9 text-white" />
          ) : (
            <Mic className="h-10 w-10 text-white" />
          )}
        </button>
      </div>

      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
        {isProcessing
          ? "Processing your question..."
          : isRecording
            ? "Listening... tap to stop"
            : "Tap to start speaking"}
      </p>

      <div className="w-full space-y-4">
        {transcript && (
          <div className="card p-5 text-left animate-fadeUp">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Transcript
            </p>
            <p className="text-sm text-ink dark:text-gray-100">{transcript}</p>
          </div>
        )}

        {isProcessing && (
          <div className="card p-5 flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-secondary-500 animate-pulseSoft" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AgriAI is thinking...
            </p>
          </div>
        )}

        {response && !isProcessing && (
          <div className="card p-5 text-left animate-fadeUp">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                AI Response
              </p>
              <button
                onClick={handlePlayResponse}
                className="text-gray-400 hover:text-primary-700 dark:hover:text-secondary-400"
                aria-label={
                  isSpeaking ? "Stop reading aloud" : "Play response aloud"
                }
                aria-pressed={isSpeaking}
              >
                {isSpeaking ? (
                  <VolumeX className="h-4 w-4 text-primary-700 dark:text-secondary-400" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-sm text-ink dark:text-gray-100 leading-relaxed">
              {response.reply}
            </p>
            {response.treatment?.length > 0 && (
              <ul className="mt-3 space-y-1">
                {response.treatment.slice(0, 3).map((t, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5"
                  >
                    <span className="text-accent-500">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
