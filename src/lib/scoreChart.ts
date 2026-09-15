import type { QuizResult } from './types';

export interface TrendPoint {
	label: string;
	accuracy: number;
	correct: number;
	wrong: number;
}

export const MAX_POINTS = 20;

export function toTrendPoints(results: QuizResult[]): TrendPoint[] {
	return [...results]
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.slice(-MAX_POINTS)
		.map((r) => ({
			label: new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
			accuracy: r.total === 0 ? 0 : Math.round((r.correct / r.total) * 100),
			correct: r.correct,
			wrong: r.wrong
		}));
}

function xPos(i: number, n: number, w: number, pad: number): number {
	if (n === 1) return w / 2;
	return pad + (i / (n - 1)) * (w - pad * 2);
}

export function accuracyPath(points: TrendPoint[], w: number, h: number, pad: number): string {
	if (points.length === 0) return '';
	const innerH = h - pad * 2;
	return points
		.map((p, i) => {
			const x = xPos(i, points.length, w, pad);
			const y = pad + innerH - (p.accuracy / 100) * innerH;
			return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
		})
		.join(' ');
}

export function dotCoords(
	points: TrendPoint[],
	w: number,
	h: number,
	pad: number
): { x: number; y: number }[] {
	const innerH = h - pad * 2;
	return points.map((p, i) => ({
		x: xPos(i, points.length, w, pad),
		y: pad + innerH - (p.accuracy / 100) * innerH
	}));
}

export interface BarGeom {
	x: number;
	yCorrect: number;
	hCorrect: number;
	yWrong: number;
	hWrong: number;
	width: number;
}

export function barLayout(
	points: TrendPoint[],
	w: number,
	h: number,
	pad: number
): { bars: BarGeom[]; maxTotal: number } {
	const innerH = h - pad * 2;
	const maxTotal = Math.max(1, ...points.map((p) => p.correct + p.wrong));
	const slot = points.length === 0 ? 0 : (w - pad * 2) / points.length;
	const bw = Math.min(28, slot * 0.28);
	return {
		bars: points.map((p, i) => {
			const cx = xPos(i, points.length, w, pad);
			const hCorrect = (p.correct / maxTotal) * innerH;
			const hWrong = (p.wrong / maxTotal) * innerH;
			return {
				x: cx,
				yCorrect: h - pad - hCorrect,
				hCorrect,
				yWrong: h - pad - hCorrect - hWrong,
				hWrong,
				width: bw
			};
		}),
		maxTotal
	};
}
