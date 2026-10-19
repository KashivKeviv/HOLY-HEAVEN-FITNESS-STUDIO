export type Language = 'en' | 'ml';

export interface Bilingual {
  en: string;
  ml: string;
}

export const tr = (value: Bilingual, language: Language): string => value[language];

export type Workout = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  category: 'Strength' | 'Mobility' | 'Cardio';
  level: 'Beginner' | 'All levels';
  minutes: number;
  equipment: Bilingual;
  image: string;
  exercises: Array<{ name: Bilingual; seconds: number; cue: Bilingual }>;
};

export const workouts: Workout[] = [
  {
    id: 'full-body-foundation',
    title: { en: 'Full-body foundation', ml: 'ശരീരം മുഴുവൻ കരുത്തിലേക്ക്' },
    description: {
      en: 'An 18-minute introduction to strength, including warm-up, movement blocks with rest, and a gentle finish. Move comfortably and pause whenever you need more recovery.',
      ml: 'വാം-അപ്പ്, വിശ്രമം ഉൾപ്പെടുത്തിയ ചലനങ്ങൾ, ലളിതമായ സമാപനം എന്നിവയുള്ള 18 മിനിറ്റ് ശക്തിവർധക പരിശീലനം. സൗകര്യപ്രദമായി ചെയ്യുക. കൂടുതൽ വിശ്രമം ആവശ്യമുള്ളപ്പോൾ ടൈമർ നിർത്തിവയ്ക്കുക.',
    },
    category: 'Strength', level: 'Beginner', minutes: 18,
    equipment: { en: 'A sturdy chair + a wall', ml: 'ഉറപ്പുള്ള ഒരു കസേരയും ചുമരും' },
    image: '/images/workout-strength.jpg',
    exercises: [
      { name: { en: 'Easy march · warm-up', ml: 'സാവധാനമുള്ള മാർച്ച് · വാം-അപ്പ്' }, seconds: 180, cue: { en: 'Begin with small, slow steps and relaxed breathing. Alternate 30–45 seconds of marching with an easy pause as needed. Gradually warm up without rushing.', ml: 'ചെറിയ ചുവടുകളോടെ സാവധാനം തുടങ്ങി സ്വാഭാവികമായി ശ്വസിക്കുക. 30–45 സെക്കൻഡ് മാർച്ച് ചെയ്തശേഷം ആവശ്യത്തിന് അല്പം വിശ്രമിക്കുക. തിരക്കുകൂട്ടാതെ ശരീരത്തെ തയ്യാറാക്കുക.' } },
      { name: { en: 'Chair sit-to-stand + rest', ml: 'കസേരയിൽ ഇരുന്ന് എഴുന്നേൽക്കുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Place the chair against a wall. Do 6–10 comfortable repetitions, then rest 30–45 seconds. Repeat gently within this block. Use your hands for support if helpful.', ml: 'കസേര ചുമരിനോട് ചേർത്തുവയ്ക്കുക. സൗകര്യപ്രദമായി 6–10 തവണ ഇരുന്ന് എഴുന്നേറ്റശേഷം 30–45 സെക്കൻഡ് വിശ്രമിക്കുക. ഈ സമയത്തിനുള്ളിൽ സാവധാനം ആവർത്തിക്കുക. ആവശ്യമെങ്കിൽ കൈകളുടെ സഹായം ഉപയോഗിക്കുക.' } },
      { name: { en: 'Wall push-up + rest', ml: 'ചുമരിൽ പുഷ്-അപ്പ് + വിശ്രമം' }, seconds: 180, cue: { en: 'Hands at shoulder height, bend your elbows comfortably and press back. Do 6–10 controlled repetitions, rest 30–45 seconds and repeat. Stand closer to the wall to make it easier.', ml: 'തോളിന്റെ ഉയരത്തിൽ കൈകൾ ചുമരിൽ വച്ച് കൈമുട്ടുകൾ സൗകര്യപ്രദമായി മടക്കി തിരികെ തള്ളുക. 6–10 തവണ ചെയ്തശേഷം 30–45 സെക്കൻഡ് വിശ്രമിച്ച് ആവർത്തിക്കുക. എളുപ്പമാക്കാൻ ചുമരിനോട് അടുത്തുനിൽക്കുക.' } },
      { name: { en: 'Supported hip hinge + rest', ml: 'പിന്തുണയോടെ അരക്കെട്ടിൽനിന്ന് കുനിയുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Hold the chair lightly, soften your knees and send your hips back. Return slowly. Do 6–10 comfortable repetitions, then rest 30–45 seconds before repeating. Avoid rounding or forcing your back.', ml: 'കസേരയിൽ ലഘുവായി പിടിച്ച് മുട്ടുകൾ അല്പം മടക്കി ഇടുപ്പ് പിന്നിലേക്ക് നീക്കി സാവധാനം മടങ്ങുക. 6–10 തവണ ചെയ്തശേഷം 30–45 സെക്കൻഡ് വിശ്രമിച്ച് ആവർത്തിക്കുക. മുതുക് ബലമായി വളയ്ക്കരുത്.' } },
      { name: { en: 'Supported calf raise + rest', ml: 'പിന്തുണയോടെ കുതികാൽ ഉയർത്തുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Hold the chair, lift both heels slowly and lower with control. Do 6–10 repetitions, rest 30–45 seconds, then repeat only if comfortable. Keep breathing naturally.', ml: 'കസേരയിൽ പിടിച്ച് രണ്ട് കുതികാലുകളും സാവധാനം ഉയർത്തി നിയന്ത്രണത്തോടെ താഴ്ത്തുക. 6–10 തവണ ചെയ്തശേഷം 30–45 സെക്കൻഡ് വിശ്രമിക്കുക. സുഖമാണെങ്കിൽ മാത്രം ആവർത്തിക്കുക. ശ്വാസം പിടിക്കരുത്.' } },
      { name: { en: 'Easy side steps · cool-down', ml: 'സാവധാനമുള്ള വശചുവടുകൾ · സമാപനം' }, seconds: 180, cue: { en: 'Take small side steps, slowing gradually. Rest whenever you wish and finish with relaxed breathing. Stop if a movement causes pain.', ml: 'വശങ്ങളിലേക്ക് ചെറിയ ചുവടുകൾ വച്ച് വേഗം ക്രമേണ കുറയ്ക്കുക. ആവശ്യമുള്ളപ്പോൾ വിശ്രമിച്ച് സ്വാഭാവികമായ ശ്വാസത്തോടെ അവസാനിപ്പിക്കുക. ഏതെങ്കിലും ചലനം വേദന ഉണ്ടാക്കിയാൽ നിർത്തുക.' } },
    ],
  },
  {
    id: 'mobility-reset',
    title: { en: 'The mobility reset', ml: 'ചലനങ്ങൾക്ക് ഒരു പുതുമ' },
    description: {
      en: 'A calm 12-minute standing mobility session. Each two-minute block includes gentle movement and pauses. Never force a stretch or hold your breath.',
      ml: 'നിന്നുകൊണ്ട് ചെയ്യുന്ന ശാന്തമായ 12 മിനിറ്റ് മൊബിലിറ്റി പരിശീലനം. ഓരോ രണ്ട് മിനിറ്റിലും ലളിതമായ ചലനങ്ങളും ഇടവേളകളും ഉൾപ്പെടുന്നു. ബലമായി വലിച്ചുനീട്ടുകയോ ശ്വാസം പിടിക്കുകയോ അരുത്.',
    },
    category: 'Mobility', level: 'All levels', minutes: 12,
    equipment: { en: 'A sturdy chair for support', ml: 'പിന്തുണയ്ക്കായി ഉറപ്പുള്ള ഒരു കസേര' },
    image: '/images/workout-mobility.jpg',
    exercises: [
      { name: { en: 'Shoulder rolls + pause', ml: 'തോളുകൾ വട്ടത്തിൽ ചലിപ്പിക്കുക + ഇടവേള' }, seconds: 120, cue: { en: 'Make 3–5 slow shoulder circles, then relax for 20–30 seconds. Repeat in the other direction. Keep your neck relaxed and use small, comfortable movements.', ml: 'തോളുകൾ സാവധാനം 3–5 തവണ വട്ടത്തിൽ ചലിപ്പിച്ച് 20–30 സെക്കൻഡ് അയവിലാക്കുക. മറുദിശയിലും ആവർത്തിക്കുക. കഴുത്ത് അയവിലാക്കി ചെറിയ, സൗകര്യപ്രദമായ ചലനങ്ങൾ ചെയ്യുക.' } },
      { name: { en: 'Gentle chest opening + pause', ml: 'നെഞ്ച് സാവധാനം തുറക്കുക + ഇടവേള' }, seconds: 120, cue: { en: 'Open your arms comfortably, then bring them forward. Do 3–5 easy repetitions, rest 20–30 seconds and repeat. Avoid pulling the shoulders back hard.', ml: 'കൈകൾ സൗകര്യപ്രദമായി വശങ്ങളിലേക്ക് തുറന്നശേഷം മുന്നിലേക്ക് കൊണ്ടുവരിക. 3–5 തവണ ചെയ്തശേഷം 20–30 സെക്കൻഡ് വിശ്രമിച്ച് ആവർത്തിക്കുക. തോളുകൾ ബലമായി പിന്നിലേക്ക് വലിക്കരുത്.' } },
      { name: { en: 'Standing trunk turns + pause', ml: 'നിന്നുകൊണ്ട് ഉടൽ തിരിക്കുക + ഇടവേള' }, seconds: 120, cue: { en: 'Turn gently from side to side 3–5 times, then rest 20–30 seconds. Repeat within a small, comfortable range. Allow your feet to turn if needed.', ml: 'ഉടൽ സാവധാനം ഇരുവശത്തേക്കും 3–5 തവണ തിരിച്ച് 20–30 സെക്കൻഡ് വിശ്രമിക്കുക. ചെറിയ, സൗകര്യപ്രദമായ പരിധിയിൽ ആവർത്തിക്കുക. ആവശ്യമെങ്കിൽ കാലുകളും അല്പം തിരിക്കാം.' } },
      { name: { en: 'Supported hip circles + pause', ml: 'പിന്തുണയോടെ ഇടുപ്പ് ചലിപ്പിക്കുക + ഇടവേള' }, seconds: 120, cue: { en: 'Hold the chair and make 3–5 small hip circles each way. Relax for 20–30 seconds before repeating. Keep the movement gentle rather than trying for a deep stretch.', ml: 'കസേരയിൽ പിടിച്ച് ഇടുപ്പ് ഓരോ ദിശയിലും 3–5 തവണ ചെറിയ വട്ടത്തിൽ ചലിപ്പിക്കുക. 20–30 സെക്കൻഡ് വിശ്രമിച്ചശേഷം ആവർത്തിക്കുക. കൂടുതൽ വലിച്ചുനീട്ടാൻ ശ്രമിക്കാതെ സാവധാനം ചെയ്യുക.' } },
      { name: { en: 'Heel-to-toe rocks + pause', ml: 'കുതികാലിൽനിന്ന് മുൻപാദത്തിലേക്ക് ഭാരം മാറ്റുക + ഇടവേള' }, seconds: 120, cue: { en: 'With chair support, gently lift your toes, then your heels, 6–8 times. Rest 20–30 seconds and repeat only while comfortable. Keep your balance supported.', ml: 'കസേരയുടെ പിന്തുണയോടെ മുൻപാദവും പിന്നെ കുതികാലുകളും സാവധാനം 6–8 തവണ ഉയർത്തുക. 20–30 സെക്കൻഡ് വിശ്രമിച്ച് സുഖമുള്ളിടത്തോളം മാത്രം ആവർത്തിക്കുക. സന്തുലിതാവസ്ഥയ്ക്ക് പിന്തുണ ഉപയോഗിക്കുക.' } },
      { name: { en: 'Gentle calf stretch + pause', ml: 'കാൽവണ്ണ സാവധാനം വലിച്ചുനീട്ടുക + ഇടവേള' }, seconds: 120, cue: { en: 'Hands on the wall, step one foot back with the heel down. Hold gently for 15–20 seconds per side, then rest. Repeat only if comfortable; never bounce or push into pain.', ml: 'കൈകൾ ചുമരിൽ വച്ച് ഒരു കാൽ പിന്നിലേക്ക് നീക്കി കുതികാൽ നിലത്ത് വയ്ക്കുക. ഓരോ കാലിലും 15–20 സെക്കൻഡ് മൃദുവായി നിലനിർത്തിയശേഷം വിശ്രമിക്കുക. സുഖമാണെങ്കിൽ മാത്രം ആവർത്തിക്കുക. കുലുക്കുകയോ വേദനയിലേക്ക് തള്ളുകയോ അരുത്.' } },
    ],
  },
  {
    id: 'low-impact-cardio',
    title: { en: 'Feel-good, low-impact cardio', ml: 'ചാടാതെ ചെയ്യാവുന്ന കാർഡിയോ' },
    description: {
      en: 'A 15-minute session of simple steps, including a gradual start and finish. Alternate movement with easy rest. Stay at a pace where you can still talk.',
      ml: 'സാവധാനമുള്ള തുടക്കവും സമാപനവും ഉൾപ്പെടുന്ന 15 മിനിറ്റ് ലളിതമായ ചുവടുകൾ. ചലനങ്ങൾക്കിടയിൽ ആവശ്യത്തിന് വിശ്രമിക്കുക. സംസാരിക്കാൻ കഴിയുന്ന വേഗത്തിൽ ചെയ്യുക.',
    },
    category: 'Cardio', level: 'Beginner', minutes: 15,
    equipment: { en: 'A little clear floor space', ml: 'തടസ്സങ്ങളില്ലാത്ത അല്പം സ്ഥലം' },
    image: '/images/workout-cardio.jpg',
    exercises: [
      { name: { en: 'Easy march · warm-up', ml: 'സാവധാനമുള്ള മാർച്ച് · വാം-അപ്പ്' }, seconds: 180, cue: { en: 'Begin with small steps and let your arms swing naturally. Move for 30–45 seconds, then slow down or pause as needed. Warm up gradually; you should be able to talk.', ml: 'ചെറിയ ചുവടുകളോടെ തുടങ്ങി കൈകൾ സ്വാഭാവികമായി ചലിപ്പിക്കുക. 30–45 സെക്കൻഡ് ചെയ്തശേഷം ആവശ്യത്തിന് വേഗം കുറയ്ക്കുകയോ വിശ്രമിക്കുകയോ ചെയ്യുക. ക്രമേണ ശരീരത്തെ തയ്യാറാക്കുക. സംസാരിക്കാൻ കഴിയണം.' } },
      { name: { en: 'Side step and touch + rest', ml: 'വശത്തേക്ക് ചുവടുവച്ച് കാലുകൾ ചേർക്കുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Step to one side and bring the other foot in. Alternate for 30–45 seconds, then rest or march gently for 30 seconds. Repeat at a comfortable pace with soft knees.', ml: 'ഒരു വശത്തേക്ക് ചുവടുവച്ച് മറ്റേ കാൽ അടുത്തേക്ക് കൊണ്ടുവരിക. 30–45 സെക്കൻഡ് ഇരുവശത്തേക്കും ചെയ്തശേഷം 30 സെക്കൻഡ് വിശ്രമിക്കുകയോ സാവധാനം മാർച്ച് ചെയ്യുകയോ ചെയ്യുക. മുട്ടുകൾ അല്പം മടക്കി സൗകര്യപ്രദമായി ആവർത്തിക്കുക.' } },
      { name: { en: 'Alternating heel digs + rest', ml: 'മാറിമാറി കുതികാൽ മുന്നിൽ തൊടുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Tap one heel in front at a time, staying upright. Move for 30–45 seconds, then rest or march gently for 30 seconds. Repeat with small, controlled steps.', ml: 'നിവർന്നുനിന്ന് ഓരോ കുതികാലും മാറിമാറി മുന്നിൽ നിലത്ത് തൊടുക. 30–45 സെക്കൻഡ് ചെയ്തശേഷം 30 സെക്കൻഡ് വിശ്രമിക്കുകയോ സാവധാനം മാർച്ച് ചെയ്യുകയോ ചെയ്യുക. ചെറിയ, നിയന്ത്രിതമായ ചുവടുകളോടെ ആവർത്തിക്കുക.' } },
      { name: { en: 'Gentle knee lifts + rest', ml: 'മുട്ടുകൾ സാവധാനം ഉയർത്തുക + വിശ്രമം' }, seconds: 180, cue: { en: 'Lift one knee a comfortable amount, then alternate. Use a chair for balance if needed. Move for 30–45 seconds, rest for 30 seconds, then repeat. Extend any rest if your breathing has not settled.', ml: 'ഒരു മുട്ട് സൗകര്യപ്രദമായി ഉയർത്തി താഴ്ത്തിയശേഷം കാൽ മാറ്റുക. ആവശ്യമെങ്കിൽ കസേരയിൽ പിടിക്കുക. 30–45 സെക്കൻഡ് ചെയ്തശേഷം 30 സെക്കൻഡ് വിശ്രമിച്ച് ആവർത്തിക്കുക. ശ്വാസം സാധാരണ നിലയിലെത്തിയില്ലെങ്കിൽ കൂടുതൽ വിശ്രമിക്കുക.' } },
      { name: { en: 'Slow march · cool-down', ml: 'സാവധാനമുള്ള മാർച്ച് · സമാപനം' }, seconds: 180, cue: { en: 'Gradually make your steps smaller and slower, with pauses whenever needed. Finish with relaxed breathing. Stop and seek help for chest pain, faintness or unusual breathlessness.', ml: 'ചുവടുകളുടെ വലുപ്പവും വേഗവും ക്രമേണ കുറച്ച് ആവശ്യമുള്ളപ്പോൾ വിശ്രമിക്കുക. സ്വാഭാവികമായ ശ്വാസത്തോടെ അവസാനിപ്പിക്കുക. നെഞ്ചുവേദന, ബോധക്ഷയം തോന്നൽ, അസാധാരണമായ ശ്വാസംമുട്ടൽ എന്നിവ ഉണ്ടെങ്കിൽ നിർത്തി സഹായം തേടുക.' } },
    ],
  },
];

export type Lesson = {
  id: string;
  title: Bilingual;
  excerpt: Bilingual;
  category: 'Training' | 'Nutrition' | 'Recovery' | 'Mindset';
  minutes: number;
  image: string;
  body: Array<{ heading: Bilingual; text: Bilingual }>;
  source: { label: string; url: string };
};

export const lessons: Lesson[] = [
  {
    id: 'protein-basics',
    title: { en: 'Protein, without the confusion', ml: 'പ്രോട്ടീൻ: ആശയക്കുഴപ്പമില്ലാതെ അറിയാം' },
    excerpt: { en: 'What protein does, where to find it, and how to make it part of everyday meals.', ml: 'പ്രോട്ടീന്റെ പങ്ക്, ഭക്ഷണസ്രോതസ്സുകൾ, ദൈനംദിന ഭക്ഷണത്തിൽ ഉൾപ്പെടുത്താനുള്ള വഴികൾ.' },
    category: 'Nutrition', minutes: 4, image: '/images/lesson-nutrition.jpg',
    body: [
      { heading: { en: 'More than a muscle nutrient', ml: 'പേശികൾക്കുവേണ്ടി മാത്രമല്ല' }, text: { en: 'Protein provides amino acids that your body uses to maintain and repair tissues and make many essential molecules. It supports recovery from training, but it cannot replace training, adequate food or sleep. Your needs vary with your age, body size, activity and health.', ml: 'ശരീരകലകളുടെ പരിപാലനത്തിനും പുനർനിർമാണത്തിനും അത്യാവശ്യമായ പല ഘടകങ്ങളുടെ നിർമാണത്തിനും വേണ്ട അമിനോ ആസിഡുകൾ പ്രോട്ടീനിൽനിന്ന് ലഭിക്കുന്നു. വ്യായാമത്തിനുശേഷമുള്ള വീണ്ടെടുപ്പിനെ ഇത് സഹായിക്കുന്നു. എന്നാൽ വ്യായാമം, ആവശ്യമായ ഭക്ഷണം, ഉറക്കം എന്നിവയ്ക്ക് പകരമാകില്ല. പ്രായം, ശരീരവലുപ്പം, പ്രവർത്തനനില, ആരോഗ്യം എന്നിവയ്ക്കനുസരിച്ച് ആവശ്യം മാറും.' } },
      { heading: { en: 'Build from familiar foods', ml: 'പരിചിതമായ ഭക്ഷണങ്ങളിൽനിന്ന് തുടങ്ങാം' }, text: { en: 'Include a protein source in your main meals: lentils, chickpeas, beans, eggs, fish, lean meat, milk, curd, tofu or soy foods. A varied plant-based diet can also meet protein needs. Pair these foods with vegetables, fruit, whole grains and appropriate amounts of fats for a balanced pattern.', ml: 'പ്രധാന ഭക്ഷണങ്ങളിൽ പയർവർഗങ്ങൾ, കടല, മുട്ട, മീൻ, കൊഴുപ്പ് കുറഞ്ഞ മാംസം, പാൽ, തൈര്, ടോഫു അല്ലെങ്കിൽ സോയ പോലുള്ള ഒരു പ്രോട്ടീൻ സ്രോതസ്സ് ഉൾപ്പെടുത്താം. വൈവിധ്യമുള്ള സസ്യാധിഷ്ഠിത ഭക്ഷണക്രമത്തിലൂടെയും പ്രോട്ടീൻ ലഭിക്കും. പച്ചക്കറികൾ, പഴങ്ങൾ, മുഴുധാന്യങ്ങൾ, അനുയോജ്യമായ അളവിൽ കൊഴുപ്പ് എന്നിവയും ചേർന്നതാണ് സമീകൃത ഭക്ഷണരീതി.' } },
      { heading: { en: 'The whole day matters', ml: 'ഒരു ദിവസത്തെ മുഴുവൻ ഭക്ഷണവും പ്രധാനമാണ്' }, text: { en: 'You do not need to race for a shake the moment a workout ends. Regular meals with protein across the day are a practical starting point. A protein powder can be convenient when food is difficult to arrange, but it is optional and is not automatically better than ordinary food.', ml: 'വ്യായാമം കഴിഞ്ഞ ഉടൻ പ്രോട്ടീൻ ഷേക്ക് കുടിക്കാൻ തിരക്കുകൂട്ടേണ്ടതില്ല. ദിവസം മുഴുവൻ ക്രമമായ ഭക്ഷണങ്ങളിൽ പ്രോട്ടീൻ ഉൾപ്പെടുത്തുന്നത് പ്രായോഗികമായ തുടക്കമാണ്. ഭക്ഷണം ഒരുക്കാൻ ബുദ്ധിമുട്ടുള്ളപ്പോൾ പ്രോട്ടീൻ പൗഡർ സൗകര്യപ്രദമായേക്കാം. എന്നാൽ അത് നിർബന്ധമല്ല; സാധാരണ ഭക്ഷണത്തെക്കാൾ മികച്ചതാണെന്നും കരുതേണ്ടതില്ല.' } },
      { heading: { en: 'Make it personal', ml: 'നിങ്ങളുടെ ആവശ്യത്തിനനുസരിച്ച് തിരഞ്ഞെടുക്കുക' }, text: { en: 'Start by noticing which of your meals lack a protein source, then make one affordable addition. If you have kidney disease, a prescribed diet or another relevant medical condition, get individual advice before substantially changing your protein intake. A qualified dietitian can help match a target to your needs.', ml: 'ഏത് ഭക്ഷണത്തിലാണ് പ്രോട്ടീൻ സ്രോതസ്സ് ഇല്ലാത്തതെന്ന് ശ്രദ്ധിച്ച്, ചെലവിന് അനുയോജ്യമായ ഒന്ന് ചേർത്തുതുടങ്ങാം. വൃക്കരോഗം, ഡോക്ടർ നിർദേശിച്ച ഭക്ഷണക്രമം, അല്ലെങ്കിൽ ബന്ധപ്പെട്ട ആരോഗ്യപ്രശ്നം ഉണ്ടെങ്കിൽ പ്രോട്ടീൻ അളവ് ഗണ്യമായി മാറ്റുന്നതിന് മുമ്പ് വ്യക്തിഗത ഉപദേശം തേടുക. യോഗ്യനായ ഡയറ്റീഷ്യന് നിങ്ങളുടെ ആവശ്യത്തിനനുസരിച്ച് നിർദേശം നൽകാം.' } },
    ],
    source: { label: 'NHS · The Eatwell Guide', url: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/' },
  },
  {
    id: 'progressive-overload',
    title: { en: 'Getting stronger, one step at a time', ml: 'ഒരു ചുവടുവീതം കൂടുതൽ കരുത്തിലേക്ക്' },
    excerpt: { en: 'Understand progressive overload and learn when a little more is enough.', ml: 'പ്രോഗ്രസീവ് ഓവർലോഡ് എന്താണെന്നും എപ്പോൾ അല്പം കൂടി ചെയ്യാമെന്നും മനസ്സിലാക്കാം.' },
    category: 'Training', minutes: 5, image: '/images/lesson-strength.jpg',
    body: [
      { heading: { en: 'Give your body a reason to adapt', ml: 'ശരീരത്തിന് പൊരുത്തപ്പെടാനുള്ള അവസരം നൽകുക' }, text: { en: 'Strength improves when you practice suitable movements and gradually challenge your muscles over time. This is progressive overload. It can mean more repetitions, a little more resistance, a more comfortable range of movement or better control. It does not mean making every workout harder than the last.', ml: 'അനുയോജ്യമായ ചലനങ്ങൾ പരിശീലിക്കുകയും കാലക്രമേണ പേശികൾക്കുള്ള വെല്ലുവിളി ക്രമേണ കൂട്ടുകയും ചെയ്യുമ്പോൾ ശക്തി മെച്ചപ്പെടുന്നു. ഇതാണ് പ്രോഗ്രസീവ് ഓവർലോഡ്. ആവർത്തനങ്ങൾ കൂട്ടൽ, ചെറിയ തോതിൽ പ്രതിരോധം കൂട്ടൽ, ചലനപരിധി മെച്ചപ്പെടുത്തൽ, കൂടുതൽ നിയന്ത്രണത്തോടെ ചെയ്യൽ എന്നിവ വഴികളാണ്. ഓരോ വ്യായാമവും മുമ്പത്തേതിനെക്കാൾ കഠിനമാക്കണമെന്നല്ല ഇതിന്റെ അർഥം.' } },
      { heading: { en: 'Start with a repeatable baseline', ml: 'ആവർത്തിക്കാൻ കഴിയുന്ന നിലയിൽ തുടങ്ങുക' }, text: { en: 'Choose a version of an exercise you can perform with steady technique and comfortable breathing. Finish most beginner sets feeling you could still do a few controlled repetitions. Record the movement, resistance and repetitions so that your next decision comes from your own practice, not someone else’s numbers.', ml: 'സ്ഥിരമായ രീതിയിലും സൗകര്യപ്രദമായ ശ്വാസത്തോടെയും ചെയ്യാൻ കഴിയുന്ന വ്യായാമരൂപം തിരഞ്ഞെടുക്കുക. തുടക്കത്തിൽ മിക്ക സെറ്റുകളും അവസാനിപ്പിക്കുമ്പോൾ ഏതാനും ആവർത്തനങ്ങൾ കൂടി നിയന്ത്രണത്തോടെ ചെയ്യാൻ കഴിയുമെന്ന നിലയിൽ നിർത്താം. ചലനം, ഉപയോഗിച്ച പ്രതിരോധം, ആവർത്തനങ്ങൾ എന്നിവ രേഖപ്പെടുത്തുക. അടുത്ത മാറ്റം മറ്റൊരാളുടെ കണക്കുകളല്ല, നിങ്ങളുടെ പരിശീലനമാണ് നിർണയിക്കേണ്ടത്.' } },
      { heading: { en: 'Change one thing at a time', ml: 'ഒരു സമയം ഒരു മാറ്റം മാത്രം' }, text: { en: 'When your current sets feel controlled across more than one session, try one or two extra repetitions or the smallest available increase in resistance. If technique deteriorates, return to the previous level. Chair sit-to-stands and wall push-ups can build a useful starting point before you need heavier equipment.', ml: 'ഒന്നിലധികം പരിശീലനങ്ങളിൽ നിലവിലെ സെറ്റുകൾ നിയന്ത്രണത്തോടെ ചെയ്യാൻ കഴിയുമ്പോൾ ഒന്നോ രണ്ടോ ആവർത്തനങ്ങൾ കൂട്ടാം, അല്ലെങ്കിൽ ലഭ്യമായ ഏറ്റവും ചെറിയ പ്രതിരോധവർധന പരീക്ഷിക്കാം. ചലനത്തിന്റെ രീതി മോശമാകുന്നെങ്കിൽ മുൻനിലയിലേക്ക് മടങ്ങുക. ഭാരമുള്ള ഉപകരണങ്ങൾക്ക് മുമ്പ് കസേരയിൽനിന്ന് എഴുന്നേൽക്കലും ചുമരിലെ പുഷ്-അപ്പും നല്ല തുടക്കമാകാം.' } },
      { heading: { en: 'Recovery is part of the plan', ml: 'വിശ്രമവും പദ്ധതിയുടെ ഭാഗമാണ്' }, text: { en: 'Allow recovery between demanding sessions for the same muscles. General adult guidance includes muscle-strengthening activity on at least two days each week, alongside aerobic activity. Sharp pain is a reason to stop and reassess; soreness is not a reliable score for workout quality or progress.', ml: 'ഒരേ പേശികൾക്ക് കഠിനമായ പരിശീലനം നൽകുന്ന ദിവസങ്ങൾക്കിടയിൽ വീണ്ടെടുപ്പിനുള്ള സമയം അനുവദിക്കുക. പൊതുവായ മുതിർന്നവർക്കുള്ള നിർദേശങ്ങളിൽ എയറോബിക് പ്രവർത്തനങ്ങളോടൊപ്പം ആഴ്ചയിൽ കുറഞ്ഞത് രണ്ട് ദിവസം പേശിശക്തി വർധിപ്പിക്കുന്ന പ്രവർത്തനങ്ങളും ഉൾപ്പെടുന്നു. കുത്തുന്ന വേദനയുണ്ടെങ്കിൽ നിർത്തി വിലയിരുത്തുക. പേശിവേദന വ്യായാമത്തിന്റെ ഗുണനിലവാരമോ പുരോഗതിയോ അളക്കാനുള്ള വിശ്വസനീയമായ മാനദണ്ഡമല്ല.' } },
    ],
    source: { label: 'NHS · Strength and flexibility', url: 'https://www.nhs.uk/live-well/exercise/how-to-improve-strength-flexibility/' },
  },
  {
    id: 'sleep-and-recovery',
    title: { en: 'Your recovery starts with sleep', ml: 'വീണ്ടെടുപ്പിന്റെ തുടക്കം നല്ല ഉറക്കം' },
    excerpt: { en: 'A practical guide to the recovery habit that supports your training and everyday energy.', ml: 'പരിശീലനത്തെയും ദൈനംദിന ഊർജത്തെയും പിന്തുണയ്ക്കുന്ന ഉറക്കശീലത്തിനുള്ള ലളിതമായ മാർഗങ്ങൾ.' },
    category: 'Recovery', minutes: 4, image: '/images/lesson-recovery.jpg',
    body: [
      { heading: { en: 'Training is only one part', ml: 'പരിശീലനം ഒരു ഭാഗം മാത്രം' }, text: { en: 'Sleep supports attention, mood and the processes involved in physical recovery. Too little sleep can make an ordinary workout feel harder and affect food choices or motivation. Most adults need around seven to nine hours, although individual needs and life circumstances vary.', ml: 'ശ്രദ്ധ, മാനസികാവസ്ഥ, ശാരീരിക വീണ്ടെടുപ്പുമായി ബന്ധപ്പെട്ട പ്രവർത്തനങ്ങൾ എന്നിവയെ ഉറക്കം പിന്തുണയ്ക്കുന്നു. ഉറക്കം കുറയുമ്പോൾ സാധാരണ വ്യായാമം പോലും കൂടുതൽ കഠിനമായി തോന്നാം; ഭക്ഷണതിരഞ്ഞെടുപ്പിനെയും പ്രചോദനത്തെയും ബാധിക്കാം. മിക്ക മുതിർന്നവർക്കും ഏകദേശം ഏഴ് മുതൽ ഒൻപത് മണിക്കൂർ വരെ ഉറക്കം ആവശ്യമാണ്. വ്യക്തിഗത ആവശ്യവും ജീവിതസാഹചര്യവും അനുസരിച്ച് ഇത് മാറാം.' } },
      { heading: { en: 'Keep a steady rhythm', ml: 'ഒരു സ്ഥിരമായ ക്രമം പാലിക്കുക' }, text: { en: 'A fairly consistent wake-up time, daylight during the day and a wind-down routine can help establish a rhythm. Make your room as dark, quiet and comfortable as practical. You do not need a perfect routine: start with one change you can maintain, such as setting aside a calmer final half-hour.', ml: 'സ്ഥിരതയുള്ള ഉണരുന്ന സമയം, പകൽസമയത്തെ പ്രകാശം, ഉറങ്ങുന്നതിന് മുമ്പുള്ള ശാന്തമായ പതിവ് എന്നിവ ഒരു ക്രമം രൂപപ്പെടുത്താൻ സഹായിക്കും. കഴിയുന്നത്ര ഇരുണ്ടതും ശാന്തവും സൗകര്യപ്രദവുമായ മുറി ഒരുക്കുക. എല്ലാം പൂർണമായിരിക്കേണ്ടതില്ല. അവസാന അരമണിക്കൂർ ശാന്തമായി ചെലവിടുന്നതുപോലെ നിലനിർത്താൻ കഴിയുന്ന ഒരു മാറ്റത്തിൽ തുടങ്ങാം.' } },
      { heading: { en: 'Notice your own sleep disruptors', ml: 'ഉറക്കത്തെ ബാധിക്കുന്ന കാര്യങ്ങൾ ശ്രദ്ധിക്കുക' }, text: { en: 'Caffeine late in your day, alcohol and stimulating screen use near bedtime can interfere with sleep. Responses differ, so observe what affects you rather than copying a rigid schedule. Regular movement can support sleep, while a very intense late workout may need adjusting if it leaves you feeling alert.', ml: 'ദിവസത്തിന്റെ അവസാനഭാഗത്തെ കഫീൻ, മദ്യം, ഉറങ്ങുന്നതിന് തൊട്ടുമുമ്പുള്ള ഉത്തേജകമായ സ്ക്രീൻ ഉപയോഗം എന്നിവ ഉറക്കത്തെ ബാധിക്കാം. പ്രതികരണം വ്യക്തികൾക്കിടയിൽ വ്യത്യസ്തമാണ്; കർശനമായ സമയക്രമം പകർത്തുന്നതിനുപകരം നിങ്ങളെ ബാധിക്കുന്നത് ശ്രദ്ധിക്കുക. പതിവായ ചലനം ഉറക്കത്തെ സഹായിക്കാം. രാത്രിയിലെ വളരെ കഠിനമായ വ്യായാമം നിങ്ങളെ ഉണർവോടെ നിലനിർത്തുന്നെങ്കിൽ അതിന്റെ സമയം മാറ്റാം.' } },
      { heading: { en: 'Adjust, rather than punish yourself', ml: 'സ്വയം കുറ്റപ്പെടുത്താതെ മാറ്റങ്ങൾ വരുത്തുക' }, text: { en: 'After a poor night, a walk or lighter session may be more suitable than pushing for a personal best. If sleep difficulties persist, affect daily life, or come with loud snoring and breathing pauses, seek medical advice. A fitness tracker can show patterns, but it cannot diagnose a sleep disorder.', ml: 'ഉറക്കം കുറഞ്ഞ രാത്രിക്കുശേഷം ഏറ്റവും മികച്ച പ്രകടനത്തിനായി ശ്രമിക്കുന്നതിനെക്കാൾ നടത്തമോ ലഘുപരിശീലനമോ അനുയോജ്യമായേക്കാം. ഉറക്കപ്രശ്നം തുടരുകയോ ദൈനംദിന ജീവിതത്തെ ബാധിക്കുകയോ ശക്തമായ കൂർക്കംവലിയും ശ്വാസം ഇടയ്ക്കു നിൽക്കലും ഉണ്ടാകുകയോ ചെയ്താൽ വൈദ്യോപദേശം തേടുക. ഫിറ്റ്നസ് ട്രാക്കറിന് ചില പതിവുകൾ കാണിക്കാം; ഉറക്കരോഗം നിർണയിക്കാൻ കഴിയില്ല.' } },
    ],
    source: { label: 'NHS · Sleep and tiredness', url: 'https://www.nhs.uk/live-well/sleep-and-tiredness/' },
  },
  {
    id: 'everyday-movement',
    title: { en: 'Your movement beyond the workout', ml: 'വ്യായാമത്തിന് പുറത്തുള്ള ചലനങ്ങളും പ്രധാനമാണ്' },
    excerpt: { en: 'Walking, chores and movement breaks all count. Meet the everyday side of being active.', ml: 'നടത്തം, വീട്ടുജോലികൾ, ഇടവേളകളിലെ ചലനം—എല്ലാവർക്കും സജീവമാകാനുള്ള ചെറിയ അവസരങ്ങൾ.' },
    category: 'Training', minutes: 4, image: '/images/workout-cardio.jpg',
    body: [
      { heading: { en: 'Meet NEAT', ml: 'NEAT എന്താണെന്ന് അറിയാം' }, text: { en: 'Non-exercise activity thermogenesis, or NEAT, is the energy you use for everyday movement outside deliberate exercise. Walking to a shop, cleaning, gardening and moving around your home all contribute. The amount varies widely between people and days; a step count captures only part of it.', ml: 'പ്രത്യേകമായി ചെയ്യുന്ന വ്യായാമത്തിന് പുറത്തുള്ള ദൈനംദിന ചലനങ്ങൾക്കായി ശരീരം ഉപയോഗിക്കുന്ന ഊർജത്തെയാണ് നോൺ-എക്സർസൈസ് ആക്ടിവിറ്റി തെർമോജെനസിസ് അഥവാ NEAT എന്നു പറയുന്നത്. കടയിലേക്കുള്ള നടത്തം, വൃത്തിയാക്കൽ, തോട്ടപ്പണി, വീട്ടിനുള്ളിലെ ചലനം എന്നിവ ഇതിൽപ്പെടുന്നു. അളവ് വ്യക്തികളിലും ദിവസങ്ങളിലും മാറും. ചുവടുകളുടെ എണ്ണം ഇതിന്റെ ഒരു ഭാഗം മാത്രമാണ്.' } },
      { heading: { en: 'Small opportunities add up', ml: 'ചെറിയ അവസരങ്ങൾ ചേർന്ന് ഫലം നൽകും' }, text: { en: 'Try a short walk after a meal, stand and move between tasks, or walk during a phone call when it is safe. Choose options that fit your work and ability. If standing is difficult, seated movement and upper-body activity can also be useful ways to interrupt long periods of inactivity.', ml: 'ഭക്ഷണത്തിനുശേഷം അല്പം നടക്കുക, ജോലികൾക്കിടയിൽ എഴുന്നേറ്റ് ചലിക്കുക, സുരക്ഷിതമാണെങ്കിൽ ഫോൺ സംസാരിക്കുമ്പോൾ നടക്കുക എന്നിവ പരീക്ഷിക്കാം. ജോലിക്കും ശാരീരികശേഷിക്കും യോജിക്കുന്ന വഴികൾ തിരഞ്ഞെടുക്കുക. നിൽക്കാൻ ബുദ്ധിമുട്ടുണ്ടെങ്കിൽ ഇരുന്നുകൊണ്ടുള്ള ചലനങ്ങളും ശരീരത്തിന്റെ മേൽഭാഗം ചലിപ്പിക്കുന്നതും നീണ്ട നിശ്ചലസമയം കുറയ്ക്കാൻ സഹായിക്കും.' } },
      { heading: { en: 'There is no magic step number', ml: 'അത്ഭുതകരമായ ഒരു ചുവടെണ്ണമില്ല' }, text: { en: 'Ten thousand steps is not a universal requirement. Notice your current baseline and add a realistic amount rather than chasing a number that causes pain or fatigue. WHO guidance encourages adults to limit sedentary time and replace it with physical activity of any intensity, including light activity.', ml: 'പതിനായിരം ചുവടുകൾ എല്ലാവർക്കും നിർബന്ധമായ ഒരു ലക്ഷ്യമല്ല. ഇപ്പോഴത്തെ പ്രവർത്തനനില മനസ്സിലാക്കി പ്രായോഗികമായി അല്പം കൂട്ടുക. വേദനയോ അമിതക്ഷീണമോ ഉണ്ടാക്കുന്ന എണ്ണം പിന്തുടരേണ്ടതില്ല. നീണ്ട നിശ്ചലസമയം കുറച്ച്, ലഘുവായ പ്രവർത്തനങ്ങൾ ഉൾപ്പെടെ ഏതെങ്കിലും തീവ്രതയിലുള്ള ശാരീരിക പ്രവർത്തനം പകരംവയ്ക്കാൻ ലോകാരോഗ്യ സംഘടന നിർദേശിക്കുന്നു.' } },
      { heading: { en: 'Build a complete picture', ml: 'മുഴുവൻ ചിത്രം കാണുക' }, text: { en: 'Everyday movement complements planned training. For general health, WHO recommends 150–300 minutes of moderate aerobic activity per week for adults, or an equivalent amount of vigorous activity, plus muscle strengthening on at least two days. Start below these amounts if needed and increase gradually; some activity is better than none.', ml: 'ദൈനംദിന ചലനങ്ങൾ ആസൂത്രിത പരിശീലനത്തെ പിന്തുണയ്ക്കുന്നു. പൊതുവായ ആരോഗ്യത്തിനായി മുതിർന്നവർക്ക് ആഴ്ചയിൽ 150–300 മിനിറ്റ് മിതതീവ്രതയുള്ള എയറോബിക് പ്രവർത്തനമോ തത്തുല്യമായ കൂടുതൽ തീവ്രതയുള്ള പ്രവർത്തനമോ, കൂടാതെ കുറഞ്ഞത് രണ്ട് ദിവസം പേശിശക്തി വർധിപ്പിക്കുന്ന പ്രവർത്തനവും WHO നിർദേശിക്കുന്നു. ആവശ്യമെങ്കിൽ ഇതിൽ കുറവായി തുടങ്ങി ക്രമേണ കൂട്ടാം. ഒന്നും ചെയ്യാത്തതിനെക്കാൾ കുറച്ചെങ്കിലും ചെയ്യുന്നതാണ് നല്ലത്.' } },
    ],
    source: { label: 'WHO · Physical activity', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
  },
  {
    id: 'fat-loss-facts',
    title: { en: 'Fat loss: facts over quick fixes', ml: 'കൊഴുപ്പ് കുറയ്ക്കൽ: കുറുക്കുവഴികളേക്കാൾ വസ്തുതകൾ' },
    excerpt: { en: 'Understand energy balance, spot-reduction claims and why sustainable habits matter.', ml: 'ഊർജസമതുലനം, ഒരു ഭാഗത്തെ മാത്രം കൊഴുപ്പ് കുറയ്ക്കാമെന്ന വാദങ്ങൾ, നിലനിർത്താവുന്ന ശീലങ്ങൾ എന്നിവയെക്കുറിച്ച്.' },
    category: 'Nutrition', minutes: 5, image: '/images/lesson-nutrition.jpg',
    body: [
      { heading: { en: 'Start with the big picture', ml: 'വലിയ ചിത്രം മനസ്സിലാക്കുക' }, text: { en: 'Body fat can decrease when energy intake is lower than energy use over time. This is a principle, not a promise that weight change will be simple or perfectly predictable. Appetite, medications, sleep, health conditions, access to food and daily routines all influence what is manageable for an individual.', ml: 'കാലക്രമേണ ശരീരം ചെലവഴിക്കുന്ന ഊർജത്തേക്കാൾ ലഭിക്കുന്ന ഊർജം കുറയുമ്പോൾ ശരീരത്തിലെ കൊഴുപ്പ് കുറയാം. ഇത് ഒരു അടിസ്ഥാന തത്ത്വമാണ്; ഭാരം മാറുന്നത് എളുപ്പമോ കൃത്യമായി പ്രവചിക്കാവുന്നതോ ആണെന്ന ഉറപ്പല്ല. വിശപ്പ്, മരുന്നുകൾ, ഉറക്കം, ആരോഗ്യപ്രശ്നങ്ങൾ, ഭക്ഷണലഭ്യത, ദിനചര്യ എന്നിവ ഒരു വ്യക്തിക്ക് എന്താണ് സാധ്യമെന്ന് സ്വാധീനിക്കുന്നു.' } },
      { heading: { en: 'You cannot choose where fat leaves', ml: 'കൊഴുപ്പ് എവിടെനിന്ന് കുറയണമെന്ന് തിരഞ്ഞെടുക്കാനാകില്ല' }, text: { en: 'Abdominal exercises strengthen the muscles involved, but they do not reliably remove fat specifically from your stomach. Sweat mostly reflects temperature regulation and fluid loss; it is not a measure of fat burned. Detox drinks, waist trainers and a single “fat-burning” food are not substitutes for a sustainable overall routine.', ml: 'വയറിനുള്ള വ്യായാമങ്ങൾ ബന്ധപ്പെട്ട പേശികളെ ശക്തമാക്കും. എന്നാൽ വയറിലെ കൊഴുപ്പ് മാത്രം വിശ്വസനീയമായി കുറയ്ക്കില്ല. വിയർപ്പ് പ്രധാനമായും ശരീരതാപനില നിയന്ത്രിക്കുന്നതും ജലം നഷ്ടപ്പെടുന്നതുമാണ് കാണിക്കുന്നത്; കൊഴുപ്പ് എത്ര ചെലവായി എന്നതിന്റെ അളവല്ല. ഡിറ്റോക്സ് പാനീയങ്ങൾ, വെയ്സ്റ്റ് ട്രെയിനറുകൾ, കൊഴുപ്പ് കുറയ്ക്കുമെന്ന് പറയുന്ന ഒരൊറ്റ ഭക്ഷണം എന്നിവ നിലനിർത്താവുന്ന ജീവിതരീതിക്ക് പകരമല്ല.' } },
      { heading: { en: 'Choose habits you can live with', ml: 'ജീവിതത്തിൽ നിലനിർത്താവുന്ന ശീലങ്ങൾ തിരഞ്ഞെടുക്കുക' }, text: { en: 'Build regular, satisfying meals with protein, fibre-rich foods and enough variety. Keep enjoyable foods in perspective rather than labelling whole food groups as bad. Strength training, regular movement and adequate sleep support health while you work on your goals. Aggressive restriction is difficult to sustain and may undermine training or wellbeing.', ml: 'പ്രോട്ടീൻ, നാരുകൾ കൂടുതലുള്ള ഭക്ഷണങ്ങൾ, വൈവിധ്യം എന്നിവയോടെ തൃപ്തികരമായ ക്രമമായ ഭക്ഷണം ഒരുക്കുക. ഒരു ഭക്ഷണവിഭാഗത്തെ മുഴുവൻ മോശമെന്ന് മുദ്രകുത്താതെ ഇഷ്ടഭക്ഷണങ്ങൾക്ക് അനുയോജ്യമായ ഇടം നൽകാം. ശക്തിവർധക പരിശീലനം, പതിവായ ചലനം, ആവശ്യമായ ഉറക്കം എന്നിവ ലക്ഷ്യങ്ങളിലേക്ക് നീങ്ങുമ്പോൾ ആരോഗ്യത്തെ പിന്തുണയ്ക്കുന്നു. അമിതനിയന്ത്രണം നിലനിർത്താൻ ബുദ്ധിമുട്ടുള്ളതും പരിശീലനത്തെയും ക്ഷേമത്തെയും ബാധിക്കാവുന്നതുമാണ്.' } },
      { heading: { en: 'Progress is bigger than the scales', ml: 'പുരോഗതി തൂക്കത്തിൽ മാത്രം ഒതുങ്ങുന്നില്ല' }, text: { en: 'Daily weight changes can reflect fluid, digestion and other normal fluctuations. Look at longer-term patterns alongside strength, energy and everyday function if tracking feels helpful. Weight loss is not an appropriate goal for everyone. If eating or tracking creates distress, or you have a history of disordered eating, seek qualified support rather than tightening the rules.', ml: 'ദിവസേനയുള്ള ഭാരമാറ്റങ്ങളിൽ ജലത്തിന്റെ അളവ്, ദഹനം, മറ്റു സാധാരണ വ്യത്യാസങ്ങൾ എന്നിവ പ്രതിഫലിക്കാം. രേഖപ്പെടുത്തുന്നത് സഹായകരമാണെങ്കിൽ ദീർഘകാല പ്രവണതകളോടൊപ്പം ശക്തി, ഊർജം, ദൈനംദിന പ്രവർത്തനക്ഷമത എന്നിവയും ശ്രദ്ധിക്കുക. ഭാരം കുറയ്ക്കൽ എല്ലാവർക്കും അനുയോജ്യമായ ലക്ഷ്യമല്ല. ഭക്ഷണമോ കണക്കെടുപ്പോ മാനസികബുദ്ധിമുട്ടുണ്ടാക്കുന്നെങ്കിൽ, അല്ലെങ്കിൽ ഭക്ഷണവുമായി ബന്ധപ്പെട്ട പ്രശ്നങ്ങളുടെ ചരിത്രമുണ്ടെങ്കിൽ, നിയന്ത്രണം കൂട്ടുന്നതിനുപകരം യോഗ്യമായ സഹായം തേടുക.' } },
    ],
    source: { label: 'NIDDK · Nutrition and physical activity myths', url: 'https://www.niddk.nih.gov/health-information/weight-management/myths-nutrition-physical-activity' },
  },
  {
    id: 'build-consistency',
    title: { en: 'A routine that stays with you', ml: 'നിങ്ങളോടൊപ്പം തുടരുന്ന ഒരു പതിവ്' },
    excerpt: { en: 'Make fitness fit your real life with a small plan, a clear cue and room to adapt.', ml: 'ചെറിയ പദ്ധതി, വ്യക്തമായ ഓർമപ്പെടുത്തൽ, മാറ്റങ്ങൾക്കുള്ള ഇടം—ഫിറ്റ്നസിനെ ജീവിതത്തോട് ചേർക്കാം.' },
    category: 'Mindset', minutes: 4, image: '/images/lesson-recovery.jpg',
    body: [
      { heading: { en: 'Make the starting line smaller', ml: 'തുടക്കം കൂടുതൽ ലളിതമാക്കുക' }, text: { en: 'A routine is easier to repeat when the first step is realistic. Choose a session you can do on an ordinary busy day, not only on your most motivated day. Five minutes of movement can be a useful beginning. You can build towards general activity guidelines over time without treating your starting point as a failure.', ml: 'ആദ്യചുവട് പ്രായോഗികമാകുമ്പോൾ ഒരു പതിവ് ആവർത്തിക്കാൻ എളുപ്പമാണ്. ഏറ്റവും പ്രചോദനമുള്ള ദിവസം മാത്രമല്ല, സാധാരണ തിരക്കുള്ള ദിവസത്തിലും ചെയ്യാനാകുന്ന പരിശീലനം തിരഞ്ഞെടുക്കുക. അഞ്ച് മിനിറ്റ് ചലനം പോലും നല്ല തുടക്കമാകാം. നിങ്ങളുടെ തുടക്കത്തെ പരാജയമായി കാണാതെ കാലക്രമേണ പൊതുവായ പ്രവർത്തനനിർദേശങ്ങളിലേക്ക് വളരാം.' } },
      { heading: { en: 'Give the plan a place in your day', ml: 'ദിവസത്തിൽ പദ്ധതിക്ക് ഒരിടം നൽകുക' }, text: { en: 'Try a specific cue: “After my morning tea, I will do the mobility session.” Prepare your space or clothes in advance if that removes friction. Keep a smaller backup, such as one gentle round or a short walk, for days when the original plan does not fit. A useful plan has room for real life.', ml: 'വ്യക്തമായ ഒരു ഓർമപ്പെടുത്തൽ പരീക്ഷിക്കാം: “രാവിലെ ചായയ്ക്കുശേഷം മൊബിലിറ്റി പരിശീലനം ചെയ്യും.” സഹായകരമാണെങ്കിൽ സ്ഥലമോ വസ്ത്രങ്ങളോ മുൻകൂട്ടി തയ്യാറാക്കുക. ആദ്യപദ്ധതി സാധിക്കാത്ത ദിവസങ്ങൾക്ക് ഒരു ലഘു റൗണ്ടോ ചെറിയ നടത്തമോ പകരമായി കരുതുക. നല്ല പദ്ധതിയിൽ യഥാർഥ ജീവിതത്തിന് ഇടമുണ്ടാകും.' } },
      { heading: { en: 'Track what helps you return', ml: 'തിരിച്ചുവരാൻ സഹായിക്കുന്നതിനെ ശ്രദ്ധിക്കുക' }, text: { en: 'A simple note about what you did and how you felt can reveal useful patterns. Look for a routine you can repeat rather than a perfect streak. Missing a session does not erase the work already done, and rest days can be intentional. Resume with your next suitable opportunity instead of adding punishment sessions.', ml: 'എന്ത് ചെയ്തു, എങ്ങനെ തോന്നി എന്നൊരു ലളിതമായ കുറിപ്പ് പ്രയോജനകരമായ പതിവുകൾ തിരിച്ചറിയാൻ സഹായിക്കും. ഇടവേളയില്ലാത്ത ഒരു റെക്കോർഡിനേക്കാൾ ആവർത്തിക്കാൻ കഴിയുന്ന രീതിയെ ശ്രദ്ധിക്കുക. ഒരു പരിശീലനം മുടങ്ങിയത് ഇതിനകം ചെയ്തതിനെ ഇല്ലാതാക്കുന്നില്ല. വിശ്രമദിവസങ്ങളും ബോധപൂർവം തിരഞ്ഞെടുക്കാം. ശിക്ഷപോലെ കൂടുതൽ വ്യായാമം ചേർക്കാതെ അടുത്ത അനുയോജ്യമായ അവസരത്തിൽ മടങ്ങുക.' } },
      { heading: { en: 'Let your definition of success grow', ml: 'വിജയത്തിന്റെ അർഥം വിശാലമാകട്ടെ' }, text: { en: 'Notice practical wins: climbing stairs more comfortably, learning a movement, feeling stronger or making time for yourself. Your routine can change with illness, workload, caring responsibilities and recovery. If motivation stays low or exercise feels compulsive, a qualified health professional can help you find a healthier approach.', ml: 'പടികൾ കൂടുതൽ സുഖമായി കയറുക, ഒരു ചലനം പഠിക്കുക, കരുത്ത് വർധിച്ചതായി തോന്നുക, നിങ്ങൾക്കായി സമയം കണ്ടെത്തുക തുടങ്ങിയ ചെറിയ നേട്ടങ്ങൾ ശ്രദ്ധിക്കുക. അസുഖം, ജോലിഭാരം, പരിചരണച്ചുമതലകൾ, വീണ്ടെടുപ്പ് എന്നിവയ്ക്കനുസരിച്ച് പതിവ് മാറാം. പ്രചോദനം തുടർച്ചയായി കുറവായിരിക്കുകയോ വ്യായാമം നിർബന്ധിതമായ ശീലമായി തോന്നുകയോ ചെയ്താൽ യോഗ്യനായ ആരോഗ്യവിദഗ്ധന് കൂടുതൽ ആരോഗ്യകരമായ സമീപനം കണ്ടെത്താൻ സഹായിക്കാം.' } },
    ],
    source: { label: 'NHS · Physical activity guidelines for adults', url: 'https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/' },
  },
];
