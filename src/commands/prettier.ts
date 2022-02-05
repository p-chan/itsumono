import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import shell from 'shelljs'

import { format, getPackageJson } from '../utilities'

type Options = {
  '--': any[]
}

export const prettier = async (_: Options) => {
  try {
    shell.exec('yarn add prettier @stardust-configs/prettier-config -D')

    const packageJson = await getPackageJson()

    packageJson.scripts = {
      ...(packageJson.scripts || {}),
      format: 'prettier --write .',
    }

    await writeFile(
      resolve(process.cwd(), 'package.json'),
      await format(JSON.stringify(packageJson), 'json-stringify'),
      'utf-8'
    )

    const prettierrc = await readFile(resolve(__dirname, '../templates/prettierrc.mustache'), 'utf-8')

    await writeFile(resolve(process.cwd(), '.prettierrc'), render(prettierrc, {}), 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
