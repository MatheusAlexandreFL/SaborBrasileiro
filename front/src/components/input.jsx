const Input = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col w-full gap-1"> 
      
      <label className="text-[#000000]/60 text-[16px] text-normal">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
className="w-full h-[44px] border-none outline-none rounded-[8px] bg-[#F5E6CA]/40 px-4 focus:ring-2 focus:ring-[#C13D33]/60 transition-all"      />

    </div>
  );
};  export default Input;

