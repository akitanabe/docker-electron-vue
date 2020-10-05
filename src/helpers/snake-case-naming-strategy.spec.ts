import SnakeCaseNamingStarategy from './snake-case-naming-strategy';

describe('helpers/SnakeCaseNamingStrategy', () => {
  const strategy = new SnakeCaseNamingStarategy();

  describe('tableName', () => {
    test('単数形で入力されたテーブル名を複数形にする', () => {
      expect(strategy.tableName('User', undefined)).toBe('users');
      expect(strategy.tableName('book', undefined)).toBe('books');
    });

    test('アッパーキャメルケースで入力されたテーブル名をスネークケース+末尾の単語を複数形にする', () => {
      expect(strategy.tableName('UsersCategory', undefined)).toBe(
        'users_categories'
      );
      expect(strategy.tableName('BookShop', undefined)).toBe('book_shops');
    });

    test('テーブル名が指定されたら変更せずに通す', () => {
      const camelCaseTableName = 'CamelTable';
      expect(strategy.tableName('camelTable', camelCaseTableName)).toBe(
        camelCaseTableName
      );
    });
  });

  describe('colmunName', () => {
    test('キャメルケースで入力されたカラム名をスネークケースにする', () => {
      expect(strategy.columnName('userId', undefined)).toBe('user_id');
      expect(strategy.columnName('FirstName', undefined)).toBe('first_name');
    });

    test('カラム名が指定されたら変更せずに通す', () => {
      const camelCaseColumnName = 'lastName';
      expect(strategy.columnName('LastName', camelCaseColumnName)).toBe(
        camelCaseColumnName
      );
    });
  });
});
