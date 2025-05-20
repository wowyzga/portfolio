
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as fs from 'fs';
import * as path from 'path';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
