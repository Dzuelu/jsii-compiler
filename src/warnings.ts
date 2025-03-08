import { DiagnosticCategory } from 'typescript';
import { Code, JsiiDiagnostic } from './jsii-diagnostic';
import { JsiiError } from './jsii-error';

/**
 * Indicates which warnings are currently enabled. By default all warnings are
 * enabled, and can be silenced through the --silence-warning option.
 */
export const enabledWarnings: { [name: string]: boolean } = Object.keys(JsiiDiagnostic || {}).reduce(
  (warnings, warningKey) => {
    const code = JsiiDiagnostic[warningKey as keyof typeof JsiiDiagnostic];
    if (code instanceof Code && code.category === DiagnosticCategory.Warning) {
      warnings[code.name] = true;
    }
    return warnings;
  },
  {} as { [name: string]: boolean },
);

export const silenceWarnings = (warnings: string[]): void => {
  const legacyWarningKeyReplacement: { [key: string]: string } = {
    'reserved-word': 'language-compatibility/reserved-word',
  };
  const legacyWarningKeys = Object.keys(legacyWarningKeyReplacement);

  for (const key of warnings) {
    if (!(key in enabledWarnings) && !legacyWarningKeys.includes(key)) {
      throw new JsiiError(
        `Unknown warning type ${key as any}. Must be one of: ${Object.keys(enabledWarnings).join(', ')}`,
      );
    }

    if (legacyWarningKeys.includes(key)) {
      enabledWarnings[legacyWarningKeyReplacement[key]] = false;
    } else {
      enabledWarnings[key] = false;
    }
  }
};
