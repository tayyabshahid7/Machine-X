import { Pipe, PipeTransform } from '@angular/core';
import { camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, Options, paramCase, pascalCase, pathCase, sentenceCase, snakeCase } from 'change-case';

const changeCaseFunctions = {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} as const;

type ChangeCaseKeys = keyof typeof changeCaseFunctions;

@Pipe({
  name: 'changeCase'
})
export class ChangeCasePipe implements PipeTransform {

  transform(value: string, target: ChangeCaseKeys, options?: Options): unknown {
    return changeCaseFunctions[target](value, options);
  }

}
