import { createElement } from 'react';
type EmptyValueProps = {
  isP?: boolean
};

export default function EmptyValue(props: EmptyValueProps) {
  const { isP = false } = props;

  return createElement(
    isP ? 'p' : 'span',
    { className: 'text-gray italic', },
    '<empty>',
  );
}
