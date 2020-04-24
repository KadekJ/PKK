-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Apr 2020 pada 10.34
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `riche`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `motor`
--

CREATE TABLE `motor` (
  `id_motor` int(11) NOT NULL,
  `nama_pemilik` varchar(20) DEFAULT NULL,
  `jenis_motor` varchar(300) DEFAULT NULL,
  `tahun` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `motor`
--

INSERT INTO `motor` (`id_motor`, `nama_pemilik`, `jenis_motor`, `tahun`, `created_at`, `updated_at`) VALUES
(4, 'Budi Budiman ', 'N-Max', '2019', '2020-04-20 02:04:27', '2019-12-10 04:04:28'),
(9, 'budiono', 'Trail', '2020', '2020-04-20 02:05:20', '2020-04-20 02:05:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemilik`
--

CREATE TABLE `pemilik` (
  `id_penyewa` int(11) NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `nama_penyewa` varchar(300) DEFAULT NULL,
  `alamat` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pemilik`
--

INSERT INTO `pemilik` (`id_penyewa`, `nik`, `nama_penyewa`, `alamat`, `created_at`, `updated_at`) VALUES
(4, '2345678976', 'Budi Budiman Simanjuntak', 'Jl. Danau  Ranau', '2020-04-19 11:34:35', '2019-12-10 04:04:28'),
(7, '1324576524', 'Liliput Madagas', 'Jl. Sejuta Pesona', '2020-04-19 11:32:48', '2019-12-10 06:37:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penyewa`
--

CREATE TABLE `penyewa` (
  `id_penyewa` int(11) NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `nama_penyewa` varchar(300) DEFAULT NULL,
  `alamat` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `penyewa`
--

INSERT INTO `penyewa` (`id_penyewa`, `nik`, `nama_penyewa`, `alamat`, `created_at`, `updated_at`) VALUES
(4, '2345678976', 'Budi Budiman Simanjuntak', 'Jl. Danau  Ranau', '2020-04-19 11:34:35', '2019-12-10 04:04:28'),
(7, '1324576524', 'Liliput Madagas', 'Jl. Sejuta Pesona', '2020-04-19 11:32:48', '2019-12-10 06:37:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(300) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'edelwise_redds@gmail.com', 'edeledel', 'eyJpdiI6Iko0cmlaZWFpWHpQNVFYT2R6NjdDTUE9PSIsInZhbHVlIjoiaDNiWVRZUjFOaU9yTFB4TmlaaGtcL2c9PSIsIm1hYyI6IjUxMDc2OGViNWNiNjRjNDk4NTc3ZDNjMGZiZGRlOTY1MmZiOTVjNjgwMDI5YmE0Yjg0NGNkMTMzYjcyYTEwOTEifQ==', '2020-01-31 07:01:15', '2020-01-31 07:01:14'),
(5, 'Bnsh@cshjs.com', 'Gugu', 'eyJpdiI6IkVnWWt6OVoxUmlLcXBpakg5alwvRHNBPT0iLCJ2YWx1ZSI6IlBRc1dCUW9kTEF6MUk1T3RZUVpPc1E9PSIsIm1hYyI6IjQ3NDYzZjYxN2ZhMjA2ZDQzMDIxMDE0MjRjMmU4MjRiZjU0YTAwYmJlZDlhOWY4MzRjNDQ2ZGUzY2UxODAzMjMifQ==', '2020-01-31 06:54:26', '2020-01-31 06:54:26');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`id_motor`);

--
-- Indeks untuk tabel `pemilik`
--
ALTER TABLE `pemilik`
  ADD PRIMARY KEY (`id_penyewa`);

--
-- Indeks untuk tabel `penyewa`
--
ALTER TABLE `penyewa`
  ADD PRIMARY KEY (`id_penyewa`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `motor`
--
ALTER TABLE `motor`
  MODIFY `id_motor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pemilik`
--
ALTER TABLE `pemilik`
  MODIFY `id_penyewa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `penyewa`
--
ALTER TABLE `penyewa`
  MODIFY `id_penyewa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
