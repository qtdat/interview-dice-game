import CircularProgress from '@mui/material/CircularProgress';

import { MuiColorType } from '@/libs/core-types';

type BaseLoadingProps = {
  size: string | number | undefined;
  color: MuiColorType;
};

const InlineLoading = ({ size, color }: BaseLoadingProps) => <CircularProgress size={size} color={color} />;

const NormalLoading = ({ size, color }: BaseLoadingProps) => (
  <div className='text-center text-blue'>
    <CircularProgress size={size} color={color} />
  </div>
);

type ShowLoadingProps = {
  show?: boolean,
  inline?: boolean,
  size?: string | number,
  className?: string,
  color?: MuiColorType,
}

export default function ShowLoading({ show = true, inline = false, size = '1em', color = 'secondary' }: ShowLoadingProps) {
  if (!show) {
    return null;
  }

  if (inline) {
    return <InlineLoading size={size} color={color} />;
  }

  return <NormalLoading size={size} color={color} />;
}
