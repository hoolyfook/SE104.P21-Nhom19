import express from "express";
import userController from "../controller/userController.js";
import adminController from "../controller/adminController.js";
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               newpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
    router.put("/users/password", userController.changePassword); // body: { email, password, newpassword}

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


    return app.use("/api/v1", router);
}
export default initApiRoutes;