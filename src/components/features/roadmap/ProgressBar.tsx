interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
}

export default function ProgressBar({
  progress,
  color = "#4CAF50",
}: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
