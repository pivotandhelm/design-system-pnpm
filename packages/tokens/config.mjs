/** @type {import("style-dictionary").Config} */
import StyleDictionary from 'style-dictionary';

/**
 * Recursively strips the Style Dictionary `{ value }` wrapper
 * so the generated TypeScript exports plain values.
 */
function stripValues(obj) {
  if (obj && typeof obj === 'object') {
    if ('value' in obj) {
      return obj.value;
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, stripValues(value)])
    );
  }

  return obj;
}

/**
 * Transforms the Figma Tokens export format (`$value`, `$type`) into the
 * structure Style Dictionary expects (`value`, `type`).
 */
function transformTokenNode(node) {
  if (!node || typeof node !== 'object') {
    return node;
  }

  if ('$value' in node) {
    const transformed = { value: node.$value };

    if (node.$type) {
      transformed.type = node.$type;
    }

    return transformed;
  }

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => key !== '$extensions')
      .map(([key, value]) => [key, transformTokenNode(value)])
  );
}

function transformFigmaTokens(source) {
  if (!source || typeof source !== 'object') {
    return source;
  }

  const entries = Object.entries(source).filter(([key]) => !key.startsWith('$'));

  if (entries.length === 1) {
    const [key, value] = entries[0];

    if (value && typeof value === 'object' && !('$value' in value)) {
      const nestedEntries = Object.entries(value).filter(([nestedKey]) => !nestedKey.startsWith('$'));

      if (nestedEntries.length === 1) {
        return { [nestedEntries[0][0]]: transformTokenNode(nestedEntries[0][1]) };
      }
    }
  }

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (value && typeof value === 'object' && !('$value' in value)) {
        const nestedEntries = Object.entries(value).filter(([nestedKey]) => !nestedKey.startsWith('$'));

        if (nestedEntries.length === 1) {
          return [nestedEntries[0][0], transformTokenNode(nestedEntries[0][1])];
        }
      }

      return [key, transformTokenNode(value)];
    })
  );
}

StyleDictionary.registerParser({
  name: 'figma-tokens',
  pattern: /\.json$/,
  parser: ({ contents }) => {
    const parsed = JSON.parse(contents);
    return transformFigmaTokens(parsed);
  },
});

/**
 * TypeScript formatter
 */
StyleDictionary.registerFormat({
  name: 'typescript/values',
  format: ({ dictionary }) => {
    const values = stripValues(dictionary.tokens);

    return `/**
 * -----------------------------------------------------------------------------
 * THIS FILE IS AUTO-GENERATED.
 * Do not edit directly.
 * -----------------------------------------------------------------------------
 */

export const tokens = ${JSON.stringify(values, null, 2)} as const;

export type Tokens = typeof tokens;

export default tokens;
`;
  },
});

export default {
  //usesDtcg: true,
  source: ["src/figma/figma-tokens.json"],
  parsers: ['figma-tokens'],

  platforms: {
    /**
     * TypeScript
     */
    ts: {
      transformGroup: 'js',
      buildPath: 'src/generated/',

      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/values',
        },
      ],
    },

    /**
     * CSS Custom Properties
     */
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',

      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  }
};
