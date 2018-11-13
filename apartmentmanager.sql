/*
Navicat MySQL Data Transfer

Source Server         : 标哥哥
Source Server Version : 50540
Source Host           : 127.0.0.1:3306
Source Database       : apartmentmanager

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2018-11-13 13:54:25
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
  `openid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('admin', 'admin', '超级管理员', '\0', '');
INSERT INTO `admin_info` VALUES ('H18020017', '801220056', '超级管理员', '\0', '');

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
INSERT INTO `dormadmin_info` VALUES ('1002', '李四', '男', '15927665941', '\0');
INSERT INTO `dormadmin_info` VALUES ('1003', '王五', '女', '1155648973456', '');

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
INSERT INTO `dorm_info` VALUES ('101', '男生宿舍', '5', '1002', '\0');
INSERT INTO `dorm_info` VALUES ('102', '男生宿舍', '5', '1001', '\0');
INSERT INTO `dorm_info` VALUES ('201', '女生宿舍', '4', '1003', '\0');
INSERT INTO `dorm_info` VALUES ('202', '女生宿舍', '4', '1003', '\0');

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
INSERT INTO `student_info` VALUES ('123456789', 'lsw', '男', '22', '123465789', 'H1802', '101', '/public/upimages/ab325c13f05363cd9f78fdeec95c20a4.jpg', '\0');
INSERT INTO `student_info` VALUES ('H18020017', '李嘉图', '男', '21', '15915915915', 'H1802', '101', '/public/upimages/a651be4b74737a09f0c0bd96b7e39573.jpg', '\0');
INSERT INTO `student_info` VALUES ('T18020017', 'Ricardo', '男', '20', '13613613613', 'H1802', '102', '/public/upimages/a0fd6f066c72dbdfbace8fb2f3232b78.jpg', '\0');
INSERT INTO `student_info` VALUES ('T18020018', '嘿嘿嘿', '男', '22', '17617617617', 'H1802', '102', '/public/upimages/3502329cbd69985b2f39744dabf2d789.jpg', '\0');
