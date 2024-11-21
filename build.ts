import { flavors } from "@catppuccin/palette";

const cssifyHsl = ({ h, s, l }: { h: number; s: number; l: number }) =>
  `${h}, ${s * 100}%, ${l * 100}%`;

const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();

const getFlavorDirname = (flavor: string) =>
  `./generated/slidev-theme-catppuccin-${flavor}`;

const getReplacementStrings = (flavor: any, data: any) => [
  ["###flavor###", flavor],
  ["###mantle###", cssifyHsl(data.colors.mantle.hsl)],
  ["###base###", cssifyHsl(data.colors.base.hsl)],
  ["###text###", cssifyHsl(data.colors.text.hsl)],
  ["###overlay2###", cssifyHsl(data.colors.overlay2.hsl)],
  ["###sky###", cssifyHsl(data.colors.sky.hsl)],
  ["###green###", cssifyHsl(data.colors.green.hsl)],
  ["###peach###", cssifyHsl(data.colors.peach.hsl)],
  ["###pink###", cssifyHsl(data.colors.pink.hsl)],
  ["###mauve###", cssifyHsl(data.colors.mauve.hsl)],
  ["###red###", cssifyHsl(data.colors.red.hsl)],
  ["###yellow###", cssifyHsl(data.colors.yellow.hsl)],
  ["###current-line###", "#2a2b3c"],
  ["###theme-type###", data.dark ? "dark" : "light"],
];

const generateFile = async (filename: string, flavor: string, data: any) => {
  const fileBytes = await Deno.readFile(`./template/${filename}`);
  const fileText = getReplacementStrings(flavor, data).reduce(
    (acc, [key, value]) => acc.replaceAll(key, value),
    decoder.decode(fileBytes),
  );

  await Deno.writeFile(
    `${getFlavorDirname(flavor)}/${filename}`,
    encoder.encode(fileText),
  );
};

Object.entries(flavors).forEach(async ([flavor, theme]) => {
  const flavorDirectoryName = `./generated/slidev-theme-catppuccin-${flavor}`;
  const templateDirectory = await Deno.readDir("./template");

  try {
    await Deno.remove(flavorDirectoryName, { recursive: true });
  } catch (_err) {
    console.info(`${flavorDirectoryName} not found, will create it.`);
  }

  await Deno.mkdir(flavorDirectoryName);

  for await (const templateDirectoryChild of templateDirectory) {
    if (templateDirectoryChild.isDirectory) {
      await Deno.mkdir(`${flavorDirectoryName}/${templateDirectoryChild.name}`);

      for await (const filename of Deno.readDir(
        `./template/${templateDirectoryChild.name}`,
      )) {
        await generateFile(
          `${templateDirectoryChild.name}/${filename.name}`,
          flavor,
          theme,
        );
      }
    } else {
      await generateFile(templateDirectoryChild.name, flavor, theme);
    }
  }
});
