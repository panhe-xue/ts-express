/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : siping_public_security

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-10-10 00:00:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for police_duty_change_ information_set
-- ----------------------------
DROP TABLE IF EXISTS `police_duty_change_ information_set`;
CREATE TABLE `police_duty_change_ information_set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `birth_date` datetime DEFAULT NULL COMMENT '出生年月',
  `native_place` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `nation` varchar(255) DEFAULT NULL COMMENT '民族',
  `political_status` varchar(255) DEFAULT NULL COMMENT '政治面貌',
  `id_card` varchar(255) DEFAULT NULL COMMENT '身份证号',
  `education` varchar(255) DEFAULT NULL COMMENT '全日制学历',
  `graduate_school_and_major` varchar(255) DEFAULT NULL COMMENT '毕业院校及专业',
  `the_highest_degree` varchar(255) DEFAULT NULL COMMENT '最高学位',
  `degree_time` datetime DEFAULT NULL COMMENT '学位取得时间',
  `begin_job_time` datetime DEFAULT NULL COMMENT '参加工作时间',
  `current_word_uint` varchar(255) DEFAULT NULL COMMENT '现工作单位',
  `present_post` varchar(255) DEFAULT NULL COMMENT '现任职务',
  `civil_service_registration_time` datetime DEFAULT NULL COMMENT '公务员登记时间',
  `job_salary` varchar(255) DEFAULT NULL COMMENT '职务工资',
  `current_job_level` varchar(255) DEFAULT NULL COMMENT '现职务层次',
  `time_of_current_job_level` varchar(255) DEFAULT NULL COMMENT '任现职务层次时间',
  `county_level` varchar(255) DEFAULT NULL COMMENT '县以下机关职级',
  `time_of_county_level` varchar(255) DEFAULT NULL COMMENT '任县以下机关职级时间',
  `qualification_for_police_technical_posts` varchar(255) DEFAULT NULL COMMENT '警务技术职务任职资格',
  `logo_of_military_transferred_cadres` varchar(255) DEFAULT NULL COMMENT '军转干部标识',
  `rank_of_military_transferred_cadres` varchar(255) DEFAULT NULL COMMENT '军转干部职级',
  `break_discipline_in_three_years` varchar(255) DEFAULT NULL COMMENT '三年内是否违纪',
  `introduce_of_break` varchar(255) DEFAULT NULL COMMENT '违纪说明',
  `annual_assessment` varchar(255) DEFAULT NULL COMMENT '年度考核',
  `introduce_of_annual_assessment` varchar(255) DEFAULT NULL COMMENT '年度考核说明',
  `participate_in_the_reform` varchar(255) DEFAULT NULL COMMENT '是否参加套改',
  `not_particepate_explain` varchar(255) DEFAULT NULL COMMENT '未套改说明',
  `reason_of_stop_change` varchar(255) DEFAULT NULL COMMENT '暂缓套改原因',
  `cancel_promote_introduce` varchar(255) DEFAULT NULL COMMENT '取消晋升说明',
  `job_sequence` varchar(255) DEFAULT NULL COMMENT '职务序列',
  `job_after_change` varchar(255) DEFAULT NULL COMMENT '套改后职务',
  `time_ater_change` varchar(255) DEFAULT NULL COMMENT '套改后职务任职时间',
  `all_time_after_change` varchar(255) DEFAULT NULL COMMENT '套改后职务任职时间',
  `continue_time_after_change` varchar(255) DEFAULT NULL COMMENT '套改后可连续计算任职时间',
  `is_promote` varchar(255) DEFAULT NULL COMMENT '是否晋升',
  `job_of_promote` varchar(255) DEFAULT NULL COMMENT '可晋升职务名称',
  `logo_of_change` varchar(255) DEFAULT NULL COMMENT '套改标识',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `id_card` (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
