import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Tailwind 클래스는 덮어쓰기가 안 되므로 cn 함수를 사용하여 우선순위지정
