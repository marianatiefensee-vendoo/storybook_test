import type { HTMLAttributes } from 'react';

import './icon.css';

import { iconNames, type IconName } from './icon-names';

type IconProps = {
  name: IconName;
} & HTMLAttributes<HTMLSpanElement>;

const rawIconSvgs = import.meta.glob('./assets/*.svg', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

function normalizeIconName(filePath: string) {
  const fileName = filePath.split('/').pop() ?? filePath;
  return fileName
    .replace(/\.svg$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeIconMarkup(svgMarkup: string) {
  return svgMarkup
    .replace(/\sfill="(?!none|currentColor|url\()[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none|currentColor|url\()[^"]*"/gi, ' stroke="currentColor"');
}

const iconMarkupByName = Object.fromEntries(
  Object.entries(rawIconSvgs).map(([filePath, svgMarkup]) => [
    normalizeIconName(filePath),
    normalizeIconMarkup(svgMarkup),
  ]),
) as Record<IconName, string>;

const missingIcons = iconNames.filter((name) => !(name in iconMarkupByName));

if (missingIcons.length > 0) {
  throw new Error(`Missing icon assets: ${missingIcons.join(', ')}`);
}

export function Icon({ name, className, ...spanProps }: IconProps) {
  return (
    <span
      className={['icon', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...spanProps}
      dangerouslySetInnerHTML={{ __html: iconMarkupByName[name] }}
    />
  );
}
