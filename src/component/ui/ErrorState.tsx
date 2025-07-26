export default function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Kami tidak dapat memuat data. Silakan coba lagi nanti.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="alert alert-error flex flex-col items-center gap-2 p-6 shadow-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-primary mt-2">
          Coba Lagi
        </button>
      )}
    </div>
  );
}
