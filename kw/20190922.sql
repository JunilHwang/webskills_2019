-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- 생성 시간: 19-09-22 19:13
-- 서버 버전: 10.1.30-MariaDB
-- PHP 버전: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `20190922`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `booth_connect`
--

CREATE TABLE `booth_connect` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `eidx` int(11) NOT NULL,
  `booth` varchar(2) NOT NULL,
  `area` int(11) NOT NULL,
  `reg_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `booth_connect`
--

INSERT INTO `booth_connect` (`idx`, `midx`, `eidx`, `booth`, `area`, `reg_date`) VALUES
(1, 3, 2, 'A1', 160, '2019-09-23'),
(2, 3, 2, 'A2', 81, '2019-09-23'),
(3, 3, 2, 'A3', 27, '2019-09-23'),
(4, 4, 2, 'A4', 91, '2019-09-23'),
(5, 4, 4, 'A1', 189, '2019-09-23'),
(6, 4, 4, 'A4', 176, '2019-09-23'),
(7, 4, 4, 'A3', 168, '2019-09-23');

-- --------------------------------------------------------

--
-- 테이블 구조 `events`
--

CREATE TABLE `events` (
  `idx` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `maximum` int(11) NOT NULL,
  `layout` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `events`
--

INSERT INTO `events` (`idx`, `start`, `end`, `maximum`, `layout`) VALUES
(1, '2019-09-22', '2019-09-22', 50, '<svg id="svgCanvas" width="1200" height="600" xmlns="http://www.w3.org/2000/svg">\r\n        <style>\r\n          .default&gt;div{position:absolute;background:#000;width:15px;height:15px;}\r\n          .draw&gt;div{position:absolute;display:flex;justify-content:center;align-items:center;color:#fff;}\r\n          .draw&gt;div.drawing{background:#ffb;z-index:-1}\r\n          .draw&gt;div.active{box-shadow:0 0 10px #666}\r\n          .preview{position:absolute;border:1px solid #666;}\r\n          .dot{height:100%;\r\n            background-image: linear-gradient(#ddd 1px, transparent 1px),\r\n                              linear-gradient(90deg, #ddd 1px, transparent 1px);\r\n            background-size: 100% 15px, 15px 100%;\r\n            border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box;\r\n          }\r\n        </style>\r\n        <foreignObject id="#foreignObject" x="0" y="0" width="1200" height="600">\r\n          <div class="dot" xmlns="http://www.w3.org/1999/xhtml"></div>\r\n          <div class="default" xmlns="http://www.w3.org/1999/xhtml" data-idx="0"></div>\r\n          <div class="draw" xmlns="http://www.w3.org/1999/xhtml"><div xmlns="http://www.w3.org/1999/xhtml" style="left:705px;top:330px" class="drawing" data-booth="2"></div><div xmlns="http://www.w3.org/1999/xhtml" style="left:780px;top:285px" class="drawing" data-booth="2"></div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 330px; height: 135px; left: 315px; top: 0px; background: red;" class="" data-booth="1" data-area="198">A2</div><div xmlns="http://www.w3.org/1999/xhtml" style="left:786.5px;top:285px" class="preview"></div><div xmlns="http://www.w3.org/1999/xhtml" style="left:713.5px;top:336px" class="preview"></div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 315px; height: 120px; left: 0px; top: 135px; background: purple;" class="" data-booth="2" data-area="168">A3</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 330px; height: 120px; left: 315px; top: 135px; background: fuchsia;"  data-booth="3" data-area="176">A4</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 315px; height: 135px; left: 0px; top: 0px; background: maroon;" class="" data-booth="0" data-area="189">A1</div></div>\r\n        </foreignObject>        \r\n      </svg>'),
(2, '2019-09-23', '2019-09-25', 3, '<svg id="svgCanvas" width="1200" height="600" xmlns="http://www.w3.org/2000/svg">\n        <style>\n          .default&gt;div{position:absolute;background:#000;width:15px;height:15px;}\n          .draw&gt;div{position:absolute;display:flex;justify-content:center;align-items:center;color:#fff;}\n          .draw&gt;div.drawing{background:#ffb;z-index:-1}\n          .draw&gt;div.active{box-shadow:0 0 10px #666}\n          .preview{position:absolute;border:1px solid #666;}\n          .dot{height:100%;\n            background-image: linear-gradient(#ddd 1px, transparent 1px),\n                              linear-gradient(90deg, #ddd 1px, transparent 1px);\n            background-size: 100% 15px, 15px 100%;\n            border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box;\n          }\n        </style>\n        <foreignObject id="#foreignObject" x="0" y="0" width="1200" height="600">\n          <div class="dot" xmlns="http://www.w3.org/1999/xhtml"></div>\n          <div class="default" xmlns="http://www.w3.org/1999/xhtml" data-idx="0"></div>\n          <div class="draw" xmlns="http://www.w3.org/1999/xhtml"><div xmlns="http://www.w3.org/1999/xhtml" style="width: 135px; height: 135px; left: 780px; top: 150px; background: red;" class="" data-booth="1" data-area="81">A2</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 135px; height: 45px; left: 645px; top: 375px; background: purple;" class="" data-booth="2" data-area="27">A3</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 195px; height: 105px; left: 195px; top: 390px; background: fuchsia;" class="" data-booth="3" data-area="91">A4</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 150px; height: 240px; left: 60px; top: 60px; background: maroon;" class="" data-booth="0" data-area="160">A1</div></div>\n        </foreignObject>        \n      </svg>'),
(4, '2019-09-26', '2019-09-29', 5, '<svg id="svgCanvas" width="1200" height="600" xmlns="http://www.w3.org/2000/svg">\n        <style>\n          .default&gt;div{position:absolute;background:#000;width:15px;height:15px;}\n          .draw&gt;div{position:absolute;display:flex;justify-content:center;align-items:center;color:#fff;}\n          .draw&gt;div.drawing{background:#ffb;z-index:-1}\n          .draw&gt;div.active{box-shadow:0 0 10px #666}\n          .preview{position:absolute;border:1px solid #666;}\n          .dot{height:100%;\n            background-image: linear-gradient(#ddd 1px, transparent 1px),\n                              linear-gradient(90deg, #ddd 1px, transparent 1px);\n            background-size: 100% 15px, 15px 100%;\n            border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box;\n          }\n        </style>\n        <foreignObject id="#foreignObject" x="0" y="0" width="1200" height="600">\n          <div class="dot" xmlns="http://www.w3.org/1999/xhtml"></div>\n          <div class="default" xmlns="http://www.w3.org/1999/xhtml" data-idx="0"></div>\n          <div class="draw" xmlns="http://www.w3.org/1999/xhtml"><div xmlns="http://www.w3.org/1999/xhtml" style="width: 330px; height: 135px; left: 315px; top: 0px; background: red;" class="" data-booth="1" data-area="198">A2</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 315px; height: 120px; left: 645px; top: 0px; background: purple;" class="" data-booth="2" data-area="168">A3</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 330px; height: 120px; left: 645px; top: 120px; background: fuchsia;" data-booth="3" data-area="176">A4</div><div xmlns="http://www.w3.org/1999/xhtml" style="width: 315px; height: 135px; left: 0px; top: 0px; background: maroon;" class="" data-booth="0" data-area="189">A1</div></div>\n        </foreignObject>        \n      </svg>');

-- --------------------------------------------------------

--
-- 테이블 구조 `event_reserve`
--

CREATE TABLE `event_reserve` (
  `idx` int(11) NOT NULL,
  `eidx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `reg_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `event_reserve`
--

INSERT INTO `event_reserve` (`idx`, `eidx`, `midx`, `reg_date`) VALUES
(3, 2, 1, '2019-09-23'),
(4, 2, 1, '2019-09-23'),
(5, 5, 1, '2019-09-23');

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int(11) NOT NULL,
  `id` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `id`, `pw`, `name`, `type`) VALUES
(1, 'admin', '1234', '관리자', 'admin'),
(2, 'a@a.a', '1234', '테스트', 'default'),
(3, 'a@a.b', '1234', '업체1', 'company'),
(4, 'a@a.c', '1234', '업체2', 'company'),
(5, 'a@a.d', '1234', '업체3', 'company'),
(6, 'a@a.e', '1234', '업체4', 'company'),
(7, 'a@a.f', '1234', '업체5', 'company'),
(8, 'a@a.g', '1234', '업체6', 'company'),
(9, 'a@a.h', '1234', '업체7', 'company'),
(10, 'a@a.i', '1234', '업체8', 'company'),
(11, 'a@a.j', '1234', '업체9', 'company'),
(12, 'a@a.d', '1234', '업체3', 'company'),
(13, 'a@a.e', '1234', '업체4', 'company'),
(14, 'a@a.f', '1234', '업체5', 'company'),
(15, 'a@a.g', '1234', '업체6', 'company'),
(16, 'a@a.h', '1234', '업체7', 'company'),
(17, 'a@a.i', '1234', '업체8', 'company'),
(18, 'a@a.j', '1234', '업체9', 'company');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `booth_connect`
--
ALTER TABLE `booth_connect`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `event_reserve`
--
ALTER TABLE `event_reserve`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `booth_connect`
--
ALTER TABLE `booth_connect`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 테이블의 AUTO_INCREMENT `events`
--
ALTER TABLE `events`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 테이블의 AUTO_INCREMENT `event_reserve`
--
ALTER TABLE `event_reserve`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
