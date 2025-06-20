import express from "express";
import userController from "../controller/userController.js";
import adminController from "../controller/adminController.js";
import gvController from "../controller/giangvienController.js";
import hsController from "../controller/hocsinhController.js";
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions.js";
let router = express.Router();
let initApiRoutes = (app) => {

  router.all("*", checkUserJWT, checkUserPermisson,);

  //User
  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: User login
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login
   */
  router.post("/users/login", userController.getJWT);
  /**
* @swagger
* /users/logout:
*   get:
*     summary: User logout
*     tags: [Users]
*     responses:
*       200:
*         description: Successful logout
*/
  router.get("/users/logout", userController.logoutUser);
  /**
* @swagger
* /users/info:
*   get:
*     summary: Get user info
*     tags: [Users]
*     responses:
*       200:
*         description: User info retrieved successfully
*/
  router.get("/users/info", userController.getUserInfo);
  /**
* @swagger
* /users/password:
*   put:
*     summary: Change user password
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                 type: string
*               newpassword:
*                 type: string
*     responses:
*       200:
*         description: Password changed successfully
*/
  router.put("/users/password", userController.changePassword); // body: { email, password, newpassword}
  /**
   * @swagger
   * /users/role:
   *   get:
   *     summary: Retrieve the roles of the authenticated user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: [] # Assuming JWT authentication is used
   *     responses:
   *       200:
   *         description: Roles retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get roles success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       url:
   *                         type: string
   *                         example: "/admin/dashboard"
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/users/role", userController.getRole);
  // Admin

  /**
* @swagger
* /admin/users:
*   get:
*     summary: Get all users
*     tags: [Admin]
*     responses:
*       200:
*         description: List of users retrieved successfully
*/
  router.get("/admin/users", adminController.getUsers);

  /**
   * @swagger
   * /admin/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               hoTen:
   *                 type: string
   *               gioiTinh:
   *                 type: string
   *               ngaySinh:
   *                 type: string
   *                 format: date
   *               diaChi:
   *                 type: string
   *               email:
   *                 type: string
   *               GroupUsers:
   *                 type: string
   *                 enum: [admin, student, teacher]
   *     responses:
   *       200:
   *         description: User created successfully
   */
  router.post("/admin/users", adminController.createUser);

  /**
   * @swagger
   * /admin/users:
   *   put:
   *     summary: Update a user
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               hoTen:
   *                 type: string
   *               gioiTinh:
   *                 type: string
   *               ngaySinh:
   *                 type: string
   *                 format: date
   *               diaChi:
   *                 type: string
   *               email:
   *                 type: string
   *               GroupUsers:
   *                 type: string
   *                 enum: [admin, student, teacher]
   *     responses:
   *       200:
   *         description: User updated successfully
   */
  router.put("/admin/users", adminController.updateUser);

  /**
   * @swagger
   * /admin/users:
   *   delete:
   *     summary: Delete a user
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: User deleted successfully
   */
  router.delete("/admin/users", adminController.deleteUser);

  /**
   * @swagger
   * /admin/quydinhs:
   *   get:
   *     summary: Get all regulations
   *     tags: [Admin]
   *     responses:
   *       200:
   *         description: List of regulations retrieved successfully
   */
  router.get("/admin/quydinhs", adminController.getQuyDinhs);

  /**
   * @swagger
   * /admin/quydinhs:
   *   post:
   *     summary: Create a new regulation
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               moTa:
   *                 type: string
   *               giaTri:
   *                 type: string
   *     responses:
   *       200:
   *         description: Regulation created successfully
   */
  router.post("/admin/quydinhs", adminController.createQuyDinh);

  /**
   * @swagger
   * /admin/quydinhs:
   *   put:
   *     summary: Update a regulation
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               moTa:
   *                 type: string
   *               giaTri:
   *                 type: string
   *     responses:
   *       200:
   *         description: Regulation updated successfully
   */
  router.put("/admin/quydinhs", adminController.updateQuyDinh);

  /**
   * @swagger
   * /admin/quydinhs:
   *   delete:
   *     summary: Delete a regulation
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Regulation deleted successfully
   */
  router.delete("/admin/quydinhs", adminController.deleteQuyDinh);

  /**
   * @swagger
   * /admin/lops:
   *   get:
   *     summary: Get all classes
   *     tags: [Admin]
   *     responses:
   *       200:
   *         description: List of classes retrieved successfully
   */
  router.get("/admin/lops", adminController.getLops);

  /**
   * @swagger
   * /admin/lops:
   *   post:
   *     summary: Create a new class
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               tenLop:
   *                 type: string
   *               maLop:
   *                 type: string
   *               khoiLop:
   *                 type: string
   *               namHoc:
   *                 type: string
   *     responses:
   *       200:
   *         description: Class created successfully
   */
  router.post("/admin/lops", adminController.createLop);

  /**
   * @swagger
   * /admin/lops:
   *   put:
   *     summary: Update a class
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               siSo:
   *                 type: integer
   *               tenLop:
   *                 type: string
   *               maLop:
   *                 type: string
   *               khoiLop:
   *                 type: string
   *              namHoc:
   *                type: string
   *     responses:
   *       200:
   *         description: Class updated successfully
   */
  router.put("/admin/lops", adminController.updateLop);

  /**
   * @swagger
   * /admin/lops:
   *   delete:
   *     summary: Delete a class
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maLop:
   *                 type: string
   *     responses:
   *       200:
   *         description: Class deleted successfully
   */
  router.delete("/admin/lops", adminController.deleteLop);

  /**
* @swagger
* /admin/monhocs:
*   get:
*     summary: Get all subjects
*     tags: [Admin]
*     responses:
*       200:
*         description: List of subjects retrieved successfully
*/
  router.get("/admin/monhocs", adminController.getMonHocs);

  /**
   * @swagger
   * /admin/monhocs:
   *   post:
   *     summary: Create a new subject
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               tenMon:
   *                 type: string
   *               maMon:
   *                 type: string
   *     responses:
   *       200:
   *         description: Subject created successfully
   */
  router.post("/admin/monhocs", adminController.createMonHoc);

  /**
   * @swagger
   * /admin/monhocs:
   *   put:
   *     summary: Update a subject
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               tenMon:
   *                 type: string
   *               maMon:
   *                 type: string
   *     responses:
   *       200:
   *         description: Subject updated successfully
   */
  router.put("/admin/monhocs", adminController.updateMonHoc);

  /**
   * @swagger
   * /admin/monhocs:
   *   delete:
   *     summary: Delete a subject
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maMon:
   *                 type: string
   *     responses:
   *       200:
   *         description: Subject deleted successfully
   */
  router.delete("/admin/monhocs", adminController.deleteMonHoc);

  /**
   * @swagger
   * /admin/giangviens/phancong:
   *   get:
   *     summary: Get all assignments
   *     tags: [Admin]
   *     responses:
   *       200:
   *         description: List of assignments retrieved successfully
   */
  router.get("/admin/giangviens/phancong", adminController.getPhanCong);

  /**
   * @swagger
   * /admin/giangviens/phancong:
   *   post:
   *     summary: Create a new assignment
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maGV:
   *                 type: integer
   *               maMon:
   *                 type: string
   *               maLop:
   *                 type: string
   *     responses:
   *       200:
   *         description: Assignment created successfully
   */
  router.post("/admin/giangviens/phancong", adminController.createPhanCong);

  /**
   * @swagger
   * /admin/giangviens/phancong:
   *   put:
   *     summary: Update an assignment
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               maGV:
   *                 type: integer
   *               maMon:
   *                 type: string
   *               maLop:
   *                 type: string
   *     responses:
   *       200:
   *         description: Assignment updated successfully
   */
  router.put("/admin/giangviens/phancong", adminController.updatePhanCong);

  /**
   * @swagger
   * /admin/giangviens/phancong:
   *   delete:
   *     summary: Delete an assignment
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Assignment deleted successfully
   */
  router.delete("/admin/giangviens/phancong", adminController.deletePhanCong);

  /**
   * @swagger
   * /admin/lops/hocsinhs:
   *   get:
   *     summary: Get all students in a class
   *     tags: [Admin]
   *     parameters:
   *       - in: query
   *         name: maLop
   *         schema:
   *           type: string
   *         required: true
   *         description: The class ID (maLop) to retrieve students for
   *     responses:
   *       200:
   *         description: List of students in the class retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                 EC:
   *                   type: string
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       maHS:
   *                         type: integer
   *                       hoTen:
   *                         type: string
   */
  router.get("/admin/lops/hocsinhs", adminController.getHocSinhLop);

  /**
   * @swagger
   * /admin/lops/hocsinhs:
   *   post:
   *     summary: Add a student to a class
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maHS:
   *                 type: integer
   *               maLop:
   *                 type: string
   *     responses:
   *       201:
   *         description: Student added to class successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                 EC:
   *                   type: string
   *                 DT:
   *                   type: array
   */
  router.post("/admin/lops/hocsinhs", adminController.createHocSinhLop);

  /**
   * @swagger
   * /admin/lops/hocsinhs:
   *   put:
   *     summary: Update a student's class assignment
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               maHS:
   *                 type: integer
   *               maLop:
   *                 type: string
   *     responses:
   *       200:
   *         description: Student's class assignment updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                 EC:
   *                   type: string
   *                 DT:
   *                   type: array
   */
  router.put("/admin/lops/hocsinhs", adminController.updateHocSinhLop);

  /**
   * @swagger
   * /admin/lops/hocsinhs:
   *   delete:
   *     summary: Remove a student from a class
   *     tags: [Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Student removed from class successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                 EC:
   *                   type: string
   *                 DT:
   *                   type: array
   */
  router.delete("/admin/lops/hocsinhs", adminController.deleteHocSinhLop);
  /**
* @swagger
* /admin/baocao/lop:
*   get:
*     summary: Retrieve the semester report for a specific class
*     tags: [Admin]
*     security:
*       - bearerAuth: [] # Assuming JWT authentication is used
*     parameters:
*       - in: query
*         name: maLop
*         schema:
*           type: string
*         required: true
*         description: The class ID
*         example: "10A1"
*       - in: query
*         name: hocKy
*         schema:
*           type: string
*           enum: [I, II]
*         required: true
*         description: The semester
*         example: "I"
*     responses:
*       200:
*         description: Semester report retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Get bao cao ky success"
*                 EC:
*                   type: string
*                   example: "0"
*                 DT:
*                   type: object
*                   properties:
*                     passedStudents:
*                       type: integer
*                       example: 25
*                     classSize:
*                       type: integer
*                       example: 30
*                     passRate:
*                       type: number
*                       format: float
*                       example: 83.33
*       500:
*         description: Error from server
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Error from server"
*                 EC:
*                   type: string
*                   example: "-1"
*                 DT:
*                   type: string
*                   example: ""
*/

  router.get("/admin/baocao/lop", adminController.getBaoCaoKy);
  /**
* @swagger
* /admin/baocao/lop:
*   delete:
*     summary: Delete the semester report for a specific class
*     tags: [Admin]
*     security:
*       - bearerAuth: [] # Assuming JWT authentication is used
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               maLop:
*                 type: string
*                 description: The class ID
*                 example: "10A1"
*               hocKy:
*                 type: string
*                 description: The semester
*                 example: "I"
*     responses:
*       200:
*         description: Semester report deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Delete BaoCaoKy success"
*                 EC:
*                   type: string
*                   example: "0"
*                 DT:
*                   type: array
*       500:
*         description: Error from server
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Error from server"
*                 EC:
*                   type: string
*                   example: "-1"
*                 DT:
*                   type: string
*                   example: ""
*/
  router.delete("/admin/baocao/lop", adminController.deleteBaoCaoKy);
  /**
   * @swagger
   * /admin/baocao/lops:
   *   get:
   *     summary: Retrieve semester reports for all classes filtered by academic year
   *     tags: [Admin]
   *     parameters:
   *       - in: query
   *         name: hocKy
   *         schema:
   *           type: string
   *         required: true
   *         description: The semester indicator (e.g. "I" or "II")
   *         example: "I"
   *       - in: query
   *         name: namHoc
   *         schema:
   *           type: string
   *         required: true
   *         description: The academic year (e.g., "2025-2026")
   *         example: "2025-2026"
   *     responses:
   *       200:
   *         description: Semester reports retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get BaoCaoLops success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       maLop:
   *                         type: string
   *                         example: "10A1"
   *                       hocKy:
   *                         type: string
   *                         example: "I"
   *                       siSo:
   *                         type: integer
   *                         example: 30
   *                       soLuongDat:
   *                         type: integer
   *                         example: 25
   *                       tiLe:
   *                         type: number
   *                         format: float
   *                         example: 83.33
   *                       Lops:
   *                         type: object
   *                         properties:
   *                           tenLop:
   *                             type: string
   *                             example: "Class 10A1"
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/admin/baocao/lops", adminController.getBaoCaoLops);
  /**
   * @swagger
   * /admin/baocao/mon:
   *   get:
   *     summary: Retrieve the aggregated report for a specific subject across all classes
   *     tags: [Admin]
   *     parameters:
   *       - in: query
   *         name: hocKy
   *         schema:
   *           type: string
   *         required: true
   *         description: The semester indicator (e.g. "I" or "II")
   *         example: "I"
   *       - in: query
   *         name: maMon
   *         schema:
   *           type: string
   *         required: true
   *         description: The subject ID
   *         example: "MATH101"
   *       - in: query
   *         name: namHoc
   *         schema:
   *           type: string
   *         required: true
   *         description: The academic year (e.g., "2025-2026")
   *         example: "2025-2026"
   *     responses:
   *       200:
   *         description: Aggregated subject report retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get BaoCaoMons success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: object
   *                   properties:
   *                     maMon:
   *                       type: string
   *                       example: "MATH101"
   *                     hocKy:
   *                       type: string
   *                       example: "I"
   *                     siSo:
   *                       type: integer
   *                       example: 100
   *                     soLuongDat:
   *                       type: integer
   *                       example: 80
   *                     tiLe:
   *                       type: number
   *                       format: float
   *                       example: 80.0
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: string
   */
  router.get("/admin/baocao/mon", adminController.getBaoCaoMons);
  /**
 * @swagger
 * /admin/hocsinhs/ketqua:
 *   get:
 *     summary: Lấy kết quả học tập của học sinh (bao gồm điểm trung bình học kỳ I, học kỳ II và tên lớp)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # Giả sử sử dụng xác thực JWT
 *     responses:
 *       200:
 *         description: Kết quả học tập của học sinh được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EM:
 *                   type: string
 *                   example: "Get Ket Qua Hoc Sinh success"
 *                 EC:
 *                   type: string
 *                   example: "0"
 *                 DT:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       maHS:
 *                         type: string
 *                         example: "101"
 *                       tenLop:
 *                         type: string
 *                         example: "Class 10A1"
 *                       avgI:
 *                         type: number
 *                         format: float
 *                         example: 7.8
 *                       avgII:
 *                         type: number
 *                         format: float
 *                         example: 8.2
 *       500:
 *         description: Lỗi từ server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EM:
 *                   type: string
 *                   example: "Error from server"
 *                 EC:
 *                   type: string
 *                   example: "-1"
 *                 DT:
 *                   type: array
 *                   items:
 *                     type: string
 */
  router.get("/admin/hocsinhs/ketqua", adminController.getKetQuaHocSinh);
  // Giang Vien

  /**
   * @swagger
   * /giangvien/phancong:
   *   get:
   *     summary: Retrieve all assignments for the authenticated teacher
   *     tags: [GiangVien]
   *     security:
   *       - bearerAuth: [] # Assuming JWT authentication is used
   *     responses:
   *       200:
   *         description: Assignments retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get PhanCong success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       maMon:
   *                         type: string
   *                         example: "MATH101"
   *                       maLop:
   *                         type: string
   *                         example: "10A1"
   *                       MonHocs:
   *                         type: object
   *                         properties:
   *                           tenMon:
   *                             type: string
   *                             example: "Mathematics"
   *                       Lops:
   *                         type: object
   *                         properties:
   *                           tenLop:
   *                             type: string
   *                             example: "Class 10A1"
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/giangvien/phancong", gvController.getPhanCong);
  /**
   * @swagger
   * /giangvien/bangdiem:
   *   get:
   *     summary: Get the gradebook for a specific class and subject
   *     tags: [GiangVien]
   *     parameters:
   *       - in: query
   *         name: maLop
   *         schema:
   *           type: string
   *         required: true
   *         description: The class ID (maLop) to retrieve the gradebook for
   *       - in: query
   *         name: maMon
   *         schema:
   *           type: string
   *         required: true
   *         description: The subject ID (maMon) to retrieve the gradebook for
   *       - in: query
   *         name: hocKy
   *         schema:
   *           type: string
   *         required: true
   *         description: The semester (hocKy) to retrieve the gradebook for
   *     responses:
   *       200:
   *         description: Gradebook retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get BangDiem success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       maSV:
   *                         type: integer
   *                         example: 101
   *                       hoTen:
   *                         type: string
   *                         example: "Nguyen Van A"
   *                       diem15p:
   *                         type: number
   *                         format: float
   *                         example: 8.5
   *                       diem1Tiet:
   *                         type: number
   *                         format: float
   *                         example: 7.0
   *                       diemTB:
   *                         type: number
   *                         format: float
   *                         example: 7.8
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/giangvien/bangdiem", gvController.getBangDiem);

  /**
   * @swagger
   * /giangvien/bangdiem:
   *   post:
   *     summary: Create a new grade entry for a student
   *     tags: [GiangVien]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maHS:
   *                 type: integer
   *                 description: The student ID
   *                 example: 101
   *               maLop:
   *                 type: string
   *                 description: The class ID
   *                 example: "10A1"
   *               maMon:
   *                 type: string
   *                 description: The subject ID
   *                 example: "MATH101"
   *               hocKy:
   *                 type: string
   *                 description: The semester
   *                 example: "I"
   *     responses:
   *       200:
   *         description: Grade entry created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Create BangDiem success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.post("/giangvien/bangdiem", gvController.createBangDiem);
  /**
   * @swagger
   * /giangvien/bangdiem:
   *   put:
   *     summary: Update a student's grade in a specific class and subject
   *     tags: [GiangVien]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maLop:
   *                 type: string
   *                 description: The class ID
   *                 example: "10A1"
   *               maMon:
   *                 type: string
   *                 description: The subject ID
   *                 example: "MATH101"
   *               maHS:
   *                 type: integer
   *                 description: The student ID
   *                 example: 101
   *               hocKy:
   *                 type: string
   *                 description: The semester
   *                 example: "I"
   *               diem15p:
   *                 type: number
   *                 format: float
   *                 description: The 15-minute test score
   *                 example: 8.5
   *               diem1Tiet:
   *                 type: number
   *                 format: float
   *                 description: The 1-period test score
   *                 example: 7.0
   *     responses:
   *       200:
   *         description: Grade updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Update BangDiem success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.put("/giangvien/bangdiem", gvController.updateBangDiem);
  /**
   * @swagger
   * /giangvien/bangdiem:
   *   delete:
   *     summary: Delete a student's grade in a specific class and subject
   *     tags: [GiangVien]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maLop:
   *                 type: string
   *                 description: The class ID
   *                 example: "10A1"
   *               maMon:
   *                 type: string
   *                 description: The subject ID
   *                 example: "MATH101"
   *               maHS:
   *                 type: integer
   *                 description: The student ID
   *                 example: 101
   *     responses:
   *       200:
   *         description: Grade deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Delete BangDiem success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.delete("/giangvien/bangdiem", gvController.deleteBangDiem);
  /**
   * @swagger
   * /giangvien/baocao/mon:
   *   get:
   *     summary: Retrieve the aggregated report for a specific subject across all classes managed by the authenticated teacher
   *     tags: [GiangVien]
   *     security:
   *       - bearerAuth: []  # Assuming JWT authentication is used
   *     parameters:
   *       - in: query
   *         name: maLop
   *         schema:
   *           type: string
   *         required: true
   *         description: The class ID
   *         example: "10A1"
   *       - in: query
   *         name: maMon
   *         schema:
   *           type: string
   *         required: true
   *         description: The subject ID
   *         example: "MATH101"
   *       - in: query
   *         name: hocKy
   *         schema:
   *           type: string
   *           enum: [I, II]
   *         required: true
   *         description: The semester indicator
   *         example: "I"
   *       - in: query
   *         name: namHoc
   *         schema:
   *           type: string
   *         required: true
   *         description: The academic year (e.g., "2025-2026")
   *         example: "2025-2026"
   *     responses:
   *       200:
   *         description: Aggregated subject report retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get bao cao mon success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: object
   *                   properties:
   *                     passedStudents:
   *                       type: integer
   *                       example: 25
   *                     classSize:
   *                       type: integer
   *                       example: 30
   *                     passRate:
   *                       type: number
   *                       format: float
   *                       example: 83.33
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/giangvien/baocao/mon", gvController.getBaoCaoMon);
  /**
   * @swagger
   * /giangvien/baocao/mon:
   *   delete:
   *     summary: Delete the aggregated report for a specific subject across all classes
   *     tags: [GiangVien]
   *     security:
   *       - bearerAuth: []  # Assuming JWT authentication is used
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               maLop:
   *                 type: string
   *                 description: The class ID
   *                 example: "10A1"
   *               maMon:
   *                 type: string
   *                 description: The subject ID
   *                 example: "MATH101"
   *               hocKy:
   *                 type: string
   *                 description: The semester
   *                 example: "I"
   *               namHoc:
   *                 type: string
   *                 description: The academic year (e.g., "2025-2026")
   *                 example: "2025-2026"
   *     responses:
   *       200:
   *         description: Aggregated subject report deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Delete BaoCaoMon success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.delete("/giangvien/baocao/mon", gvController.deleteBaoCaoMon);
  /**
   * @swagger
   * /giangvien/lops:
   *   get:
   *     summary: Retrieve all classes managed by the authenticated teacher
   *     tags: [GiangVien]
   *     security:
   *       - bearerAuth: [] # Assuming JWT authentication is used
   *     responses:
   *       200:
   *         description: Classes retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get Lop success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       maLop:
   *                         type: string
   *                         example: "10A1"
   *                       tenLop:
   *                         type: string
   *                         example: "Class 10A1"
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/giangvien/lops", gvController.getLops);
  /**
* @swagger
* /giangvien/lops/hocsinhs:
*   get:
*     summary: Retrieve all students in a specific class managed by the authenticated teacher
*     tags: [GiangVien]
*     security:
*       - bearerAuth: [] # Assuming JWT authentication is used
*     parameters:
*       - in: query
*         name: maLop
*         schema:
*           type: string
*         required: true
*         description: The class ID (maLop) to retrieve students for
*     responses:
*       200:
*         description: List of students retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Get HocSinh success"
*                 EC:
*                   type: string
*                   example: "0"
*                 DT:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       maHS:
*                         type: integer
*                         example: 101
*                       hoTen:
*                         type: string
*                         example: "Nguyen Van A"
*       500:
*         description: Error from server
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Error from server"
*                 EC:
*                   type: string
*                   example: "-1"
*                 DT:
*                   type: string
*                   example: ""
*/
  router.get("/giangvien/lops/hocsinhs", gvController.getHocSinhLop);
  /**
   * @swagger
   * /giangvien/baocao/lop:
   *   get:
   *     summary: Retrieve the semester report for a specific class (with matching academic year) managed by the authenticated teacher
   *     tags: [GiangVien]
   *     security:
   *       - bearerAuth: [] # Assuming JWT authentication is used
   *     parameters:
   *       - in: query
   *         name: maLop
   *         schema:
   *           type: string
   *         required: true
   *         description: The class ID
   *         example: "10A1"
   *       - in: query
   *         name: hocKy
   *         schema:
   *           type: string
   *           enum: [I, II]
   *         required: true
   *         description: The semester
   *         example: "I"
   *       - in: query
   *         name: namHoc
   *         schema:
   *           type: string
   *         required: true
   *         description: The academic year (e.g., "2025-2026")
   *         example: "2025-2026"
   *     responses:
   *       200:
   *         description: Semester report retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Get bao cao ky success"
   *                 EC:
   *                   type: string
   *                   example: "0"
   *                 DT:
   *                   type: object
   *                   properties:
   *                     passedStudents:
   *                       type: integer
   *                       example: 25
   *                     classSize:
   *                       type: integer
   *                       example: 30
   *                     passRate:
   *                       type: number
   *                       format: float
   *                       example: 83.33
   *       500:
   *         description: Error from server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EM:
   *                   type: string
   *                   example: "Error from server"
   *                 EC:
   *                   type: string
   *                   example: "-1"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
  router.get("/giangvien/baocao/lop", gvController.getBaoCaoKy);
  //hoc sinh 
  /**
* @swagger
* /hocsinh/bangdiem:
*   get:
*     summary: Retrieve the gradebook for the authenticated student
*     tags: [HocSinh]
*     security:
*       - bearerAuth: [] # Assuming JWT authentication is used
*     parameters:
*       - in: query
*         name: maLop
*         schema:
*           type: string
*         required: true
*         description: The class ID (maLop) to retrieve the gradebook for
*       - in: query
*         name: hocKy
*         schema:
*           type: string
*         required: true
*         description: The semester (e.g. "I" or "II")
*         example: "I"
*     responses:
*       200:
*         description: Gradebook retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Get bang diem success"
*                 EC:
*                   type: string
*                   example: "0"
*                 DT:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       maMon:
*                         type: string
*                         example: "MATH101"
*                       hocKy:
*                         type: string
*                         example: "I"
*                       diem15p:
*                         type: number
*                         format: float
*                         example: 8.5
*                       diem1Tiet:
*                         type: number
*                         format: float
*                         example: 7.0
*                       diemTB:
*                         type: number
*                         format: float
*                         example: 7.8
*                       MonHocs:
*                         type: object
*                         properties:
*                           tenMon:
*                             type: string
*                             example: "Mathematics"
*       500:
*         description: Error from server
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 EM:
*                   type: string
*                   example: "Error from server"
*                 EC:
*                   type: string
*                   example: "-1"
*                 DT:
*                   type: string
*                   example: ""
*/
  router.get("/hocsinh/bangdiem", hsController.getBangDiem);
  return app.use("/api/v1", router);
}
export default initApiRoutes;