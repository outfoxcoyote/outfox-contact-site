const fs   = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const root = process.cwd();

  function listDir(dir, extRe) {
    try {
      return fs.readdirSync(path.join(root, dir)).filter(f => extRe.test(f));
    } catch (_) {
      return [];
    }
  }

  const fonts  = listDir('assets/fonts',  /\.(woff2|woff|ttf|otf)$/i);
  const images = listDir('assets/images', /\.(jpe?g|png|webp)$/i);

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.json({ fonts, images });
};
