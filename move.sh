echo "###delete files###"
cd ../xinqiu-h5 
rm -rf *
echo "###copy files###"
cp -rf ../wanqiu-v3/* ../xinqiu-h5
cp ./.env.development ../xinqiu-h5/.env.development
cp ./.env.production ../xinqiu-h5/.env.production
echo "### done###"

