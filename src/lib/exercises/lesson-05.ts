import type { LessonExercises } from '$lib/types';

// Pelajaran 05 "하루 일과" (p111–130). Listening (p119–121) needs the CD audio, the
// clock pictures on p115 #1 are covered by the time drill, and personal writing
// (p126 #2, p127) has no fixed answer, so those are left out.
export const lesson05: LessonExercises = {
	lesson: 5,
	title: '하루 일과',
	titleId: 'Kegiatan Keseharian',
	sets: [
		{
			id: 'p115-2',
			page: 115,
			title: '말하기 · Pergi ke mana?',
			instruction: 'Ucapkan tempat tujuan seperti contoh. Contoh: (gedung 식당) → 식당에 가요.',
			items: [
				{
					kind: 'reveal',
					prompt: '(1) Gedung bertuliskan 도서관',
					answer: '도서관에 가요.',
					hint: '에 + 가다 / 오다 / 다니다 = arah tujuan.'
				},
				{ kind: 'reveal', prompt: '(2) Gerbang bertuliskan ○○대학교', answer: '대학교에 가요.' },
				{ kind: 'reveal', prompt: '(3) Gedung bertuliskan ○○병원', answer: '병원에 가요.' },
				{ kind: 'reveal', prompt: '(4) Gedung bertuliskan ○○은행', answer: '은행에 가요.' }
			]
		},
		{
			id: 'p116-1',
			page: 116,
			title: '이야기해 봅시다 · Jam berapa?',
			instruction:
				'Latih percakapan seperti contoh. Contoh: 일어나다 / 오전 7:00 → A 몇 시에 일어나요? B 오전 일곱 시에 일어나요.',
			items: [
				{
					kind: 'reveal',
					prompt: '① 이를 닦다 / 오전 6:50',
					answer: 'A 몇 시에 이를 닦아요?\nB 오전 여섯 시 오십 분에 이를 닦아요.',
					hint: 'Jam memakai angka asli (여섯 시), menit memakai angka Sino (오십 분).'
				},
				{
					kind: 'reveal',
					prompt: '② 세수하다 / 오전 7:00',
					answer: 'A 몇 시에 세수해요?\nB 오전 일곱 시에 세수해요.',
					hint: '하다 → 해요.'
				},
				{
					kind: 'reveal',
					prompt: '③ 목욕을 하다 / 오후 11:30',
					answer: 'A 몇 시에 목욕을 해요?\nB 오후 열한 시 반에 목욕을 해요.',
					hint: '30 분 = 반, jadi 열한 시 삼십 분 = 열한 시 반.'
				},
				{
					kind: 'reveal',
					prompt: '④ 자다 / 새벽 1:00',
					answer: 'A 몇 시에 자요?\nB 새벽 한 시에 자요.',
					hint: '하나 + 시 → 한 시.'
				}
			]
		},
		{
			id: 'p116-2',
			page: 116,
			title: '이야기해 봅시다 · Melakukan apa?',
			instruction:
				'Latih percakapan seperti contoh. Contoh: 오후 2:00 / 도서관, 책을 읽다 → A 오후 두 시에 뭘 해요? B 도서관에서 책을 읽어요. (뭘 = singkatan 무엇을)',
			items: [
				{
					kind: 'reveal',
					prompt: '① 오전 9:00 / 학교, 공부하다',
					answer: 'A 오전 아홉 시에 뭘 해요?\nB 학교에서 공부해요.'
				},
				{
					kind: 'reveal',
					prompt: '② 오후 3:30 / 극장, 영화를 보다',
					answer: 'A 오후 세 시 반에 뭘 해요?\nB 극장에서 영화를 봐요.',
					hint: '보다 → 보아요 → 봐요.'
				},
				{
					kind: 'reveal',
					prompt: '③ 오후 5:00 / 시내, 친구를 만나다',
					answer: 'A 오후 다섯 시에 뭘 해요?\nB 시내에서 친구를 만나요.',
					hint: '만나다 → 만나아요 → 만나요.'
				},
				{
					kind: 'reveal',
					prompt: '④ 오후 7:00 / 집, 밥을 먹다',
					answer: 'A 오후 일곱 시에 뭘 해요?\nB 집에서 밥을 먹어요.',
					hint: '먹다: vokal bukan ㅏ/ㅗ → -어요.'
				}
			]
		},
		{
			id: 'p116-3',
			page: 116,
			title: '이야기해 봅시다 · Tidak pergi ke …',
			instruction:
				'Latih percakapan seperti contoh. Contoh: 학교 / 도서관 → A 내일 학교에 가요? B 아니요, 안 가요. 도서관에 가요.',
			items: [
				{
					kind: 'reveal',
					prompt: '① 도서관 / 백화점',
					answer: 'A 내일 도서관에 가요?\nB 아니요, 안 가요. 백화점에 가요.',
					hint: '안 diletakkan tepat sebelum kata kerja: 안 가요.'
				},
				{
					kind: 'reveal',
					prompt: '② 백화점 / 시장',
					answer: 'A 내일 백화점에 가요?\nB 아니요, 안 가요. 시장에 가요.'
				},
				{
					kind: 'reveal',
					prompt: '③ 시장 / 극장',
					answer: 'A 내일 시장에 가요?\nB 아니요, 안 가요. 극장에 가요.'
				},
				{
					kind: 'reveal',
					prompt: '④ 극장 / 공항',
					answer: 'A 내일 극장에 가요?\nB 아니요, 안 가요. 공항에 가요.'
				}
			]
		},
		{
			id: 'p117',
			page: 117,
			title: '이야기해 봅시다 · Kegiatan teman',
			instruction:
				'Cari tahu kegiatan harian teman. Contoh (이유나): A 유나 씨, 오전에 뭘 해요? B 학교에서 공부해요. A 오후에 뭘 해요? B 집에서 숙제해요. A 보통 몇 시에 잠을 자요? B 밤 열한 시에 자요.',
			items: [
				{
					kind: 'reveal',
					prompt: '(1) 정현우 · 오전: 공원, 운동하다 · 오후: 시내, 친구, 만나다 · 자다: 밤 12:00',
					answer:
						'A 현우 씨, 오전에 뭘 해요?\nB 공원에서 운동해요.\nA 오후에 뭘 해요?\nB 시내에서 친구를 만나요.\nA 보통 몇 시에 잠을 자요?\nB 밤 열두 시에 자요.'
				},
				{
					kind: 'reveal',
					prompt: '(2) 최유진 · 오전: 집, 청소하다 · 오후: 시장, 가다 · 자다: 밤 11:30',
					answer:
						'A 유진 씨, 오전에 뭘 해요?\nB 집에서 청소해요.\nA 오후에 뭘 해요?\nB 시장에 가요.\nA 보통 몇 시에 잠을 자요?\nB 밤 열한 시 반에 자요.',
					hint: 'Tujuan memakai 에 (시장에 가요), tempat kegiatan memakai 에서 (집에서 청소해요).'
				}
			]
		},
		{
			id: 'p118',
			page: 118,
			title: '더 알아봅시다 · Kegiatan teman Korea dan Indonesia',
			instruction:
				'Contoh (부디): A 부디 씨는 보통 아침 몇 시에 일어나요? B 5시 반에 일어나요. A 오전에 보통 뭘 해요? B 학교에서 공부해요. A 오후에는 뭘 해요? B 컴퓨터실에서 인터넷을 해요. A 그래요? 그럼, 밤 몇 시에 잠을 자요? B 12시에 자요.',
			context: [
				'〈하루 일과〉 5:30–8:00 기상 및 운동 · 8:00–8:30 아침 식사 · 9시 등교 · 9:30–12시 학교 공부',
				'12:00–13:00 점심 식사 · 13:00–15:00 인터넷 · 22:00–24:00 숙제 · 24:00 꿈나라로…'
			],
			items: [
				{
					kind: 'reveal',
					prompt:
						'(1) 안디 · 일어나다: 6시 · 오전: 회사 / 일 · 오후: 친구를 만나다 · 자다: 밤 12시 반',
					answer:
						'A 안디 씨는 보통 아침 몇 시에 일어나요?\nB 여섯 시에 일어나요.\nA 오전에 보통 뭘 해요?\nB 회사에서 일해요.\nA 오후에는 뭘 해요?\nB 친구를 만나요.\nA 그래요? 그럼, 밤 몇 시에 잠을 자요?\nB 열두 시 반에 자요.'
				},
				{
					kind: 'reveal',
					prompt: '(2) 데위 · 일어나다: 5시 · 오전: 청소 · 오후: 쇼핑을 하다 · 자다: 밤 11시 반',
					answer:
						'A 데위 씨는 보통 아침 몇 시에 일어나요?\nB 다섯 시에 일어나요.\nA 오전에 보통 뭘 해요?\nB 청소해요.\nA 오후에는 뭘 해요?\nB 쇼핑을 해요.\nA 그래요? 그럼, 밤 몇 시에 잠을 자요?\nB 열한 시 반에 자요.'
				}
			]
		},
		{
			id: 'p122-1',
			page: 122,
			title: '읽기 · Yang tidak dilakukan',
			instruction:
				'Hubungkan gambar dengan kalimat yang tepat, lalu baca dengan lantang. Contoh: (orang duduk di sofa) → ⓓ 5시에 책을 안 읽습니다.',
			items: [
				{
					kind: 'choice',
					prompt: '(1) Gambar: orang duduk di meja tulis (X)',
					options: [
						'ⓐ 8시에 수업을 안 듣습니다.',
						'ⓑ 1시에 PC방에 안 갑니다.',
						'ⓒ 2시에 일기를 안 씁니다.'
					],
					correct: 2,
					hint: '일기를 쓰다 = menulis buku harian.'
				},
				{
					kind: 'choice',
					prompt: '(2) Gambar: orang berjalan ke sebuah gedung (X)',
					options: [
						'ⓐ 8시에 수업을 안 듣습니다.',
						'ⓑ 1시에 PC방에 안 갑니다.',
						'ⓒ 2시에 일기를 안 씁니다.'
					],
					correct: 1,
					hint: 'PC방 = warung internet.'
				},
				{
					kind: 'choice',
					prompt: '(3) Gambar: orang di kelas, depan papan tulis (X)',
					options: [
						'ⓐ 8시에 수업을 안 듣습니다.',
						'ⓑ 1시에 PC방에 안 갑니다.',
						'ⓒ 2시에 일기를 안 씁니다.'
					],
					correct: 0,
					hint: '수업을 듣다 = mengikuti kuliah.'
				}
			]
		},
		{
			id: 'p122-2',
			page: 122,
			title: '읽기 · Kegiatan seorang karyawan',
			instruction:
				'Baca dengan bentuk -아/어요. Contoh: 오전 8:00 / 운전을 하다 → 오전 8시에 운전을 해요.',
			context: [
				'〈하루 일과〉 오전 7:00 일어나다 · 8:00 운전을 하다 · 8:30 회사에 가다',
				'8:40 신문을 읽다 · 오후 5:30 끝나다'
			],
			items: [
				{
					kind: 'reveal',
					prompt: '(1) 오전 7:00 / 일어나다',
					answer: '오전 7시(일곱 시)에 일어나요.'
				},
				{
					kind: 'reveal',
					prompt: '(2) 오전 8:30 / 회사에 가다',
					answer: '오전 8시 반(여덟 시 반)에 회사에 가요.'
				},
				{
					kind: 'reveal',
					prompt: '(3) 오전 8:40 / 신문을 읽다',
					answer: '오전 8시 40분(여덟 시 사십 분)에 신문을 읽어요.'
				},
				{
					kind: 'reveal',
					prompt: '(4) 오후 5:30 / 끝나다',
					answer: '오후 5시 반(다섯 시 반)에 끝나요.'
				}
			]
		},
		{
			id: 'p123',
			page: 123,
			title: '읽어 봅시다 · 부디, 신타, 에디',
			instruction: 'Baca bacaan berikut, lalu jawab. Tip: (한) -쯤 = sekitar.',
			context: [
				'부디: 부디 씨는 은행원이에요. 은행이 9시 반에 시작해요. 출근 시간은 8시 반이에요. 7시 반쯤 출발해요. 부디 씨가 운전을 해요. 7시 50분쯤 은행에 가요.',
				'신타: 오늘 신타 씨는 시험을 봅니다. 시험 후 르바란(Lebaran) 방학입니다. 방학에 고향에 갑니다. 고향에서 부모님을 만납니다.',
				'에디: 에디 씨는 영문과 학생입니다. 시험이 어렵습니다. 에디 씨 집은 자카르타입니다. 르바란(Lebaran) 방학이 짧습니다. 방학에 여행을 안 갑니다. 도서관에서 공부합니다.'
			],
			items: [
				{
					kind: 'truefalse',
					statement: '부디 씨의 은행은 8시 30분에 시작해요.',
					answer: false,
					explanation: '은행이 9시 반에 시작해요. 8시 반 adalah jam masuk kerja (출근 시간).'
				},
				{
					kind: 'truefalse',
					statement: '신타 씨는 시험 후 방학에 부모님을 만나요.',
					answer: true,
					explanation: '방학에 고향에 갑니다. 고향에서 부모님을 만납니다.'
				},
				{
					kind: 'truefalse',
					statement: '에디 씨는 방학에 여행을 안 가요.',
					answer: true,
					explanation: '방학에 여행을 안 갑니다. 도서관에서 공부합니다.'
				},
				{
					kind: 'reveal',
					prompt: '부디 — 직업이 뭐예요? / 언제 뭘 해요?',
					answer: '은행원 · 7시 반쯤 출발해요.'
				},
				{
					kind: 'reveal',
					prompt: '신타 — 직업이 뭐예요? / 언제 뭘 해요?',
					answer: '대학생 · 오늘 시험을 봐요.'
				},
				{
					kind: 'reveal',
					prompt: '에디 — 직업이 뭐예요? / 언제 뭘 해요?',
					answer: '대학생 (영문과 학생) · 방학에 도서관에서 공부해요.'
				}
			]
		},
		{
			id: 'p124',
			page: 124,
			title: '더 알아봅시다 · Jam kuliah dua mahasiswa',
			instruction: 'Baca bacaan berikut, lalu jawab.',
			context: [
				'민준 씨는 한국대학교에 다닙니다. 수업은 9시에 시작합니다. 점심 시간은 12시입니다. 오후 수업은 1시에 시작합니다. 수업은 오후 5시 50분에 끝납니다. 주말에 수업이 없습니다. 수영을 합니다.',
				'안디 씨는 인도네시아대학교 학생입니다. 월요일에 수업이 아주 많습니다. 토요일에 학교에 안 갑니다. 시내에 갑니다. 시내에서 영어를 배웁니다.'
			],
			items: [
				{
					kind: 'truefalse',
					statement: '민준 씨는 주말에 수업이 없어요.',
					answer: true,
					explanation: '주말에 수업이 없습니다.'
				},
				{
					kind: 'truefalse',
					statement: '안디 씨는 토요일에 시내에 안 가요.',
					answer: false,
					explanation: '토요일에 학교에 안 갑니다. 시내에 갑니다.'
				},
				{
					kind: 'truefalse',
					statement: '민준 씨 수업은 오후 5시 50분에 끝나요.',
					answer: true,
					explanation: '수업은 오후 5시 50분에 끝납니다.'
				},
				{
					kind: 'reveal',
					prompt: '무슨 대학교에 다녀요?',
					answer: '민준: 한국대학교 · 안디: 인도네시아대학교'
				},
				{
					kind: 'reveal',
					prompt: '언제 수업이 있어요?',
					answer:
						'민준: 9시부터 오후 5시 50분까지 (주말에는 없어요)\n안디: 월요일에 수업이 아주 많아요 (토요일에는 학교에 안 가요)'
				},
				{
					kind: 'reveal',
					prompt: '주말에 뭘 해요?',
					answer: '민준: 수영을 해요 · 안디: 시내에서 영어를 배워요',
					hint: 'Dalam bahasa lisan: 무엇을 → 뭘, 어디를 → 어딜, 누구를 → 누굴.'
				}
			]
		},
		{
			id: 'p125-1',
			page: 125,
			title: '쓰기 · Di mana melakukan apa?',
			instruction:
				'Tulis dalam bahasa Korea. Contoh: 교실 / 이야기하다 → 교실에서 이야기해요. (에서 = tempat kegiatan)',
			items: [
				{
					kind: 'reveal',
					prompt: '(1) 도서관 / 책 빌리다',
					answer: '도서관에서 책을 빌려요.',
					hint: '빌리다 → 빌리어요 → 빌려요.'
				},
				{
					kind: 'reveal',
					prompt: '(2) 카페 / 커피 마시다',
					answer: '카페에서 커피를 마셔요.',
					hint: '마시다 → 마시어요 → 마셔요.'
				},
				{ kind: 'reveal', prompt: '(3) 식당 / 밥 먹다', answer: '식당에서 밥을 먹어요.' },
				{ kind: 'reveal', prompt: '(4) 학교 / 농구하다', answer: '학교에서 농구해요.' }
			]
		},
		{
			id: 'p125-2',
			page: 125,
			title: '쓰기 · Melakukan apa jam berapa?',
			instruction:
				'Pilih kata kerja yang cocok. Contoh: 8시 반 / 커피를 → ⓒ 마시다 → 8시 반에 커피를 마십니다.',
			items: [
				{
					kind: 'choice',
					prompt: '(1) 9:00 / 회사에서',
					options: ['ⓐ 읽다', 'ⓑ 시작하다', 'ⓒ 마시다', 'ⓓ 먹다', 'ⓔ 일하다', 'ⓕ 받다'],
					correct: 4,
					hint: '9시에 회사에서 일합니다.'
				},
				{
					kind: 'choice',
					prompt: '(2) 7:10 / 신문을',
					options: ['ⓐ 읽다', 'ⓑ 시작하다', 'ⓒ 마시다', 'ⓓ 먹다', 'ⓔ 일하다', 'ⓕ 받다'],
					correct: 0,
					hint: '7시 10분에 신문을 읽습니다.'
				},
				{
					kind: 'choice',
					prompt: '(3) 5:00 / 회의를',
					options: ['ⓐ 읽다', 'ⓑ 시작하다', 'ⓒ 마시다', 'ⓓ 먹다', 'ⓔ 일하다', 'ⓕ 받다'],
					correct: 1,
					hint: '5시에 회의를 시작합니다.'
				},
				{
					kind: 'choice',
					prompt: '(4) 10:10 / 전화를',
					options: ['ⓐ 읽다', 'ⓑ 시작하다', 'ⓒ 마시다', 'ⓓ 먹다', 'ⓔ 일하다', 'ⓕ 받다'],
					correct: 5,
					hint: '10시 10분에 전화를 받습니다.'
				},
				{
					kind: 'choice',
					prompt: '(5) 오후 6시 / 저녁을',
					options: ['ⓐ 읽다', 'ⓑ 시작하다', 'ⓒ 마시다', 'ⓓ 먹다', 'ⓔ 일하다', 'ⓕ 받다'],
					correct: 3,
					hint: '오후 6시에 저녁을 먹습니다.'
				}
			]
		},
		{
			id: 'p126-1',
			page: 126,
			title: '써 봅시다 · Terjemahkan',
			instruction: 'Terjemahkan kalimat berikut ke dalam bahasa Korea.',
			items: [
				{
					kind: 'reveal',
					prompt: 'Bangun tidur pada jam 6 pagi.',
					answer: '아침 여섯 시에 일어나요. (오전 6시에 일어나요.)'
				},
				{
					kind: 'reveal',
					prompt: 'Berangkat kerja pada jam setengah 9.',
					answer: '여덟 시 반에 출근해요.'
				},
				{
					kind: 'reveal',
					prompt: 'Rapat di ruang rapat pada jam 10.',
					answer: '열 시에 회의실에서 회의해요.',
					hint: '회의실 = ruang rapat.'
				},
				{
					kind: 'reveal',
					prompt: 'Makan-makan sepulang kerja pada jam 7.',
					answer: '일곱 시에 회식을 해요.',
					hint: '회식 = makan-makan bersama rekan kantor. Bisa juga: 퇴근 후 일곱 시에 저녁을 먹어요.'
				}
			]
		},
		{
			id: 'p126-3',
			page: 126,
			title: '써 봅시다 · Ke 노래방 setelah ujian',
			instruction: 'Baca tabel, lalu lengkapi teks di bawahnya.',
			context: [
				'오늘은 무슨 날이에요? → 시험 날',
				'몇 시에 시험이 끝나요? → 오후 4시에 끝나요',
				'시험 후 어디에 가요? → 노래방에 가요',
				'누가 노래를 해요? → 친구들이 노래를 해요',
				'에디 씨가 한국 노래를 해요? → 안 해요'
			],
			items: [
				{
					kind: 'reveal',
					prompt:
						'오늘은 ___이에요. 시험이 ___에 끝나요. 시험 후 ___ 가요. ___ 노래를 해요. 한국 노래가 좋아요. 에디 씨가 한국 노래를 ___. 인도네시아 노래를 해요.',
					answer:
						'오늘은 시험 날이에요. 시험이 오후 4시(네 시)에 끝나요. 시험 후 노래방에 가요. 친구들이 노래를 해요. 한국 노래가 좋아요. 에디 씨가 한국 노래를 안 해요. 인도네시아 노래를 해요.'
				}
			]
		}
	]
};
