interface LoginErrorProps {
  onClose: () => void;
}

export function LoginError({ onClose }: LoginErrorProps) {
  return (
    <div className="relative bg-[#FF8A29] text-white p-5 pr-8 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
      <button onClick={onClose}>
        <div className="absolute -top-6 left-4 bg-[#B24118] w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-md">
          <span className="text-2xl font-bold leading-none select-none">X</span>
        </div>
      </button>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white/90 hover:text-white transition-colors"
      >
        <span className="text-lg">X</span>
      </button>
      <div className="ml-12 mt-2">
        <h3 className="font-extrabold text-xl leading-tight">Ops!</h3>
        <p className="text-[13px] font-medium leading-snug">
          Não conseguimos identificar sua conta.
        </p>
      </div>
      <div className="absolute bottom-3 left-3 w-6 h-6 bg-[#B24118]/30 rounded-full" />
      <div className="absolute bottom-6 left-10 w-3 h-3 bg-[#B24118]/30 rounded-full" />
      <div className="absolute top-8 left-2 w-2 h-2 bg-[#B24118]/30 rounded-full" />
    </div>
  );
}
