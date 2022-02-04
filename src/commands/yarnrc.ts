import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'

type Options = {
  '--': any[]
}

export const yarnrc = async (_: Options) => {
  try {
    const yarnrc = await readFile(resolve(__dirname, '../templates/yarnrc.mustache'), 'utf-8')

    await writeFile(resolve(process.cwd(), '.yarnrc'), render(yarnrc, {}), 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
