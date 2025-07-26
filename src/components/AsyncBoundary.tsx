import { ErrorBoundary, ErrorBoundaryProps } from "@sentry/react";
import {
  ComponentProps,
  forwardRef,
  Ref,
  Suspense,
  SuspenseProps,
  useImperativeHandle,
  useRef,
} from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorFallback } from "./ErrorFallback";

type Props = Omit<SuspenseProps, "fallback"> &
  Omit<ErrorBoundaryProps, "fallback"> & {
    rejectedFallback?: ComponentProps<typeof ErrorBoundary>["fallback"];
    pendingFallback?: ComponentProps<typeof Suspense>["fallback"];
    loadingText?: string;
  };

interface ResetRef {
  reset?(): void;
}

const AsyncBoundary = forwardRef(
  (
    {
      pendingFallback,
      rejectedFallback,
      loadingText,
      children,
      ...errorBoundaryProps
    }: Props,
    resetRef: Ref<ResetRef>
  ) => {
    const ref = useRef<ErrorBoundary | null>(null);

    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }));

    return (
      <ErrorBoundary
        ref={ref}
        {...errorBoundaryProps}
        fallback={rejectedFallback ?? ErrorFallback}
      >
        <Suspense fallback={pendingFallback ?? <LoadingSpinner text={loadingText} />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    );
  }
);

export default AsyncBoundary;
