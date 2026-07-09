import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'

/**
 * Build-time content reader. Reads the `content/` files defined by
 * `keystatic.config.ts`. Used only in server components / build — never shipped
 * to the client.
 */
export const reader = createReader(process.cwd(), keystaticConfig)
