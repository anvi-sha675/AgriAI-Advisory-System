import { useState } from "react";
import { Mail, Lock, Search, ArrowRight, Trash2, Sparkles } from "lucide-react";
import { Button, Input, Modal, Loader } from "../components/ui";
import { CardSkeleton } from "../components/ui/Skeleton";
import { useToast } from "../context/ToastContext";

export default function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const { addToast } = useToast();

  const simulateLoading = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 1800);
  };

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink dark:text-gray-100">Component Library Showcase</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
          A live demo of the five core components in <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">src/components/ui/</code>:
          Button, Input, Modal, Toast, and Loader.
        </p>
      </div>

      {/* Button */}
      <section className="card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">Button</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Accent</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button icon={ArrowRight} iconPosition="right">With icon</Button>
          <Button isLoading>Loading state</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Input */}
      <section className="card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">Input</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input id="showcase-email" label="Email address" icon={Mail} placeholder="you@example.com" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Input id="showcase-password" label="Password" icon={Lock} type="password" placeholder="••••••••" />
          <Input id="showcase-search" label="Search (no icon variant)" placeholder="Search crops..." />
          <Input id="showcase-error" label="With validation error" icon={Search} placeholder="Required field" error="This field is required" />
        </div>
      </section>

      {/* Modal */}
      <section className="card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">Modal</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Click to open a dialog. Closes via Escape, backdrop click, or the buttons inside.</p>
        <Button onClick={() => setModalOpen(true)} icon={Trash2}>Open Modal</Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example confirmation" size="sm">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is the Modal component, rendered with a title and arbitrary children.
          </p>
          <div className="flex gap-3 mt-6">
            <Button variant="ghost" fullWidth onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" fullWidth onClick={() => { setModalOpen(false); addToast("Confirmed from the showcase modal.", "success"); }}>
              Confirm
            </Button>
          </div>
        </Modal>
      </section>

      {/* Toast */}
      <section className="card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">Toast</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Toasts are triggered via the <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">useToast()</code> hook
          and rendered globally — click a button to fire one.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => addToast("Saved successfully.", "success")}>Trigger success toast</Button>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => addToast("Something went wrong.", "error")}>
            Trigger error toast
          </Button>
          <Button variant="ghost" onClick={() => addToast("Here's some information.", "info")}>Trigger info toast</Button>
        </div>
      </section>

      {/* Loader */}
      <section className="card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">Loader</h3>
        <div className="grid sm:grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Spinner sizes</p>
            <div className="flex items-center gap-6">
              <Loader size="sm" />
              <Loader size="md" label="Loading..." />
              <Loader size="lg" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Triggered loading state (also demos <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">CardSkeleton</code>, a related primitive in the same folder)
            </p>
            <Button icon={Sparkles} size="sm" onClick={simulateLoading} className="mb-3">Simulate 1.8s loading</Button>
            {showLoading ? <CardSkeleton /> : <div className="card p-5 text-sm text-gray-400">Loaded content would appear here.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
