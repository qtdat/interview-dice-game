import MuiButton from '@mui/material/Button';
import { Link } from 'react-router-dom';
import clsx, { ClassValue } from 'clsx';
import { useTranslation } from 'react-i18next';

import { onCallbackType, Dictionary, MuiColorType, MuiSizeType } from '@/libs/core-types';

export type ButtonProps = {
  name: string,
  label: string,
  onCallback: onCallbackType,
  key?: string | number,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'text' | 'outlined' | 'contained',
  color?: MuiColorType,
  size?: MuiSizeType,
  isLink?: boolean,
  to?: string,
  target?: '_blank' | '_self',
  params?: unknown,
  fullWidth?: boolean,
  forceCallback?: boolean,
  disabled?: boolean,
  className?: ClassValue,
  i18n?: boolean,
  i18nOptions?: Dictionary<string>,
};

export default function Button({
  name,
  label = '',
  onCallback,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  to = '',
  target = '_blank',
  isLink = false,
  params = {},
  fullWidth = false,
  forceCallback = false,
  disabled = false,
  className,
  i18n = true,
  i18nOptions = {},
}: ButtonProps) {
  const { t } = useTranslation('common');

  return (
    <MuiButton
      name={name}
      size={size}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      className={clsx(className ?? '')}
      type={type}
      onClick={() => {
        if (['submit', 'reset'].includes(type ?? '') || isLink) {
          if (forceCallback) {
            onCallback(name, params);
          }

          return true;
        }

        onCallback(name, params);
        return false;
      }}
      component={!isLink ? 'button' : Link}
      to={to}
      target={target}
      tabIndex={-1}
    >
      {i18n ? t(label, i18nOptions) : label}
    </MuiButton>
  );
}
