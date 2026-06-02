import { useEffect } from "react";

const ConfirmModal = ({
  isOpen,
  title = "Confirmação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel
}) => {


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onCancel}
      ></div>


      <div className="relative bg-white w-full max-w-[420px] rounded-[24px] shadow-2xl p-6 sm:p-8 flex flex-col gap-5 border border-black/5 animate-in fade-in zoom-in-95 duration-200">


        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="font-serif text-[18px] sm:text-[20px] font-extrabold text-black leading-tight">
            {title}
          </h2>
        </div>


        <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed font-semibold">
          {message}
        </p>


        <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 h-[40px] rounded-full text-[13px] font-bold bg-neutral-100 text-black/60 hover:bg-neutral-200 transition-colors border-none outline-none cursor-pointer active:scale-97 select-none"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 h-[40px] rounded-full text-[13px] font-bold bg-[#C13D33] text-white hover:bg-[#a53229] transition-colors border-none outline-none cursor-pointer active:scale-97 select-none"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
