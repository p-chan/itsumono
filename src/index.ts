#!/usr/bin/env node

import { cac } from 'cac'

import { gitignore, init, next, prettier, typescript, versionrc, yarnrc } from './commands'
import { version } from './version'

const cli = cac()

cli.command('gitignore').action(gitignore)
cli.command('init').action(init)
cli.command('next').action(next)
cli.command('prettier').action(prettier)
cli.command('typescript').action(typescript)
cli.command('versionrc').action(versionrc)
cli.command('yarnrc').action(yarnrc)

cli.help()
cli.version(version)

cli.parse()
