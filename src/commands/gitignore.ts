import { render } from 'mustache'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'

type Options = {
  '--': any[]
}

export const gitignore = async (_: Options) => {
  try {
    const gitignore = await readFile(resolve(__dirname, '../templates/gitignore.mustache'), 'utf-8')

    await writeFile(resolve(process.cwd(), '.gitignore'), render(gitignore, {}), 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
