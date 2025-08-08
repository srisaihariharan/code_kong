import React from 'react';

interface ErrorBoundaryState { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In future: send to observability/logging service
    console.error('UI Error Boundary caught error', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 border border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">An unexpected error occurred. You can try reloading the application.</p>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="text-xs overflow-auto max-h-40 p-2 bg-gray-100 dark:bg-gray-900 rounded text-red-600">
                {this.state.error.message}\n{this.state.error.stack}
              </pre>
            )}
            <button onClick={this.handleReload} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
