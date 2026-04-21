'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
          <div className="text-4xl mb-4">😔</div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">عذراً، حدث خطأ غير متوقع</h3>
          <p className="text-stone-500 text-sm mb-4">نعمل على إصلاح المشكلة قريباً</p>
          <button
            onClick={this.handleRetry}
            className="px-6 py-2 bg-amber-700 text-white rounded-lg font-semibold text-sm hover:bg-amber-800 transition-colors"
          >
            المحاولة مرة أخرى
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}