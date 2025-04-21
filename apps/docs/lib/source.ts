import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { attachFile, createOpenAPI } from 'fumadocs-openapi/server';

const lucideIcons = {
  LuNewspaper: icons.Newspaper,
  LuBookOpen: icons.BookOpen,
  LuFileText: icons.FileText,
  LuFile: icons.File,
  LuFileCode: icons.FileCode,
  LuFileCode2: icons.FileCode2,
  LuRocket: icons.Rocket,
};

export const docsSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
});

export const openApiSource = loader({
  baseUrl: '/docs/openapi',
  source: docs.toFumadocsSource(), // Still potentially needs adjustment
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
});

export const openapi = createOpenAPI({
  proxyUrl: '/api/proxy',
});

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in lucideIcons)
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
  },
  pageTree: {
    attachFile,
  },
  pages: [
    {
      title: 'Components',
      url: '/docs/components',
      icon: 'LuFileText',
    },
    {
      title: 'OpenAPI',
      url: '/docs/openapi',
      icon: 'LuRocket',
    },
  ],
});