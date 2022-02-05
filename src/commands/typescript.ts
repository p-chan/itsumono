import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import shell from 'shelljs'

type Options = {
  '--': any[]
}

export const typescript = async (_: Options) => {
  try {
    shell.exec('yarn add typescript @stardust-configs/tsconfig -D')

    const tsconfig = await readFile(resolve(__dirname, '../templates/tsconfig.mustache'), 'utf-8')

    await writeFile(resolve(process.cwd(), 'tsconfig.json'), render(tsconfig, {}), 'utf-8')

    console.log('more options: https://github.com/stardust-configs/tsconfig#readme')
  } catch (error) {
    console.error(error)
  }
}
