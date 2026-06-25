import { useRef, useState } from "react";
import {
  Upload,
  ScanSearch,
  X,
  AlertTriangle,
  ShieldCheck,
  Loader2,
  Bookmark,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Alert } from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";
import { detectCropDisease } from "../services/aiService";
import { useToast } from "../context/ToastContext";
import { useBookmarks } from "../context/BookmarksContext";
import { cn } from "../utils/helpers";

export default function DiseaseDetection() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const { addToast } = useToast();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleFile = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      addToast("Please upload a valid image file.", "error");
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const data = await detectCropDisease(file);
    setResult(data);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleBookmark = () => {
    if (!result) return;
    const added = toggleBookmark({
      id: `disease-${result.id}`,
      type: "disease",
      title: result.disease,
      summary: `${result.crop} — ${result.confidence}% confidence, ${result.severity} severity. ${result.remedies[0]}`,
      tags: [result.crop, `${result.confidence}% confidence`],
      sourcePath: "/disease-detection",
    });
    addToast(
      added ? "Saved to bookmarks." : "Removed from bookmarks.",
      added ? "success" : "info",
    );
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Alert type="info">
        Upload a clear, well-lit photo of the affected leaf, stem, or fruit for
        the most accurate analysis.
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload area */}
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
            Upload Crop Image
          </h3>

          {!preview ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl py-16 px-6 cursor-pointer transition-colors ${
                dragActive
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30"
                  : "border-gray-300 dark:border-gray-700 hover:border-primary-300"
              }`}
            >
              <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary-700 dark:text-secondary-400" />
              </div>
              <p className="text-sm font-medium text-ink dark:text-gray-100">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Uploaded crop preview"
                className="w-full h-72 object-cover rounded-2xl"
              />
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-soft"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}

          {preview && !result && (
            <Button
              fullWidth
              size="lg"
              className="mt-5"
              icon={isAnalyzing ? undefined : ScanSearch}
              isLoading={isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? "Analyzing image..." : "Analyze Image"}
            </Button>
          )}
        </div>

        {/* Result */}
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
            Analysis Result
          </h3>

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 className="h-8 w-8 text-primary-600 animate-spin mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Examining leaf patterns and symptoms...
              </p>
            </div>
          )}

          {!isAnalyzing && !result && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
              <ScanSearch className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">
                Upload and analyze an image to see results here.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-fadeUp">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                    Detected crop
                  </p>
                  <p className="text-sm font-medium text-ink dark:text-gray-100 mt-0.5">
                    {result.crop}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={result.severity === "High" ? "red" : "earth"}>
                    <AlertTriangle className="h-3 w-3" /> {result.severity}{" "}
                    severity
                  </Badge>
                  <button
                    onClick={handleBookmark}
                    aria-label={
                      isBookmarked(`disease-${result.id}`)
                        ? "Remove bookmark"
                        : "Save to bookmarks"
                    }
                    aria-pressed={isBookmarked(`disease-${result.id}`)}
                    className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center transition-colors",
                      isBookmarked(`disease-${result.id}`)
                        ? "text-secondary-600 dark:text-secondary-400"
                        : "text-gray-300 hover:text-primary-600 dark:text-gray-600 dark:hover:text-primary-400",
                    )}
                  >
                    <Bookmark
                      className={cn(
                        "h-4 w-4",
                        isBookmarked(`disease-${result.id}`) && "fill-current",
                      )}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
                  {result.disease}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-secondary-500 rounded-full transition-all duration-700"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono font-semibold text-ink dark:text-gray-100">
                    {result.confidence}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Confidence score</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  Possible causes
                </p>
                <ul className="space-y-1.5">
                  {result.causes.map((c, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-400 flex gap-2"
                    >
                      <span className="text-accent-500">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary-50 dark:bg-secondary-950/30 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary-700 dark:text-secondary-400 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" /> Recommended remedies
                </p>
                <ul className="space-y-1.5">
                  {result.remedies.map((r, i) => (
                    <li
                      key={i}
                      className="text-sm text-ink dark:text-gray-100 flex gap-2"
                    >
                      <span className="text-secondary-600">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
