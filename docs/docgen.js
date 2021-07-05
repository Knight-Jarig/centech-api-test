const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const chalk = require('chalk');
const { Query, Mutation } = require('./graphql')
console.log(chalk.blue('Creating README.md file ...'))

let queries = ''
let mutations = ''

// Functions
const removeDollar = text => text.replace(new RegExp('$', 'g'), '')
const checkArray = data => removeDollar(Array.isArray(data) ? data.reduce((pre, cur, index) => `${pre}\`${cur}\`${index === data.length - 1 ? '' : ' , '}`, '') : `\`${data}\``)

try {
  Object.keys(Query).sort().map((key) => {
    queries += (`| **${key}** | ${checkArray(Query[key])} |\n`)
  })
  
  Object.keys(Mutation).sort().map((key) => {
    mutations += (`| **${key}** | ${checkArray(Mutation[key])} |\n`)
  })
  
  fs.writeFileSync(`${path.join(__dirname, './README.md')}`,
`# API from MDC

## Query

| Query | API MDC |
|-------|:--------|
${queries}

## Mutation
| Mutation | API MDC |
|----------|:--------|
${mutations}
`
  )
  
  console.log(chalk.green('Created README.md file success!!'))
} catch (e) {
  console.log(chalk.red('Error !!'))
}
