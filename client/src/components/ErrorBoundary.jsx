import { Component } from "react";
import { AlertTriangle } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(
      "ErrorBoundary caught a render error:",
      error,
      info?.componentStack,
    );
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback)
        return this.props.fallback(this.state.error, this.handleReset);
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-7 w-7 text-red-500" />
            </div>
            <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
              This part of the page hit an unexpected error. Your data is safe —
              try reloading this section.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-5 px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-medium hover:bg-primary-800 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;