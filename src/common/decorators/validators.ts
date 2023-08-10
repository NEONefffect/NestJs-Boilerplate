import { applyDecorators } from '@nestjs/common';
import * as _ from 'lodash';
import { IsString, MaxLength, Matches, MinLength } from 'class-validator';

export function IsStringField({
  maxLength = 100,
  minLength = 2,
  match = /^[-\sa-zA-Z]+$/,
  matchMessage = '', // Match message for exception
}) {
  return applyDecorators(
    IsString(),
    MaxLength(maxLength),
    MinLength(minLength),
    Matches(match, _.pickBy({ message: matchMessage })) as ClassDecorator,
  );
}
