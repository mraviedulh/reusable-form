# Dokumentasi Komponen Form

Berdasarkan komponen di `components/form/` dan integrasinya di `App.tsx`.

---

## 1. InputField

**Deskripsi**
Field input teks untuk username. Bisa dipakai berdiri sendiri (uncontrolled)
atau dikontrol dari parent (mis. `App.tsx`) supaya nilainya bisa dipakai
komponen lain.

**Props**
| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `value` | `string` | - | Nilai terkontrol. Jika tidak diisi, komponen memakai state internal sendiri. |
| `onChange` | `(value: string) => void` | - | Dipanggil setiap kali user mengetik. |

**Cara pakai**
```tsx
// Standalone (tanpa parent state)
<InputField />

// Controlled (dipakai App.tsx agar nilainya bisa dibaca komponen lain)
const [username, setUsername] = useState("");
<InputField value={username} onChange={setUsername} />
```

---

## 2. InputDisabled

**Deskripsi**
Field email yang dinonaktifkan (read-only), nilainya dibentuk otomatis dari
`username` yang diisi di `InputField`, dengan format `username@gmail.com`.

**Props**
| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `username` | `string` | `""` | Dipakai untuk membentuk nilai email `{username}@gmail.com`. Jika kosong, field tampil kosong dengan placeholder. |

**Cara pakai**
```tsx
<InputDisabled username={username} />
// contoh: username = "raafi" -> field menampilkan "raafi@gmail.com"
```

---

## 3. DatePickerSimple

**Deskripsi**
Date picker tunggal (Popover + Calendar) untuk field "Date of birth".
Berjalan sebagaimana adanya, tidak diubah — hanya direposisi di layout.

**Props**
Tidak ada (tidak menerima props; state tanggal dikelola internal).

**Cara pakai**
```tsx
<DatePickerSimple />
```

---

## 4. DatePickerWithRange

**Deskripsi**
Date picker rentang tanggal (dari–sampai), memakai `react-day-picker` mode
`range` dan `date-fns` untuk format tampilan. Diposisikan setelah
`ComboboxBasic`/`ComboboxInvalid` pada baris yang sama.

**Props**
Tidak ada (state rentang tanggal dikelola internal, dengan nilai default
20 hari dari tanggal 20 Januari tahun berjalan).

**Cara pakai**
```tsx
<DatePickerWithRange />
```

---

## 5. ComboboxBasic

**Deskripsi**
Combobox pemilihan satu framework dari daftar (`Next.js`, `SvelteKit`,
`Nuxt.js`, `Remix`, `Astro`). Dijadikan controlled agar nilai pilihannya
bisa dibaca `App.tsx` saat proses validasi submit.

**Props**
| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `value` | `string` | - | Nilai item yang sedang terpilih. |
| `onValueChange` | `(value: string) => void` | - | Dipanggil saat user memilih salah satu item. |

**Cara pakai**
```tsx
const [framework, setFramework] = useState("");
<ComboboxBasic value={framework} onValueChange={setFramework} />
```

> ✅ Terverifikasi terhadap primitive asli (`@base-ui/react` Combobox): prop
> `value`/`onValueChange` pada `Combobox.Root` memang nama resmi Base UI
> untuk controlled selection, jadi implementasi ini sudah sesuai tanpa
> perlu penyesuaian nama prop.
>
> Ditambahkan `showClear` pada `ComboboxInput` sehingga muncul tombol "x"
> untuk membatalkan pilihan tanpa perlu membuka ulang dropdown.

---

## 6. ComboboxInvalid

**Deskripsi**
Versi "error" dari `ComboboxBasic` — dipakai untuk menunjukkan bahwa field
wajib diisi tapi belum dipilih (`data-invalid`, `aria-invalid="true"`, dan
pesan error "This field cannot be blank.").

**Props**
| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `onValueChange` | `(value: string) => void` | - | Dipanggil saat user memilih item; dipakai `App.tsx` untuk otomatis kembali menampilkan `ComboboxBasic`. |

**Cara pakai**
```tsx
<ComboboxInvalid onValueChange={handleFrameworkChange} />
```

---

## Alur Validasi Submit (di `App.tsx`)

1. State `framework` menyimpan pilihan combobox, `submitted` menandai
   apakah tombol Submit sudah ditekan.
2. Selama `submitted === false`, yang selalu tampil adalah `ComboboxBasic`
   — user bebas memilih atau belum memilih.
3. Saat tombol **Submit** ditekan (`handleSubmit`) → `submitted` menjadi
   `true`.
4. Kondisi tampilan dievaluasi ulang:
   - Jika `framework` **sudah terisi** → tetap tampil `ComboboxBasic`
     (dianggap valid).
   - Jika `framework` **masih kosong** → berganti menjadi
     `ComboboxInvalid`.
5. Jika saat itu tampil `ComboboxInvalid` lalu user memilih salah satu
   item, `handleFrameworkChange` akan mengisi `framework` sekaligus
   me-reset `submitted` ke `false`, sehingga tampilan otomatis kembali ke
   `ComboboxBasic`.

Tombol Submit memakai varian default dari `Button`
(`components/ui/button.tsx`), sesuai contoh dasar di
[shadcn/ui — Base Button](https://ui.shadcn.com/docs/components/base/button),
tanpa prop `variant` tambahan.
