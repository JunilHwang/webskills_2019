-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 19-09-19 05:08
-- 서버 버전: 10.1.35-MariaDB
-- PHP 버전: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `20190917`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `assessment`
--

CREATE TABLE `assessment` (
  `idx` int(11) NOT NULL,
  `eidx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `point` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `assessment`
--

INSERT INTO `assessment` (`idx`, `eidx`, `midx`, `point`) VALUES
(1, 7, 2, 5),
(2, 7, 2, 10);

-- --------------------------------------------------------

--
-- 테이블 구조 `edited`
--

CREATE TABLE `edited` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `svg` longtext NOT NULL,
  `cover` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `edited`
--

INSERT INTO `edited` (`idx`, `midx`, `video`, `svg`, `cover`) VALUES
(1, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/1.mp4', '<svg width=\"800\" height=\"450\"><path stroke=\"#999\" stroke-width=\"3\" fill=\"none\" d=\"M158 440L157 440 L158 439 L178 427 L223 401 L284 363 L322 340 L367 315 L406 293 L419 287 L430 283 L433 281 L434 281 L434 281 \" style=\"\" data-start=\"0\" data-end=\"90.441723\"></path><rect stroke=\"#999\" stroke-width=\"3\" fill=\"#999\" x=\"435\" y=\"310\" width=\"133\" height=\"68\" style=\"\" data-start=\"0\" data-end=\"90.441723\"></rect></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover1.jpg'),
(2, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/2.mp4', '<svg width=\"800\" height=\"450\"><rect stroke=\"#999\" stroke-width=\"3\" fill=\"#999\" x=\"104\" y=\"110\" width=\"609\" height=\"240\" style=\"\" data-start=\"0\" data-end=\"581.706304\"></rect></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover2.jpg'),
(3, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/3.mp4', '<svg width=\"800\" height=\"450\"><path stroke=\"#999\" stroke-width=\"3\" fill=\"none\" d=\"M172 107L172 108 L173 108 L193 121 L225 141 L270 173 L322 207 L338 220 L345 225 L351 228 L353 229 L355 229 L356 229 \" class=\"active\" style=\"\" data-start=\"0\" data-end=\"23.06890896\"></path><path stroke=\"#999\" stroke-width=\"3\" fill=\"none\" d=\"M400 147L396 147 L391 147 L387 152 L384 155 L378 161 L368 175 L357 185 L343 201 L335 210 L332 212 L331 213 L331 213 \" class=\"\" style=\"opacity: 0; z-index: -1;\" data-start=\"25.656076319999993\" data-end=\"28.99783416\"></path></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover3.jpg'),
(4, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/1.mp4', '<svg width=\"800\" height=\"450\"><path stroke=\"#0F9\" stroke-width=\"3\" fill=\"none\" d=\"M104 288L104 288 L109 288 L143 288 L186 288 L241 288 L286 288 L386 288 L440 288 L473 288 L507 288 L521 288 L532 288 L537 288 L538 288 L539 288 L541 288 L547 288 \" style=\"\" data-start=\"0\" data-end=\"90.441723\"></path></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover1.jpg'),
(5, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/5.mp4', '<svg width=\"800\" height=\"450\"><text dominant-baseline=\"hanging\" x=\"357\" y=\"305\" fill=\"#999\" font-size=\"32\" class=\"\" style=\"\" data-start=\"0\" data-end=\"6.409462144999999\">안녕하세요</text></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover5.jpg'),
(6, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/1.mp4', '<svg width=\"800\" height=\"450\"><path stroke=\"#ED0\" stroke-width=\"3\" fill=\"none\" d=\"M42 433L44 430 L54 420 L78 398 L128 363 L175 330 L234 294 L298 257 L368 218 L448 172 L509 140 L555 115 L582 104 L612 90 L638 80 L657 72 L672 66 L684 60 L695 56 L707 52 L719 48 L730 43 L740 38 L747 34 L753 28 L755 27 \" style=\"\" data-start=\"0\" data-end=\"90.441723\"></path><path stroke=\"#ED0\" stroke-width=\"3\" fill=\"none\" d=\"M61 53L61 53 L67 53 L82 53 L106 55 L139 61 L175 70 L236 87 L293 103 L366 129 L460 164 L653 245 L781 300 \" style=\"\" data-start=\"0\" data-end=\"90.441723\"></path></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover1.jpg'),
(7, 2, 'http://127.0.0.1:8080/webskills/2019_national/gb/public/movie/4.mp4', '<svg width=\"800\" height=\"450\"><path stroke=\"#999\" stroke-width=\"3\" fill=\"none\" d=\"M116 254L116 254 L117 254 L120 254 L122 254 L126 254 L130 254 L136 254 L141 254 L148 254 L153 254 L168 254 L177 254 L189 254 L203 254 L216 254 L232 254 L238 254 L251 254 L262 254 L274 254 L283 254 L292 254 L300 254 L302 254 L309 254 L312 253 L315 253 L317 253 L318 253 L319 253 L319 253 L319 253 L319 253 L319 253 L319 252 L319 252 L319 250 \" class=\"\" style=\"\" data-start=\"0\" data-end=\"7.7118403475\"></path><rect stroke=\"#0F9\" stroke-width=\"3\" fill=\"#0F9\" x=\"211\" y=\"316\" width=\"122\" height=\"69\" class=\"\" style=\"opacity: 0; z-index: -1;\" data-start=\"8.545552817499996\" data-end=\"16.4658212825\"></rect><text dominant-baseline=\"hanging\" x=\"250\" y=\"364\" fill=\"#0F9\" font-size=\"16\" class=\"active\" style=\"opacity: 0; z-index: -1;\" data-start=\"18.758530575000005\" data-end=\"122.55573309000015\">아에이오우</text></svg>', 'http://127.0.0.1:8080/webskills/2019_national/gb/public/image/cover4.jpg');

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int(11) NOT NULL,
  `id` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `id`, `pw`, `name`) VALUES
(1, 'test', '12341234', '이름'),
(2, 'admin', '1234', '관리자');

-- --------------------------------------------------------

--
-- 테이블 구조 `movie`
--

CREATE TABLE `movie` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `movie`
--

INSERT INTO `movie` (`idx`, `midx`, `subject`, `duration`, `date`, `category`) VALUES
(1, 1, '테스트', 100, '2019', '극영화'),
(2, 2, '두 번째 영화', 120, '2019', '기타'),
(3, 1, '테스트1', 100, '2019', '극영화'),
(4, 1, '테스트2', 101, '2019', '다큐멘터리'),
(5, 1, '테스트3', 102, '2019', '애니메이션'),
(6, 1, '테스트4', 103, '2019', '기타'),
(7, 1, '테스트5', 104, '2019', '극영화'),
(8, 1, '테스트6', 105, '2019', '다큐멘터리'),
(9, 1, '테스트7', 106, '2019', '애니메이션'),
(10, 1, '테스트8', 107, '2019', '기타'),
(11, 1, '테스트9', 108, '2019', '극영화'),
(12, 1, '테스트10', 109, '2019', '다큐멘터리');

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE `schedule` (
  `idx` int(11) NOT NULL,
  `mvidx` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `schedule`
--

INSERT INTO `schedule` (`idx`, `mvidx`, `date`, `start`, `end`) VALUES
(1, 1, 20190918, 1568804400, 1568810400),
(2, 2, 20190918, 1568811600, 1568818800),
(3, 3, 20190919, 1568890800, 1568896800),
(4, 4, 20190919, 1568898000, 1568905200),
(5, 5, 20190920, 1568977200, 1568983200),
(6, 6, 20190920, 1568984400, 1568991600),
(7, 7, 20190921, 1569063600, 1569069600),
(8, 8, 20190921, 1569070800, 1569078000),
(9, 9, 20190922, 1569150000, 1569156000),
(10, 10, 20190922, 1569157200, 1569164400),
(11, 11, 20190923, 1569236400, 1569242400),
(12, 12, 20190923, 1569243600, 1569250800);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `edited`
--
ALTER TABLE `edited`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `assessment`
--
ALTER TABLE `assessment`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `edited`
--
ALTER TABLE `edited`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `movie`
--
ALTER TABLE `movie`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 테이블의 AUTO_INCREMENT `schedule`
--
ALTER TABLE `schedule`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
