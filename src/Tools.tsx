import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Calculator, Dumbbell, Info, Pause, Play, RotateCcw, Wind } from 'lucide-react'
import type { Language } from './data'
import './Tools.css'

const copy = {
  en: {
    eyebrow: 'SMALL TOOLS. MEANINGFUL INSIGHT.',
    title: 'A little clarity. A better next step.',
    intro: 'Understand your numbers, explore your strength, and make room to breathe. Simple tools to support an informed fitness journey.',
    proteinTag: 'NUTRITION',
    proteinTitle: 'Daily protein guide',
    proteinDescription: 'An educational starting range for healthy, active adults.',
    bodyWeight: 'Your body weight',
    calculate: 'Calculate my range',
    proteinResult: 'Suggested daily range',
    gramsDay: 'g / day',
    proteinFormula: 'Based on 1.2–1.6 g of protein per kg of body weight.',
    proteinNote: 'Individual needs vary with your goals, age, training, and health. If you have a medical condition, discuss your needs with a qualified clinician or dietitian.',
    proteinError: 'Enter a body weight between 30 and 250 kg.',
    strengthTag: 'STRENGTH',
    strengthTitle: 'Understand your strength',
    strengthDescription: 'Estimate your one-rep maximum from a manageable set.',
    liftedWeight: 'Weight lifted',
    reps: 'Repetitions',
    estimate: 'Estimate my 1RM',
    strengthResult: 'Estimated one-rep maximum',
    strengthFormula: 'Epley formula: weight × (1 + repetitions ÷ 30).',
    strengthNote: 'This is an estimate, not a target to attempt. Use a weight you can lift with control and good technique; results vary by exercise and experience.',
    strengthError: 'Enter a weight from 1 to 500 kg and a whole number of repetitions from 2 to 10.',
    breathingTag: 'RECOVERY',
    breathingTitle: 'A moment to reset',
    breathingDescription: 'One minute. A comfortable rhythm. A little space for yourself.',
    breathingPattern: '4 seconds in · 6 seconds out',
    inhale: 'Breathe in',
    exhale: 'Breathe out',
    ready: 'Find your rhythm',
    complete: 'A minute for you',
    left: 'seconds remaining',
    completeNote: 'All done. Return to your natural breathing.',
    start: 'Begin breathing',
    resume: 'Continue',
    pause: 'Pause',
    again: 'Breathe again',
    reset: 'Reset',
    breathNote: 'Breathe gently, without holding or forcing your breath. Stop and return to normal breathing if you feel uncomfortable or lightheaded.',
    education: 'Knowledge is your strongest foundation.',
    educationText: 'These tools are for general education and work best alongside a sustainable training and nutrition routine. They do not replace individual professional guidance.',
  },
  ml: {
    eyebrow: 'ചെറിയ ഉപകരണങ്ങൾ. വ്യക്തമായ അറിവ്.',
    title: 'കൂടുതൽ വ്യക്തത. മികച്ച അടുത്ത ചുവട്.',
    intro: 'നിങ്ങളുടെ ആവശ്യങ്ങൾ മനസ്സിലാക്കൂ, കരുത്ത് വിലയിരുത്തൂ, ശ്വാസത്തിന് സമയം നൽകൂ. അറിവോടെ ഫിറ്റ്നസ് യാത്ര തുടരാൻ ലളിതമായ ഉപകരണങ്ങൾ.',
    proteinTag: 'പോഷണം',
    proteinTitle: 'ദിവസേനയുള്ള പ്രോട്ടീൻ',
    proteinDescription: 'ആരോഗ്യമുള്ള, സജീവമായ മുതിർന്നവർക്കുള്ള ഒരു പ്രാഥമിക മാർഗ്ഗസൂചിക.',
    bodyWeight: 'നിങ്ങളുടെ ശരീരഭാരം',
    calculate: 'എന്റെ പരിധി കണക്കാക്കുക',
    proteinResult: 'ദിവസേനയുള്ള ഏകദേശ പരിധി',
    gramsDay: 'ഗ്രാം / ദിവസം',
    proteinFormula: 'ഓരോ കിലോഗ്രാം ശരീരഭാരത്തിനും 1.2–1.6 ഗ്രാം പ്രോട്ടീൻ അടിസ്ഥാനമാക്കി.',
    proteinNote: 'ലക്ഷ്യം, പ്രായം, പരിശീലനം, ആരോഗ്യം എന്നിവ അനുസരിച്ച് ആവശ്യങ്ങൾ വ്യത്യാസപ്പെടും. ആരോഗ്യപ്രശ്നങ്ങളുണ്ടെങ്കിൽ ഡോക്ടറുടെയോ ഡയറ്റീഷ്യന്റെയോ ഉപദേശം തേടുക.',
    proteinError: '30 മുതൽ 250 കിലോഗ്രാം വരെയുള്ള ശരീരഭാരം നൽകുക.',
    strengthTag: 'കരുത്ത്',
    strengthTitle: 'നിങ്ങളുടെ കരുത്ത് അറിയൂ',
    strengthDescription: 'നിയന്ത്രണത്തോടെ ചെയ്യുന്ന ഒരു സെറ്റിൽ നിന്ന് ഏകദേശ വൺ-റെപ് മാക്സിമം കണ്ടെത്തൂ.',
    liftedWeight: 'ഉയർത്തിയ ഭാരം',
    reps: 'ആവർത്തനങ്ങൾ',
    estimate: 'എന്റെ 1RM കണക്കാക്കുക',
    strengthResult: 'ഏകദേശ വൺ-റെപ് മാക്സിമം',
    strengthFormula: 'എപ്ലി സൂത്രവാക്യം: ഭാരം × (1 + ആവർത്തനങ്ങൾ ÷ 30).',
    strengthNote: 'ഇത് ഒരു ഏകദേശ കണക്കാണ്; പരീക്ഷിക്കാനുള്ള ലക്ഷ്യമല്ല. ശരിയായ രീതിയിൽ നിയന്ത്രണത്തോടെ ഉയർത്താൻ കഴിയുന്ന ഭാരം ഉപയോഗിക്കുക. വ്യായാമവും പരിചയവും അനുസരിച്ച് ഫലങ്ങൾ വ്യത്യാസപ്പെടും.',
    strengthError: '1 മുതൽ 500 കിലോഗ്രാം വരെ ഭാരവും 2 മുതൽ 10 വരെ പൂർണ്ണസംഖ്യയായ ആവർത്തനങ്ങളും നൽകുക.',
    breathingTag: 'വിശ്രമം',
    breathingTitle: 'ഒരു നിമിഷം നിങ്ങളേക്കായി',
    breathingDescription: 'ഒരു മിനിറ്റ്. സുഖകരമായ ഒരു താളം. നിങ്ങൾക്കായി അല്പം സമയം.',
    breathingPattern: '4 സെക്കൻഡ് അകത്തേക്ക് · 6 സെക്കൻഡ് പുറത്തേക്ക്',
    inhale: 'ശ്വാസം അകത്തേക്ക്',
    exhale: 'ശ്വാസം പുറത്തേക്ക്',
    ready: 'നിങ്ങളുടെ താളം കണ്ടെത്തൂ',
    complete: 'നിങ്ങൾക്കായി ഒരു മിനിറ്റ്',
    left: 'സെക്കൻഡ് ബാക്കി',
    completeNote: 'പൂർത്തിയായി. സ്വാഭാവിക ശ്വാസത്തിലേക്ക് മടങ്ങൂ.',
    start: 'ആരംഭിക്കുക',
    resume: 'തുടരുക',
    pause: 'നിർത്തിവയ്ക്കുക',
    again: 'വീണ്ടും ചെയ്യുക',
    reset: 'പുനഃസജ്ജമാക്കുക',
    breathNote: 'ശ്വാസം പിടിക്കാതെയും ബലം പ്രയോഗിക്കാതെയും സാവധാനം ശ്വസിക്കുക. അസ്വസ്ഥതയോ തലകറക്കമോ തോന്നിയാൽ നിർത്തി സാധാരണ രീതിയിൽ ശ്വസിക്കുക.',
    education: 'അറിവാണ് നിങ്ങളുടെ ശക്തമായ അടിത്തറ.',
    educationText: 'ഈ ഉപകരണങ്ങൾ പൊതുവായ അറിവിനുള്ളതാണ്. സുസ്ഥിരമായ പരിശീലനത്തിനും പോഷണത്തിനും ഒപ്പം ഉപയോഗിക്കുക. വ്യക്തിഗത വിദഗ്ധോപദേശത്തിന് പകരമല്ല ഇവ.',
  },
}

export default function Tools({ language }: { language: Language }) {
  const t = copy[language === 'ml' ? 'ml' : 'en']
  const [bodyWeight, setBodyWeight] = useState('70')
  const [protein, setProtein] = useState<[number, number] | null>([84, 112])
  const [proteinError, setProteinError] = useState(false)
  const [weight, setWeight] = useState('60')
  const [reps, setReps] = useState('5')
  const [oneRepMax, setOneRepMax] = useState<number | null>(70)
  const [strengthError, setStrengthError] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const started = Date.now() - elapsed * 1000
    const interval = window.setInterval(() => {
      const next = Math.min(60, Math.floor((Date.now() - started) / 1000))
      setElapsed(next)
      if (next >= 60) setRunning(false)
    }, 200)
    return () => window.clearInterval(interval)
    // The timer anchors to elapsed only when starting or resuming.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  function calculateProtein(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = Number(bodyWeight)
    const valid = bodyWeight.trim() !== '' && Number.isFinite(value) && value >= 30 && value <= 250
    setProteinError(!valid)
    setProtein(valid ? [Math.round(value * 1.2), Math.round(value * 1.6)] : null)
  }

  function calculateStrength(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const load = Number(weight)
    const repetitions = Number(reps)
    const valid = weight.trim() !== '' && reps.trim() !== '' && Number.isFinite(load) && load >= 1 && load <= 500 && Number.isInteger(repetitions) && repetitions >= 2 && repetitions <= 10
    setStrengthError(!valid)
    setOneRepMax(valid ? Math.round(load * (1 + repetitions / 30) * 10) / 10 : null)
  }

  const complete = elapsed >= 60
  const inhale = elapsed % 10 < 4
  const phase = complete ? t.complete : elapsed === 0 && !running ? t.ready : inhale ? t.inhale : t.exhale

  function toggleBreathing() {
    if (complete) setElapsed(0)
    setRunning(!running)
  }

  return (
    <div className="tools-page">
      <header className="page-heading tools-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p className="muted">{t.intro}</p>
      </header>

      <div className="tools-calculators">
        <section className="tools-card">
          <div className="tools-card-top"><span className="tools-icon"><Calculator size={22} strokeWidth={1.6} /></span><span className="tools-category">{t.proteinTag}</span><span className="tools-number">01</span></div>
          <h2>{t.proteinTitle}</h2>
          <p className="tools-description">{t.proteinDescription}</p>
          <form onSubmit={calculateProtein} noValidate>
            <label className="tools-label" htmlFor="tools-body-weight">{t.bodyWeight}</label>
            <div className="tools-input-wrap"><input id="tools-body-weight" type="number" min="30" max="250" step="0.1" inputMode="decimal" value={bodyWeight} aria-invalid={proteinError} aria-describedby={proteinError ? 'tools-protein-error' : undefined} onChange={(event) => { setBodyWeight(event.target.value); setProtein(null); setProteinError(false) }} /><span>kg</span></div>
            {proteinError && <p className="tools-error" role="alert" id="tools-protein-error">{t.proteinError}</p>}
            <button type="submit" className="button button-secondary tools-calculate">{t.calculate}<ArrowUpRight size={17} /></button>
          </form>
          <div className="tools-result" aria-live="polite" aria-atomic="true"><span>{t.proteinResult}</span><p><strong>{protein ? `${protein[0]}–${protein[1]}` : '—'}</strong><span>{t.gramsDay}</span></p><small>{t.proteinFormula}</small></div>
          <p className="tools-note"><Info size={15} />{t.proteinNote}</p>
        </section>

        <section className="tools-card">
          <div className="tools-card-top"><span className="tools-icon"><Dumbbell size={22} strokeWidth={1.6} /></span><span className="tools-category">{t.strengthTag}</span><span className="tools-number">02</span></div>
          <h2>{t.strengthTitle}</h2>
          <p className="tools-description">{t.strengthDescription}</p>
          <form onSubmit={calculateStrength} noValidate>
            <div className="tools-field-row">
              <div><label className="tools-label" htmlFor="tools-lift-weight">{t.liftedWeight}</label><div className="tools-input-wrap"><input id="tools-lift-weight" type="number" min="1" max="500" step="0.5" inputMode="decimal" value={weight} aria-invalid={strengthError} aria-describedby={strengthError ? 'tools-strength-error' : undefined} onChange={(event) => { setWeight(event.target.value); setOneRepMax(null); setStrengthError(false) }} /><span>kg</span></div></div>
              <div><label className="tools-label" htmlFor="tools-reps">{t.reps}</label><div className="tools-input-wrap"><input id="tools-reps" type="number" min="2" max="10" step="1" inputMode="numeric" value={reps} aria-invalid={strengthError} aria-describedby={strengthError ? 'tools-strength-error' : undefined} onChange={(event) => { setReps(event.target.value); setOneRepMax(null); setStrengthError(false) }} /><span>2–10</span></div></div>
            </div>
            {strengthError && <p className="tools-error" role="alert" id="tools-strength-error">{t.strengthError}</p>}
            <button type="submit" className="button button-secondary tools-calculate">{t.estimate}<ArrowUpRight size={17} /></button>
          </form>
          <div className="tools-result" aria-live="polite" aria-atomic="true"><span>{t.strengthResult}</span><p><strong>{oneRepMax ?? '—'}</strong><span>kg</span></p><small>{t.strengthFormula}</small></div>
          <p className="tools-note"><Info size={15} />{t.strengthNote}</p>
        </section>
      </div>

      <section className="tools-card tools-breathing">
        <div className="tools-breathing-copy">
          <div className="tools-card-top"><span className="tools-icon"><Wind size={23} strokeWidth={1.6} /></span><span className="tools-category">{t.breathingTag}</span><span className="tools-number">03</span></div>
          <h2>{t.breathingTitle}</h2>
          <p className="tools-description">{t.breathingDescription}</p>
          <span className="tools-breath-pattern">{t.breathingPattern}</span>
          <div className="tools-breath-controls">
            <button type="button" className="button button-primary" onClick={toggleBreathing}>{running ? <Pause size={16} /> : <Play size={16} />}{running ? t.pause : complete ? t.again : elapsed > 0 ? t.resume : t.start}</button>
            <button type="button" className="tools-reset" onClick={() => { setRunning(false); setElapsed(0) }} disabled={!running && elapsed === 0}><RotateCcw size={16} />{t.reset}</button>
          </div>
          <p className="tools-note"><Info size={15} />{t.breathNote}</p>
        </div>
        <div className={`tools-breath-visual ${running ? 'tools-is-breathing' : ''}`}>
          <div className="tools-breath-ring">
            <svg viewBox="0 0 200 200" aria-hidden="true"><circle className="tools-ring-track" cx="100" cy="100" r="91" /><circle className="tools-ring-progress" cx="100" cy="100" r="91" strokeDasharray="571.77" strokeDashoffset={571.77 * elapsed / 60} /></svg>
            <div className="tools-breath-center"><Wind size={28} strokeWidth={1.2} /><strong>{60 - elapsed}<span>s</span></strong><span>{t.left}</span></div>
          </div>
          <p className="tools-phase" aria-live="polite">{phase}</p>
          {complete && <p className="tools-complete-note">{t.completeNote}</p>}
        </div>
      </section>

      <aside className="tools-education"><span className="tools-icon"><Info size={20} strokeWidth={1.5} /></span><div><h3>{t.education}</h3><p>{t.educationText}</p></div></aside>
    </div>
  )
}
