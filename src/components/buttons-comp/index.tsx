import clsx, { ClassValue } from 'clsx';

import Button from './Button';
import DropdownButton from './DropdownButton';
import type { onCallbackType } from '@/libs/core-types';

type ItemType = {
  [k: string]: unknown,
  name: string,
  visible?: boolean,
  isDropdown?: boolean,
  disabled?: boolean,
  label?: string,
};

type AlignType = 'start' | 'end' | 'center';

export type ButtonsCompProps = {
  items: ItemType[],
  onCallback: onCallbackType,
  align?: AlignType,
  fullWidth?: boolean,
  className?: ClassValue,
  disabledAll?: boolean,
  size?: 'small' | 'medium' | 'large',
  gap?: 4 | 8 | 16,
};

const gapClassName = (gap: number, { align, order }: { align: AlignType, order: AlignType }) => {
  if (align === 'center') {
    return `mx-${gap}`;
  }

  switch (align) {
    case 'start':
      return order !== 'start' ? `mx-${gap}` : '';
    default: // end
      return order !== 'end' ? `mx-${gap}` : '';
  }
};

export default function ButtonsComp({
  items,
  onCallback,
  align = 'center',
  fullWidth = false,
  className,
  disabledAll = false,
  size = 'medium',
  gap,
}: ButtonsCompProps) {
  return (
    <div className={clsx('flex flex-wrap', `justify-${align}`, [fullWidth && 'flex-col'], className ?? '')}>
      {items.map((item, idx) => {
        const { visible = true, isDropdown = false, ...rest } = item;

        if (!visible) {
          return null;
        }

        const props = {
          ...rest,
          name: item.name!,
          onCallback,
          disabled: disabledAll || item.disabled,
          fullWidth,
          size,
        };

        if (!isDropdown && gap) {
          const gapOpts: { align: AlignType, order: AlignType } = {
            align,
            order: idx === 0 ? 'start' : (idx + 1 === items.length ? 'end' : 'center'),
          };
          Object.assign(props, { className: clsx(gapClassName(gap, gapOpts), rest.className || '') });
        }

        return isDropdown
          ? <DropdownButton {...props} key={item.name!} />
          : <Button {...props} key={item.name!} label={`${rest.label!}`} />
        ;
      })}
    </div>
  );
}
