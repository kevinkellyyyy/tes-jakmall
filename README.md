# Jakmall Frontend Test

## demo
[https://tes-jakmall.vercel.app](https://tes-jakmall.vercel.app)

## atau bisa juga :
- clone project
- npm install
- npm start

## Brief singkat mengenai project
- project dikerjakan menggunakan React JS

## library yang digunakan
- @redux/toolkit : untuk keperluan configure store, karena bawaan createstore dari redux depricated
- react-hook-form : untuk form input
- react-redux : agar redux bisa digunakan pada react
- redux : global state management
- redux-persist : unruk menyimpan nilai yang diinput pada redux state, sehingga jika di refresh data tidak hilang
- styled-components : untuk membantu styling component

## di step payment 1
- state form pertama kosong dan validasi juga clear, ketika diisi validasi akan dilakukan tiap user input (onchange)
- saat validasi clear border input warna abu abu, jika benar hijau, dan jika salah oranye, disertakan juga ikon check saat valid, dan silang saat saat input salah, dilengkapi juga dengan error message untuk memudahkan user dalam pengisisan ketika field yg fiisi masih salah
- pada field phone dibuat fungsi untuk filter key, sehingga hanya char numerik dan 0-9,-,+,(,) yang dapat diinput, jika ketik diluar char tersebut tidak akan ada perubahan pada input field (preventdefault)
- dropship default ada di false, jika dicheck, maka field dropship name dan phone wajib diisi, jika di uncheck lagi akan reset field tersebut dan jadi disabled
- tombol continue payment jika di klik tapi validasi form masih belum benar, maka tidak akan lanjut ke step berikutnya

## step payment 2
- state awal pada step ini pada pilihan shipping dan payment masih kosong, jika dipilih salah 1 maka akan di highlight hijau dan merubah value pada komponen summary
- jika pilihan shipping dan payment belum dipilih atau hanya salah satu dipilih, tombol pay masih akan disabled, jika sudah dipilih semua bisa lanjut di klik pembayaran

## di step payment 3 (selesai)
- page akan langsung memberikan pesan thankyou disertai transaction id dengan random alfanumber 5 digit selain char ,I,0,O

