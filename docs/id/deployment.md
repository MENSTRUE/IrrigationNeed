# Deployment — IrrigationNeed

## Development lokal (terimplementasi)
PowerShell terminal A dari root repository:
```powershell
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m pip install -r backend\requirements.txt
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m uvicorn backend.app.main:app --reload --port 8000
```
Terminal B:
```powershell
cd frontend
npm ci
npm run dev
```
Swagger API `http://127.0.0.1:8000/docs`; dashboard `http://127.0.0.1:5173`. Validasi build melalui `npm run build` dari `frontend/`. UI pernah ditunjukkan berjalan lokal pada satu input, tetapi belum ada suite integration test otomatis di pohon GitHub.

## Batas kesiapan
Ini **belum dideploy ke production**. Uvicorn reload, CORS lokal, tanpa autentikasi, tanpa TLS, rate limit, dan model di samping kode adalah pilihan development. Batasi akses jaringan. Jangan deserialize joblib tak tepercaya. Tambahkan verifikasi hash model, pembatasan request, telemetry tanpa menyimpan sensor mentah sensitif, test otomatis, deployment model berversi, dan pengawasan manusia sebelum pilot eksternal.

## Ketidaksesuaian konfigurasi
`.env.example` berisi `MODEL_PATH`, tetapi backend saat ini memakai path konstan. Jangan klaim variabel tersebut berfungsi tanpa perubahan kode. Restart backend untuk reload model; tombol frontend **Refresh model** hanya mengambil ulang metadata.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
