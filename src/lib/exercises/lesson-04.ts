import type { LessonExercises } from '$lib/types';

// Pelajaran 04 "날짜와 요일" (p91–110). Listening (p99–101) needs the CD audio and
// personal writing tasks (p106 #2, p107) have no fixed answer, so both are left out.
export const lesson04: LessonExercises = {
	lesson: 4,
	title: '날짜와 요일',
	titleId: 'Tanggal dan Hari',
	sets: [
		{
			id: 'p95-1',
			page: 95,
			title: '말하기 · Ucapkan tanggal',
			instruction:
				'Ucapkan tanggal dan hari berikut seperti contoh. Contoh: 8월 23일 토요일 → 팔월 이십삼 일 토요일입니다.',
			items: [
				{
					kind: 'reveal',
					prompt: '10월 1일 수요일',
					answer: '시월 일 일 수요일입니다.',
					hint: '10월 dibaca 시월, bukan 십월.'
				},
				{ kind: 'reveal', prompt: '5월 16일 금요일', answer: '오월 십육 일 금요일입니다.' },
				{
					kind: 'reveal',
					prompt: '6월 11일 목요일',
					answer: '유월 십일 일 목요일입니다.',
					hint: '6월 dibaca 유월, bukan 육월.'
				},
				{ kind: 'reveal', prompt: '12월 20일 일요일', answer: '십이월 이십 일 일요일입니다.' }
			]
		},
		{
			id: 'p95-2',
			page: 95,
			title: '말하기 · Pasangkan pertanyaan',
			instruction: 'Kapan kalimat berikut digunakan? Pilih jawaban yang cocok.',
			items: [
				{
					kind: 'choice',
					prompt: '언제 시험을 봅니까?',
					options: [
						'ⓐ 9층에 있습니다.',
						'ⓑ 762-5959입니다.',
						'ⓒ 12월 13일입니다.',
						'ⓓ 다음 주 화요일에 봅니다.'
					],
					correct: 3,
					hint: '언제 = kapan → dijawab dengan waktu.'
				},
				{
					kind: 'choice',
					prompt: '극장이 몇 층에 있습니까?',
					options: [
						'ⓐ 9층에 있습니다.',
						'ⓑ 762-5959입니다.',
						'ⓒ 12월 13일입니다.',
						'ⓓ 다음 주 화요일에 봅니다.'
					],
					correct: 0,
					hint: '층 = lantai.'
				},
				{
					kind: 'choice',
					prompt: '전화번호가 몇 번입니까?',
					options: [
						'ⓐ 9층에 있습니다.',
						'ⓑ 762-5959입니다.',
						'ⓒ 12월 13일입니다.',
						'ⓓ 다음 주 화요일에 봅니다.'
					],
					correct: 1,
					hint: '전화번호 = nomor telepon.'
				},
				{
					kind: 'choice',
					prompt: '생일이 며칠입니까?',
					options: [
						'ⓐ 9층에 있습니다.',
						'ⓑ 762-5959입니다.',
						'ⓒ 12월 13일입니다.',
						'ⓓ 다음 주 화요일에 봅니다.'
					],
					correct: 2,
					hint: '며칠 = tanggal berapa.'
				}
			]
		},
		{
			id: 'p96-1',
			page: 96,
			title: '이야기해 봅시다 · Tanggal berapa?',
			instruction:
				'Latih percakapan seperti contoh. Contoh: A 오늘이 몇 월 며칠입니까? B 시월 이 일입니다. A 무슨 요일입니까? B 금요일입니다.',
			context: [
				'Kalender Oktober: 1 = Kamis, 오늘 = 2 (금)',
				'9 = 한글날 · 13 = 한국어 시험 · 25 = 민준 생일'
			],
			items: [
				{
					kind: 'reveal',
					prompt: '① 한글날',
					answer:
						'A 한글날이 몇 월 며칠입니까?\nB 시월 구 일입니다.\nA 무슨 요일입니까?\nB 금요일입니다.',
					hint: '"Tanggal berapa?" memakai 며칠, bukan 몇 일.'
				},
				{
					kind: 'reveal',
					prompt: '② 한국어 시험',
					answer:
						'A 한국어 시험이 몇 월 며칠입니까?\nB 시월 십삼 일입니다.\nA 무슨 요일입니까?\nB 화요일입니다.'
				},
				{
					kind: 'reveal',
					prompt: '③ 민준 생일',
					answer:
						'A 민준 씨 생일이 몇 월 며칠입니까?\nB 시월 이십오 일입니다.\nA 무슨 요일입니까?\nB 일요일입니다.'
				}
			]
		},
		{
			id: 'p96-2',
			page: 96,
			title: '이야기해 봅시다 · Kapan?',
			instruction:
				'Latih percakapan seperti contoh. Contoh: A 언제 친구를 만납니까? B 목요일(3월 30일)에 친구를 만납니다. (Kegiatan diambil dari foto di buku.)',
			items: [
				{
					kind: 'reveal',
					prompt: '① 7월 8일 (토) · foto: mendaki gunung',
					answer: 'A 언제 등산합니까?\nB 토요일(7월 8일)에 등산합니다.',
					hint: '에 diletakkan setelah kata waktu: 토요일에.'
				},
				{
					kind: 'reveal',
					prompt: '② 12월 29일 (수) · foto: berbelanja',
					answer: 'A 언제 쇼핑합니까?\nB 수요일(12월 29일)에 쇼핑합니다.'
				},
				{
					kind: 'reveal',
					prompt: '③ 3월 14일 (금) · foto: bioskop',
					answer: 'A 언제 영화를 봅니까?\nB 금요일(3월 14일)에 영화를 봅니다.'
				},
				{
					kind: 'reveal',
					prompt: '④ 10월 10일 (월) · foto: belajar',
					answer: 'A 언제 공부합니까?\nB 월요일(10월 10일)에 공부합니다.'
				}
			]
		},
		{
			id: 'p97',
			page: 97,
			title: '이야기해 봅시다 · Janji dengan teman',
			instruction:
				'Tanyakan jadwal teman seperti contoh. Contoh: A 민준 씨, 언제 등산합니까? B 4월 17일에 갑니다. A 4월 17일이 토요일입니까? B 아니요, 일요일입니다.',
			items: [
				{
					kind: 'reveal',
					prompt: '(1) 지원 · 7월 5일 · 화요일 (dicoret) → 수요일 · 수영',
					answer:
						'A 지원 씨, 언제 수영합니까?\nB 7월 5일에 수영합니다.\nA 7월 5일이 화요일입니까?\nB 아니요, 수요일입니다.'
				},
				{
					kind: 'reveal',
					prompt: '(2) 유진 · 12월 20일 · 목요일 (dicoret) → 금요일 · 안디 씨 생일 파티',
					answer:
						'A 유진 씨, 언제 안디 씨 생일 파티를 합니까?\nB 12월 20일에 합니다.\nA 12월 20일이 목요일입니까?\nB 아니요, 금요일입니다.'
				}
			]
		},
		{
			id: 'p98',
			page: 98,
			title: '더 알아봅시다 · Rencana wisata teman',
			instruction:
				'Tanyakan tanggal kedatangan teman dari Korea dan rencananya. Contoh: A 언제 도착합니까? B 3월 2일에 도착합니다. A 2일이 무슨 요일입니까? B 목요일입니다. A 금요일에 무엇을 합니까? B 인도네시아대학교에서 친구를 만납니다.',
			items: [
				{
					kind: 'reveal',
					prompt: '(1) 6/20 (월) 발리 덴파사르 공항 도착 · 6/21 (화) 쿠타, 수영하다',
					answer:
						'A 언제 도착합니까?\nB 6월 20일에 도착합니다.\nA 20일이 무슨 요일입니까?\nB 월요일입니다.\nA 화요일에 무엇을 합니까?\nB 쿠타에서 수영합니다.',
					hint: '6월 dibaca 유월.'
				},
				{
					kind: 'reveal',
					prompt:
						'(2) 4/12 (금) 족자카르타 공항 도착 · 4/13 (토) 프람바난 광장, 라마야나 연극 구경하다',
					answer:
						'A 언제 도착합니까?\nB 4월 12일에 도착합니다.\nA 12일이 무슨 요일입니까?\nB 금요일입니다.\nA 토요일에 무엇을 합니까?\nB 프람바난 광장에서 라마야나 연극을 구경합니다.'
				}
			]
		},
		{
			id: 'p102-1',
			page: 102,
			title: '읽기 · Baca angka',
			instruction: 'Bacalah angka berikut dengan lantang.',
			items: [
				{
					kind: 'reveal',
					prompt: 'Gedung: 3층 · 2층 · 1층',
					answer: '삼 층, 이 층, 일 층',
					hint: '층 memakai angka Sino-Korea.'
				},
				{ kind: 'reveal', prompt: 'Pintu 진료실: 205호', answer: '이백오 호' },
				{
					kind: 'reveal',
					prompt: 'Kaleng: 유통기한 2011년 6월 6일',
					answer: '이천십일 년 유월 육 일',
					hint: 'Bulan 6 = 유월, tetapi tanggal 6 tetap 육 일.'
				}
			]
		},
		{
			id: 'p102-2',
			page: 102,
			title: '읽기 · Kartu nama',
			instruction: 'Baca kartu nama, lalu pilih O jika benar dan X jika salah.',
			context: [
				'한국대학교 한국어교육원',
				'강사 김민호',
				'한국대학교 한국어교육원 5층 503호',
				'전화: 764-7825 · E-mail: kim@hku.ac.kr'
			],
			items: [
				{
					kind: 'truefalse',
					statement: '이 사람은 학생입니다.',
					answer: false,
					explanation: 'Dia 강사 (pengajar), bukan 학생.'
				},
				{
					kind: 'truefalse',
					statement: '이름이 김민호입니다.',
					answer: true,
					explanation: 'Nama di kartu: 김민호.'
				},
				{
					kind: 'truefalse',
					statement: '전화번호는 칠육사의 칠팔이오입니다.',
					answer: true,
					explanation: '764-7825 → 칠육사의 칠팔이오. Tanda "-" dibaca 의 [에].'
				}
			]
		},
		{
			id: 'p102-3',
			page: 102,
			title: '읽기 · Pengumuman ujian',
			instruction: 'Baca pengumuman, lalu pilih O jika benar dan X jika salah.',
			context: ['시험 안내', '3월 19일 (목) 읽기, 쓰기', '3월 20일 (금) 듣기, 말하기'],
			items: [
				{
					kind: 'truefalse',
					statement: '목요일과 금요일에 시험을 봅니다.',
					answer: true,
					explanation: 'Ujian hari Kamis (19) dan Jumat (20).'
				},
				{
					kind: 'truefalse',
					statement: '삼월 십구 일에 말하기 시험을 봅니다.',
					answer: false,
					explanation: 'Tanggal 19 ujian 읽기 dan 쓰기; 말하기 tanggal 20.'
				},
				{
					kind: 'truefalse',
					statement: '삼월 이십 일에 듣기 시험을 봅니다.',
					answer: true,
					explanation: 'Tanggal 20: 듣기 dan 말하기.'
				}
			]
		},
		{
			id: 'p103',
			page: 103,
			title: '읽어 봅시다 · Rencana tiga teman',
			instruction: 'Baca rencana tiga teman, lalu jawab.',
			context: [
				'안디: 저는 날마다 한국어를 배웁니다. 한국어 읽기와 말하기를 좋아합니다. 주말에 수업이 없습니다. 주말에 수영을 합니다.',
				'신타: 저는 식당에서 아르바이트를 합니다. 화요일과 목요일에 일을 합니다. 11월 8일은 유진 씨 생일입니다. 우리는 유진 씨 집에서 생일 파티를 합니다.',
				'와완: 저는 인도네시아어 선생님입니다. 월요일, 수요일, 금요일에 인도네시아어를 가르칩니다. 이번 토요일에 서울을 구경합니다.'
			],
			items: [
				{
					kind: 'truefalse',
					statement: '안디 씨는 토요일에 한국어를 배웁니다.',
					answer: false,
					explanation: '주말에 수업이 없습니다 — di akhir pekan Andi berenang.'
				},
				{
					kind: 'truefalse',
					statement: '십일월 팔 일은 유진 씨의 생일입니다.',
					answer: true,
					explanation: '11월 8일은 유진 씨 생일입니다.'
				},
				{
					kind: 'truefalse',
					statement: '와완 씨는 화요일과 목요일에 인도네시아어 수업이 있습니다.',
					answer: false,
					explanation: 'Wawan mengajar hari Senin, Rabu, dan Jumat.'
				},
				{
					kind: 'reveal',
					prompt: 'Lengkapi jadwal 11월 8 (일) – 14 (토): 안디',
					answer: '8 (일) 수영 · 9–13 (월–금) 한국어 수업 · 14 (토) 수영'
				},
				{
					kind: 'reveal',
					prompt: 'Lengkapi jadwal: 신타',
					answer: '8 (일) 유진 씨 생일 파티 · 10 (화) 아르바이트 · 12 (목) 아르바이트'
				},
				{
					kind: 'reveal',
					prompt: 'Lengkapi jadwal: 와완',
					answer: '9 (월) · 11 (수) · 13 (금) 인도네시아어 수업 · 14 (토) 서울 구경'
				}
			]
		},
		{
			id: 'p104',
			page: 104,
			title: '더 알아봅시다 · Jadwal Wawan',
			instruction: 'Baca jadwal kegiatan Wawan (April 2011), lalu jawab.',
			context: [
				'오늘은 4월 9일입니다. 토요일입니다. 오늘 한국 친구를 만납니다.',
				'한국 친구는 자카르타에서 인도네시아어를 공부합니다.',
				'저는 다음 수요일에 한국어 시험을 봅니다.',
				'내일 도서관에서 한국어 시험공부를 합니다.',
				'그리고 다음 주말에 여행을 갑니다. 발리 쿠타에서 수영을 합니다.'
			],
			items: [
				{
					kind: 'reveal',
					prompt: 'Isi kalender April dengan jadwal Wawan.',
					answer:
						'9 (토) 한국 친구를 만납니다\n10 (일) 도서관에서 한국어 시험공부\n13 (수) 한국어 시험\n16–17 (토–일) 발리 쿠타 여행, 수영'
				},
				{
					kind: 'truefalse',
					statement: '한국 친구는 수요일에 시험을 봅니다.',
					answer: false,
					explanation: 'Yang ujian hari Rabu adalah Wawan sendiri (저는 … 시험을 봅니다).'
				},
				{
					kind: 'truefalse',
					statement: '와완 씨는 주말에 한국 친구를 만납니다.',
					answer: true,
					explanation: '4월 9일 = Sabtu, akhir pekan.'
				},
				{
					kind: 'truefalse',
					statement: '와완 씨는 4월 10일에 도서관에서 공부합니다.',
					answer: true,
					explanation: '내일 (besok) = 10일.'
				},
				{
					kind: 'truefalse',
					statement: '와완 씨는 이번 주말에 발리 쿠타에서 수영을 합니다.',
					answer: false,
					explanation: 'Ke Bali 다음 주말 (akhir pekan depan, 16–17), bukan 이번 주말.'
				}
			]
		},
		{
			id: 'p105-1',
			page: 105,
			title: '쓰기 · Tulis angka',
			instruction: 'Tulis angka berikut dengan Hangul. Contoh: 4월 12일 (화) → 사월 십이 일 화요일',
			items: [
				{ kind: 'reveal', prompt: '한국어학과 사무실: 205호', answer: '이백오 호' },
				{
					kind: 'reveal',
					prompt: 'Kartu kredit, masa berlaku: 2012년 10월',
					answer: '이천십이 년 시월'
				},
				{
					kind: 'reveal',
					prompt: 'Tiket 미술관, tanggal masuk: 2012년 9월 27일',
					answer: '이천십이 년 구월 이십칠 일'
				}
			]
		},
		{
			id: 'p105-2',
			page: 105,
			title: '쓰기 · Nama hari',
			instruction: 'Tulis nama hari yang tepat. Januari: tanggal 5 = 월요일, tanggal 8 = 목요일.',
			items: [
				{ kind: 'reveal', prompt: '1월 4일', answer: '일요일' },
				{ kind: 'reveal', prompt: '1월 6일', answer: '화요일' },
				{ kind: 'reveal', prompt: '1월 7일', answer: '수요일' },
				{ kind: 'reveal', prompt: '1월 9일', answer: '금요일' },
				{ kind: 'reveal', prompt: '1월 10일', answer: '토요일' }
			]
		},
		{
			id: 'p105-3',
			page: 105,
			title: '쓰기 · Kalender Juni',
			instruction:
				'Buat kalimat sesuai kalender. Contoh: 토, 일 (수영) → 토요일과 일요일에 수영을 합니다.',
			items: [
				{
					kind: 'reveal',
					prompt: '월, 수 (공부)',
					answer: '월요일과 수요일에 공부를 합니다.',
					hint: '과 setelah konsonan (월요일과), 와 setelah vokal.'
				},
				{ kind: 'reveal', prompt: '화, 목 (친구)', answer: '화요일과 목요일에 친구를 만납니다.' },
				{ kind: 'reveal', prompt: '금, 일 (집안일)', answer: '금요일과 일요일에 집안일을 합니다.' }
			]
		},
		{
			id: 'p106-1',
			page: 106,
			title: '써 봅시다 · Terjemahkan',
			instruction: 'Terjemahkan kalimat berikut ke dalam bahasa Korea.',
			items: [
				{
					kind: 'reveal',
					prompt: 'Kapan ulang tahun Anda?',
					answer: '생일이 언제입니까?',
					hint: '언제 tidak diikuti partikel 에.'
				},
				{ kind: 'reveal', prompt: 'Besok hari Kamis.', answer: '내일은 목요일입니다.' },
				{
					kind: 'reveal',
					prompt: 'Bertemu teman pada tanggal 23.',
					answer: '23일(이십삼 일)에 친구를 만납니다.'
				},
				{ kind: 'reveal', prompt: 'Hari ini hari apa?', answer: '오늘은 무슨 요일입니까?' }
			]
		},
		{
			id: 'p106-3',
			page: 106,
			title: '써 봅시다 · Rencana minggu ini',
			instruction: 'Baca memo, lalu lengkapi teks di bawahnya.',
			context: [
				'이번 주 계획',
				'7월 14일 (화) 수영 · 7월 15일 (수) 컴퓨터 · 7월 16일 (목) 인다 씨, 커피숍',
				'7월 17일 (금) 컴퓨터, 도서관 · 7월 18일 (토) 백화점 · 7월 19일 (일) 동생 생일'
			],
			items: [
				{
					kind: 'reveal',
					prompt:
						'제 이번 주 계획입니다. 7월 14일 ___에 수영합니다. 저는 ___요일과 ___에 컴퓨터를 배웁니다. 그리고 ___월 ___일에 ___에서 친구 인다 씨를 만납니다. 19일이 동생 생일입니다. ___에 동생 생일 파티를 합니다. 그래서 ___에 백화점에서 선물을 삽니다.',
					answer:
						'제 이번 주 계획입니다. 7월 14일 화요일에 수영합니다. 저는 수요일과 금요일에 컴퓨터를 배웁니다. 그리고 7월 16일에 커피숍에서 친구 인다 씨를 만납니다. 19일이 동생 생일입니다. 일요일에 동생 생일 파티를 합니다. 그래서 토요일에 백화점에서 선물을 삽니다.'
				}
			]
		}
	]
};
