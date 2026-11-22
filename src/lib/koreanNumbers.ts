// Korean number readings (Pelajaran 4: Sino-Korean, Pelajaran 5: native Korean)
// and the question generators for the /practice/numbers drill.

const SINO_DIGITS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
const SINO_UNITS = ['', '십', '백', '천'];

/** Sino-Korean reading of 0 ≤ n < 100,000,000 (e.g. 2011 → 이천십일, 10000 → 만). */
export function sino(n: number): string {
	if (!Number.isInteger(n) || n < 0 || n >= 100_000_000) throw new RangeError(`sino(${n})`);
	if (n === 0) return '영';
	const below10k = (x: number) => {
		let out = '';
		for (let i = 3; i >= 0; i--) {
			const d = Math.floor(x / 10 ** i) % 10;
			if (d === 0) continue;
			// 1 is dropped before 십/백/천: 십, 백, 천 (not 일십 …)
			out += (d === 1 && i > 0 ? '' : SINO_DIGITS[d]) + SINO_UNITS[i];
		}
		return out;
	};
	const man = Math.floor(n / 10_000);
	const rest = n % 10_000;
	return (man === 0 ? '' : (man === 1 ? '' : below10k(man)) + '만') + below10k(rest);
}

const NATIVE_ONES = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
const NATIVE_TENS = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];

/** Native Korean reading of 1 ≤ n ≤ 99 (e.g. 21 → 스물하나). */
export function native(n: number): string {
	if (!Number.isInteger(n) || n < 1 || n > 99) throw new RangeError(`native(${n})`);
	return NATIVE_TENS[Math.floor(n / 10)] + NATIVE_ONES[n % 10];
}

/** Native number in front of a counter (시, 명, 살…): 하나→한, 둘→두, 셋→세, 넷→네, 스물→스무. */
export function nativeCounter(n: number): string {
	if (n === 20) return '스무';
	return native(n)
		.replace(/하나$/, '한')
		.replace(/둘$/, '두')
		.replace(/셋$/, '세')
		.replace(/넷$/, '네');
}

/** Index = Date#getDay() (0 = Sunday). */
export const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
export const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

/** Month name; June and October drop the final consonant: 유월, 시월. */
export function readMonth(m: number): string {
	if (m === 6) return '유월';
	if (m === 10) return '시월';
	return sino(m) + '월';
}

/** "팔월 이십삼 일 토요일" — weekday is a Date#getDay() index. */
export function readDate(m: number, d: number, weekday?: number): string {
	const date = `${readMonth(m)} ${sino(d)} 일`;
	return weekday === undefined ? date : `${date} ${WEEKDAYS[weekday]}`;
}

/** "오후 세 시 사십오 분" for 15:45. Hours use native numbers, minutes Sino-Korean. */
export function readTime(h24: number, m: number, opts: { half?: boolean } = {}): string {
	const period = h24 < 12 ? '오전' : '오후';
	const h12 = h24 % 12 || 12;
	return `${period} ${nativeCounter(h12)} 시${minutePart(m, opts.half)}`;
}

function minutePart(m: number, half = false): string {
	if (m === 0) return '';
	if (m === 30 && half) return ' 반';
	return ` ${sino(m)} 분`;
}

// ---------------------------------------------------------------------------
// Drill question generators

export interface DrillQuestion {
	/** What the learner reads, e.g. "8월 23일 (토)" or "15:45". */
	prompt: string;
	answer: string;
	/** Four choices including the answer, shuffled. */
	options: string[];
	hint: string;
}

type Rng = () => number;

const randInt = (rng: Rng, min: number, max: number) => min + Math.floor(rng() * (max - min + 1));

function shuffle<T>(arr: T[], rng: Rng): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** Answer + 3 distractors. `priority` traps are always used before random `others`. */
function buildOptions(answer: string, priority: string[], others: string[], rng: Rng): string[] {
	const picked: string[] = [];
	for (const c of [...priority, ...shuffle(others, rng)]) {
		if (picked.length === 3) break;
		if (c !== answer && !picked.includes(c)) picked.push(c);
	}
	return shuffle([answer, ...picked], rng);
}

export function dateQuestion(year: number, rng: Rng = Math.random): DrillQuestion {
	const m = randInt(rng, 1, 12);
	const d = randInt(rng, 1, new Date(year, m, 0).getDate());
	const wd = new Date(year, m - 1, d).getDay();
	const answer = readDate(m, d, wd);
	const day = `${sino(d)} 일`;
	const irregular = m === 6 || m === 10;

	const priority = irregular ? [`${sino(m)}월 ${day} ${WEEKDAYS[wd]}`] : [];
	const others = [
		`${readMonth((m % 12) + 1)} ${day} ${WEEKDAYS[wd]}`,
		`${readMonth(m)} ${native(d)} 일 ${WEEKDAYS[wd]}`,
		`${readMonth(m)} ${day} ${WEEKDAYS[(wd + 1) % 7]}`,
		`${readMonth(m)} ${day} ${WEEKDAYS[(wd + 6) % 7]}`,
		readDate(m, d === 1 ? 2 : d - 1, wd)
	];

	return {
		prompt: `${m}월 ${d}일 (${WEEKDAYS_SHORT[wd]})`,
		answer,
		options: buildOptions(answer, priority, others, rng),
		hint: irregular
			? 'Bulan 6 dan 10 dibaca 유월 dan 시월, bukan 육월 / 십월.'
			: 'Bulan dan tanggal dibaca dengan angka Sino-Korea (일, 이, 삼 …).'
	};
}

export function timeQuestion(rng: Rng = Math.random): DrillQuestion {
	const h24 = randInt(rng, 0, 23);
	const m = randInt(rng, 0, 11) * 5;
	const half = m === 30 && rng() < 0.5;
	const answer = readTime(h24, m, { half });
	const period = h24 < 12 ? '오전' : '오후';
	const otherPeriod = h24 < 12 ? '오후' : '오전';
	const h12 = h24 % 12 || 12;
	const mins = minutePart(m, half);

	const priority = [`${period} ${sino(h12)} 시${mins}`]; // Sino hour: 삼 시 ✗
	const others = [
		`${otherPeriod} ${nativeCounter(h12)} 시${mins}`,
		`${period} ${nativeCounter((h12 % 12) + 1)} 시${mins}`,
		`${period} ${native(h12)} 시${mins}`, // 셋 시 ✗ (only differs for 1–4, 11, 12)
		m > 0 && !half ? `${period} ${nativeCounter(h12)} 시 ${native(m)} 분` : '' // native minutes ✗
	].filter(Boolean);

	return {
		prompt: `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
		answer,
		options: buildOptions(answer, priority, others, rng),
		hint:
			'Jam (시) memakai angka asli Korea: 한, 두, 세 … ; menit (분) memakai angka Sino-Korea: 일, 이, 삼 … . ' +
			'00:00–11:59 = 오전, 12:00–23:59 = 오후. 30 분 boleh juga dibaca 반.'
	};
}
