echo "###delete files###"
cd ../xinqiu-h5 
git checkout dev
rm -rf *
echo "###copy files###"
cp -rf ../wanqiu-v3/* ../xinqiu-h5
cp ./.env.development ../xinqiu-h5/.env.development
cp ./.env.production ../xinqiu-h5/.env.production
cp ./.env.production.prod ../xinqiu-h5/.env.production.prod
echo "### done###"

git add .
git commit -m"bash update"
git push origin dev

