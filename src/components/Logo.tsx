import { BookOpen } from "lucide-react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <BookOpen className="text-blue-600" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-xs">RW</span>
      </div>
    </div>
  );
}
