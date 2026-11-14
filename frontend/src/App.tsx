import { useEffect, useMemo, useState } from 'react'
import { Activity, ArrowRight, CheckCircle2, ChevronRight, CircleHelp, CloudSun, Droplets, Github, Leaf, LoaderCircle, RefreshCw, ShieldCheck, Sprout, Waves, AlertTriangle, BarChart3 } from 'lucide-react'

type Field = { name: string; label: string; type: 'number' | 'category'; unit?: string; options?: string[]; min?: number | null; max?: number | null; description?: string }
type ModelInfo = { ready: boolean; status: string; reason: string; model_name: string; features: Field[]; disclaimer: string }
type Result = { prediction: string | number | boolean; display_label: string; model: string; class_probabilities?: Record<string, number> }
const API = '/api/v1'
const formatName = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

export default function App() {
  const [model, setModel] = useState<ModelInfo | null>(null)
  const [form, setForm] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'predict' | 'about'>('predict')
  const [active, setActive] = useState('Overview')

  async function refresh() {
    setChecking(true); setError('')
    try {
      const response = await fetch(`${API}/model`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      const info: ModelInfo = await response.json()
      setModel(info)
      setForm(previous => Object.fromEntries(info.features.map(f => [f.name, previous[f.name] ?? (f.type === 'category' ? (f.options?.[0] ?? '') : '')])))
    } catch (e) { setModel(null); setError(`Backend unavailable: ${e instanceof Error ? e.message : String(e)}`) }
    finally { setChecking(false) }
  }
  useEffect(() => { void refresh() }, [])
  const complete = useMemo(() => !!model?.ready && model.features.every(f => form[f.name] !== undefined && form[f.name].trim() !== ''), [model, form])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!model?.ready) return
    setLoading(true); setResult(null); setError('')
    const features: Record<string, number | string> = {}
    for (const field of model.features) features[field.name] = field.type === 'number' ? Number(form[field.name]) : form[field.name]
    try {
      const response = await fetch(`${API}/predict`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ features }) })
      const data = await response.json()
      if (!response.ok) throw new Error(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
      setResult(data)
    } catch (e) { setError(e instanceof Error ? e.message : String(e)) }
    finally { setLoading(false) }
  }

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Droplets size={23} strokeWidth={2.4}/></div><div><strong>Irrigation<span>Need</span></strong><small>INTELLIGENT AGRICULTURE</small></div></div>
      <div className="nav-title">WORKSPACE</div>
      {['Overview','Prediction','Model Insights'].map((item, i) => <button key={item} className={`nav-item ${active === item ? 'selected' : ''}`} onClick={() => { setActive(item); setTab(i === 2 ? 'about' : 'predict'); document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }) }}><span>{i === 0 ? <Activity size={18}/> : i === 1 ? <Droplets size={18}/> : <BarChart3 size={18}/>}</span>{item}{active === item && <ChevronRight size={16} className="nav-chevron"/>}</button>)}
      <div className="side-bottom"><div className="side-help"><CircleHelp size={20}/><div><b>About this project</b><p>AI decision support for smarter irrigation.</p></div></div><a href="https://github.com/MENSTRUE/IrrigationNeed" target="_blank" rel="noreferrer"><Github size={17}/> View repository <ArrowRight size={15}/></a></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="breadcrumb">Workspace <ChevronRight size={15}/> <strong>{active}</strong></div><div className="top-actions"><span className={`status-pill ${model?.ready ? 'online' : 'offline'}`}><span className="dot"/>{checking ? 'Checking model' : model?.ready ? 'Model online' : 'Model unavailable'}</span><span className="avatar">IN</span></div></header>
      <div className="content">
        <div className="eyebrow"><span className="eyebrow-line"/> PRECISION AGRICULTURE PLATFORM</div>
        <div className="heading-row"><div><h1>Smarter irrigation.<br/><span>Healthier harvests.</span></h1><p className="subtitle">Turn agricultural data into actionable irrigation insights with machine learning.</p></div><div className="heading-decoration"><Waves size={58}/></div></div>
        <section className="stats">
          <div className="stat"><div className="stat-top"><span>MODEL STATUS</span><span className="stat-icon blue"><Activity size={19}/></span></div><strong>{checking ? 'Checking…' : model?.ready ? 'Operational' : 'Needs setup'}</strong><div className="stat-foot"><span className={model?.ready ? 'good' : 'muted'}>{model?.ready ? '● Ready for inference' : '● Awaiting model metadata'}</span></div></div>
          <div className="stat"><div className="stat-top"><span>INPUT FEATURES</span><span className="stat-icon purple"><BarChart3 size={19}/></span></div><strong>{model?.features.length ?? '—'}</strong><div className="stat-foot">Derived from saved model schema</div></div>
          <div className="stat"><div className="stat-top"><span>INFERENCE ENGINE</span><span className="stat-icon teal"><Sprout size={19}/></span></div><strong>Scikit-learn</strong><div className="stat-foot">Local joblib model</div></div>
        </section>
        <section className="work" id="workspace"><div className="work-header"><div><div className="section-kicker">AI-POWERED ANALYSIS</div><h2>Irrigation assessment</h2><p>Provide field conditions to generate a model-based prediction.</p></div><button className="refresh" onClick={() => void refresh()} disabled={checking}><RefreshCw size={16} className={checking ? 'spin' : ''}/> Refresh model</button></div>
          <div className="tabs"><button className={tab === 'predict' ? 'tab active' : 'tab'} onClick={() => setTab('predict')}><Droplets size={16}/> New assessment</button><button className={tab === 'about' ? 'tab active' : 'tab'} onClick={() => setTab('about')}><ShieldCheck size={16}/> Model details</button></div>
          {tab === 'predict' ? <div className="work-grid"><div className="form-panel"><div className="panel-title"><span className="number">01</span><div><h3>Field parameters</h3><p>Complete the required input values below.</p></div></div>
            {!model?.ready && <div className="notice"><AlertTriangle size={20}/><div><strong>Model is not ready</strong><p>{error || model?.reason || 'Start the FastAPI backend to discover the model features.'}</p></div></div>}
            {model?.ready && <form onSubmit={submit}><div className="fields">{model.features.map(field => <label className="field" key={field.name}><span>{field.label} {field.unit && <em>({field.unit})</em>}</span>{field.type === 'category' ? <select required value={form[field.name] ?? ''} onChange={e => setForm({ ...form, [field.name]: e.target.value })}>{field.options?.map(o => <option key={o} value={o}>{formatName(o)}</option>)}</select> : <input required type="number" step="any" min={field.min ?? undefined} max={field.max ?? undefined} placeholder={`Enter ${field.label.toLowerCase()}`} value={form[field.name] ?? ''} onChange={e => setForm({ ...form, [field.name]: e.target.value })}/>} {field.description && <small>{field.description}</small>}</label>)}</div><button className="submit" type="submit" disabled={!complete || loading}>{loading ? <LoaderCircle size={18} className="spin"/> : <Droplets size={18}/>} {loading ? 'Analyzing field data…' : 'Generate prediction'} <ArrowRight size={18}/></button></form>}
            {error && model?.ready && <div className="notice error"><AlertTriangle size={18}/><p>{error}</p></div>}
          </div><div className="result-panel"><div className="panel-title"><span className="number secondary">02</span><div><h3>Analysis results</h3><p>Powered by your trained ML model.</p></div></div>{result ? <div className="result-data"><div className="result-icon"><CheckCircle2 size={30}/></div><div className="result-caption">MODEL PREDICTION</div><h2>{result.display_label}</h2><p>Raw prediction: {String(result.prediction)}</p>{result.class_probabilities && <div className="probabilities"><h4>Class probabilities</h4>{Object.entries(result.class_probabilities).sort((a,b)=>b[1]-a[1]).map(([label,value])=><div className="prob" key={label}><div><span>{formatName(label)}</span><strong>{(value*100).toFixed(1)}%</strong></div><div className="bar"><i style={{width:`${value*100}%`}}/></div></div>)}</div>}<div className="disclaimer"><ShieldCheck size={16}/> {model?.disclaimer}</div></div> : <div className="empty-result"><div className="empty-icon"><CloudSun size={42}/></div><h3>Your results will appear here</h3><p>Complete the field parameters and run the analysis to see your model's output.</p><div className="empty-line"/><div className="empty-features"><span><CheckCircle2 size={15}/> Real model inference</span><span><CheckCircle2 size={15}/> Input validation</span></div></div>}</div></div> : <div className="details"><div className="detail-icon"><Leaf size={27}/></div><h3>Model configuration</h3><p>This dashboard reads feature names from the saved model, or from <code>models/inference_schema.json</code> when explicit types and category options are required.</p><div className="detail-row"><span>Artifact</span><b>{model?.model_name ?? 'irrigation_champion.joblib'}</b></div><div className="detail-row"><span>Status</span><b>{model?.status ?? 'Disconnected'}</b></div><div className="detail-row"><span>Expected input features</span><b>{model?.features.map(f => f.name).join(', ') || 'Not available'}</b></div><div className="disclaimer"><ShieldCheck size={16}/> Predictions must be interpreted in the context of the original training labels and dataset limitations.</div></div>}
        </section><footer><span>© 2026 IrrigationNeed · 100 Days of Projects</span><span>Designed for research & decision support</span></footer>
      </div>
    </main>
  </div>
}
