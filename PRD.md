# Product Requirement Document (PRD)
## Project: Portfolio Website Overhaul (v1 to v2)

### 1. Objective & Overview
Proyek ini bertujuan untuk merombak total (*overhaul*) website portofolio pribadi yang saat ini di-host di GitHub Pages. Seluruh basis kode versi 1 (v1) akan dihapus dan digantikan sepenuhnya dengan versi 2 (v2) menggunakan **Phoenix Framework** (Elixir). 

Mengingat batasan GitHub Pages yang hanya mendukung hosting statis (membaca file `index.html`), hasil akhir dari pengembangan menggunakan Phoenix Framework harus dapat diekspor menjadi file HTML/CSS statis siap pakai.

---

### 2. Core Requirements & Tech Stack
* **Backend/Development Framework:** Phoenix Framework (Elixir)
* **Deployment Target:** GitHub Pages (Static Hosting)
* **Build/Export Strategy:** Proses *build* lokal di Phoenix harus menghasilkan output berupa file statis utama (`index.html`) beserta aset pendukungnya (CSS/JS) agar bisa dibaca langsung oleh GitHub Pages.

---

### 3. Key Feature Changes & Sections
* **Remove Version 1:** Hapus seluruh arsitektur dan tampilan lama dari website portofolio versi 1.
* **Section Update (Certificate to My Project):**
    * Menghapus bagian *Certificate* yang ada pada versi sebelumnya.
    * Menggantinya dengan bagian baru bernama **"My Project"**.
    * Bagian *My Project* wajib menampilkan *screenshot* dari proyek-proyek yang pernah dibuat.
    * **Data Content:** Untuk tahap awal, konten gambar *screenshot* dan deskripsi proyek menggunakan data *dummy* (contoh sementara).

---

### 4. Technical Workflow & Constraints
1.  **Local Development:** Pengembangan website, tata letak (layout), dan komponen UI dilakukan di lingkungan lokal menggunakan struktur MVC/LiveView dari Phoenix Framework.
2.  **Static Exporting:** Menggunakan mekanisme *scraping* lokal (seperti `wget` / `curl`) atau menggunakan *library* Elixir penunjang ekspor statis (misalnya `Static` atau *custom mix task*) untuk mengonversi halaman Phoenix dinamis menjadi file `index.html`.
3.  **Deployment:** File hasil ekspor dialokasikan ke *root directory* atau folder distribusi yang terhubung ke *repository* GitHub Pages untuk dipublikasikan.

---

### 5. Success Criteria
* Website versi 2 berhasil berjalan di GitHub Pages melalui URL utama.
* Bagian *My Project* menampilkan galeri proyek *dummy* dengan rapi.
* Tidak ada sisa komponen backend dinamis yang merusak tampilan saat diakses secara statis di GitHub Pages.
