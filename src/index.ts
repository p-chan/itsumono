#!/usr/bin/env node

import { cac } from 'cac'

import { gitignore, init, prettierrc, versionrc, yarnrc } from './commands'
import { version } from './version'

const cli = cac()

cli.command('gitignore').action(gitignore)
cli.command('init').action(init)
cli.command('prettierrc').action(prettierrc)
cli.command('versionrc').action(versionrc)
cli.command('yarnrc').action(yarnrc)

cli.help()
cli.version(version)

cli.parse()
