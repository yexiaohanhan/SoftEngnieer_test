/*
 Navicat Premium Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 23/06/2024 10:09:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fish
-- ----------------------------
DROP TABLE IF EXISTS `fish`;
CREATE TABLE `fish`  (
  `Species` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Weight(g)` double NULL DEFAULT NULL,
  `Length1(cm)` double NULL DEFAULT NULL,
  `Length2(cm)` double NULL DEFAULT NULL,
  `Length3(cm)` double NULL DEFAULT NULL,
  `Height(cm)` double NULL DEFAULT NULL,
  `Width(cm)` double NULL DEFAULT NULL,
  `id` int(0) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fish
-- ----------------------------

-- ----------------------------
-- Table structure for fishnumber
-- ----------------------------
DROP TABLE IF EXISTS `fishnumber`;
CREATE TABLE `fishnumber`  (
  `日期` date NULL DEFAULT NULL,
  `鱼群数量` int(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fishnumber
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id` int(0) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('alice123', '$2b$10$o377BGlhHC1cEwGDHmOGqOLEEjrfv2Q.qsxYi1Ub.M0QJVMF.wODy', 'User', 1);
INSERT INTO `users` VALUES ('admin123', '$2b$10$nqcEZ9tjvJ9I7g0dCBhv0uHsfu7vIWVwPqPn2eE/jfnF8XF7yCBEW', 'Admin', 2);
INSERT INTO `users` VALUES ('xiaoming', '$2b$10$SOLVZSWpj4kDZTKvqD6UUewtQmxxeWcBe4ycxuGrwNKHQxNm3fWaW', 'User', 3);
INSERT INTO `users` VALUES ('111111', '$2b$10$YUpl.yDyOCe8Nq8ogY7xmeorKeblthvyjzhSQa6kcJzoUn4SC.jy6', 'Admin', 4);

-- ----------------------------
-- Table structure for waterqualitydata
-- ----------------------------
DROP TABLE IF EXISTS `waterqualitydata`;
CREATE TABLE `waterqualitydata`  (
  `监测时间` datetime(0) NULL DEFAULT NULL,
  `水质类别` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `水温（℃）` double NULL DEFAULT NULL,
  `pH(无量纲)` double NULL DEFAULT NULL,
  `溶氧量(mg/L)` double NULL DEFAULT NULL,
  `电导率（μS/cm）` double NULL DEFAULT NULL,
  `浊度（NTU）` double NULL DEFAULT NULL,
  `高锰酸盐指数（mg/L）` double NULL DEFAULT NULL,
  `氨氮（mg/L）` double NULL DEFAULT NULL,
  `总磷（mg/L）` double NULL DEFAULT NULL,
  `总氮（mg/L）` double NULL DEFAULT NULL,
  `站点情况` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id` int(0) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2199 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of waterqualitydata
-- ----------------------------

-- ----------------------------
-- Table structure for weather
-- ----------------------------
DROP TABLE IF EXISTS `weather`;
CREATE TABLE `weather`  (
  `日期` date NULL DEFAULT NULL,
  `蒸发量` float NULL DEFAULT NULL,
  `降水量` float NULL DEFAULT NULL,
  `温度` float NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weather
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
