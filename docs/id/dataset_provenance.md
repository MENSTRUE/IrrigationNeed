# Dataset Provenance — IrrigationNeed

## Data primer dan pendukung
Target yang dilatih berasal dari **`second dataset collected.xlsx`** dalam mount Kaggle `loliwibu/irrigationneed-dataset`, subfolder `01_Irrigation_Dataset/Irrigation-Dataset/`. SHA-256 sumber yang dicatat: `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`. Manifest menyebut kandidat publikasi asli [Mendeley Data 67gkrzbwrr/1](https://data.mendeley.com/datasets/67gkrzbwrr/1), tetapi **atribusi penerbit dan lisensi belum terverifikasi**. Jangan menganggap redistribusi diperbolehkan.

Mount juga memuat keluarga data Smart Irrigation Control, Environmental Sensor, Soil Moisture/Motor, serta Irrigation Actuator/Weather. Semuanya **diaudit sebagai data pendukung**, bukan digabungkan ke target klasifikasi. Inventaris ada di [`input_file_inventory.csv`](../../reports/extracted/input_file_inventory.csv) dan [`auxiliary_csv_schema_inventory.csv`](../../reports/extracted/auxiliary_csv_schema_inventory.csv).

## Pengumpulan dan target
Excel awal berisi 3.589 baris; 3.588 memiliki label (`0`: 2.997; `1`: 591). Target adalah nilai `irrigation` yang dicatat sumber. Kelas `0` berarti “no irrigation (source label)” dan `1` berarti “irrigation (source label)” **dalam konteks dataset**, bukan rekomendasi tindakan yang sudah teruji. Model ini tidak mengukur volume air, jadwal optimal, neraca air tanah, evapotranspirasi rujukan, ataupun verifikasi agronom lapangan.

## Verifikasi lanjutan
Pastikan identitas penerbit, lokasi pengambilan data, satuan sensor, arti kode tanaman, zona waktu, lisensi/atribusi, kebijakan penetapan label, dan kemungkinan label dibentuk melalui aturan deterministik. Versi dan tanggal akses hanya ditulis setelah diverifikasi. Jangan menyebarkan baris data mentah sebelum izin jelas.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
