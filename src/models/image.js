import download from "image-downloader";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export function ImageManager() {
  function createImage(url, name) {
    const dest = join(
      dirname(fileURLToPath(import.meta.url)),
      "..",
      "..",
      "public",
      `${name}.png`
    );

    download.image({
      url,
      dest,
    });
  }

  return {
    createImage,
  };
}
