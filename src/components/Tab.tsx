import cn from '../lib/cn';

interface TabProps extends React.PropsWithChildren {
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Tab({ children, isSelected, onClick }: TabProps) {
  return (
    <div
      className={cn(
        'py-1 px-3 rounded cursor-pointer select-none',
        isSelected && 'bg-gray-100 text-black shadow-sm'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
