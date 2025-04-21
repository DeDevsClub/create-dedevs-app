import { generateFiles } from 'fumadocs-openapi';
 
void generateFiles({
  input: ['./content/docs/openapi/morphoAPI.json'], // the OpenAPI schemas
  output: './content/docs',
});