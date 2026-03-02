import { defineConfig } from 'tsdown'

export default defineConfig({
    exports: true,
    tsconfig: 'tsconfig.json',
    entry: ['src/index.ts'],
    platform: 'node',
    outDir: 'dist',
    format: ['esm', 'cjs'],
    deps: {
        skipNodeModulesBundle: true,
    },
    outExtensions (ctx) {
        return {
            'dts': '.ts',
            'js': ctx.format === 'cjs' ? '.cjs' : '.js'
        }
    }
})