import pluralize from 'pluralize';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export default class SnakeCaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName
      ? userSpecifiedName
      : pluralize.plural(snakeCase(targetName));
  }

  columnName(propertyName: string, customName: string | undefined): string {
    return customName ? customName : snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(
      pluralize.singular(relationName) + '_' + referencedColumnName
    );
  }

  joinTableName(firstTableName: string, secondTableName: string): string {
    return snakeCase(firstTableName + '_' + secondTableName);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string
  ): string {
    return snakeCase(
      pluralize.singular(tableName) + '_' + (columnName || propertyName)
    );
  }
}
