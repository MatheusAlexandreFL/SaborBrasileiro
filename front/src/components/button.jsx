import imgSeta from "../assets/seta.png";
const Button = ({ text, onClick }) => {
  return (
    <button 
      type="submit" 
      className="w-full h-[44px] bg-[#C13D33] text-[#ffffff] text-[16px] rounded-[8px] mt-[40px] border-none outline-none cursor-pointer flex items-center justify-center gap-[5px] hover:bg-[#a53229] transition-colors"
    > {text}
    <img 
        src={imgSeta} 
        alt="Seta" 
        className="w-[16px] h-[16px] object-contain" 
      />
    </button>
  );
}; export default Button;
  
