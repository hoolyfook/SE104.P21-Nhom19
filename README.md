# ĐỀ TÀI QUẢN LÝ HỌC SINH
Nhóm 19 - SE104.P21 
GV: Đỗ Thị Thanh Tuyền

## Danh sách thành viên
- Lê Thanh Lâm - 21521025
- Nguyễn Văn Long - 21521097

docker run \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -v /database:/bitnami/mysql/data \
    bitnami/mysql:latest


docker-compose down && docker-compose up -d

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
