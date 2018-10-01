/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : siping_public_security

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-10-01 22:22:09
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
  `sex` varchar(10) NOT NULL DEFAULT '1' COMMENT '1男 0女',
  `work_unit_code` varchar(255) DEFAULT NULL COMMENT '工作单位代码',
  `job_simple_name` varchar(255) DEFAULT NULL COMMENT '职务简称',
  `job_full_name` varchar(255) DEFAULT NULL COMMENT '职务全称',
  `date_birth` date NOT NULL COMMENT '出生日期',
  `date_participation` date DEFAULT NULL COMMENT '工作日期',
  `date_public_work` date DEFAULT NULL COMMENT '参加公安日期',
  `nation` varchar(20) DEFAULT NULL COMMENT '民族',
  `police_number` bigint(128) DEFAULT NULL COMMENT '警号',
  `state_personnel` varchar(10) DEFAULT NULL COMMENT '人员状态',
  `blood_type` varchar(10) DEFAULT NULL,
  `police_library_logo` char(10) DEFAULT NULL COMMENT '警员库标志',
  `category_personnel` varchar(255) DEFAULT NULL COMMENT '人员类别',
  `native_place` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `native_heath` varchar(255) DEFAULT NULL COMMENT '成长地',
  `birthplace` varchar(255) DEFAULT NULL COMMENT '成长地',
  `nature_household_registration` varchar(255) DEFAULT NULL COMMENT '户口性质 0农村 1非农村',
  `location_residence_registration` varchar(255) DEFAULT NULL COMMENT '户籍所在地名称',
  `identity` varchar(255) DEFAULT NULL COMMENT '个人身份',
  `marital_status` varchar(10) DEFAULT NULL COMMENT '婚姻状况 1已婚 0未婚',
  `secret_marking` varchar(255) DEFAULT NULL COMMENT '涉密标志',
  `health` varchar(10) DEFAULT NULL COMMENT '健康状况 0健康1不健康',
  `address_residence_registration` varchar(255) DEFAULT NULL COMMENT '户籍所在地详址',
  `grass_roots_work_experience_time` varchar(10) DEFAULT NULL COMMENT '基层工作经历时间',
  `correction_value_service_age` bigint(11) DEFAULT NULL COMMENT '工龄计算校正值',
  `length_schooling_should_of_police` bigint(11) DEFAULT NULL COMMENT '警衔应加学制年限',
  `political_outlook` varchar(255) DEFAULT NULL COMMENT '政治面貌',
  `date_organization` varchar(255) DEFAULT NULL COMMENT '参加组织日期',
  `compile_unit_code` bigint(20) DEFAULT NULL COMMENT '编制单位代码',
  `unit_compilation` varchar(255) DEFAULT NULL COMMENT '编制所在单位',
  `personnel_departments_and_police_categories` varchar(255) DEFAULT NULL COMMENT '人员所属部门和警种',
  `management_category` varchar(255) DEFAULT NULL COMMENT '管理类别',
  `expertise` text COMMENT '专长',
  `summary_rewards` text COMMENT '奖励综述',
  `annual_review` text COMMENT '年度考核综述',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `personnel_post` varchar(255) DEFAULT NULL COMMENT '人员工作岗位',
  `logo_management_cadres` varchar(10) DEFAULT NULL COMMENT '协管干部标识 0是1不是',
  `is_management_cadre` varchar(10) DEFAULT NULL COMMENT '是否是协管干部',
  `img_url` varchar(255) DEFAULT NULL COMMENT '照片',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idcard` (`id_card`) USING BTREE,
  KEY `id_card` (`id_card`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2525 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
