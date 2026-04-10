import type { HTMLAttributes } from 'react';

import './icon.css';

import { iconNames, type IconName } from './icon-names';

type IconProps = {
  name: IconName;
} & HTMLAttributes<HTMLSpanElement>;

type RawSvgModule = string | { default?: unknown };

const rawIconSvgs = import.meta.glob('./assets/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, RawSvgModule>;

function normalizeIconName(filePath: string) {
  const fileName = filePath.split('/').pop() ?? filePath;
  return fileName
    .replace(/\.svg$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function toSvgMarkup(svgModule: RawSvgModule) {
  if (typeof svgModule === 'string') {
    return svgModule;
  }

  if (typeof svgModule?.default === 'string') {
    return svgModule.default;
  }

  throw new Error('Expected an SVG asset to resolve to a raw string.');
}

function normalizeIconMarkup(svgMarkup: string) {
  return svgMarkup
    .replace(/\sfill="(?!none|currentColor|url\()[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none|currentColor|url\()[^"]*"/gi, ' stroke="currentColor"');
}

const iconMarkupByName = Object.fromEntries(
  Object.entries(rawIconSvgs).map(([filePath, svgModule]) => [
    normalizeIconName(filePath),
    normalizeIconMarkup(toSvgMarkup(svgModule)),
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
