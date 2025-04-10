(function() {
  function loadEthers() {
    return new Promise((resolve, reject) => {
      const sources = [
        'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js',
        'https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js',
        'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js'
      ];
      function tryLoadSource(index) {
        if (index >= sources.length) {
          reject(new Error('Failed to load ethers.js from all sources'));
          return;
        }
        const script = document.createElement('script');
        script.src = sources[index];
        script.onload = () => {
          if (typeof window.ethers !== 'undefined') {
            console.log('Ethers loaded successfully');
            resolve();
          } else {
            tryLoadSource(index + 1);
          }
        };
        script.onerror = () => tryLoadSource(index + 1);
        document.head.appendChild(script);
      }
      tryLoadSource(0);
    });
  }

  loadEthers()
    .then(() => {
      document.dispatchEvent(new Event("ethersLoaded"));
    })
    .catch(error => {
      console.error('Failed to load ethers:', error);
      alert('Failed to load Web3 libraries. Please refresh the page.');
    });
})();
