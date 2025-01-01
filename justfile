_default:
  @just --list

build:
  whiskers templates/gitignore.tera
  whiskers templates/package.json.tera
  whiskers templates/styles/code.css.tera
  whiskers templates/styles/index.ts.tera
  whiskers templates/styles/layout.css.tera
  whiskers templates/styles/common.css.tera
  whiskers templates/setup/windicss.ts.tera
  whiskers templates/setup/shiki.ts.tera
