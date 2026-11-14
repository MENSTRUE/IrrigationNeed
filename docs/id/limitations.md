# Limitations — IrrigationNeed

## Keterbatasan ilmiah
1. **Validitas target:** 0/1 adalah status sumber, bukan pengukuran kebutuhan air tanaman. Satuan fisik dan mapping kode tanaman belum jelas.
2. **Metrik sempurna:** validasi dan test 100% mungkin akibat label sederhana/turunan, kontinuitas temporal, atau sampel terkait. Overlap eksak nol tidak menyingkirkan kemungkinan itu.
3. **Domain shift:** proporsi positif 4,90% train, 55,67% validasi, 44,87% test; belum ada evaluasi terpisah berdasarkan lahan atau sumber eksternal independen.
4. **Probabilitas:** kalibrasi, ambang, dan trade-off risiko operasional belum diuji.
5. **Tata kelola data:** lisensi dan atribusi asli masih perlu diverifikasi; data mentah jangan didistribusikan.

## Keterbatasan engineering
Frontend menampilkan angka kelas kecuali ada skema label eksplisit. Batas satuan/rentang tidak tersedia kecuali dikonfigurasi di `models/inference_schema.json`. Backend tidak membaca `MODEL_PATH` dari `.env`; refresh UI tidak reload model. Repo yang diaudit belum memuat autentikasi/rate limiting/observability production, log prediksi persisten, integrasi perangkat lapangan, atau test otomatis.

## Batas klaim dan kendali risiko
Gunakan “classifier rekaman keputusan” dan “prototipe penelitian”. Hindari “hemat air terbukti”, “tervalidasi petani”, “akurasi lapangan 99%”, “confidence terkalibrasi”, “irigasi otomatis”, dan “production ready”. Kesalahan irigasi dapat merusak tanaman atau membuang air. Anggap prediksi hanya informasi. Kriteria ke depan: validasi semantik label, data eksternal dipisah waktu/lahan, evaluasi reproduktif dan ketidakpastian, studi kalibrasi, persetujuan ahli agronomi, serta uji operasi aman.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
