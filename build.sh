npm run build # 编译测试环境

zip -q -r -m ./dist-test.zip ./dist

mv ./.env.production ./.env.production.test
mv ./.env.production.prod ./.env.production

npm run build # 编译胜生产环境
zip -q -r -m ./dist-prod.zip ./dist

mv ./.env.production ./.env.production.prod
mv ./.env.production.test ./.env.production


