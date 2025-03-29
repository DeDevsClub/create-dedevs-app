import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd());

export type FrontMatter = {
  title: string;
  description: string;
  [key: string]: any;
};

export type DocContent = {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  filePath: string;
};

// Get all MDX files from a directory
export function getMdxFiles(dir: string): string[] {
  try {
    const files = fs.readdirSync(path.join(contentDirectory, dir));
    return files.filter(file => file.endsWith('.mdx'));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

// Parse MDX file content
export function parseMdxFile(filePath: string): DocContent | null {
  try {
    const fullPath = path.join(contentDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filePath
      .replace(/\.mdx$/, '')
      .split('/')
      .pop() || '';

    return {
      slug,
      frontMatter: data as FrontMatter,
      content,
      filePath,
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    return null;
  }
}

// Get all docs content
export function getAllDocs(): DocContent[] {
  // Get root level MDX files
  const rootFiles = getMdxFiles('.');
  const rootDocs = rootFiles
    .map(file => parseMdxFile(file))
    .filter((doc): doc is DocContent => doc !== null);

  // Get docs from subdirectories
  const directories = ['essentials', 'api-reference'];
  const subDirDocs = directories.flatMap(dir => {
    const files = getMdxFiles(dir);
    return files
      .map(file => parseMdxFile(`${dir}/${file}`))
      .filter((doc): doc is DocContent => doc !== null);
  });

  return [...rootDocs, ...subDirDocs];
}

// Get a specific doc by slug
export function getDocBySlug(slug: string): DocContent | null {
  const allDocs = getAllDocs();
  return allDocs.find(doc => doc.slug === slug) || null;
}

// Get docs by category
export function getDocsByCategory(category: string): DocContent[] {
  const allDocs = getAllDocs();
  return allDocs.filter(doc => doc.filePath.startsWith(category));
}
