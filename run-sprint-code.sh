SPRINT=$(cat src/sprint-code.txt | tr "\n" " " | sed -e "s/  */ /g" -e "s/: */:/g")
node src/sprint.js "$SPRINT"
