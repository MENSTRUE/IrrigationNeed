# Troubleshooting — IrrigationNeed

## Backend menyebut model unavailable
Buka `GET http://127.0.0.1:8000/api/v1/model` dan baca `reason`. Pastikan `models/irrigation_champion.joblib` tersedia; jalankan `python scripts/inspect_model.py` pada **lingkungan tepercaya**. Model harus memiliki `predict` dan nama fitur (`feature_names_in_`) atau skema eksplisit. Waspadai eksekusi kode saat memuat joblib/pickle.

## HTTP 422 saat prediksi
JSON POST wajib memuat **tepat** `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer` di dalam `features`, semuanya numerik. Huruf besar/kecil dan ejaan penting. String yang bisa diparse menjadi angka diterima backend; boolean, NaN/Infinity, key tidak dikenal atau hilang ditolak. Min/max hanya diterapkan jika ada batas pada file skema.

## HTTP 500 saat inferensi
Baca traceback Uvicorn. Periksa pipeline terlatih, kompatibilitas versi sklearn, urutan fitur, dan tipe input. Jangan menyembunyikan error dengan melatih ulang atau mengganti set fitur tanpa audit.

## Frontend tidak terhubung
Jalankan backend di port 8000 lebih dulu. Vite meneruskan `/api` ke `http://127.0.0.1:8000`; jalankan `npm ci` dan `npm run dev` dari folder frontend. Cek Network di browser dan terminal.

## Label model hanya `0` dan `1`
Repo saat diaudit tidak memiliki `models/inference_schema.json`. Backend menampilkan label mentah. Cocokkan mapping pada manifest eksperimen; skema opsional dapat mendefinisikan fitur/opsi/`prediction_labels` yang tepat. Jangan mengarang satuan atau nama tanaman.

## Tombol Refresh tidak memakai checkpoint baru
Tombol hanya mengambil ulang `GET /api/v1/model`. Restart Uvicorn agar `load_model()` dijalankan saat startup; cek hash model aktif dan ulangi prediksi.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
