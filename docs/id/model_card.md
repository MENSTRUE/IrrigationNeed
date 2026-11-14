# Model Card — IrrigationNeed

## Identitas dan penggunaan
**Nama:** `irrigation_champion.joblib`. **Tugas:** klasifikasi label irigasi yang dicatat sumber. **Champion:** pipeline sklearn median imputer + Random Forest. Dipakai untuk pendidikan, riset reproduktif, dan demo inferensi. **Tidak untuk:** mengendalikan pompa, menentukan volume air, menjamin penghematan air, mendiagnosis kesehatan tanaman, atau keputusan pertanian tanpa pendampingan.

## Kontrak input/output
Input berupa pandas DataFrame satu baris dengan nama peka huruf besar/kecil sesuai urutan: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer`. Ejaan `Tempertuer` memang mengikuti sumber. Semua numerik; satuan dan arti kode tanaman belum terverifikasi. Kelas 0/1 menunjukkan no-irrigation/irrigation yang dicatat sumber. API mengembalikan prediksi mentah, `display_label` opsional, dan `class_probabilities` bila tersedia; tanpa `models/inference_schema.json`, label tetap numerik di UI.

## Pelatihan dan evaluasi
Rincian di methodology/evaluation. SHA-256 dataset sumber: `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`; SHA-256 model menurut manifest: `835ce8cfa81402276f0795197a5eff4fab064383b583a342cff91c9b01d80593`. Bandingkan hash lokal sebelum menjadikannya bukti riset.

## Risiko
Kemungkinan korelasi serial, target yang bersifat sirkular, domain shift, periode pengamatan sempit, class imbalance temporal, satuan tak terkonfirmasi, serta probabilitas tidak terkalibrasi. Tidak ada uji coba petani atau validasi prospektif yang tercatat. Deserialisasi joblib dapat mengeksekusi kode; hanya muat file tepercaya.

## Bukti dan interpretasi
Eksperimen ini mengklasifikasikan **kolom `irrigation` yang dicatat sumber**, bukan kebutuhan air agronomis yang diukur secara independen. Makna label belum tervalidasi untuk resep irigasi lapangan. Skor held-out 100% adalah *hasil internal satu sumber setelah purge*, bukan bukti performa prospektif, ketahanan, atau validasi eksternal. Penghapusan duplikasi tanda tangan sensor yang identik tidak membuktikan independensi lahan atau menghilangkan near-duplicate. Kalibrasi probabilitas belum diuji.

## Berkas bukti
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — konfigurasi, fitur, split, seleksi model, hash, dan keterbatasan.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — metrik dan confusion matrix test.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — overlap fitur yang identik.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — distribusi dan periode data.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — seleksi berbasis validasi saja.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — lisensi sumber belum dipastikan.
