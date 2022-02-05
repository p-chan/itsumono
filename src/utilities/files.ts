import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { PackageJson } from 'type-fest'
import prettier, { RequiredOptions } from 'prettier'

export const getPackageJson = async () => {
  const packageJson = JSON.parse(await readFile(resolve(process.cwd(), 'package.json'), 'utf-8')) as PackageJson

  return packageJson
}

export const format = async (text: string, parser: RequiredOptions['parser']) => {
  const configFilePath = await prettier.resolveConfigFile()

  if (configFilePath == undefined) return prettier.format(text, { parser })

  const configOptions = await prettier.resolveConfig(configFilePath)

  if (configOptions == undefined) throw new Error('prettier config is invalid')

  return prettier.format(text, {
    parser,
    ...configOptions,
  })
}
