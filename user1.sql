/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : cms

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2017-07-16 14:07:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user1`
-- ----------------------------
DROP TABLE IF EXISTS `user1`;
CREATE TABLE `user1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user1
-- ----------------------------
INSERT INTO `user1` VALUES ('2', 'admin', 'a1lHTjdUM28=YTI1MjM1NmMxNDQ3MmZjMmZkMmVjZTIyYWFhODY3NTc='); --原密码:123
INSERT INTO `user1` VALUES ('3', 'wangwu', 'TzR4VnpWbHk=ZmViZmU0OGQ4YWM5YzY4MjFhNTQ4ZWIyNjBjNGQzMWY='); --原密码:111
