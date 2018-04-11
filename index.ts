export const CHAR_WIDTH = 2
export const CHAR_HEIGHT = 4

export const CHARS = '⠀⠁⠂⠃⠄⠅⠆⠇⡀⡁⡂⡃⡄⡅⡆⡇⠈⠉⠊⠋⠌⠍⠎⠏⡈⡉⡊⡋⡌⡍⡎⡏⠐⠑⠒⠓⠔⠕⠖⠗⡐⡑⡒⡓⡔⡕⡖⡗⠘⠙⠚⠛⠜⠝⠞⠟⡘⡙⡚⡛⡜⡝⡞⡟⠠⠡⠢⠣⠤⠥⠦⠧⡠⡡⡢⡣⡤⡥⡦⡧⠨⠩⠪⠫⠬⠭⠮⠯⡨⡩⡪⡫⡬⡭⡮⡯⠰⠱⠲⠳⠴⠵⠶⠷⡰⡱⡲⡳⡴⡵⡶⡷⠸⠹⠺⠻⠼⠽⠾⠿⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⣀⣁⣂⣃⣄⣅⣆⣇⢈⢉⢊⢋⢌⢍⢎⢏⣈⣉⣊⣋⣌⣍⣎⣏⢐⢑⢒⢓⢔⢕⢖⢗⣐⣑⣒⣓⣔⣕⣖⣗⢘⢙⢚⢛⢜⢝⢞⢟⣘⣙⣚⣛⣜⣝⣞⣟⢠⢡⢢⢣⢤⢥⢦⢧⣠⣡⣢⣣⣤⣥⣦⣧⢨⢩⢪⢫⢬⢭⢮⢯⣨⣩⣪⣫⣬⣭⣮⣯⢰⢱⢲⢳⢴⢵⢶⢷⣰⣱⣲⣳⣴⣵⣶⣷⢸⢹⢺⢻⢼⢽⢾⢿⣸⣹⣺⣻⣼⣽⣾⣿'

export interface BitmapToBrailleOptions {
	widthPixels: number
	heightPixels: number
	pixelIsLit: (x: number, y: number) => boolean
}

export function bitmapToBraille(o: BitmapToBrailleOptions) {
	const imageHeightChars = Math.ceil(o.heightPixels / CHAR_HEIGHT)
	const imageWidthChars = Math.ceil(o.widthPixels / CHAR_WIDTH)
	const result: string[] = []
	for (let y = 0; y < imageHeightChars; y++) {
		let line = ''
		for (let x = 0; x < imageWidthChars; x++) {
			const baseX = x * CHAR_WIDTH
			const baseY = y * CHAR_HEIGHT

			let charIndex = 0
			let value = 1

			for (let charX = 0; charX < CHAR_WIDTH; charX++) {
				for (let charY = 0; charY < CHAR_HEIGHT; charY++) {
					const bitmapX = baseX + charX
					const bitmapY = baseY + charY
					const pixelExists = bitmapX < o.widthPixels && bitmapY < o.heightPixels
					if (pixelExists && o.pixelIsLit(bitmapX, bitmapY)) {
						charIndex += value
					}
					value *= 2
				}
			}

			line += CHARS[charIndex]
		}
		result.push(line)
	}
	return result.join('\n')
}