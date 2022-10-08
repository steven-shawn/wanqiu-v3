rm -f jqiu-dist.zip
rm -f jincheng-dist.zip
rm -f halan-dist.zip

# 编译金球
npm run build # 编译测试环境
zip -q -r -m ./jqiu-dist.zip ./dist
echo "金球打包完成"

# 编译金橙
## 改index
mv ./index.html ./index.html.jq
mv ./index.html.jc ./index.html

## 改环境变量
mv ./.env.production ./.env.production.jq
mv ./.env.production.jc ./.env.production

## 改logo
mv ./src/assets/logo@2x.png ./src/assets/logo@2x.jq.png
mv ./src/assets/logo@2x.jc.png ./src/assets/logo@2x.png

## 编译打包
npm run build
zip -q -r -m ./jincheng-dist.zip ./dist

echo "金橙打包完成"

# 编译哈兰
mv ./index.html ./index.html.jc
mv ./index.html.hl ./index.html

mv ./.env.production ./.env.production.jc
mv ./.env.production.hl ./.env.production

mv ./src/assets/logo@2x.png ./src/assets/logo@2x.jc.png
mv ./src/assets/logo@2x.hl.png ./src/assets/logo@2x.png

npm run build
zip -q -r -m ./halan-dist.zip ./dist
echo "哈兰打包完成"

# 还原文件
mv ./index.html ./index.html.hl
mv ./index.html.jq ./index.html

mv ./.env.production ./.env.production.hl
mv ./.env.production.jq ./.env.production

mv ./src/assets/logo@2x.png ./src/assets/logo@2x.hl.png
mv ./src/assets/logo@2x.jq.png ./src/assets/logo@2x.png
echo "文件还原完成"

# 推送到git
git add .
git commit -m"auto build"
git push origin simple-h5


