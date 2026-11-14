# Methodology — IrrigationNeed

## Pertanyaan riset dan desain
**Pertanyaan:** seberapa akurat classifier mengulang status irigasi yang dicatat sumber dari fitur lingkungan saat itu dengan split kronologis? **Bukan pertanyaan:** berapa volume air atau kapan waktu penyiraman optimal.

## Input dan preprocessing
Lima kolom numerik: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer` (ejaan terakhir **mengikuti kolom asli**). Target `irrigation`. `Time` hanya untuk urutan dan `best time` dikecualikan karena berpotensi muncul setelah keputusan. Spasi tepi nama kolom dibersihkan; input dikonversi melalui `pd.to_numeric(errors="coerce")`. Target kosong dihapus; prediktor kosong diimputasi menggunakan `SimpleImputer(strategy="median")` yang di-*fit hanya pada train* dalam pipeline sklearn.

## Split dan seleksi
Urutkan timestamp, karantina signature sensor dengan label bertentangan, split pada batas 70% dan 85% **timestamp unik**, lalu purge signature input identik dari bagian yang lebih baru. Set akhir: train 2.511 (kelas 0/1: 2.388/123); validasi 379 (168/211); test 517 (285/232). Ini kronologis, tetapi **belum independen berdasarkan lahan**. Bandingkan Dummy majority, Logistic Regression (dengan standardisasi), dan Random Forest; pilih macro-F1 validasi dengan balanced accuracy sebagai tie-breaker; evaluasi test sekali.

## Estimator akhir
Pipeline Random Forest: median imputer → `RandomForestClassifier(n_estimators=300, min_samples_leaf=3, class_weight="balanced_subsample", n_jobs=-1, random_state=42)`. Model yang diekspor hanya di-*fit* pada train; validasi/test tidak dipakai untuk refit.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
