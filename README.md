# bitmap-to-braille

> Bitmap to unicode braille converter

## Install

```
npm i bitmap-to-braille
```
or
```
yarn add bitmap-to-braille
```

## Examples

### Generate from code

```JS
const { bitmapToBraille, CHAR_WIDTH, CHAR_HEIGHT } = require('bitmap-to-braille')

const bitmap = `
  oooo
 o    o
o o  o o
o      o
o o  o o
o  oo  o
 o    o
  oooo
`.replace(/^\n|\n$/g, '').split(`\n`)

console.log(
	bitmapToBraille({
		widthPixels: CHAR_WIDTH * 4,
		heightPixels: CHAR_HEIGHT * 2,
		pixelIsLit: (x, y) => bitmap[y][x] === 'o',
	})
)
/* Output:
⡔⠍⠩⢢
⠣⣑⣊⠜
*/
```

### Generate from image

```JS
const { bitmapToBraille, CHAR_WIDTH, CHAR_HEIGHT } = require('bitmap-to-braille')
const Jimp = require('jimp')

Jimp.read('smiley.png')
	.then(img => {
		const width = CHAR_WIDTH * 24
		const ratio = width / img.bitmap.width
		const height = Math.round(img.bitmap.height * ratio / CHAR_HEIGHT) * CHAR_HEIGHT
		return img.resize(width, height).grayscale()
	})
	.then(img => {
		const { width, height, data } = img.bitmap
		console.log(
			bitmapToBraille({
				widthPixels: width,
				heightPixels: height,
				pixelIsLit: (x, y) => data.readUInt8(y * width * 4 + x * 4) <= 127,
			})
		)
	})
	.catch(console.error)
/* Output:
⠀⠀⠀⠀⠀⠀⣀⣤⡴⠶⠚⠛⠛⠓⠶⢦⣤⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣴⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⣦⡀⠀⠀⠀
⠀⠀⣰⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣆⠀⠀
⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⠀
⢰⡏⠀⠀⠀⠀⢰⣿⠀⠀⠀⠀⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆
⣾⠀⠀⠀⠀⠀⠸⠟⠀⠀⠀⠀⠻⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷
⢿⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⡿
⠸⣇⠀⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠟⠀⠀⠀⣸⠇
⠀⢻⡄⠀⠀⠑⢄⡀⠀⠀⠀⠀⠀⠀⠀⡠⠞⠁⠀⠀⠀⢠⡟⠀
⠀⠀⠹⣦⡀⠀⠀⠉⠓⠲⠤⠤⠖⠒⠉⠀⠀⠀⠀⢀⣴⠏⠀⠀
⠀⠀⠀⠈⠻⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠟⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠛⠳⠶⢤⣤⣤⡤⠶⠞⠛⠉⠀⠀⠀⠀⠀⠀
*/
```

## License

MIT