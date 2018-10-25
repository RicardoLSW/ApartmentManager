/*
Navicat MySQL Data Transfer

Source Server         : 标哥哥
Source Server Version : 50540
Source Host           : 127.0.0.1:3306
Source Database       : apartmentmanager

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2018-10-25 12:42:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_info
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `userName` varchar(255) NOT NULL,
  `userPwd` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('admin', 'admin', '超级管理员', '\0');

-- ----------------------------
-- Table structure for dormadmin_info
-- ----------------------------
DROP TABLE IF EXISTS `dormadmin_info`;
CREATE TABLE `dormadmin_info` (
  `da_id` varchar(255) NOT NULL,
  `da_name` varchar(255) NOT NULL,
  `da_sex` varchar(255) NOT NULL,
  `da_tel` varchar(255) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`da_id`),
  KEY `da_name` (`da_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dormadmin_info
-- ----------------------------
INSERT INTO `dormadmin_info` VALUES ('1001', '张三', '男', '13752707769', '\0');
INSERT INTO `dormadmin_info` VALUES ('1002', '李四', '男', '12345678978', '\0');

-- ----------------------------
-- Table structure for dorm_info
-- ----------------------------
DROP TABLE IF EXISTS `dorm_info`;
CREATE TABLE `dorm_info` (
  `d_id` varchar(255) NOT NULL,
  `d_type` varchar(255) NOT NULL,
  `d_num` varchar(255) NOT NULL,
  `da_id` varchar(255) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`d_id`),
  KEY `d_id` (`d_id`),
  KEY `da_id` (`da_id`),
  CONSTRAINT `dorm_info_ibfk_1` FOREIGN KEY (`da_id`) REFERENCES `dormadmin_info` (`da_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dorm_info
-- ----------------------------

-- ----------------------------
-- Table structure for student_info
-- ----------------------------
DROP TABLE IF EXISTS `student_info`;
CREATE TABLE `student_info` (
  `s_id` varchar(255) NOT NULL,
  `s_name` varchar(255) NOT NULL,
  `s_sex` varchar(255) NOT NULL,
  `s_age` varchar(255) NOT NULL,
  `s_tel` varchar(255) NOT NULL,
  `c_id` varchar(255) NOT NULL,
  `d_id` varchar(255) NOT NULL,
  `s_photo` varchar(255) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`s_id`),
  KEY `d_id` (`d_id`),
  CONSTRAINT `student_info_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `dorm_info` (`d_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student_info
-- ----------------------------
