# 删除目录
rm -rf ./build/

# 重新创建目录
mkdir build

# 编译测试环境
npm run build
zip -q -r -m ./build/jqiu-test-dist.zip ./dist

echo "######### 测试环境打包完成 ##########"

# 编译金球
mv ./.env.production ./.env.production.dev
mv ./platform/jqiu/.env.production ./
npm run build # 编译测试环境
zip -q -r -m ./build/jqiu-dist.zip ./dist
echo "########## 金球打包完成 ##########"

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

echo "############ 金橙打包完成 #########"

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
echo "########## 哈兰打包完成 ###########"

## 编译星球
mv ./.env.production ./platform/halan/
mv ./index.html ./platform/halan/
mv ./src/assets/logo@2x.png ./platform/halan/

mv ./platform/xqiu/index.html ./
mv ./platform/xqiu/.env.production ./
mv ./platform/xqiu/logo@2x.png ./src/assets/

npm run build
zip -q -r -m ./build/xqiu-dist.zip ./dist

echo "########## 星球打包完成 ##########"

# 还原文件
mv ./.env.production ./platform/xqiu/
mv ./index.html ./platform/xqiu/
mv ./src/assets/logo@2x.png ./platform/xqiu/

mv ./platform/jqiu/index.html ./
mv ./.env.production.dev ./.env.production
mv ./platform/jqiu/logo@2x.png ./src/assets/

echo "********** 文件还原完成 *********"

# 推送到git
v=$(cat ./version.txt)
v=$(($v+1))
echo "${v}" > ./version.txt
git add .
git commit -m"auto build 0.0.${v}"
git push origin full-h5

echo "@@@@@@@ Done ${v} @@@@@@@@@@@"


