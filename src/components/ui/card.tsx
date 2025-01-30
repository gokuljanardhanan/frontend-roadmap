interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

export default function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles = "rounded-lg transition-all duration-200";

  const variants = {
    default:
      "bg-white dark:bg-gray-800 text-gray-900 shadow-md dark:text-gray-100",
    elevated:
      "bg-white dark:bg-gray-800 text-gray-900 shadow-xl hover:shadow-2xl dark:text-gray-100",
    outlined:
      "border-2 border-gray-200 bg-white dark:bg-gray-800 text-gray-900 dark:border-gray-700 dark:text-gray-100",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
