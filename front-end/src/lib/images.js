function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('../../public/gallery', false, /\.(jpg|jpeg|png)$/));

export default images;
