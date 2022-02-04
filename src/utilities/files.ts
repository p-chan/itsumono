import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { PackageJson } from 'type-fest'
import prettier, { RequiredOptions } from 'prettier'

export const getPackageJson = async () => {
  const packageJson = JSON.parse(await readFile(resolve(process.cwd(), 'package.json'), 'utf-8')) as PackageJson

  return packageJson
}

export const format = async (text: string, parser: RequiredOptions['parser']) => {
  const options = await prettier.resolveConfig(resolve(process.cwd(), '.prettierrc'))

  if (options == undefined) throw new Error('.prettierrc is not found')

  return prettier.format(text, {
    parser,
    ...options,
  })
}
