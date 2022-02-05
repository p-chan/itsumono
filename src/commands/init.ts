import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import prompts from 'prompts'

import { format } from '../utilities'

type Options = {
  '--': any[]
}

export const init = async (_: Options) => {
  try {
    const isPrivate = (
      await prompts({
        type: 'confirm',
        name: 'value',
        message: 'private',
        initial: true,
      })
    ).value as boolean | undefined

    if (isPrivate == undefined) throw new Error('private is required')

    const name = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'name',
      })
    ).value as string | undefined

    if (name == undefined) throw new Error('name is required')

    const version = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'version',
        initial: '0.1.0',
      })
    ).value as string | undefined

    if (version == undefined) throw new Error('version is required')

    const description = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'description',
      })
    ).value as string | undefined

    if (description == undefined) throw new Error('description is required')

    const keywords = !isPrivate
      ? ((
          await prompts({
            type: 'text',
            name: 'value',
            message: 'keywords',
          })
        ).value as string | undefined)
      : undefined

    if (!isPrivate && keywords == undefined) throw new Error('keywords is required')

    const license = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'license',
        initial: 'UNLICENSED',
      })
    ).value as string | undefined

    if (license == undefined) throw new Error('license is required')

    const author = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'license',
        initial: 'P-Chan',
      })
    ).value as string | undefined

    if (author == undefined) throw new Error('author is required')

    const main = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'main',
        initial: 'index.js',
      })
    ).value as string | undefined

    if (main == undefined) throw new Error('main is required')

    const repository = (
      await prompts({
        type: 'text',
        name: 'value',
        message: 'repository',
        initial: `p-chan/${name}`,
      })
    ).value as string | undefined

    if (repository == undefined) throw new Error('repository is required')

    const packageJson = Object.fromEntries(
      Object.entries({
        name,
        version,
        description,
        keywords,
        homepage: !isPrivate ? `https://github.com/${repository}#readme` : undefined,
        bugs: !isPrivate
          ? {
              url: `https://github.com/${repository}/issues`,
            }
          : undefined,
        license,
        author,
        main,
        repository: {
          type: 'git',
          url: `https://github.com/${repository}.git`,
        },
        scripts: {},
        dependencies: {},
        devDependencies: {},
        private: isPrivate ? true : undefined,
      }).filter(([, value]) => {
        return value != undefined
      })
    )

    await writeFile(
      resolve(process.cwd(), 'package.json'),
      await format(JSON.stringify(packageJson), 'json-stringify'),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
}
