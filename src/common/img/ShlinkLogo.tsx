import { brandColor } from '@shlinkio/shlink-frontend-kit';

export interface ShlinkLogoProps {
  color?: string;
  className?: string;
}

export const ShlinkLogo = ({ color = brandColor(), className }: ShlinkLogoProps) => (
  <svg className={className} viewBox="0 0 306.89 154.023" xmlns="http://www.w3.org/2000/svg">
    <g fill={color}>
      <rect width="47.086" height="96.12" transform="translate(0 57.903)"/>
      <rect width="45.221" height="154.023" transform="translate(103.899)"/>
      <rect width="45.221" height="154.023" transform="translate(155.873)"/>
      <rect width="48.231" height="27.803" transform="translate(50.194 57.894)"/>
      <rect width="48.231" height="27.803" transform="translate(50.194 92.052)"/>
      <rect width="48.231" height="27.803" transform="translate(50.194 126.22)"/>
      <rect width="47.086" height="96.12" transform="translate(208.464 57.903)"/>
      <rect width="48.231" height="27.803" transform="translate(258.658 57.893)"/>
      <rect width="48.231" height="27.803" transform="translate(258.658 92.052)"/>
      <rect width="48.231" height="27.803" transform="translate(258.658 126.22)"/>
    </g>
  </svg>
);
