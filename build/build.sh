timer=`date +"%Y-%m-%d %H:%M:%S"`

git pull
git add .
git commit -am "$timer"

git push

git build:prod