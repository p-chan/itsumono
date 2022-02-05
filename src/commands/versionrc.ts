import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import shell from 'shelljs'

import { format, getPackageJson } from '../utilities'

type Options = {
  '--': any[]
}

export const versionrc = async (_: Options) => {
  try {
    shell.exec('yarn add standard-version -D -E')

    const packageJson = await getPackageJson()

    packageJson.scripts = {
      ...(packageJson.scripts || {}),
      'version:major': 'standard-version -r major',
      'version:minor': 'standard-version -r minor',
      'version:patch': 'standard-version -r patch',
    }

    await writeFile(
      resolve(process.cwd(), 'package.json'),
      await format(JSON.stringify(packageJson), 'json-stringify'),
      'utf-8'
    )

    const versionrc = await readFile(resolve(__dirname, '../templates/versionrc.mustache'), 'utf-8')

    await writeFile(resolve(process.cwd(), '.versionrc'), render(versionrc, {}), 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
