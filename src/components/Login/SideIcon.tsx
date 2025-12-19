import icon from "../../assets/wtech-logo-yellow.png";
import name from "../../assets/wtech-name.png";

export function SideIcon() {
  return (
    <div className="bg-[#05478A] w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-4">
        <img src={icon} alt="Wtech ícone" className="w-16 md:w-20" />
        <img src={name} alt="Wtech name" className="w-32 md:w-44" />
      </div>
    </div>
  );
}
