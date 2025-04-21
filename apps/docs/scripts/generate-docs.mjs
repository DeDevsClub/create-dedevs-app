import { generateFiles } from 'fumadocs-openapi';
 
void generateFiles({
  input: ['./content/docs/openapi/schemas/morphoAPI.json', './content/docs/openapi/schemas/defillamaAPI.json'], // the OpenAPI schemas
  output: './content/docs',
});