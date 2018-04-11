import test from 'ava'
import { bitmapToBraille, CHAR_WIDTH, CHAR_HEIGHT } from './index'

test('Empty', t => {
	t.is(
		bitmapToBraille({
			widthPixels: CHAR_WIDTH,
			heightPixels: CHAR_HEIGHT,
			pixelIsLit: (x, y) => false,
		}),
		'⠀',
	)
})

test('Full', t => {
	t.is(
		bitmapToBraille({
			widthPixels: CHAR_WIDTH,
			heightPixels: CHAR_HEIGHT,
			pixelIsLit: (x, y) => true,
		}),
		'⣿',
	)
})

test('Checkers', t => {
	const bitmap = [
		[' ', 'o'],
		['o', ' '],
		[' ', 'o'],
		['o', ' '],
	]
	t.is(
		bitmapToBraille({
			widthPixels: bitmap[0].length,
			heightPixels: bitmap.length,
			pixelIsLit: (x, y) => bitmap[y][x] === 'o',
		}),
		'⡪',
	)
})

test('Checkers opposite', t => {
	const bitmap = [
		['o', ' '],
		[' ', 'o'],
		['o', ' '],
		[' ', 'o'],
	]
	t.is(
		bitmapToBraille({
			widthPixels: bitmap[0].length,
			heightPixels: bitmap.length,
			pixelIsLit: (x, y) => bitmap[y][x] === 'o',
		}),
		'⢕',
	)
})

test('Combine X', t => {
	const bitmap = [
		['o', ' ', ' ', 'o'],
		[' ', 'o', 'o', ' '],
		['o', ' ', ' ', 'o'],
		[' ', 'o', 'o', ' '],
	]
	t.is(
		bitmapToBraille({
			widthPixels: bitmap[0].length,
			heightPixels: bitmap.length,
			pixelIsLit: (x, y) => bitmap[y][x] === 'o',
		}),
		'⢕⡪',
	)
})

test('Combine Y', t => {
	const bitmap = [
		['o', ' '],
		[' ', 'o'],
		['o', ' '],
		[' ', 'o'],
		[' ', 'o'],
		['o', ' '],
		[' ', 'o'],
		['o', ' '],
	]
	t.is(
		bitmapToBraille({
			widthPixels: bitmap[0].length,
			heightPixels: bitmap.length,
			pixelIsLit: (x, y) => bitmap[y][x] === 'o',
		}),
		'⢕\n⡪',
	)
})

test('Small image', t => {
	const bitmap = [
		['o'],
		['o'],
	]
	t.is(
		bitmapToBraille({
			widthPixels: bitmap[0].length,
			heightPixels: bitmap.length,
			pixelIsLit: (x, y) => bitmap[y][x] === 'o',
		}),
		'⠃',
	)
})