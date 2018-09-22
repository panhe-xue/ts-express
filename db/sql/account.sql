/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : siping_public_security

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-09-22 22:34:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` varchar(255) NOT NULL COMMENT '身份证',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `id_card` varchar(30) NOT NULL COMMENT '身份证',
  `pay_card` varchar(30) NOT NULL COMMENT '工资卡',
  `user_name` varchar(255) NOT NULL COMMENT '账号姓名',
  `give_status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '发放状态',
  `account_status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '账号状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `card` (`id_card`) USING BTREE,
  KEY `account` (`account`),
  KEY `id_card` (`id_card`),
  KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
