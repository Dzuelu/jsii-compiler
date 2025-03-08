import { JsiiError } from '../src/jsii-error';
import { enabledWarnings, silenceWarnings } from '../src/warnings';

describe('enabledWarnings', () => {
  test('gets filled with all warnings from JsiiDiagnostic', () => {
    expect(enabledWarnings).toStrictEqual({
      'metadata/missing-readme': true,
      'metadata/missing-peer-dependency': true,
      'metadata/missing-dev-dependency': true,
      'jsii-directive/missing-argument': true,
      'jsii-directive/struct-on-non-interface': true,
      'jsii-directive/unknown': true,
      'typescript-config/disabled-tsconfig-validation': true,
      'language-compatibility/reserved-word': true,
      'language-compatibility/member-name-conflicts-with-type-name': true,
      'documentation/non-existent-parameter': true,
    });
  });
});

describe('silenceWarnings', () => {
  test('sets enabledWarnings key to false', () => {
    expect(enabledWarnings['metadata/missing-readme']).toBe(true);
    silenceWarnings(['metadata/missing-readme']);
    expect(enabledWarnings['metadata/missing-readme']).toBe(false);
  });

  test('translates legacy key to current Code.name', () => {
    expect(enabledWarnings['language-compatibility/reserved-word']).toBe(true);
    silenceWarnings(['reserved-word']);
    expect(enabledWarnings['language-compatibility/reserved-word']).toBe(false);
  });

  test('throws when key is not valid', () => {
    expect(() => silenceWarnings(['invalid-warning'])).toThrow(JsiiError);
  });
});
