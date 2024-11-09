import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import clsx, { ClassValue } from 'clsx';
import { useTranslation } from 'react-i18next';

import { onCallbackType, Dictionary, MuiColorType, MuiSizeType } from '@/libs/core-types';

type ItemType = {
  action: string,
  label: string,
  key?: string,
  id?: string,
  params?: unknown,
  disabled?: boolean,
  visible?: boolean,
  sx?: object,
  isLink?: boolean,
  to?: string,
  target?: '_blank' | '_self',
  i18n?: boolean,
  i18nOptions?: Dictionary<string>,
};

type MenuItemType = ItemType & { onCallback: onCallbackType };

const MenuItem = ({
  action,
  label,
  disabled = false,
  sx = {},
  params = {},
  isLink = false,
  to = '#',
  target = '_self',
  i18n = true,
  i18nOptions = {},
  onCallback,
}: MenuItemType) => {
  const { t } = useTranslation('common');

  const myLabel = i18n ? t(label, i18nOptions) : label;

  return (
    <MuiMenuItem
      disabled={disabled}
      sx={sx}
      onClick={() => {
        if (!isLink) {
          onCallback(action, params);
        }
      }}
    >
      {!isLink ? myLabel : <Link target={target} to={to}>{myLabel}</Link>}
    </MuiMenuItem>
  );
}

export type DropdownButtonProps = {
  name: string,
  onCallback: onCallbackType,
  items?: ItemType[],
  key?: string | number,
  color?: MuiColorType,
  size?: MuiSizeType,
  disabled?: boolean,
  className?: ClassValue,
  fullWidth?: boolean,
};

export default function DropdownButton({
  name,
  items = [],
  onCallback,
  color = 'primary',
  size = 'medium',
  disabled = false,
  className,
  fullWidth = false,
}: DropdownButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (!event) {
      return;
    }

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={clsx(fullWidth ? 'text-center' : '', className ?? '')}>
      <IconButton
        aria-label={`${name}-dropdown-icon`}
        color={color}
        size={size}
        disabled={disabled}
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id={name}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {(items ?? [])
          .filter(({ visible = true }) => visible)
          .map((props) => (
            <MenuItem
              {...props}
              key={props?.id || props.action}
              onCallback={(subAction, subParams) => {
                handleClose();
                onCallback(subAction, subParams);
              }}
            />
          ))}
      </Menu>
    </div>
  );
}