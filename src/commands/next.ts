import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import shell from 'shelljs'

import { format, getPackageJson } from '../utilities'

type Options = {
  '--': any[]
}

export const next = async (_: Options) => {
  try {
    shell.exec('yarn add react react-dom next -E')
    shell.exec('yarn add @types/react @types/react-dom @types/node -D -E')

    const packageJson = await getPackageJson()

    packageJson.scripts = {
      build: 'next build',
      dev: 'next dev',
      start: 'next start',
      ...(packageJson.scripts || {}),
    }

    await writeFile(
      resolve(process.cwd(), 'package.json'),
      await format(JSON.stringify(packageJson), 'json-stringify'),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
}
