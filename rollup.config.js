export default {
    input: 'src/listbox.js',
    treeshake: false,
    output: {
        file: 'dist/slm-listbox.js',
        format: 'iife'
    },
    external: ['nanoid']
};
