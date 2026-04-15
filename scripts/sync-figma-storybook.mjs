#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultStoryRoots = ['src', 'taskbox/src'];
const storyFilePattern = /\.stories\.(ts|tsx)$/;

function parseArgs(argv) {
  const args = {
    write: false,
    reportOnly: false,
    manifestPath: null,
    roots: defaultStoryRoots,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--write') {
      args.write = true;
    } else if (arg === '--report-only') {
      args.reportOnly = true;
    } else if (arg === '--manifest') {
      args.manifestPath = argv[index + 1] ?? null;
      index += 1;
    } else if (arg === '--root') {
      const value = argv[index + 1];
      if (value) {
        args.roots = [value];
      }
      index += 1;
    } else if (arg.startsWith('--root=')) {
      args.roots = [arg.slice('--root='.length)];
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return args;
}

function printHelp() {
  console.log(`
Usage:
  node scripts/sync-figma-storybook.mjs [--manifest path/to/mappings.json] [--write] [--report-only]

Manifest format:
  {
    "mappings": [
      {
        "file": "src/components/ui/button/Button.stories.tsx",
        "exportName": "Playground",
        "figmaUrl": "https://www.figma.com/design/...?...node-id=1-2&m=dev"
      }
    ]
  }

Notes:
  - The script never invents URLs.
  - Without --write it only reports mismatches.
  - When the target story uses createFigmaDesign(...), the script updates the URL source in place.
`.trim());
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function readJsonFromStdin() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const raw = chunks.join('');
  if (!raw.trim()) {
    return null;
  }

  return JSON.parse(raw);
}

async function collectStoryFiles(roots) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && storyFilePattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  for (const root of roots) {
    await walk(path.resolve(repoRoot, root));
  }

  return files.sort();
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function getTitle(content) {
  const match = content.match(/title:\s*['"]([^'"]+)['"]/);
  return match?.[1] ?? null;
}

function getStoryExports(content) {
  return [...content.matchAll(/export const (\w+)\s*(?::|=)/g)].map((match) => match[1]);
}

function findBlockRange(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start === -1) {
    return null;
  }

  const end = content.indexOf(endMarker, start + startMarker.length);
  return {
    start,
    end: end === -1 ? content.length : end,
  };
}

function extractDesignReference(blockText) {
  const inlineCreate = blockText.match(
    /design:\s*createFigmaDesign\(\s*(['"])([^'"]+)\1\s*\)/,
  );
  if (inlineCreate) {
    return { kind: 'inline-create', url: inlineCreate[2] };
  }

  const helperCreate = blockText.match(
    /design:\s*createFigmaDesign\(\s*([A-Za-z_$][\w$]*)\s*\)/,
  );
  if (helperCreate) {
    return { kind: 'helper-arg', name: helperCreate[1] };
  }

  const inlineObject = blockText.match(
    /design:\s*\{[\s\S]*?url:\s*(['"])([^'"]+)\1[\s\S]*?\}/,
  );
  if (inlineObject) {
    return { kind: 'inline-object', url: inlineObject[2] };
  }

  const identifier = blockText.match(/design:\s*([A-Za-z_$][\w$]*)/);
  if (identifier) {
    return { kind: 'identifier', name: identifier[1] };
  }

  return null;
}

function replaceAt(content, start, end, replacement) {
  return content.slice(0, start) + replacement + content.slice(end);
}

function replaceFirstMatch(content, pattern, replacement) {
  const match = content.match(pattern);
  if (!match || match.index === undefined) {
    return { content, changed: false };
  }

  const updated =
    content.slice(0, match.index) +
    replacement(match) +
    content.slice(match.index + match[0].length);
  return { content: updated, changed: true };
}

function updateConstString(content, constName, nextUrl) {
  const pattern = new RegExp(`const\\s+${constName}\\s*=\\s*(['"])([^'"]+)\\1`);
  return replaceFirstMatch(content, pattern, () => `const ${constName} = '${nextUrl}'`);
}

function updateDesignRefInRange(content, range, nextUrl) {
  const block = content.slice(range.start, range.end);
  const reference = extractDesignReference(block);

  if (!reference) {
    return { content, changed: false, reason: 'no design reference found in target block' };
  }

  if (reference.kind === 'inline-create') {
    const nextBlock = block.replace(/createFigmaDesign\(\s*(['"])([^'"]+)\1\s*\)/, `createFigmaDesign('${nextUrl}')`);
    return {
      content: replaceAt(content, range.start, range.end, nextBlock),
      changed: true,
      reason: null,
    };
  }

  if (reference.kind === 'inline-object') {
    const nextBlock = block.replace(/url:\s*(['"])([^'"]+)\1/, `url: '${nextUrl}'`);
    return {
      content: replaceAt(content, range.start, range.end, nextBlock),
      changed: true,
      reason: null,
    };
  }

  if (reference.kind === 'helper-arg') {
    const helperPattern = new RegExp(
      `const\\s+${reference.name}\\s*=\\s*createFigmaDesign\\(\\s*([A-Za-z_$][\\w$]*|['"][^'"]+['"])\\s*\\)`,
    );
    const helperMatch = content.match(helperPattern);
    if (!helperMatch) {
      return { content, changed: false, reason: `helper ${reference.name} not found` };
    }

    const helperIndex = content.indexOf(helperMatch[0]);
    const helperCall = helperMatch[1];

    if (/^['"]/.test(helperCall)) {
      const updatedHelper = helperMatch[0].replace(
        /createFigmaDesign\(\s*(['"])([^'"]+)\1\s*\)/,
        `createFigmaDesign('${nextUrl}')`,
      );
      return {
        content: replaceAt(content, helperIndex, helperIndex + helperMatch[0].length, updatedHelper),
        changed: true,
        reason: null,
      };
    }

    const constResult = updateConstString(content, helperCall, nextUrl);
    if (constResult.changed) {
      return { content: constResult.content, changed: true, reason: null };
    }

    return { content, changed: false, reason: `unable to resolve helper argument ${helperCall}` };
  }

  if (reference.kind === 'identifier') {
    const designConstPattern = new RegExp(
      `const\\s+${reference.name}\\s*=\\s*(?:createFigmaDesign\\(\\s*([A-Za-z_$][\\w$]*|['"][^'"]+['"])\\s*\\)|\\{[\\s\\S]*?url:\\s*(['"])([^'"]+)\\2[\\s\\S]*?\\})`,
    );
    const match = content.match(designConstPattern);
    if (!match) {
      return { content, changed: false, reason: `design constant ${reference.name} not found` };
    }

    const fullMatch = match[0];
    const matchIndex = content.indexOf(fullMatch);

    if (fullMatch.includes('createFigmaDesign(')) {
      const helperArg = match[1];
      if (/^['"]/.test(helperArg)) {
        const updated = fullMatch.replace(
          /createFigmaDesign\(\s*(['"])([^'"]+)\1\s*\)/,
          `createFigmaDesign('${nextUrl}')`,
        );
        return {
          content: replaceAt(content, matchIndex, matchIndex + fullMatch.length, updated),
          changed: true,
          reason: null,
        };
      }

      const result = updateConstString(content, helperArg, nextUrl);
      if (result.changed) {
        return { content: result.content, changed: true, reason: null };
      }
      return { content, changed: false, reason: `unable to resolve nested helper ${helperArg}` };
    }

    const updated = fullMatch.replace(/url:\s*(['"])([^'"]+)\1/, `url: '${nextUrl}'`);
    return {
      content: replaceAt(content, matchIndex, matchIndex + fullMatch.length, updated),
      changed: true,
      reason: null,
    };
  }

  return { content, changed: false, reason: 'unsupported design reference shape' };
}

function updateDesignInStoryFile(content, exportName, nextUrl) {
  if (exportName) {
    const exportRange = findBlockRange(content, `export const ${exportName}`, '\nexport const ');
    if (exportRange) {
      const result = updateDesignRefInRange(content, exportRange, nextUrl);
      if (result.changed) {
        return result;
      }

      const metaRange = findBlockRange(content, 'const meta = {', '\nexport default meta;');
      if (metaRange) {
        const metaResult = updateDesignRefInRange(content, metaRange, nextUrl);
        if (metaResult.changed) {
          return metaResult;
        }
      }

      return result;
    }
  }

  const metaRange = findBlockRange(content, 'const meta = {', '\nexport default meta;');
  if (metaRange) {
    return updateDesignRefInRange(content, metaRange, nextUrl);
  }

  return { content, changed: false, reason: 'meta block not found' };
}

function getManifestEntries(manifest) {
  if (Array.isArray(manifest)) {
    return manifest;
  }

  if (manifest && Array.isArray(manifest.mappings)) {
    return manifest.mappings;
  }

  if (manifest && Array.isArray(manifest.stories)) {
    return manifest.stories;
  }

  return [];
}

function resolveFileTarget(entries, item) {
  if (item.file) {
    const exact = entries.find((entry) => toPosix(entry.file).endsWith(toPosix(item.file)));
    if (exact) {
      return exact;
    }
  }

  if (item.title) {
    const exactTitle = entries.find((entry) => entry.title === item.title);
    if (exactTitle) {
      return exactTitle;
    }

    const suffix = `/${item.title.split('/').pop()}`;
    const bySuffix = entries.filter((entry) => entry.title?.endsWith(suffix));
    if (bySuffix.length === 1) {
      return bySuffix[0];
    }
  }

  const componentName = item.component ?? item.name;
  if (componentName) {
    const suffix = `/${componentName}`;
    const byComponent = entries.filter((entry) => entry.title?.endsWith(suffix));
    if (byComponent.length === 1) {
      return byComponent[0];
    }
  }

  return null;
}

function getManifestLabel(item) {
  return (
    item.title ??
    item.component ??
    item.variant ??
    item.storyName ??
    item.exportName ??
    item.file ??
    'unknown-entry'
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await collectStoryFiles(args.roots);
  const fileData = await Promise.all(
    files.map(async (filePath) => {
      const content = await fs.readFile(filePath, 'utf8');
      return {
        filePath,
        relPath: toPosix(path.relative(repoRoot, filePath)),
        content,
        title: getTitle(content),
        exports: getStoryExports(content),
      };
    }),
  );

  const report = {
    updatedFiles: [],
    mismatches: [],
    scannedFiles: fileData.length,
  };

  const manifest =
    args.manifestPath
      ? await readJson(path.resolve(repoRoot, args.manifestPath))
      : !process.stdin.isTTY
        ? await readJsonFromStdin()
        : null;

  if (!manifest) {
    for (const file of fileData) {
      if (/design:\s*(?:createFigmaDesign\(|\{[\s\S]*?url:|[A-Za-z_$][\w$]*)/.test(file.content)) {
        report.updatedFiles.push({
          file: file.relPath,
          mode: 'scan',
          title: file.title,
          exports: file.exports,
        });
      }
    }

    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const entries = getManifestEntries(manifest);

  if (!entries.length) {
    throw new Error('Manifest did not contain any mappings.');
  }

  const nextContents = new Map(fileData.map((file) => [file.filePath, file.content]));

  for (const item of entries) {
    const nextUrl = item.figmaUrl ?? item.url ?? item.designUrl;
    if (!nextUrl) {
      report.mismatches.push({
        item: getManifestLabel(item),
        reason: 'missing figmaUrl',
      });
      continue;
    }

    const targetFile = resolveFileTarget(fileData, item);
    if (!targetFile) {
      report.mismatches.push({
        item: getManifestLabel(item),
        reason: 'matching story file not found',
      });
      continue;
    }

    const targetExport = item.exportName ?? item.variant ?? item.storyName ?? item.story;
    let updated = targetFile.content;
    let changed = false;
    let reason = null;

    const result = updateDesignInStoryFile(updated, targetExport, nextUrl);
    updated = result.content;
    changed = result.changed;
    reason = result.reason;

    if (!changed && targetExport) {
      reason = reason ?? `story export ${targetExport} not found or not linked to a design reference`;
    }

    if (!changed) {
      report.mismatches.push({
        item: getManifestLabel(item),
        file: targetFile.relPath,
        reason,
      });
      continue;
    }

    nextContents.set(targetFile.filePath, updated);
    report.updatedFiles.push({
      file: targetFile.relPath,
      exportName: targetExport ?? null,
      title: targetFile.title,
      figmaUrl: nextUrl,
    });
  }

  if (args.write && !args.reportOnly) {
    for (const [filePath, content] of nextContents.entries()) {
      const original = fileData.find((file) => file.filePath === filePath);
      if (original && original.content !== content) {
        await fs.writeFile(filePath, content, 'utf8');
      }
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});
