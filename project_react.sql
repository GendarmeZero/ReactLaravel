-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2024 at 09:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_react`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Julie Orn', 'imckenzie@example.net', 'Vero suscipit laudantium ducimus ratione exercitationem voluptatem.', 'Ea rem maiores qui sed non fugiat atque. Minima quo laudantium dicta natus beatae debitis non.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(2, 'Cade Harvey', 'bessie33@example.org', 'Dolore molestias nulla eveniet ut qui.', 'Inventore ut modi est numquam officia. Et nisi voluptatem quis nemo adipisci. Nesciunt sed facere at et. Et architecto beatae dolorum qui. Exercitationem sint in est et sequi fuga dolor quia.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(3, 'Mrs. Iva Bode', 'qbeatty@example.org', 'Commodi consequatur accusamus laboriosam similique.', 'Et quo et laboriosam debitis non placeat earum. Ratione nam placeat est et amet. Vero ad deserunt modi expedita quis autem. Quis architecto deserunt magnam fugit id.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(4, 'Jade Purdy', 'aiyana.bins@example.org', 'Sint dolorem in quia fugiat voluptas doloremque nostrum.', 'Et repudiandae sapiente enim vel. Distinctio alias numquam dolor enim non.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(5, 'Rupert Rogahn', 'tmonahan@example.com', 'Et laboriosam quibusdam assumenda aut voluptates.', 'Praesentium aperiam exercitationem aut quia consectetur. Omnis impedit repudiandae ut similique. Omnis velit ipsum eos qui sint quasi beatae. Nostrum quisquam aut dolores ut deserunt recusandae.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(6, 'Devonte Cummerata', 'keichmann@example.org', 'Dolores nulla necessitatibus incidunt quae.', 'Aut neque molestiae culpa veritatis nisi vero error. Excepturi omnis assumenda voluptas animi sint. Voluptatem iste vel unde eaque. Fugit rem esse nulla voluptas aut excepturi.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(7, 'Frances Volkman III', 'mallie.hansen@example.com', 'Ullam aut delectus odit qui voluptatem occaecati iure eius.', 'Qui dicta voluptatem porro consequatur quasi qui. Illo voluptatem officia molestiae est quibusdam dolor qui. Et alias consequatur eos iusto.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(8, 'Prof. Maegan Friesen', 'xhaag@example.org', 'Esse veniam quia sapiente sapiente odit et.', 'Aspernatur totam earum sint sit possimus in. Qui explicabo pariatur ut iusto magnam molestiae reiciendis dolorem. Ut et illum et aliquam labore eos omnis. Quibusdam enim ut architecto quibusdam.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(9, 'Brennon VonRueden', 'cwintheiser@example.net', 'Et autem unde magni ipsa est.', 'Qui porro vel qui illo autem dolores. Delectus enim amet ipsam nisi. Sed placeat debitis est temporibus maiores vero officiis aut. Laboriosam quia voluptatem quaerat rerum quaerat sequi et.', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(10, 'Mr. Nils Ankundingdefrg', 'dexter01@example.net', 'Non possimus facere eum aut provident.', 'Labore incidunt aliquam iste quasi quae dolorem magnam. Laborum dolor qui rerum dignissimos. Repellendus rerum beatae temporibus recusandae. Voluptates culpa quasi quo delectus ut ex omnis nulla. Incidunt cupiditate sunt ipsum et.', '2024-09-26 00:18:34', '2024-09-26 00:52:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_09_26_031408_create_contacts_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mr. Joey Altenwerthdfvgbv', 'georgiana.durgan@example.org', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'KBoVqMuwri', '2024-09-26 00:18:34', '2024-09-26 00:19:41'),
(2, 'Prof. Cindy Feeney I', 'estella.shields@example.com', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CffVuKY7N6', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(3, 'Brando Altenwerth', 'mathew60@example.com', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'PT72ZFoBxW', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(4, 'Prof. Toy McLaughlin', 'daron25@example.org', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '7JqV4GuyeH', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(5, 'Prof. Kyleigh Simonis', 'olson.carol@example.net', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'kCMTYm4aVV', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(6, 'Nelson McDermott III', 'karley72@example.com', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'vB1409MvZZ', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(7, 'Mr. Kamryn Hane Jr.', 'reichel.amber@example.com', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'rYV5XHVGIM', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(8, 'Donnie Weissnat', 'lillie.kunde@example.net', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'K16XRenEH5', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(9, 'Andrew Kuvalis', 'qpowlowski@example.org', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Du9dSGpFrq', '2024-09-26 00:18:34', '2024-09-26 00:18:34'),
(10, 'Test Userdctfvygbuhnjm', 'test@example.com', '2024-09-26 00:18:34', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ulBoQ5rIsO', '2024-09-26 00:18:34', '2024-09-26 03:20:50'),
(13, 'mohammedsqwdefrgthy', 'mohammed@acsjc.com', NULL, '$2y$10$7Uol6wj.BV/4st7vWmRFyO84vMUzQxm0wFs9f1uz31fdIiGvzzX5O', NULL, '2024-09-26 03:45:25', '2024-09-26 03:45:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
