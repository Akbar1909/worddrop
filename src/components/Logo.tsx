import { BookOpen } from "lucide-react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <BookOpen className="text-white" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-blue-600 font-bold text-xs">CW</span>
      </div>
    </div>
  );
}
