/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : siping_public_security

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-09-22 22:34:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '信息表id',
  `id_card` varchar(30) NOT NULL COMMENT '身份证号码',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `sex` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1男 0女',
  `date_birth` date NOT NULL COMMENT '出生日期',
  `date_participation` date DEFAULT NULL COMMENT '工作日期',
  `date_public_work` date DEFAULT NULL COMMENT '参加公安日期',
  `nation` varchar(20) DEFAULT NULL COMMENT '民族',
  `police_number` int(128) DEFAULT NULL COMMENT '警号',
  `state_personnel` tinyint(4) DEFAULT NULL COMMENT '人员状态',
  `blood_type` varchar(10) DEFAULT NULL,
  `police_library_logo` tinyint(2) DEFAULT NULL COMMENT '警员库标志',
  `category_personnel` varchar(255) DEFAULT NULL COMMENT '人员类别',
  `native_place` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `birthplace` varchar(255) DEFAULT NULL COMMENT '出生地',
  `nature_household_registration` tinyint(2) DEFAULT NULL COMMENT '户口性质 0农村 1非农村',
  `location_residence_registration` varchar(255) DEFAULT NULL COMMENT '户籍所在地名称',
  `identity` varchar(255) DEFAULT NULL COMMENT '个人身份',
  `marital_status` tinyint(4) DEFAULT NULL COMMENT '婚姻状况 1已婚 0未婚',
  `secret_marking` tinyint(4) DEFAULT NULL COMMENT '涉密标志',
  `health` tinyint(2) DEFAULT NULL COMMENT '健康状况 0健康1不健康',
  `address_residence_registration` varchar(255) DEFAULT NULL COMMENT '户籍所在地详址',
  `grass_roots_work_experience_time` varchar(0) DEFAULT NULL COMMENT '基层工作经历时间',
  `correction_value_service_age` int(11) DEFAULT NULL COMMENT '工龄计算校正值',
  `length_schooling_should_of_police` int(11) DEFAULT NULL COMMENT '警衔应加学制年限',
  `political_outlook` varchar(255) DEFAULT NULL COMMENT '政治面貌',
  `date_organization` date DEFAULT NULL COMMENT '参加组织日期',
  `compile_unit_code` int(20) DEFAULT NULL COMMENT '编制单位代码',
  `unit_compilation` varchar(255) DEFAULT NULL COMMENT '编制所在单位',
  `personnel_departments_and_police_categories` varchar(255) DEFAULT NULL COMMENT '人员所属部门和警种',
  `management_category` varchar(255) DEFAULT NULL COMMENT '管理类别',
  `expertise` text COMMENT '专长',
  `summary_rewards` text COMMENT '奖励综述',
  `annual_review` text COMMENT '年度考核综述',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `personnel_post` varchar(255) DEFAULT NULL COMMENT '人员工作岗位',
  `logo_management_cadres` tinyint(4) DEFAULT NULL COMMENT '协管干部标识 0是1不是',
  `is_management_cadre` tinyint(4) DEFAULT NULL COMMENT '是否是协管干部',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idcard` (`id_card`,`name`) USING BTREE,
  KEY `id_card` (`id_card`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
