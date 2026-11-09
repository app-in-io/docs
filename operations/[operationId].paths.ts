import { usePaths } from 'vitepress-openapi'
import spec from '../public/openapi.json'

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'patch', 'head', 'options', 'trace']

/**
 * Finds the raw OpenAPI operation, its HTTP method and its path by operationId.
 */
function findOperation(operationId: string) {
  for (const [path, item] of Object.entries<Record<string, any>>(spec.paths)) {
    for (const method of HTTP_METHODS) {
      if (item[method]?.operationId === operationId) {
        return { path, method, operation: item[method] }
      }
    }
  }

  return undefined
}

/**
 * Collects every `#/components/...` object the value references, recursively.
 */
function collectComponents(value: unknown, found: Record<string, unknown> = {}) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectComponents(item, found))
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === '$ref' && typeof child === 'string' && child.startsWith('#/components/') && !(child in found)) {
        const target = child
          .slice(2)
          .split('/')
          .reduce<any>((node, segment) => node?.[segment], spec)
        found[child] = target
        collectComponents(target, found)
      } else {
        collectComponents(child, found)
      }
    }
  }

  return found
}

/**
 * Markdown for AI agents only. vitepress-plugin-llms keeps the <llm-only> block in
 * operations/<id>.md and llms-full.txt and strips it from the HTML page, which
 * renders the operation through <OAOperation> instead.
 */
function llmContent(operationId: string) {
  const found = findOperation(operationId)
  if (!found) {
    return ''
  }

  const { path, method, operation } = found
  const baseUrl = spec.servers?.[0]?.url ?? ''
  const components = collectComponents(operation)

  const lines = [
    '<llm-only>',
    '',
    `# ${operation.summary}`,
    '',
    `\`${method.toUpperCase()} ${baseUrl}${path}\``,
    '',
    operation.description ?? '',
    '',
    '## OpenAPI operation',
    '',
    '```json',
    JSON.stringify(operation, null, 2),
    '```',
  ]

  if (Object.keys(components).length > 0) {
    lines.push(
      '',
      '## Referenced components',
      '',
      '```json',
      JSON.stringify(components, null, 2),
      '```',
    )
  }

  lines.push(
    '',
    'Full specification: https://docs.app-in.io/openapi.json',
    '',
    '</llm-only>',
  )

  return lines.join('\n')
}

export default {
  paths() {
    return usePaths({ spec })
      .getPathsByVerbs()
      .map(({ operationId, summary }) => ({
        params: {
          operationId,
          pageTitle: `${summary} - API Reference`,
        },
        content: llmContent(operationId),
      }))
  },
}
