# 删除目录
rm -rf ./build/

# 重新创建目录
mkdir build

# 编译金球
npm run build # 编译测试环境
zip -q -r -m ./build/jqiu-dist.zip ./dist
echo "金球打包完成"

# 编译金橙
## 移动金球的东西
mv ./.env.production ./platform/jqiu/
mv ./index.html ./platform/jqiu/
mv ./src/assets/logo@2x.png ./platform/jqiu/

## 添加金橙的东西
mv ./platform/jcheng/index.html ./
mv ./platform/jcheng/.env.production ./
mv ./platform/jcheng/logo@2x.png ./src/assets/

## 编译打包
npm run build
zip -q -r -m ./build/jincheng-dist.zip ./dist

echo "金橙打包完成"

# 编译哈兰
## 移动金橙的东西
mv ./.env.production ./platform/jcheng/
mv ./index.html ./platform/jcheng/
mv ./src/assets/logo@2x.png ./platform/jcheng/

## 添加哈兰的东西
mv ./platform/halan/index.html ./
mv ./platform/halan/.env.production ./
mv ./platform/halan/logo@2x.png ./src/assets/

npm run build
zip -q -r -m ./build/halan-dist.zip ./dist
echo "哈兰打包完成"

# 还原文件

## 移动哈兰的东西
mv ./.env.production ./platform/halan/
mv ./index.html ./platform/halan/
mv ./src/assets/logo@2x.png ./platform/halan/

## 添加金球的东西
mv ./platform/jqiu/index.html ./
mv ./platform/jqiu/.env.production ./
mv ./platform/jqiu/logo@2x.png ./src/assets/

echo "文件还原完成"

# 推送到git
time=$(date "+%Y%m%d-%H%M%S")
git add .
git commit -m"auto build ${time}"
git push origin full-h5


