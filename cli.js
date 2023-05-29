#!/usr/bin/env node
/* eslint-disable @typescript-eslint/naming-convention */
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import { program } from 'commander'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

program.version('1.0.0').description('Custom CLI for React')

program
  .command('component <name>')
  .alias('c')
  .description('Create a new React component')
  .action(name => {
    const hookName = `use${name}`
    const propsName = `${name}Props`

    const componentFolder = path.join(__dirname, 'src', 'components', name)
    const componentFile = path.join(componentFolder, 'index.tsx')
    const stylesFile = path.join(componentFolder, 'styles.ts')
    const typesFile = path.join(componentFolder, 'types.ts')
    const hookFile = path.join(componentFolder, `${hookName}.ts`)

    const stylesContent = `import styled from 'styled-components'
`
    const typesContent = `export type ${propsName} = {}
`
    const hookContent = `import { useState, useEffect } from 'react'

export const ${hookName} = () => {}
`
    const componentContent = `import { ${hookName} } from 'src/components/${name}/${hookName}'
import { ${propsName} } from 'src/components/${name}/types'

const ${name} = ({}: ${propsName}) => {
  return <div></div>
}

export default ${name}
`

    fs.mkdirSync(componentFolder, { recursive: true })
    fs.writeFileSync(componentFile, componentContent)
    fs.writeFileSync(stylesFile, stylesContent)
    fs.writeFileSync(typesFile, typesContent)
    fs.writeFileSync(hookFile, hookContent)

    console.log(
      chalk.green(
        `✓ ${chalk.bgGreen(
          'SUCCESS',
        )} Component '${name}' created successfully!`,
      ),
    )
  })

program.parse(process.argv)
