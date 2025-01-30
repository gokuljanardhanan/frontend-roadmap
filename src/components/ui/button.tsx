export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
