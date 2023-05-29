#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import chalk from 'chalk';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the version and description of your CLI
program.version('1.0.0').description('Custom CLI for React');

// Command to create a component
program
  .command('component <name>')
  .alias('cc')
  .description('Create a new React component')
  .action((name) => {
    // Generate the component folder and files
    const componentFolder = path.join(__dirname, 'src', 'components', name);
    fs.mkdirSync(componentFolder, { recursive: true });

    // Create the index file
    const componentFile = path.join(componentFolder, 'index.tsx');
    const componentContent = `
import { ${name}Props } from 'src/components/${name}'

const ${name} = () => {
  return (
    <div></div>
  );
}

export default ${name};
`;

    // Create styles file
    const stylesFile = path.join(componentFolder, 'styles.ts');
    fs.writeFileSync(stylesFile, `import styled from 'styled-components'
    `);

    // Create the types file
    const typesFile = path.join(componentFolder, 'types.ts');
    fs.writeFileSync(typesFile, `export type ${name}Props = {}
    `);

    // Create the hook file
    const hookFile = path.join(componentFolder, `use${name}.ts`);
    fs.writeFileSync(hookFile, `import { useState, useEffect } from 'react'

export const use${name} = () => {}
`);

    fs.writeFileSync(componentFile, componentContent.trim());

    console.log(chalk.green(`✓ ${chalk.bgGreen('SUCCESS')} Component '${name}' created successfully!`));
  });

program.parse(process.argv);
