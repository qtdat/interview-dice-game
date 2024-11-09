import clsx from 'clsx';

type AwesomeProp = {
  value: string;
  className?: string;
  title?: string;
};

export default function Awesome({ value, className, title }: AwesomeProp) {
  return (
    <span title={title} className={clsx(className, title && 'cursor-help')}>
      <i className={value} />
    </span>
  );
}
