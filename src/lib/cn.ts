export default function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}
