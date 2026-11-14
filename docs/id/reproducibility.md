# Reproducibility — IrrigationNeed

## Notebook dan lingkungan
Rekaman eksekusi adalah [`notebooks/irrigationneed.ipynb`](../../notebooks/irrigationneed.ipynb) (30 sel, output Kaggle asli). Mount Kaggle: `/kaggle/input/datasets/loliwibu/irrigationneed-dataset`; workbook utama `second dataset collected.xlsx`. Notebook mencari workbook ekstrak atau anggota ZIP, menghitung SHA-256, mengaudit data pendukung, membuat plot/split, melatih tiga kandidat, mengevaluasi champion, dan mengekspor hasil tanpa menyertakan baris data mentah.

**Versi yang direkam:** Python 3.13.16, pandas 2.3.3, sklearn 1.6.1; seed 42. `backend/requirements.txt` berupa *rentang versi*, bukan lockfile yang sama dengan environment training. Untuk replikasi identik, dokumentasikan versi numpy, openpyxl, joblib, revisi sumber, dan hak penggunaan data.

## Langkah reproduksi
1. Mount workbook sumber yang sama di Kaggle dan verifikasi SHA-256 `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`.
2. Jalankan notebook berurutan dari kernel bersih (CPU memadai); jangan mengganti split menjadi acak.
3. Cocokkan train/val/test 2.511/379/517, `purged_validation=159`, `purged_test=22`, overlap signature eksak nol.
4. Cocokkan CSV validasi dan JSON test satu kali. Jangan menyesuaikan model setelah melihat test.
5. Cocokkan model ekspor `irrigation_champion.joblib` dengan checksum manifest `835ce8cfa81402276f0795197a5eff4fab064383b583a342cff91c9b01d80593`; simpan versi artefak dan provenance.

Inferensi Windows menggunakan joblib yang **sudah diekspor** dan tidak melatih ulang. Perbedaan versi Python/sklearn dapat menyebabkan ketidakcocokan joblib.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
