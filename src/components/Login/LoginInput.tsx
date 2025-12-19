interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function LoginInput({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-500 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#F9F9F9] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#05478A]"
      />
    </div>
  );
}
