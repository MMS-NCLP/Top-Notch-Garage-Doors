import Link from 'next/link';

export default function LogoText({
  size = 'md',
  linked = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  linked?: boolean;
  className?: string;
}) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl lg:text-3xl',
    xl: 'text-3xl lg:text-4xl',
  };

  const content = (
    <span className={`font-hero tracking-wider ${sizeClasses[size]} ${className}`}>
      <span className="text-brand-blue">TOP-NOTCH</span>{' '}
      <span className="text-brand-red">GARAGE DOORS</span>
    </span>
  );

  if (linked) {
    return <Link href="/" className="inline-block hover:opacity-90 transition-opacity">{content}</Link>;
  }

  return content;
}
