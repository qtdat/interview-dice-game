export default {
  output: {
    manualChunks: (id: string) => {
      if (id.includes('node_modules')) {
        const exp = new RegExp(['lodash|react-ace|ace'].join('|'));
        const expectedVendor = exp.exec(id);

        // big vendors
        if (expectedVendor) {
          return expectedVendor[0];
        }

        return 'vendor';
      }

      // pages in main folders
      // if (/.*app\/main.*/.exec(id)) {
      //   return 'app-pages';
      // }
      if (/.*src\/.*/.exec(id)) {
        return 'page-';
      }
    },
  },
};
