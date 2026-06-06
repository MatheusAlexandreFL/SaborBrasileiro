import React, { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastItem = ({ id, message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);


  const isSuccess = type === "success";
  const isWarning = type === "warning";
  const isError = type === "error";

  let bgClass = "bg-white/95 border-neutral-200/50";
  let iconColor = "text-emerald-500";
  let barColor = "bg-emerald-500";
  let icon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );

  if (isWarning) {
    bgClass = "bg-white/95 border-amber-200/50";
    iconColor = "text-amber-500";
    barColor = "bg-amber-500";
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    );
  } else if (isError) {
    bgClass = "bg-white/95 border-rose-200/50";
    iconColor = "text-rose-500";
    barColor = "bg-rose-500";
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    );
  }

  return (
    <div
      className={`relative w-80 sm:w-96 rounded-[16px] border shadow-2xl p-4 flex gap-3 backdrop-blur-md transition-all duration-350 animate-toast-slide-in hover:scale-[1.02] ${bgClass}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 ${iconColor}`}>
        {icon}
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0 pr-4">
        <span className="text-[14px] text-neutral-800 font-sans font-semibold leading-snug break-words">
          {message}
        </span>
      </div>

      <button
        onClick={() => onClose(id)}
        className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer border-none bg-transparent p-0 outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>


      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 rounded-b-[16px] overflow-hidden">
        <div
          className={`h-full ${barColor} animate-toast-progress`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  const toast = {
    success: (msg, dur) => addToast(msg, "success", dur),
    warning: (msg, dur) => addToast(msg, "warning", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="fixed top-6 right-6 flex flex-col gap-3 pointer-events-none"
        style={{ zIndex: 9999, pointerEvents: 'none' }}
      >
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            {...t}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
